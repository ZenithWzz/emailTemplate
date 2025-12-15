import vuetify from 'vite-plugin-vuetify';
import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: true },
  css: ['vuetify/styles', '@mdi/font/css/materialdesignicons.css'],
  typescript: {
    shim: false,
    strict: true
  },
  build: {
    transpile: ['vuetify']
  },
  app: {
    head: {
      title: 'Email Template Builder',
      meta: [
        { name: 'description', content: 'Design and customize responsive email templates with live preview.' }
      ]
    }
  },
  vite: {
    define: {
      'process.env.DEBUG': false
    },
    ssr: {
      noExternal: ['vuetify']
    },
    plugins: [vuetify()]
  }
});
