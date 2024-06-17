// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  runtimeConfig: {
    public: {
      version: process.env.VERSION || '0.0.1',
    },
  },
  app: {
    baseURL: '/patri/',
    buildAssetsDir: 'assets',
  },
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt'],
  plugins: [],
});
