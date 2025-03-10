<template>
    <v-container style="border: .1vw solid white;">
        <v-row class="ga-5 mt-1">
            <v-select
            v-model="TkatSelect"
            clearable
            chips
            label="Select"
            :items="TkatItems"
            multiple
            variant="outlined"
            style="max-width: 50%;"
            ></v-select>
    
            <v-select
            v-model="AlkatSelect"
            :disabled="!TkatSelect"
            clearable
            chips
            label="Select"
            :items="AlkatItems"
            multiple
            variant="outlined"
            style="max-width: 50%;"
            ></v-select>
        </v-row>
    </v-container>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router';
import { ref, computed, inject, onMounted, watch } from 'vue';
import { useDisplay, useTheme } from 'vuetify';
import { useColorStore } from '../stores/bottomNav';
import { useGetCategories, useGetSubcategories } from '@/api/tables/tablesQuery';

const showError = inject("showError");
const showSucces = inject("showSucces");

const { mobile } = useDisplay();
const isMobile = computed(() => mobile.value);
const router = useRouter();

const get_token = getCookie("user");
const get_fullUser = ref(null);

const colorStore = useColorStore();
colorStore.value = 1;

const TkatSelect = ref(null);
const AlkatSelect = ref(null);
const TkatItems = ref([]);
const TkatArray = ref([]);
const AlkatItems = ref([]);
const AlkatArray = ref([]);

const {mutate: getCategories} = useGetCategories();

onMounted(async () => {
  await getCategories(undefined, {
    onSuccess: (response) => {
      TkatItems.value = response.map(c=> c.nev);
      TkatArray.value = response;
    },
    onError: (error) => {
    if (showError) {
        showError(error.response.data);
    }else{
        console.log(error.response.data);
    }},
  });
});

const {mutate: getSubcategories} = useGetSubcategories();

watch(TkatSelect, async (newValue)=>{
  const idLista = newValue
  .map(obj => TkatArray.value.filter(c => c.nev === obj).map(c => c.id))
  .flat().sort();
  await getSubcategories(idLista, {
    onSuccess: (response) => {
      AlkatItems.value = response.flat().map(c=> c.nev);
      AlkatArray.value = response.flat();
      console.log(AlkatItems)
    },
    onError: (error) => {
    if (showError) {
        showError(error.response.data);
    }else{
        console.log(error.response.data);
    }},
  }); 
});

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