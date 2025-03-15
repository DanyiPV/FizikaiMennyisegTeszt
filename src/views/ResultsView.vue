<template>
    <v-container style="background-color: rgb(var(--v-theme-primary));" class="rounded mt-2 pa-0" :class="{ 'pt-1': (get_fullUser && (get_fullUser.admin && (get_fullUser.user_role == 'admin' && get_fullUser.osztaly == 'A') || (!get_fullUser.admin && get_fullUser.user_role == 'teacher' && get_fullUser.osztaly == 'T'))) }">
        <v-row v-if="get_fullUser && (get_fullUser.admin && (get_fullUser.user_role == 'admin' && get_fullUser.osztaly == 'A') || (!get_fullUser.admin && get_fullUser.user_role == 'teacher' && get_fullUser.osztaly == 'T'))" 
        class="my-2 mx-3 py-3 px-4 d-flex rounded justify-space-around"
        style="background-color: rgb(var(--v-theme-result_div_bc));">
            <v-col cols="12" md="5">
                <v-text-field
                    v-model="searchQuery"
                    label="Keresés"
                    clearable
                    hide-details
                    icon="mdi-magnify"
                    variant="outlined"
                >
                </v-text-field>
            </v-col>
            <v-col cols="12" md="4">
                <v-combobox
                v-if="comboOsztalyok && comboOsztalyok.length > 0"
                v-model="selectedClass"
                label="Osztály"
                :items="comboOsztalyok"
                variant="outlined"
                hide-details
                clearable
                ></v-combobox>
            </v-col>
            <v-col cols="12" md="2" class="d-flex justify-center align-center">
                <div class="d-flex ga-1 align-center">
                    <v-btn elevation="0" @click="lastExams = true" style="width: 48%;" :style="{backgroundColor: lastExams ? 'gray' : 'transparent'}"><h3>legutobbi</h3></v-btn>
                    <v-divider vertical class="mx-1"></v-divider>
                    <v-btn elevation="0" @click="lastExams = false" style="width: 48%;" :style="{backgroundColor: !lastExams ? 'gray' : 'transparent'}"><h3>összes</h3></v-btn>
                </div>
            </v-col>
        </v-row>

        <div v-if="gyakArray.length == 0 && dogArray.length == 0" class="d-flex justify-center py-4">
            <h1>Még egy eredményed sincs!</h1>
        </div>
        <div v-else>
            <v-card>
                <v-tabs
                v-model="ResultTabs"
                bg-color="primary"
                >
                <v-tab value="Gyak" style="width: 50%;">Gyakorlás</v-tab>
                <v-tab value="Dog" style="width: 50%;">Dolgozat</v-tab>
                </v-tabs>

                <v-card-text>
                <v-tabs-window v-model="ResultTabs">
                    <v-tabs-window-item value="Gyak">
                        <div v-if="dogArray.length > 0 && gyakArray.length == 0">
                            <h2>Még nincs egy eredményed se a gyaklorlatokról!</h2>
                        </div>
                        <v-table v-else class="table-fixed rounded" style="background-color: rgb(var(--v-theme-primary));">
                            <thead>
                                <tr>
                                    <th class="text-center" style="width: 40%;"><h2>Befejezve</h2></th>
                                    <th class="text-center" style="width: 10%;"><h2>Százalék</h2></th>
                                    <th class="text-center" style="width: 30%;"><h2>Láthatatlan jegy</h2></th>
                                    <th class="text-center" style="width: 15%;"><h2>Továbbiak</h2></th>
                                </tr>
                            </thead>
                            <tbody style="max-width: 100%;">
                                <tr v-for="result in gyakArray">
                                    <td class="text-center" style="width: 40%;"><h2>{{ displayDatum(result.datum) }}</h2></td>
                                    <td class="text-center" style="width: 10%;"><h2 style="font-family: 'Orbitron', sans-serif;">{{ Math.floor(result.Epont / result.Mpont * 100) }}%</h2></td>
                                    <td class="text-center" style="width: 30%;"><h2 style="font-family: 'Orbitron', sans-serif;">{{ showGrade(Math.floor(result.Epont / result.Mpont * 100)) }}</h2></td>
                                    <td class="text-center" style="width: 15%;">
                                        <v-btn
                                            elevation="0"
                                            @click="dialogOpen(result)"
                                        >
                                            Megtekintés
                                        </v-btn>
                                    </td>
                                </tr>
                            </tbody>
                        </v-table>
                    </v-tabs-window-item>
                    <v-tabs-window-item value="Dog">
                        <div v-if="dogArray.length == 0 && gyakArray.length > 0">
                            <h2>Még nincs egy eredményed se a dolgozatokról!</h2>
                        </div>
                        <v-table v-else class="table-fixed rounded" style="background-color: rgb(var(--v-theme-primary));">
                            <thead>
                                <tr>
                                    <th class="text-center" style="width: 40%;"><h2>Befejezve</h2></th>
                                    <th class="text-center" style="width: 10%;"><h2>Százalék</h2></th>
                                    <th class="text-center" style="width: 30%;"><h2>Jegy</h2></th>
                                    <th class="text-center" style="width: 15%;"><h2>Továbbiak</h2></th>
                                </tr>
                            </thead>
                            <tbody style="max-width: 100%;">
                                    <tr v-for="result in dogArray">
                                    <td class="text-center" style="width: 40%;"><h2>{{ displayDatum(result.datum) }}</h2></td>
                                    <td class="text-center" style="width: 10%;"><h2 style="font-family: 'Orbitron', sans-serif;">{{ Math.floor(result.Epont / result.Mpont * 100) }}%</h2></td>
                                    <td class="text-center" style="width: 30%;"><h2 style="font-family: 'Orbitron', sans-serif;">{{ showGrade(Math.floor(result.Epont / result.Mpont * 100)) }}</h2></td>
                                    <td class="text-center" style="width: 15%;">
                                        <v-btn
                                            elevation="0"
                                            @click="dialogOpen(result)"
                                        >
                                            Megtekintés
                                        </v-btn>
                                    </td>
                                </tr>
                            </tbody>
                        </v-table>
                    </v-tabs-window-item>
                </v-tabs-window>
                </v-card-text>
            </v-card>
        </div>
    </v-container>

    <v-dialog max-width="800" v-model="dialogShow">
        <v-card>
            <v-card-title>
                Gyakorlás eredményének megtekintése
            </v-card-title>

            <v-card-text>
                <div class="d-flex pl-2 align-center">
                    <h3 style="font-weight: normal; width: 12em;" class="text-center">Összes / elért pont szám</h3>
                    <v-divider vertical class="mx-2"></v-divider>
                    <h3 style="font-weight: normal;">{{ dialog_Points }} - {{ dialog_Percente }}</h3>
                </div>
        
                <v-divider class="my-2"></v-divider>

                <div class="d-flex pl-2 align-center">
                    <h3 style="font-weight: normal; width: 12em;" class="text-center">Nehézség</h3>
                    <v-divider vertical class="mx-2"></v-divider>
                    <h3 style="font-weight: normal;">{{ dialog_Diff }}</h3>
                </div>
        
                <v-divider class="my-2"></v-divider>
        
                <div class="d-flex pl-2">
                    <h3 style="font-weight: normal; width: 12em;" class="text-center">Eltelt idő</h3>
                    <v-divider vertical class="mx-2"></v-divider>
                    <h3 style="font-weight: normal;">{{ dialog_Time }}</h3>
                </div>
        
                <v-divider class="my-2"></v-divider>
        
                <div class="d-flex pl-2 align-center">
                    <h3 style="font-weight: normal; width: 12em;" class="text-center">Táblák</h3>
                    <v-divider vertical class="mx-2"></v-divider>
                    <h3 style="font-weight: normal;">{{ dialog_Tablak }}</h3>
                </div>
        
                <v-divider class="my-2"></v-divider>
        
                <div class="d-flex pl-2 align-center">
                    <h3 style="font-weight: normal; width: 12em;" class="text-center">Láthatlan jegy:</h3>
                    <v-divider vertical class="mx-2"></v-divider>
                    <h3 style="font-weight: normal;">{{ dialog_Grade }}</h3>
                </div>

                <v-divider class="mt-2"></v-divider>
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn
                text="Bezárás"
                @click="dialogShow = false"
                ></v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router';
import { ref, computed, inject, onMounted, watch, onBeforeUnmount } from 'vue';
import { useDisplay, useTheme } from 'vuetify';
import { useColorStore } from '../stores/bottomNav';
import { useGetResults, useGetOsztalyok } from '@/api/tables/tablesQuery';
import { useGetProfil } from '@/api/profile/profileQuery';

const showError = inject("showError");
const showSucces = inject("showSucces");

const { mobile } = useDisplay();
const isMobile = computed(() => mobile.value);
const router = useRouter();

const get_token = getCookie("user");
const get_fullUser = ref(null);

const colorStore = useColorStore();
colorStore.value = 4;

const gyakArray = ref([]);
const dogArray = ref([]);
const ResultTabs = ref('Gyak');
const dialogShow = ref(false);
const dialog_Points = ref(null);
const dialog_Diff = ref(null);
const dialog_Time = ref(null);
const dialog_Tablak = ref(null);
const dialog_Grade = ref(null);
const dialog_Percente = ref(null);
const searchQuery = ref('');
const selectedClass = ref(null);
const comboOsztalyok = ref(null);
const lastExams = ref(true);

function dialogOpen(result){
    dialogShow.value = true;
    dialog_Points.value = result.Epont +" / "+ result.Mpont;
    dialog_Diff.value = result.dif == 1 ? 'Könnyű' : (result.dif == 2 ? 'Normál' : 'Nehéz');
    if(result.Eido == null){
        dialog_Time.value = "Nem volt beállítva idő!"
    }else{
        let time = result.Tido - result.Eido;
        dialog_Time.value = Math.floor(time/60) + ":" + (time%60 < 10 ? '0'+time%60 : time%60)
    }
    dialog_Tablak.value = result.tablak;
    dialog_Grade.value = showGrade(Math.floor(result.Epont / result.Mpont * 100))
    dialog_Percente.value = Math.floor(result.Epont / result.Mpont * 100) +"%";
}

function displayDatum(datum){
    return datum.split('T')[0] + " " + datum.split('T')[1].split('.')[0]
}

function showGrade(grade){
  var return_grade;
  if(grade >= 85){
    return_grade = '5'
  }else if(grade < 85 && grade >= 70){
    return_grade = '4'
  }else if(grade < 70 && grade >= 50){
    return_grade = '3'
  }
  else if(grade < 50 && grade >= 25){
    return_grade = '2'
  }
  else{
    return_grade = '1'
  }

  return return_grade;
}

const {mutate: getResults} = useGetResults();
const {mutate: getProfil} = useGetProfil();
const {mutate: getOsztalyok} = useGetOsztalyok();

onMounted(async () => {
  await getResults(get_token, {
    onSuccess: (response) => {
        gyakArray.value = response.filter(c=> c.exam_id == null);
        dogArray.value = response.filter(c=> c.exam_id != null);
    },
    onError: (error) => {
    if (showError) {
        showError(error.response.data);
    }else{
        console.log(error.response.data);
    }},
  });

  if(get_token){
    await getProfil(get_token, {
      onSuccess: async (load_user) => {
        get_fullUser.value = load_user;

        if((get_fullUser.value.admin && get_fullUser.value.user_role == 'admin' && get_fullUser.value.osztaly == 'A') || (!get_fullUser.value.admin && get_fullUser.value.user_role == 'teacher' && get_fullUser.value.osztaly == 'T')){
            await getOsztalyok(get_token, {
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
      onError: (error) => {
        if (showError) {
          showError(error.response.data);
        }else{
          console.log(error.response.data);
        }

        deleteCookie('user');
        router.push({name : 'login'})
      },
    });
  }
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