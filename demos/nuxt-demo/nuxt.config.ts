// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxt/ui"],
  future: {
    compatibilityVersion: 4,
  },
  devtools: { enabled: false },
  typescript: {
    strict: true,
  },
});
