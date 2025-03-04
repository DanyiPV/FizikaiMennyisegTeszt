import "./assets/main.css";
import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import vuetify from "./lib/vuetify";
import { VueQueryPlugin } from "@tanstack/vue-query";
import queryClient from "./lib/queryClient";

const app = createApp(App);

const renderMath = (el: HTMLElement) => {
  if (window.MathJax) {
    window.MathJax.typesetPromise([el]).catch((err) =>
      console.error("MathJax error:", err)
    );
  }
};

app.directive("mathjax", {
  mounted(el, binding) {
    el.innerHTML = binding.value || "";
    renderMath(el);
  },
  updated(el, binding) {
    el.innerHTML = binding.value || "";
    renderMath(el);
  }
});

if (!window.MathJax) {
  const script = document.createElement("script");
  script.src = "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js";
  script.async = true;
  script.onload = () => console.log("MathJax Loaded");
  document.head.appendChild(script);
}

app.use(createPinia());
app.use(router);
app.use(vuetify);
app.use(VueQueryPlugin, { queryClient: queryClient });

app.mount("#app");
