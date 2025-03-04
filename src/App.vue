<template>
  <RouterView></RouterView>

  <ErrorHandler ref="errorHandler" />
</template>

<script setup>
import { ref, provide, nextTick, watch } from "vue";
import ErrorHandler from "@/components/ErrorHandler.vue";

const errorHandler = ref(null);

// Provide-oljuk a showError metódust
provide("showError", (msg) => {
  nextTick(() => {
    if (errorHandler.value) {
      errorHandler.value.showError(msg);
    } else {
      console.log("errorHandler még nem elérhető");
    }
  });
});
/*
// Amikor az errorHandler változik, ellenőrizhetjük, hogy elérhető-e
watch(errorHandler, (newValue) => {
  if (newValue) {
    console.log("errorHandler elérhető", newValue);
  }
});

// Teszt: Statikus hibaüzenet
setTimeout(() => {
  errorHandler.value?.showError('Ez egy statikus error!');
}, 1000);*/
</script>