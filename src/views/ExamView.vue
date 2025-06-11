<template>
    <v-slide-y-transition mode="in-out" hide-on-leave>
        <v-container v-if="!examStarted">
            <v-card>
                <v-card-title>
                    <h1>Dolgozatok</h1>
                </v-card-title>

                <v-card-text>
                    <v-expansion-panels  v-if="Exams.length > 0">
                        <v-expansion-panel v-for="exam in Exams" elevation="0" color="background">
                            <v-expansion-panel-title>
                                <v-row class="align-center" no-gutters>
                                    <v-col cols="12" md="1" class="text-center mr-4" :class="{'mt-2' : isMobile}">
                                        <h3 class="font-weight-regular">{{ exam.nev }}</h3>
                                    </v-col>

                                    <v-col cols="12" md="2" class="text-center":class="{'mt-2' : isMobile}">
                                        <h3 class="font-weight-regular">Kezdés - {{ exam.kezdet }}</h3>
                                    </v-col>

                                    <v-col cols="12" md="2" class="text-center" :class="{'mt-2' : isMobile}">
                                        <h3 class="font-weight-regular">Vége - {{ endFormat(exam) }}</h3>
                                    </v-col>
                                    <v-col cols="12" md="6"
                                    :class="{'text-center mt-3' : isMobile, 'text-right ml-15': !isMobile}"
                                    v-if="(exam.Results.length == 0 && isExamActive(exam) && !isExamClosed(exam)) || ExamNotYetActive(exam)"
                                    >
                                        <v-btn 
                                        class="ma-0"
                                        elevation="1"
                                        style="background-color: rgb(var(--v-theme-primary));" 
                                        @click.stop
                                        @click="examStart(exam)"
                                        :disabled="!isExamActive(exam)"
                                        >
                                          Dolgozat megkezdése
                                        </v-btn>
                                    </v-col>
                                    <v-col cols="12" md="6"
                                    :class="{'ml-15': !isMobile, 'mt-3': isMobile}"
                                    v-else-if="exam.Results.length == 0 && isExamClosed(exam)"
                                    >
                                        <div 
                                        class="d-flex"
                                        :class="{'justify-center' : isMobile, 'justify-end' : !isMobile, }"
                                        >
                                            <div style="background-color: rgb(var(--v-theme-error), .7); width: max-content;"
                                            class="pa-3 rounded">
                                              Dolgozat lezárult
                                            </div>
                                        </div>
                                    </v-col>
                                    <v-col cols="12" md="6"
                                    :class="{'ml-15': !isMobile, 'mt-3': isMobile}"
                                    v-else
                                    >
                                        <div 
                                        class="d-flex"
                                        :class="{'justify-center' : isMobile, 'justify-end' : !isMobile, }"
                                        >
                                            <div style="background-color: rgb(var(--v-theme-success), .7); width: max-content;"
                                            class="pa-3 rounded">
                                              Dolgozat leadva
                                            </div>
                                        </div>
                                    </v-col>
                                </v-row>
                            </v-expansion-panel-title>

                            <v-expansion-panel-text style="position: relative; background-color: rgb(var(--v-theme-background));">
                                <div class="pl-1 d-flex ga-1 align-center">
                                    <h3 style="font-weight: 700;">Táblák:</h3>
                                    <h3 style="font-weight: normal;">{{ exam.alkats.map(c=>c.nev).join(', ') }}</h3>
                                </div>

                                <v-divider class="my-1"></v-divider>

                                <div class="pl-1 d-flex ga-1 align-center">
                                    <h3 style="font-weight: 700;">Idő tartam:</h3>
                                    <h3 style="font-weight: normal;">{{ (Number(exam.ido)/60 < 10 ? '0'+Math.floor(Number(exam.ido)/60): Math.floor(Number(exam.ido)/60)) + ':' +(Number(exam.ido)%60 < 10 ? '0'+ Number(exam.ido)%60 : Number(exam.ido)%60) }}</h3>
                                </div>

                                <v-divider class="my-1"></v-divider>

                                <div class="pl-1 d-flex ga-1 align-center">
                                    <h3 style="font-weight: 700;">Nehézség:</h3>
                                    <h3 style="font-weight: normal;">{{ exam.dif == 1 ? 'Könnyű' : (exam.dif == 2 ? 'Normál' : 'Nehéz') }}</h3>
                                </div>
                            </v-expansion-panel-text>

                        </v-expansion-panel>
                    </v-expansion-panels>

                    <h2 v-else class="d-flex justify-center">
                        A felhasználónak még egy dolgozat se lett kiírva!
                    </h2>
                </v-card-text>
            </v-card>
        </v-container>
    </v-slide-y-transition>

    <v-slide-y-transition mode="in-out">
        <v-container fluid v-if="MaradekAdatok && !examEnd" class="position-relative">
            <div class="d-flex justify-center">
                <h2 style="background-color: rgb(var(--v-theme-primary));" class="px-6 py-1 mb-2 rounded-pill">Dolgozat</h2>
            </div>

            <div v-if="timerShow" class="position-absolute text-center px-4 py-1 d-flex ga-1 rounded-pill justify-center" style="right: 1.3rem; width: 6.5rem; background-color: rgb(var(--v-theme-primary)); font-family: 'Orbitron', sans-serif; top: 1.5rem;">
              <div class="d-flex">
                <h3 style="font-weight: normal;">{{ minuteTimer }}</h3>
                <h3 style="font-weight: normal;">:</h3>
                <h3 style="font-weight: normal;">{{ secondTimer < 10 ? '0' + secondTimer : secondTimer }}</h3>
              </div>
            </div>

            <div class="position-absolute text-center rounded-pill" style="left: 1.3em; background-color: rgb(var(--v-theme-primary)); top: 1.5rem;">
                <v-btn 
                elevation="0" 
                class="px-3 py-1 rounded-pill"
                style="font-size: .8em;"
                @click="Befejezes()"
                >Leadás</v-btn>
            </div>

            <v-table class="table-fixed rounded" style="background-color: rgb(var(--v-theme-primary));">
                <thead>
                    <tr>
                        <th class="text-center" style="width: 20%;"><h2>Név</h2></th>
                        <th class="text-center" style="width: 20%;"><h2>Jel</h2></th>
                        <th class="text-center" style="width: 35%;"><h2>Definíció</h2></th>
                        <th class="text-center" style="width: 25%;"><h2>Mértékegység</h2></th>
                    </tr>
                </thead>
                <tbody style="max-width: 100%;">
                    <tr v-for="table in MaradekAdatok" :key="table.id">
                        <!-- Név oszlop -->
                        <td v-if="typeof table.nev === 'string'" class="text-center pa-1" style="width: 20%; font-size: 1rem;"v-mathjax="table.nev">
                        </td>
                        <td v-else class="text-center droppable" style="width: 20%;" 
                            :data-field="'nev'" 
                            :data-id="table.id"
                            @dragover.prevent="allowDrop" 
                            @drop="handleDrop($event, table, 'nev')"
                            @touchstart="handleTouchStart($event, table.nev, 'nev', table)">
                        <div v-if="table.nev && (typeof table.nev === 'object' ? table.nev.value : table.nev)" 
                            class="draggable" draggable="true"
                            @dragstart="handleDragStart($event, table.nev, 'nev', table)"
                            @touchstart="handleTouchStart($event, table.nev, 'nev', table)">
                            <span v-mathjax="typeof table.nev === 'object' ? table.nev.value : table.nev" style="font-size: 1rem;"></span>
                        </div>
                        <div v-else class="empty-cell">
                            <span class="placeholder">--</span>
                        </div>
                        </td>

                        <!-- Jel oszlop -->
                        <td v-if="typeof table.jel === 'string'" class="text-center pa-1" style="width: 20%; font-size: 1rem;" v-mathjax="table.jel">
                        </td>
                        <td v-else class="text-center droppable" style="width: 20%;" 
                            :data-field="'jel'" 
                            :data-id="table.id"
                            @dragover.prevent="allowDrop" 
                            @drop="handleDrop($event, table, 'jel')"
                            @touchstart="handleTouchStart($event, table.jel, 'jel', table)">
                        <div v-if="table.jel && (typeof table.jel === 'object' ? table.jel.value : table.jel)" 
                            class="draggable" draggable="true"
                            @dragstart="handleDragStart($event, table.jel, 'jel', table)"
                            @touchstart="handleTouchStart($event, table.jel, 'jel', table)">
                            <span v-mathjax="typeof table.jel === 'object' ? table.jel.value : table.jel" style="font-size: 1rem;"></span>
                        </div>
                        <div v-else class="empty-cell">
                            <span class="placeholder">--</span>
                        </div>
                        </td>

                        <!-- Definíció oszlop -->
                        <td v-if="typeof table.def === 'string'" class="text-center pa-1" style="width: 20%; font-size: 1rem;" v-mathjax="table.def">
                        </td>
                        <td v-else class="text-center droppable" style="width: 20%;" 
                            :data-field="'def'" 
                            :data-id="table.id"
                            @dragover.prevent="allowDrop" 
                            @drop="handleDrop($event, table, 'def')"
                            @touchstart="handleTouchStart($event, table.def, 'def', table)">
                        <div v-if="table.def && (typeof table.def === 'object' ? table.def.value : table.def)" 
                            class="draggable" draggable="true"
                            @dragstart="handleDragStart($event, table.def, 'def', table)"
                            @touchstart="handleTouchStart($event, table.def, 'def', table)">
                            <span v-mathjax="typeof table.def === 'object' ? table.def.value : table.def" style="font-size: 1rem;"></span>
                        </div>
                        <div v-else class="empty-cell">
                            <span class="placeholder">--</span>
                        </div>
                        </td>

                        <!-- Mértékegység oszlop -->
                        <td v-if="typeof table.mer === 'string'" class="text-center pa-1" style="width: 20%; font-size: 1rem;" v-mathjax="table.mer">
                        </td>
                        <td v-else class="text-center droppable" style="width: 20%;"
                            :data-field="'mer'" 
                            :data-id="table.id"
                            @dragover.prevent="allowDrop" 
                            @drop="handleDrop($event, table, 'mer')"
                            @touchstart="handleTouchStart($event, table.mer, 'mer', table)">
                        <div v-if="table.mer && (typeof table.mer === 'object' ? table.mer.value : table.mer)" 
                            class="draggable" draggable="true"
                            @dragstart="handleDragStart($event, table.mer, 'mer', table)"
                            @touchstart="handleTouchStart($event, table.mer, 'mer', table)">
                            <span v-mathjax="typeof table.mer === 'object' ? table.mer.value : table.mer" style="font-size: 1rem;"></span>
                        </div>
                        <div v-else class="empty-cell">
                            <span class="placeholder">--</span>
                        </div>
                        </td>
                    </tr>
                </tbody>
            </v-table>
        </v-container>
    </v-slide-y-transition>

  <div v-if="!achivedPoint" style="width: 100%; height: 6rem;">

  </div>

  <!-- Kivett adatok -->
  <div class="position-fixed d-flex flex-column justify-center rounded-lg kivettAdatok"
  style="max-width: 90%; left: 50%; transform: translate(-50%,0%); background-color: rgb(var(--v-theme-background), .5); overflow-x: auto; bottom: 1em;"
  @dragover.prevent="allowDrop" 
  @drop.prevent="allowDrop"
  v-if="KivettAdatok && KivettAdatok.length != 0 && !examEnd">
    <div class="d-inline-flex justify-center my-3"
      style="gap: 0.5em; min-width: max-content; padding-left: 1rem; padding-right: 1rem;">
      <div class="px-2 py-1 rounded cursor-grab"
        style="background-color: rgb(var(--v-theme-kivett_elem_bc));"
        v-for="(item, index) in KivettAdatok" 
        :key="index"
        draggable="true"
        @dragstart="handleDragStart($event, item, 'restore')"
        @touchstart="handleTouchStart($event, item, 'restore')">
        
        <h3 v-if="typeof item === 'string'" v-mathjax="item" style="font-weight: normal; width: max-content;"></h3>
        <h3 v-else v-mathjax="item.value" style="font-weight: normal; width: max-content;"></h3>
      </div>
    </div>
  </div>

  <!-- Ghost elem, amely mobilon követi az ujj mozgását -->
  <div v-if="isDragging" class="drag-ghost" :style="{ top: ghostPosition.y + 'px', left: ghostPosition.x + 'px' }">
    <h2 v-mathjax="ghostContent"></h2>
  </div>

  <v-slide-y-transition mode="in-out">
    <v-container v-if="achivedPoint" style="background-color: rgb(var(--v-theme-primary));" class="rounded-lg pa-2 d-flex justify-center mt-2">
      <div class="d-flex flex-column justify-center" :style="{width: isMobile ? '100%' : '80%'}">
        <div class="d-flex justify-center">
          <h1>Dolgozat leadva!</h1>
        </div>
        <div class="px-4">
          <h2 style="font-weight: normal;" class="pl-1">Eredmények:</h2>

          <v-divider class="mb-2"></v-divider>

          <div class="px-6">
            <div class="d-flex pl-2 align-center">
              <h3 style="font-weight: normal;">Összes / elért pont szám</h3>
              <v-divider vertical class="mx-2"></v-divider>
              <h3 style="font-weight: normal;">{{ fullPoint }} / {{ achivedPoint }} - {{ Math.floor(achivedPoint / fullPoint * 100) }}%</h3>
            </div>
  
            <v-divider class="my-2"></v-divider>

            <div class="d-flex pl-2 align-center">
              <h3 style="font-weight: normal;">Nehézség</h3>
              <v-divider vertical class="mx-2"></v-divider>
              <h3 style="font-weight: normal;">{{ examProperties.dif == 1 ? 'Könnyű' : (examProperties.dif == 2 ? 'Normál' : 'Nehéz')}}</h3>
            </div>
  
            <v-divider class="my-2"></v-divider>
  
            <div class="d-flex pl-2">
              <h3 style="font-weight: normal;">Eltelt idő</h3>
              <v-divider vertical class="mx-2"></v-divider>
              <h3 style="font-weight: normal;">{{ formattedTime }}</h3>
            </div>
  
            <v-divider class="my-2"></v-divider>
  
            <div class="d-flex pl-2 align-center">
              <h3 style="font-weight: normal;">Táblák</h3>
              <v-divider vertical class="mx-2"></v-divider>
              <h3 style="font-weight: normal;">{{ examProperties.alkats.map(c=>c.nev).join(', ')  }}</h3>
            </div>
  
            <v-divider class="my-2"></v-divider>
  
            <div class="d-flex pl-2 align-center">
              <h3 style="font-weight: normal;">Kapott jegy:</h3>
              <v-divider vertical class="mx-2"></v-divider>
              <h3 style="font-weight: normal;">{{ showGrade(Math.floor(achivedPoint / fullPoint * 100)) }}</h3>
            </div>
          </div>

          
          <v-divider class="my-2"></v-divider>

          <v-expansion-panels elevation="2" style="border: .1vw solid rgb(var(--v-theme-text_color),.4);" class="rounded-lg">
            <v-expansion-panel class="ma-1">
                <v-expansion-panel-title class="text-h6">
                    Eredmény áttekintése
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                    <v-table class="table-fixed rounded" style="background-color: rgb(var(--v-theme-primary));">
                        <thead>
                            <tr>
                                <th class="text-center" style="width: 20%;"><h2>Név</h2></th>
                                <th class="text-center" style="width: 20%;"><h2>Jel</h2></th>
                                <th class="text-center" style="width: 35%;"><h2>Definíció</h2></th>
                                <th class="text-center" style="width: 25%;"><h2>Mértékegység</h2></th>
                            </tr>
                        </thead>
                        <tbody style="max-width: 100%;">
                            <tr v-for="table in trainingTable" :key="table[1]">
                                <td v-if="typeof table[0] === 'string'" class="text-center pa-1 ma-1" style="width: 20%; font-size: 1rem;" v-mathjax="table[0]"></td>
                                <td v-else class="text-center pa-1 rounded" style="width: 20%; font-size: 1rem;" v-mathjax="table[0].value" :style="{backgroundColor: table[0].correct ? 'rgb(var(--v-theme-success), .4)' : 'rgb(var(--v-theme-error), .4)' }"></td>

                                <td v-if="typeof table[1] === 'string'" class="text-center pa-1 ma-1" style="width: 20%; font-size: 1rem;" v-mathjax="table[1]"></td>
                                <td v-else class="text-center pa-1 rounded" style="width: 20%; font-size: 1rem;" v-mathjax="table[1].value" :style="{backgroundColor: table[1].correct ? 'rgb(var(--v-theme-success), .4)' : 'rgb(var(--v-theme-error), .4)' }"></td>

                                <td v-if="typeof table[2] === 'string'" class="text-center pa-1 ma-1" style="width: 20%; font-size: 1rem;" v-mathjax="table[2]"></td>
                                <td v-else class="text-center pa-1 rounded" style="width: 20%; font-size: 1rem;" v-mathjax="table[2].value" :style="{backgroundColor: table[2].correct ? 'rgb(var(--v-theme-success), .4)' : 'rgb(var(--v-theme-error), .4)' }"></td>

                                <td v-if="typeof table[3] === 'string'" class="text-center pa-1 ma-1" style="width: 20%; font-size: 1rem;" v-mathjax="table[3]"></td>
                                <td v-else class="text-center pa-1 rounded" style="width: 20%; font-size: 1rem;" v-mathjax="table[3].value" :style="{backgroundColor: table[3].correct ? 'rgb(var(--v-theme-success), .4)' : 'rgb(var(--v-theme-error), .4)' }"></td>
                            </tr>
                        </tbody>
                    </v-table>
                </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
        </div>
        <v-row class="mb-2 mt-6 justify-center">
          <v-col
          cols="12"
          sm="6"
          class="d-flex justify-center"
          >
            <v-btn
            elevation="0"
            @click="router.push({name : 'home'})"
            variant="outlined"
            style="width: 25em;"
            >
              <v-icon class="mr-1" size="25">mdi-home</v-icon>
              <h2>Főoldal</h2>
            </v-btn>
          </v-col>
          
          <v-col
          cols="12"
          sm="6"
          class="d-flex justify-center"
          >
            <v-btn
            elevation="0"
            variant="outlined"
            @click="backToExams()"
            style="width: 25em;"
            >
              <v-icon class="mr-1" size="25">mdi-keyboard-backspace</v-icon>
              <h2>Dolgozatok</h2>
            </v-btn>
          </v-col>
        </v-row >
      </div>
    </v-container>
  </v-slide-y-transition>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router';
import { ref, computed, inject, onMounted, watch, onBeforeUnmount, onUnmounted  } from 'vue';
import { useDisplay, useTheme } from 'vuetify';
import { useGetExams, useGetTraningTables, useGetFinalStats } from '@/api/tables/tablesQuery';
import { useUserStore } from '../stores/userStore';

const userStore = useUserStore();
const showError = inject("showError");
const showSucces = inject("showSucces");

const { mobile } = useDisplay();
const isMobile = computed(() => mobile.value);
const router = useRouter();

const get_fullUser = ref(null);
const examStarted = ref(false);
const examEnd = ref(false);
const KivettAdatok = ref(null);
const MaradekAdatok = ref(null);
var currentTouchDragData = null;
const isDragging = ref(false);
const ghostPosition = ref({ x: 0, y: 0 });
const ghostContent = ref(null);
let animationFrameId = null;
let mathjaxRenderTimeout = null;
const timerShow = ref(null);
const fullPoint = ref(null);
const minuteTimer = ref(null);
const secondTimer = ref(null);
const examProperties = ref(null);
const achivedPoint = ref(null);
const trainingTable = ref(null);
const currentTime = ref(new Date());
const interval = ref(null);
const Exams = ref([]);

const formattedTime = computed(() => {
  const time = examProperties.value.ido - (minuteTimer.value * 60 + secondTimer.value)

  const minutes = Math.floor(time / 60)

  const seconds = time % 60;

  return `${minutes} : ${seconds < 10 ? '0'+seconds : seconds}`;
});

const backToExams = async () =>{
  KivettAdatok.value = null;
  MaradekAdatok.value = null;
  fullPoint.value = null;
  minuteTimer.value = null;
  secondTimer.value = null;
  examProperties.value = null;
  achivedPoint.value = null;
  trainingTable.value = null;
  examStarted.value = false;
  examEnd.value = false;

  await getExams(undefined,{
    onSuccess: (response) =>{
        Exams.value = response
    },
    onError: (response) =>{
      if (showError) {
          showError(error.response.data);
      }else{
          console.log(error.response.data);
      }
    }
  });
}

function endFormat(exam){
    var h = Number(exam.kezdet.split(' ')[1].split(':')[0]);
    var m = Number(exam.kezdet.split(' ')[1].split(':')[1]) + Math.floor(Number(exam.ido)/60);
    if(m >= 60){
        h = h + Math.floor(m/60);
        m = m - (60 * Math.floor(m/60));
    }
    var s = Number(exam.kezdet.split(' ')[1].split(':')[1]) + (Number(exam.ido)%60);
    exam.kezdet.split(' ')[1] = h + ":" +(m < 10 ? "0"+m : m) + s > 0 ? ':' +(s < 10 ? "0"+s : s) : '';
    
    return exam.kezdet.split(' ')[0] + " " + h + ":" +(m < 10 ? "0"+m : m);
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

function allowDrop(event) {
  event.preventDefault()
}

function handleDragStart(event, item, field, sourceObj = null) {
  // Csak akkor indítjuk, ha az érték nem üres
  const value = (typeof item === 'object') ? item.value : item
  if (!value) return
  const dragData = {
    value,
    field,
    sourceId: sourceObj ? sourceObj.id : null,
    fromContainer: sourceObj ? false : true
  }
  event.dataTransfer.setData('application/json', JSON.stringify(dragData))
}

function handleDrop(event, targetObj, targetField) {
  event.preventDefault()
  const dataText = event.dataTransfer.getData('application/json')
  if (!dataText) return

  const dragData = JSON.parse(dataText)
  const droppedValue = dragData.value

  const targetCell = targetObj[targetField]
  const targetValue = targetCell && targetCell.value ? targetCell.value : null

  if (!targetValue) {
    targetObj[targetField] = { value: droppedValue, takeable: true }
    if (dragData.fromContainer) {
      const idx = KivettAdatok.value.findIndex(item => item === droppedValue || (item.value === droppedValue))
      if (idx !== -1) {
        KivettAdatok.value.splice(idx, 1)
      }
    } else {
      const sourceObj = MaradekAdatok.value.find(item => item.id === Number(dragData.sourceId))
      if (sourceObj && sourceObj[dragData.field]) {
        sourceObj[dragData.field] = { value: null, takeable: true }
      }
    }
  } else {
    // Swap logika
    if (dragData.fromContainer) {
      const idx = KivettAdatok.value.findIndex(item => item === droppedValue || (item.value === droppedValue))
      if (idx !== -1) {
        KivettAdatok.value.splice(idx, 1)
      }
      const oldValue = targetValue
      targetObj[targetField] = { value: droppedValue, takeable: true }
      KivettAdatok.value.push({ value: oldValue })
    } else {
      const sourceObj = MaradekAdatok.value.find(item => item.id === Number(dragData.sourceId))
      if (sourceObj && sourceObj[dragData.field] && typeof sourceObj[dragData.field].value !== 'undefined') {
        const temp = sourceObj[dragData.field].value
        sourceObj[dragData.field].value = targetValue
        targetObj[targetField].value = droppedValue
      } else {
        targetObj[targetField] = { value: droppedValue, takeable: true }
      }
    }
  }
}

function handleTouchStart(event, item, field, sourceObj = null) {
  event.preventDefault();
  
  // Ha object és nincs értéke, ne induljon el a drag
  if (typeof item === 'object' && !item.value) return;

  const value = (typeof item === 'object') ? item.value : item;
  currentTouchDragData = {
    value,
    field,
    sourceId: sourceObj ? sourceObj.id : null,
    fromContainer: sourceObj ? false : true
  };
  
  isDragging.value = true;
  ghostContent.value = value;
  
  const touch = event.touches[0];
  ghostPosition.value = { x: touch.clientX, y: touch.clientY };
}

function handleTouchMove(event) {
  if (!isDragging.value) return;
  
  const touch = event.touches[0];
  const x = touch.clientX;
  const y = touch.clientY;

  // Csak akkor frissítjük a pozíciót, ha nincs aktív animációs frame
  if (!animationFrameId) {
    animationFrameId = requestAnimationFrame(() => {
      ghostPosition.value = { x, y };
      animationFrameId = null;
    });
  }

  // Késleltetett renderelés, hogy ne minden húzásnál újra rendereljük
  if (mathjaxRenderTimeout) {
    clearTimeout(mathjaxRenderTimeout);
  }

  mathjaxRenderTimeout = setTimeout(() => {
    if (window.MathJax) {
      window.MathJax.typeset();
    }
  }, 100); // Késleltetés: 100ms
}

function handleTouchEnd(event, targetObj, targetField) {
  event.preventDefault()
  if (!currentTouchDragData) return

  const droppedValue = currentTouchDragData.value
  const targetCell = targetObj[targetField]
  const targetValue = targetCell && targetCell.value ? targetCell.value : null

  // Ha a cél cella tartalma nem szerkeszthető (pl. előre beállt string), ne csináljunk semmit
  if (typeof targetObj[targetField] === 'string') {
    currentTouchDragData = null
    isDragging.value = false
    ghostContent.value = null
    return
  }

  if (!targetValue) {
    targetObj[targetField] = { value: droppedValue, takeable: true }
    if (currentTouchDragData.fromContainer) {
      const idx = KivettAdatok.value.findIndex(item =>
        (typeof item === 'object' && item.value === droppedValue) || item === droppedValue
      )
      if (idx !== -1) {
        KivettAdatok.value.splice(idx, 1)
      }
    } else {
      const sourceObj = MaradekAdatok.value.find(item => item.id === Number(currentTouchDragData.sourceId))
      if (sourceObj && sourceObj[currentTouchDragData.field]) {
        sourceObj[currentTouchDragData.field] = { value: null, takeable: true }
      }
    }
  } else {
    // Swap logika
    if (currentTouchDragData.fromContainer) {
      const idx = KivettAdatok.value.findIndex(item =>
        (typeof item === 'object' && item.value === droppedValue) || item === droppedValue
      )
      if (idx !== -1) {
        KivettAdatok.value.splice(idx, 1)
      }
      const oldValue = targetValue
      targetObj[targetField] = { value: droppedValue, takeable: true }
      KivettAdatok.value.push({ value: oldValue })
    } else {
      const sourceObj = MaradekAdatok.value.find(item => item.id === Number(currentTouchDragData.sourceId))
      if (sourceObj && sourceObj[currentTouchDragData.field] && typeof sourceObj[currentTouchDragData.field].value !== 'undefined') {
        const temp = sourceObj[currentTouchDragData.field].value
        sourceObj[currentTouchDragData.field].value = targetValue
        targetObj[targetField].value = droppedValue
      } else {
        targetObj[targetField] = { value: droppedValue, takeable: true }
      }
    }
  }
  currentTouchDragData = null
  isDragging.value = false
  ghostContent.value = null
}

function handleGlobalTouchEnd(event) {
  if (!currentTouchDragData) return
  const touch = event.changedTouches[0]
  const dropElem = document.elementFromPoint(touch.clientX, touch.clientY)
  if (!dropElem) {
    currentTouchDragData = null
    isDragging.value = false
    ghostContent.value = null
    return
  }
  const droppable = dropElem.closest('.droppable')
  if (!droppable) {
    currentTouchDragData = null
    isDragging.value = false
    ghostContent.value = null
    return
  }
  const field = droppable.getAttribute('data-field')
  const id = droppable.getAttribute('data-id')
  const targetObj = MaradekAdatok.value.find(item => String(item.id) === id)
  if (!targetObj || !field) {
    currentTouchDragData = null
    isDragging.value = false
    ghostContent.value = null
    return
  }
  handleTouchEnd(event, targetObj, field)
}

onMounted(() => {
  window.addEventListener('touchmove', handleTouchMove)
  window.addEventListener('touchend', handleGlobalTouchEnd)
})

onBeforeUnmount(() => {
  window.removeEventListener('touchmove', handleTouchMove)
  window.removeEventListener('touchend', handleGlobalTouchEnd)
})

const {mutate: getTraningTables} = useGetTraningTables();

const examStart = async (exam) =>{
    const idList = exam.alkats.map(c=> c.id);
    await getTraningTables({alkatIds: idList, sorok: exam.sorok, diff: exam.dif}, {
    onSuccess: (response) => {
        examProperties.value = exam;
        KivettAdatok.value = response.kivettAdatok;
        MaradekAdatok.value = response.maradekAdatok;
        fullPoint.value = KivettAdatok.value.length;
        minuteTimer.value = Number(exam.ido) / 60
        secondTimer.value = Number(exam.ido) % 60
        examStarted.value = true;
        userStore.ExamOrTraningStarted = 'Exam';
        timerShow.value = setInterval(() => {
            if(secondTimer.value == 0 && minuteTimer.value == 0){
                Befejezes();
            }else
            {
                if(secondTimer.value == 0){
                    minuteTimer.value = Number(minuteTimer.value) -1;
                    secondTimer.value = 59;
                }else{
                    secondTimer.value = Number(secondTimer.value) -1;
                }
            }
        }, 1000);
    },
    onError: (error) => {
      if (showError) {
        showError(error.response.data);
      }else{
        console.log(error.response.data);
      }},
  });
}

const {mutate: getFinalStats} = useGetFinalStats();

const Befejezes = async () =>{
  clearInterval(timerShow.value);
  timerShow.value = null;
  userStore.ExamOrTraningStarted = null;
  examEnd.value = true;
  await getFinalStats({tables: MaradekAdatok.value, tablak: examProperties.value.alkats.map(c=>c.nev).join(', ') , time: minuteTimer.value * 60 + secondTimer.value, diff: examProperties.value.dif, def_time: examProperties.value.ido, tpont: fullPoint.value, exam_id: examProperties.value.id},{
    onSuccess: (response) =>{
      achivedPoint.value = response.achivedPoints;
      trainingTable.value = response.parsedRows;
    },
    onError: (error) =>{
      if (showError) {
        showError(error.response.data);
      }else{
        console.log(error.response.data);
      }
    }
  })
}

const {mutate: getExams} = useGetExams();

onMounted(async () => {
  await getExams(undefined,{
      onSuccess: (response) =>{
          Exams.value = response;
      },
      onError: (response) =>{
          if (showError) {
            showError(error.response.data);
          }else{
            console.log(error.response.data);
          }
      }
  });

  const interval = setInterval(() => {
    currentTime.value = new Date();
  }, 1000);
});

onUnmounted(() => {
    clearInterval(interval);
});

const ExamNotYetActive = (exam) => {
    return currentTime.value < new Date(exam.kezdet);
};

const isExamActive = (exam) => {
    return currentTime.value > new Date(exam.kezdet);
};

const isExamClosed = (exam) => {
  return currentTime.value > new Date(endFormat(exam));
};
</script>

<style>
.v-overlay-container::-webkit-scrollbar, .kivettAdatok::-webkit-scrollbar {
  width: 4px; /* Görgetősáv szélessége */
  height: 7px;
}

.v-overlay-container::-webkit-scrollbar-track, .kivettAdatok::-webkit-scrollbar-track {
  background: transparent !important; /* Háttérszín */
  border-radius: 10px !important;
}

.v-overlay-container::-webkit-scrollbar-thumb, .kivettAdatok::-webkit-scrollbar-thumb {
  background: rgb(var(--v-theme-settings_drawer_bc)) !important; /* Görgetősáv színe */
  border-radius: 10px !important;
}

.v-overlay-container::-webkit-scrollbar-thumb:hover ,  .kivettAdatok::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.7) !important;
}

.table-fixed {
  table-layout: fixed;
  width: 100%;
  overflow: hidden;
}

.table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 10px;
  text-align: center;
}

.draggable {
  padding: 5px;
  background-color: #f4f4f412;
  cursor: grab;
  border-radius: 5px;
  height: 85%;
  align-content: center;
}

.drag-ghost {
  position: fixed;
  pointer-events: none;
  will-change: transform;
  transform: translate3d(0, 0, 0); /* GPU gyorsítás */
  transition: transform 0.05s linear; /* Segít az akadások csökkentésében */
  background: rgba(0, 0, 0, 0.6);
  color: rgb(var(--v-theme-text_color));
  padding: 10px;
  border-radius: 8px;
  z-index: 1000;
}
</style>