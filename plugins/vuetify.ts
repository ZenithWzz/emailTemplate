import { defineNuxtPlugin } from '#app';
import { createVuetify } from 'vuetify';
import { aliases, mdi } from 'vuetify/iconsets/mdi';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    components,
    directives,
    icons: {
      defaultSet: 'mdi',
      aliases,
      sets: { mdi }
    },
    theme: {
      defaultTheme: 'light',
      themes: {
        light: {
          colors: {
            primary: '#1E88E5',
            secondary: '#26A69A',
            accent: '#7C4DFF'
          }
        }
      }
    }
  });

  nuxtApp.vueApp.use(vuetify);
});
