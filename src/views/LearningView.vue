<template>
  <v-card class="ma-4 scrollView">
      <v-tabs
          v-model="tab"
          bg-color="primary"
          class="d-flex"
          style="width: 100%;"
      >
          <v-tab
              :value="tkat.id"
              v-for="tkat in AllTables"
              :key="tkat.id"
              class="d-flex justify-center"
              style="flex-grow: 1; text-align: center;"
          >
              {{ tkat.nev }}
          </v-tab>
      </v-tabs>

      <v-card-text>
          <v-tabs-window v-model="tab">
              <v-tabs-window-item
                  v-for="tkat in AllTables"
                  :key="tkat.id"
                  :value="tkat.id"
                  class="d-flex flex-column ga-2"
              >
                  <transition-group>
                      <v-container
                          v-for="alkat in tkat.Alkats"
                          :key="alkat.id"
                          style="background-color: rgb(var(--v-theme-background));"
                          class="rounded"
                          v-if="tab === tkat.id"
                      >
                          <div class="d-flex justify-center">
                              <h1>{{ alkat.nev }}</h1>
                          </div>

                          <v-table class="table-fixed">
                              <thead>
                                  <tr>
                                      <th class="text-center" style="width: 20%;"><h2>Név</h2></th>
                                      <th class="text-center" style="width: 20%;"><h2>Jel</h2></th>
                                      <th class="text-center" style="width: 35%;"><h2>Definíció</h2></th>
                                      <th class="text-center" style="width: 25%;"><h2>Mértékegység</h2></th>
                                  </tr>
                              </thead>
                              <tbody style="max-width: 100%;">
                                  <tr v-for="table in alkat.Tables" :key="table.id">
                                    <td class="text-center" style="width: 20%;" v-mathjax="table.nev"></td>
                                    <td class="text-center" style="width: 20%;" v-mathjax="table.jel"></td>
                                    <td class="text-center" style="width: 35%;" v-mathjax="table.def"></td>
                                    <td class="text-center" style="width: 25%;" v-mathjax="table.mer"></td>
                                  </tr>
                              </tbody>
                          </v-table>
                      </v-container>
                  </transition-group>
              </v-tabs-window-item>
          </v-tabs-window>
      </v-card-text>
  </v-card>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router';
import { ref, computed, inject, onMounted, watch, nextTick  } from 'vue';
import { useDisplay, useTheme } from 'vuetify';
import { useGetAllTables } from '@/api/tables/tablesQuery';
import { useColorStore } from '../stores/bottomNav';

const showError = inject("showError");
const showSucces = inject("showSucces");

const { mobile } = useDisplay();
const isMobile = computed(() => mobile.value);
const router = useRouter();

const colorStore = useColorStore();
colorStore.value = 3;

const AllTables = ref(null);
const tab = ref(1)

const {mutate: getAllTables} = useGetAllTables();

const latexExpression = ref("$\E = mc^2$");

onMounted(async () => {
  await getAllTables(undefined, {
    onSuccess: (response) => {
      AllTables.value = response;
    }
  });
  if (window.MathJax) {
    window.MathJax.typesetPromise();
  }
});

const mathjaxDirective = {
  mounted(el, binding) {
    el.innerHTML = binding.value || "";
    nextTick(() => {
      if (window.MathJax) {
        window.MathJax.typesetPromise([el]).catch((err) =>
          console.error("MathJax error:", err)
        );
      }
    });
  },
  updated(el, binding) {
    el.innerHTML = binding.value || "";
    nextTick(() => {
      if (window.MathJax) {
        window.MathJax.typesetPromise([el]).catch((err) =>
          console.error("MathJax error:", err)
        );
      }
    });
  }
};
function getCookie(name){
  const cookies = document.cookie.split('; ');
  for (const cookie of cookies) {
    const [key, value] = cookie.split('=');
    if (key === name) {
      return decodeURIComponent(value);
    }
  }
  return null;
}

function deleteCookie(name) {
  document.cookie += `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  theme.global.name.value = 'lightTheme';
  router.push('login')
}
</script>

<style>
.table-fixed {
    table-layout: fixed;
    width: 100%;
    overflow: hidden;
}

.v-table__wrapper::-webkit-scrollbar, .adminNotif::-webkit-scrollbar {
  width: 4px; /* Görgetősáv szélessége */
  height: 7px;
}

.v-table__wrapper::-webkit-scrollbar-track, .adminNotif::-webkit-scrollbar-track {
  background: transparent !important; /* Háttérszín */
  border-radius: 10px !important;
}

.v-table__wrapper::-webkit-scrollbar-thumb, .adminNotif::-webkit-scrollbar-thumb {
  background: rgb(var(--v-theme-settings_drawer_bc)) !important; /* Görgetősáv színe */
  border-radius: 10px !important;
}

.v-table__wrapper::-webkit-scrollbar-thumb:hover ,  .adminNotif::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.7) !important;
}
</style>