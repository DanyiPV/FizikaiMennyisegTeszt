<template>
  <RouterView></RouterView>

  <ErrorHandler ref="errorHandler" />

  <SuccesHandler ref="succesHandler" />
</template>

<script setup>
import { ref, provide, nextTick, watch } from "vue";
import ErrorHandler from "@/components/ErrorHandler.vue";
import SuccesHandler from "@/components/SuccesHandler.vue";

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

const succesHandler = ref(null);

provide("showSucces", (msg) => {
  nextTick(() => {
    if (succesHandler.value) {
      succesHandler.value.showSucces(msg);
    } else {
      console.log("succesHandler még nem elérhető");
    }
  });
});


</script>