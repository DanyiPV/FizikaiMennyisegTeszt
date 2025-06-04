<template>
<v-slide-y-transition mode="in-out" hide-on-leave>
    <v-container style="background-color: rgb(var(--v-theme-primary));" class="mt-2 rounded-lg">
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

      <v-row class="ga-5 align-center justify-space-around ma-auto" style="width: 90%;">
        <v-col cols="12" md="5" class="d-flex justify-center">
          <div class="d-flex ga-2 rounded-pill pa-2 px-6" style="background-color: rgb(var(--v-theme-background)); width: max-content;">
            <div>
              <v-text-field 
              variant="outlined" 
              v-model="minuteTimer" 
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
              hide-details
              min="0"
              max="60"
              type="number"
              style="text-align: center;">
              </v-text-field>
            </div>
          </div>
        </v-col>

        <v-col cols="12" md="5">
          <v-select
          v-model="diffSelect"
          label="Nehézség"
          :items="['Könnyű','Normál','Nehéz']"
          variant="outlined"
          hide-details
          ></v-select>
        </v-col>
      </v-row>

      <v-row justify="space-around" style="width: 90%;" class="ma-auto mt-2">
        <v-col
        cols="12"
        sm="6"
        class="d-flex justify-center"
        >
          <v-date-picker
          color="date_picker"
          :min="new Date().toISOString().substr(0, 10)"
          v-model="selectedDate"
          title="Időpont kiválasztás"
          show-week
          first-day-of-week="1"
          :allowed-dates="allowedDates"
          header="Dátum választás"
          ></v-date-picker>
        </v-col>

        <v-col
        cols="12"
        sm="6"
        class="d-flex flex-column align-center"
        >
          <div style="width: 100%;" class="mb-2">
            <v-text-field
            v-model="time"
            :active="modal"
            :focused="modal"
            label="Dolgozat kezdete"
            prepend-icon="mdi-clock-time-four-outline"
            variant="outlined"
            readonly
            hide-details
            >
              <v-dialog
              v-model="modal"
              activator="parent"
              width="auto"
              >
                <v-time-picker
                v-if="modal"
                v-model="time"
                theme="dark"
                format="24hr"
                title="Dolgozat kezdetének ideje"
                ></v-time-picker>
              </v-dialog>
            </v-text-field>
          </div>
          <div style="width: 100%;" class="my-2">
            <v-combobox
            v-if="comboOsztalyok && comboOsztalyok.length > 0"
            v-model="selectedClass"
            label="Osztály"
            :items="comboOsztalyok"
            variant="outlined"
            hide-details
            :filter="() => false"
            ></v-combobox>
            <div v-if="comboOsztalyok && comboOsztalyok.length == 0">
              <h2>Nincs még egy osztály se!</h2>
            </div>
          </div>
          <div style="width: 100%;" class="my-2">
            <v-text-field
            v-model="message"
            label="Dolgozat neve"
            variant="outlined"
            clearable
            ></v-text-field>
            <div v-if="comboOsztalyok && comboOsztalyok.length == 0">
              <h2>Nincs még egy osztály se!</h2>
            </div>
          </div>
          <div style="width: max-content;" class="d-flex flex-column mt-3">
            <div class="ma-auto">
                <v-btn
                icon
                elevation="0"
                style="width: max-content; height: max-content;"
                :disabled="!AlkatSelect || AlkatSelect.length == 0 || !time || !selectedDate || !selectedClass || !message"
                class="pa-2"
                @click="ExamPublish()"
                >
                  <v-icon size="40">mdi-pencil</v-icon>
                </v-btn>
            </div>
            <h2 
            @click="ExamPublish()"
            style="font-weight: normal;" 
            class="cursor-pointer" :style="{color: !AlkatSelect || AlkatSelect.length == 0 || !time || !selectedDate || !selectedClass || !message ? 'grey' : 'rgb(var(--v-theme-text_color))'}">Dolgozat kiírás</h2>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-slide-y-transition>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router';
import { ref, computed, inject, onMounted, watch, onBeforeUnmount } from 'vue';
import { useDisplay, useTheme } from 'vuetify';
import { useGetCategories, useGetSubcategories, useGetOsztalyok, useSetNewExam } from '@/api/tables/tablesQuery';
import { useGetProfil, useClearCookie } from '@/api/profile/profileQuery';
import socket from '../socket';

const showError = inject("showError");
const showSucces = inject("showSucces");

const { mobile } = useDisplay();
const isMobile = computed(() => mobile.value);
const router = useRouter();

const get_fullUser = ref(null);

const TkatSelect = ref(null);
const AlkatSelect = ref(null);
const TkatItems = ref([]);
const TkatArray = ref([]);
const AlkatItems = ref([]);
const AlkatArray = ref([]);
const sliderMax = ref(null)
const sliderValue = ref(5);
const minuteTimer = ref(45);
const secondTimer = ref(0);
const diffSelect = ref('Könnyű');
const selectedDate = ref(null);
const time =  ref(null);
const modal = ref(false);
const comboOsztalyok = ref(null);
const selectedClass = ref(null);
const message = ref(null);

const allowedDates = (date) => {
  const day = new Date(date).getDay();
  return day >= 1 && day <= 5;
};

function formattedDateTime() {
  if (!selectedDate.value || !time.value) return '';

  const year = selectedDate.value.getFullYear();
  const month = String(selectedDate.value.getMonth() + 1).padStart(2, '0');
  const day = String(selectedDate.value.getDate()).padStart(2, '0');

  return `${year}-${month}-${day} ${time.value}`;
}

const {mutate: setNewExam} = useSetNewExam();

const ExamPublish = async () =>{
  const idLista = TkatSelect.value.map(obj => TkatArray.value.filter(c => c.nev === obj).map(c => c.id)).flat().sort();
  await setNewExam({tableidList: idLista, message: message.value, sorok: sliderValue.value, time: (minuteTimer.value * 60 + secondTimer.value), diff: (diffSelect.value == 'Könnyű' ? 1 : (diffSelect.value == 'Normál' ? 2 : 3)), osztaly: selectedClass.value, kezdet: formattedDateTime()},{
    onSuccess: (response) =>{
      if (showSucces) {
        showSucces("Sikerült a dolgozat feltöltése!");
        socket.emit("send_notification", {
          room: selectedClass.value,
          message: "Új dolgozat lett kiírva!",
          id: response,
          type: 0
        });
      }else{
        console.log("Sikerült a dolgozat feltöltése!");
      }
    },
    onError: () =>{
      if (showError) {
        showError(error.response.data);
      }else{
        console.log(error.response.data);
      }
    }
  })
}

const {mutate: getCategories} = useGetCategories();
const {mutate: getProfil} = useGetProfil();
const {mutate: getOsztalyok} = useGetOsztalyok();
const {mutate: clearCookie} = useClearCookie();

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

  await getProfil(undefined,{
    onSuccess: async (load_user) => {
      get_fullUser.value = load_user;

      if((get_fullUser.value.admin && get_fullUser.value.user_role == 'admin' && get_fullUser.value.osztaly == 'A') || (!get_fullUser.value.admin && get_fullUser.value.user_role == 'teacher' && get_fullUser.value.osztaly == 'T')){
          await getOsztalyok(undefined,{
              onSuccess: (response) => {
                comboOsztalyok.value = response.map(c => c.osztaly);
              },
              onError: (error) => {
              if (showError) {
                  showError(error.response.data);
              }else{
                  console.log(error.response.data);
              }},
          });
      }
    },
    onError: async (error) => {
      if (showError) {
        showError(error.response.data);
      }else{
        console.log(error.response.data);
      }

      userStore.unreadNotifs = 0;
      await getUnReadNotification(userStore.className,{
        onSuccess: (response) =>{
          userStore.unreadNotifs = response;
        }
      });
      await clearCookie(undefined,{
        onSuccess: () =>{
          theme.global.name.value = 'lightTheme';
          router.push({name: 'login'})
        }
      })
    },
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
  if(AlkatSelect.value != null){
    sliderMax.value = newValue
    .map(obj => AlkatArray.value.filter(c => c.nev === obj).map(c => c.tablesCount))
    .flat().reduce((acc, num) => acc + num, 0);
  }
})

const {mutate: getSubcategories} = useGetSubcategories();

watch(TkatSelect, async (newValue)=>{
  if(newValue != null){
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
  }
});
</script>