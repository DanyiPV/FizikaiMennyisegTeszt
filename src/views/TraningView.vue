<template>
    <v-container style="background-color: rgb(var(--v-theme-primary));" class="mt-1 rounded-lg" >
      <v-row>
        <v-col cols="12" md="6">
          <v-select
            v-model="TkatSelect"
            clearable
            chips
            label="Kategóriák"
            :items="TkatItems"
            multiple
            variant="outlined"
          ></v-select>
        </v-col>

        <v-col cols="12" md="6">
          <v-select
            v-model="AlkatSelect"
            :disabled="AlkatItems.length == 0"
            clearable
            chips
            label="Táblák"
            :items="AlkatItems"
            multiple
            variant="outlined"
            class="selectScroll"
          ></v-select>
        </v-col>
      </v-row>
      <v-row class="ga-2">
        <v-slider
        :disabled="!AlkatSelect || AlkatSelect.length == 0"
        v-model="sliderValue"
        step="1"
        :max="sliderMax"
        min="5"
        show-ticks
        class="px-6"
        label="Sorok"
        color="text_color"
        ></v-slider>
        <div style="width: 7em;" class="mr-3">
          <v-text-field 
            variant="outlined" 
            v-model="sliderValue" 
            :disabled="!AlkatSelect || AlkatSelect.length == 0"
            type="number"
            style="text-align: center;">
          </v-text-field>
        </div>
      </v-row>

      <v-row class="ga-5 align-center justify-space-around">
        <v-col cols="5" md="3" class="d-flex justify-center">
          <div class="d-flex ga-2 rounded-pill pa-2 px-6" style="background-color: rgb(var(--v-theme-background)); width: max-content;">
            <div>
              <v-text-field 
                variant="outlined" 
                v-model="minuteTimer" 
                :disabled="!timerSwitch"
                hide-details
                min="0"
                max="60"
                type="number"
                style="text-align: center;">
              </v-text-field>
            </div>
            <div>
              <v-text-field 
                variant="outlined" 
                v-model="secondTimer" 
                :disabled="!timerSwitch"
                hide-details
                min="0"
                max="60"
                type="number"
                style="text-align: center;">
              </v-text-field>
            </div>
            <div>
              <v-switch
                v-model="timerSwitch"
                hide-details
                inset
              ></v-switch>
            </div>
          </div>
        </v-col>
        <v-col cols="5" md="3">
          <v-select
            v-model="diffSelect"
            label="Nehézség"
            :items="['Könnyű','Normál','Közepes']"
            variant="outlined"
            hide-details
          ></v-select>
        </v-col>
        <v-col cols="5" md="3" class="d-flex justify-center">
          <div style="width: max-content;" @click="StartTraning()">
            <v-btn
            icon
            elevation="0"
            style="width: max-content; height: max-content;"
            :disabled="!AlkatSelect || AlkatSelect.length == 0"
            >
              <v-icon size="60">mdi-play-circle</v-icon>
            </v-btn>
            <h2 style="font-weight: normal;" class="cursor-pointer" :style="{color: !AlkatSelect || AlkatSelect.length == 0 ? 'grey' : 'rgb(var(--v-theme-text_color))'}">Indítás</h2>
          </div>
        </v-col>
      </v-row>

    </v-container>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router';
import { ref, computed, inject, onMounted, watch } from 'vue';
import { useDisplay, useTheme } from 'vuetify';
import { useColorStore } from '../stores/bottomNav';
import { useGetCategories, useGetSubcategories, useGetTraningTables } from '@/api/tables/tablesQuery';

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
const sliderMax = ref(null)
const sliderValue = ref(5);
const minuteTimer = ref(2);
const secondTimer = ref(30);
const timerSwitch = ref(false);
const diffSelect = ref('Könnyű');

const {mutate: getTraningTables} = useGetTraningTables();

const StartTraning = async () =>{
  const idLista = AlkatSelect.value.map(obj => AlkatArray.value.filter(c => c.nev === obj).map(c => c.id)).flat().sort();
  await getTraningTables({alkatIds: idLista, sorok: sliderValue.value, diff: (diffSelect == 'Könnyű' ? 1 : (diffSelect == 'Normál' ? 2 : 3))}, {
    onSuccess: (response) => {
      console.log(response);
    },
    onError: (error) => {
    if (showError) {
        showError(error.response.data);
    }else{
        console.log(error.response.data);
    }},
  });
}

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

watch(sliderValue, async (newValue)=>{
  if(newValue < 5){
    sliderValue.value = 5;
  }

  if(newValue > sliderMax.value){
    sliderValue.value = sliderMax.value;
  }
})

watch(AlkatSelect, async (newValue)=>{
  sliderMax.value = newValue
  .map(obj => AlkatArray.value.filter(c => c.nev === obj).map(c => c.tablesCount))
  .flat().reduce((acc, num) => acc + num, 0);
})

const {mutate: getSubcategories} = useGetSubcategories();

watch(TkatSelect, async (newValue)=>{
  const idLista = newValue.map(obj => TkatArray.value.filter(c => c.nev === obj).map(c => c.id)).flat().sort();
  await getSubcategories(idLista, {
    onSuccess: (response) => {
      AlkatItems.value = response.flat().map(c=> c.nev);
      AlkatArray.value = response.flat();
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

<style>
.v-overlay-container::-webkit-scrollbar, .adminNotif::-webkit-scrollbar {
  width: 4px; /* Görgetősáv szélessége */
  height: 7px;
}

.v-overlay-container::-webkit-scrollbar-track, .adminNotif::-webkit-scrollbar-track {
  background: transparent !important; /* Háttérszín */
  border-radius: 10px !important;
}

.v-overlay-container::-webkit-scrollbar-thumb, .adminNotif::-webkit-scrollbar-thumb {
  background: rgb(var(--v-theme-settings_drawer_bc)) !important; /* Görgetősáv színe */
  border-radius: 10px !important;
}

.v-overlay-container::-webkit-scrollbar-thumb:hover ,  .adminNotif::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.7) !important;
}
</style>