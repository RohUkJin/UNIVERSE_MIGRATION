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
    tsConfig: {
      compilerOptions: {
        module: 'ES2022',
        target: 'ES2022',
        moduleResolution: 'bundler'
      }
    }
  },

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      title: 'Universe_Migration',
      meta: [
        { name: 'description', content: 'Nuxt 4' },
      ],
    },
  },

})
