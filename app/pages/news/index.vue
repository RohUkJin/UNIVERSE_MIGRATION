<template>
  <div class="container">
    <NewsMain />
  </div>
</template>

<script setup>
const title = 'Universe News';
const description = 'Universe News Description';

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

import NewsMain from '~/components/News/NewsList.vue';
</script>
