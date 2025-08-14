// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  // css: ['~/assets/css/main.css'],
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],

  typescript: {
    typeCheck: true,
    strict: false,
  },

  app: {
    head: {
      title: 'Universe_Migration',
      meta: [
        { name: 'description', content: 'Nuxt 4' },
      ],
    },
  },

})
