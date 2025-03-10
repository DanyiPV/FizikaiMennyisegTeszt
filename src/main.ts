import { createApp, nextTick } from 'vue';  // importáljuk a szükséges dolgokat
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import vuetify from './lib/vuetify';
import { VueQueryPlugin } from '@tanstack/vue-query';
import queryClient from './lib/queryClient';

// Létrehozzuk a Vue alkalmazást
const app = createApp(App);

// Regisztráljuk a MathJax direktívát
app.directive('mathjax', {
  mounted(el, binding) {
    el.innerHTML = binding.value || '';
    nextTick(() => {
      if (window.MathJax) {
        window.MathJax.typesetPromise([el]).catch((err) => {
          console.error('MathJax error:', err);
        });
      }
    });
  },
  updated(el, binding) {
    el.innerHTML = binding.value || '';
    nextTick(() => {
      if (window.MathJax) {
        window.MathJax.typesetPromise([el]).catch((err) => {
          console.error('MathJax error:', err);
        });
      }
    });
  }
});

// Betöltjük a MathJax szkriptet, ha nincs még betöltve
if (!window.MathJax) {
  const script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js';
  script.async = true;
  script.onload = () => console.log('MathJax Loaded');
  document.head.appendChild(script);
}

// Használjuk a szükséges pluginokat
app.use(createPinia());
app.use(router);
app.use(vuetify);
app.use(VueQueryPlugin, { queryClient: queryClient });

// Az alkalmazás mountolása a HTML elemhez
app.mount('#app');
