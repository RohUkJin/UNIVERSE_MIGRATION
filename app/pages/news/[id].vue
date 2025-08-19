<template>
  <article v-if="item" class="detail-article">
    <div class="detail-header">
      <img :src="item.image_url" :alt="item.title" class="detail-image" />
      <div class="detail-meta">
        <span class="detail-site">{{ item.news_site }}</span>
        <h1 class="detail-title">{{ item.title }}</h1>
        <p class="detail-date">{{ formatDate(item.published_at) }}</p>
      </div>
    </div>
    <div class="detail-content">
      <p class="detail-summary">{{ item.summary }}</p>
      <a :href="item.url" target="_blank" rel="noopener noreferrer" class="detail-link">
        Get Original →
      </a>
    </div>
  </article>

  <div v-else-if="pending" class="loading-indicator">
    <p>Loading...</p>
  </div>
</template>

<script setup lang="ts">
import type { INewsItem } from '../../types/news';

const item = ref<INewsItem | null>(null);
const route = useRoute()
const id = route.params.id

const { data, error, pending } = await useFetch<INewsItem>(
  `https://api.spaceflightnewsapi.net/v4/blogs/${Number(id)}/`
)

if (data.value) {
  item.value = data.value;
}


const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const title = `Universe News - ${item.value?.title}`;
const description = `${item.value?.summary}`;

useHead({
  title,
  meta: [
    { name: 'description', content: description },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    // { property: 'og:image', content: 'https://example.com/og-image.jpg' },
    { property: 'og:type', content: 'website' },
    // { property: 'og:url', content: 'https://example.com/page' },
    // { name: 'twitter:card', content: 'summary_large_image' },
  ]
})

</script>

<style scoped>
.detail-article {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px 0 24px;
}

.detail-header {
  margin-bottom: 30px;
}

.detail-image {
  width: 100%;
  max-height: 600px;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 20px;
}

.detail-meta {
  text-align: left;
}

.detail-site {
  color: #868686;
  font-size: 16px;
  font-weight: 500;
}

.detail-title {
  font-size: 32px;
  font-weight: 700;
  margin: 15px 0;
  line-height: 1.4;
}

.detail-date {
  color: #666;
  font-size: 14px;
}

.detail-content {
  text-align: left;
}

.detail-summary {
  font-size: 18px;
  line-height: 1.6;
  margin-bottom: 30px;
  color: #333;
}

.detail-link {
  display: inline-block;
  border-bottom: 1px solid #868686;
  color: #868686;
  text-decoration: none;
  font-weight: 500;
  padding: 6px;
  transition: all 0.3s;
  cursor: pointer;
}

.detail-link:hover {
  color: #000;
  border-bottom: 1px solid #000;
}

.loading-indicator {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 18px;
  color: #666;
}

@media screen and (max-width: 1200px) {
  .detail-article {
    padding: 24px;
  }
}
</style>