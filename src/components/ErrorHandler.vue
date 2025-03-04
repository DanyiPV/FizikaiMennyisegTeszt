<template>
    <v-scale-transition mode="in-out">
        <div
        v-if="visible"
        style="width: 100%; position: absolute; bottom: 5rem; height: 4rem;" class="d-flex justify-center">
            <div color="error" style="width: max-content; background-color: rgb(var(--v-theme-error));" class="pa-2 px-4 rounded d-flex align-center position-relative">
                <h3 style="color: white; font-weight: normal;">{{ errorMessage }}</h3>
                <div class="ml-2 cursor-pointer" @click="visible = false">
                    <v-icon size="25" color="white">mdi-close</v-icon>
                </div>
            </div>
        </div>
    </v-scale-transition>
</template>

<script setup>
import { ref } from "vue";

// A hibaüzenet és annak láthatósága
const visible = ref(false);
const errorMessage = ref("");

// A showError metódus, amit a szülő komponenstől hívhatunk
const showError = (message) => {
    errorMessage.value = message;
    visible.value = true;

    setTimeout(() => {
        visible.value = false;
    }, 3000);
};

defineExpose({
    showError,
});
</script>
