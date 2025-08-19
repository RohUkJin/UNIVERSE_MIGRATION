<template>
    <section class="news">
        <div class="inner">
            <h1 class="title">News</h1>
            <ul class="news-list">
                <li class="news-item" v-for="item in news" :key="item.id" @click="moveDetail(item)">
                    <div class="news-imgbx">
                        <img :src="item.image_url || replaceImageSrc" :alt="item.title" @error="getReplaceImage">
                    </div>
                    <div class="news-txtbx">
                        <span class="news-site">{{ item.news_site }}</span>
                        <h2 class="news-title">{{ item.title }}</h2>
                        <p class="news-summary">{{ item.summary }}</p>
                    </div>
                </li>
            </ul>

            <div v-if="isLoading" class="loading-indicator">
                <p>Loading...</p>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">

import type { INewsItem, INewsResponse } from '../../types/news';

const news = ref<INewsItem[]>([]);
const isLoading = ref<boolean>(false);
const nextData = ref<string | null>(null);
const hasNextData = ref<boolean>(true);

// 새로고침 문제 해결된 코드
const { data, error, pending, refresh } = await useFetch<INewsResponse>(`https://api.spaceflightnewsapi.net/v4/blogs/?limit=10&offset=0`, {
    server: true,
});

// 디버깅 로그 추가
console.log('초기 데이터 상태:', {
    data: data.value,
    news: news.value,
    hasData: !!data.value,
    dataLength: data.value?.results?.length || 0,
    error: error.value,
    pending: pending.value
});

// 초기 데이터값 : SSR 사용
if (data.value) {
    news.value = data.value.results;
    nextData.value = data.value.next;
    hasNextData.value = !!data.value.next;
}

// 무한스크롤용 Next값 : CSR 사용
const loadMoreData = async () => {
    if (isLoading.value || !nextData.value || !hasNextData.value) return;
    
    isLoading.value = true;
    
    try {
        // $fetch 사용 : 클라이언트 전용
        const response = await $fetch<INewsResponse>(nextData.value);
        
        if (response) {
            news.value = [...news.value, ...response.results];
            nextData.value = response.next;
            hasNextData.value = !!response.next;
        }
    } catch (err) {
        console.error('추가 데이터 로딩 실패:', err);
    } finally {
        isLoading.value = false;
    }
};

const handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.offsetHeight;

    if (scrollTop + windowHeight >= documentHeight - 100) {
        loadMoreData(); 
    }
};

// 데이터에 이미지가 없을 때 대체 이미지 삽입
import ImageNotFound from '../../assets/images/Image-not-found.png'
const replaceImageSrc = ImageNotFound;

const getReplaceImage = (e: Event) => {
    const target = e.target as HTMLImageElement;
    if (target && target.src !== replaceImageSrc) {
        target.src = replaceImageSrc;
    }
};

// 상세 페이지 클릭시, 디테일 페이지 이동
const router = useRouter();

const moveDetail = (item: INewsItem) => {
    router.push(`/news/${item.id}`);
}

onMounted(() => {
    window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
});

</script>

<style scoped>
.news .inner {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 24px
}

.title {
    font-size: 54px;
    font-weight: 700;
    padding: 48px 0;
    text-align: center;
}

.news-list {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    padding-left: 0;
}

.news-item {
    display: flex;
    align-items: flex-start;
    gap: 45px;
    height: 300px;
    cursor: pointer;
    transition: transform 0.2s ease;
    list-style: none;
}

.news-item:hover {
    transform: translateY(-2px);
}

.news-item:first-of-type {
    padding: 0 0 45px;
}

.news-item+.news-item {
    padding: 45px 0 45px;
    border-top: 0.5px solid rgba(0, 0, 0, 0.3);
}

.news-imgbx {
    flex: 1;
    height: 300px;
    border-radius: 12px;
    overflow: hidden;
}

.news-imgbx img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.news-txtbx {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
    justify-content: flex-start;
    padding-left: 20px;
}

.news-title {
    font-size: 28px;
    font-weight: 700;
    text-align: left;
    margin: 0;
    line-height: 1.4;
}

.news-site {
    font-size: 18px;
    color: #868686;
}

.news-summary {
    text-wrap: balance;
    font-size: 20px;
    text-align: left;
    margin-top: 0;
    line-height: 1.6;
    display: -webkit-box;
    max-height: 155px;
    overflow: hidden;
    -webkit-line-clamp: 6;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
}

.loading-indicator {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    text-align: center;
    font-size: 18px;
    color: #666;
}

@media screen and (max-width: 1200px) {
    .news-item {
        height: auto;
        flex-direction: column;
        gap: 24px;
    }

    .news-imgbx {
        width: 100%;
        height: 100%;
        max-height: 500px;
        border-radius: 12px;
        overflow: hidden;
    }

    .news-imgbx img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
        pointer-events: none;
    }

    .news-txtbx {
        padding-left: 0;
    }

    .news-summary {
        font-size: 18px;
        max-height: 180px;
    }
}
</style>