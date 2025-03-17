<template>
  <v-slide-y-transition mode="in-out" hide-on-leave>
    <v-container style="background-color: rgb(var(--v-theme-primary));" class="mt-1 rounded-lg" v-if="!MaradekAdatok">
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
        <v-col cols="12" md="3" class="d-flex justify-center">
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
            :items="['Könnyű','Normál','Nehéz']"
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
  </v-slide-y-transition>

  <v-slide-y-transition mode="in-out">
    <v-container fluid v-if="MaradekAdatok && !traningEnd" class="position-relative">
      <div class="d-flex justify-center">
          <h1 style="background-color: rgb(var(--v-theme-primary));" class="px-6 py-1 mb-2 rounded-pill">Gyakorlás</h1>
      </div>

      <div v-if="timerShow" class="position-absolute text-center px-4 py-1 d-flex ga-1 rounded-pill" style="right: 1.3em; top: 2em; background-color: rgb(var(--v-theme-primary)); font-family: 'Orbitron', sans-serif;">
        <h2>{{ minuteTimer }}</h2>
        <h2>:</h2>
        <h2>{{ secondTimer < 10 ? '0' + secondTimer : secondTimer }}</h2>
      </div>

      <div class="position-absolute text-center rounded-pill" style="left: 1.3em; top: 2em; background-color: rgb(var(--v-theme-primary));">
        <v-btn 
        elevation="0" 
        class="px-6 py-1 rounded-pill"
        style="font-size: 1.2em;"
        @click="Befejezes()"
        >Befejezés</v-btn>
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
            <td v-if="typeof table.nev === 'string'" class="text-center" style="width: 20%; font-size: 1.3em;" v-mathjax="table.nev">
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
                <span v-mathjax="typeof table.nev === 'object' ? table.nev.value : table.nev" style="font-size: 1.3em;"></span>
              </div>
              <div v-else class="empty-cell">
                <span class="placeholder">--</span>
              </div>
            </td>

            <!-- Jel oszlop -->
            <td v-if="typeof table.jel === 'string'" class="text-center" style="width: 20%; font-size: 1.3em;" v-mathjax="table.jel">
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
                <span v-mathjax="typeof table.jel === 'object' ? table.jel.value : table.jel" style="font-size: 1.3em;"></span>
              </div>
              <div v-else class="empty-cell">
                <span class="placeholder">--</span>
              </div>
            </td>

            <!-- Definíció oszlop -->
            <td v-if="typeof table.def === 'string'" class="text-center" style="width: 20%; font-size: 1.3em;" v-mathjax="table.def">
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
                <span v-mathjax="typeof table.def === 'object' ? table.def.value : table.def" style="font-size: 1.3em;"></span>
              </div>
              <div v-else class="empty-cell">
                <span class="placeholder">--</span>
              </div>
            </td>

            <!-- Mértékegység oszlop -->
            <td v-if="typeof table.mer === 'string'" class="text-center" style="width: 20%; font-size: 1.3em;" v-mathjax="table.mer">
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
                <span v-mathjax="typeof table.mer === 'object' ? table.mer.value : table.mer" style="font-size: 1.3em;"></span>
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

  <!-- Kivett adatok -->
  <div class="position-absolute d-flex flex-column justify-center rounded-lg"
  style="width: 90%; left: 50%; transform: translate(-50%,0%); background-color: rgb(var(--v-theme-primary)); 
  overflow-x: auto;" 
  :style="{bottom: isMobile ? '5.5em' : '2em'}"
  @dragover.prevent="allowDrop" 
  @drop.prevent="allowDrop"
  v-if="KivettAdatok && KivettAdatok.length != 0 && !traningEnd">
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
      <div style="width: 80%;" class="d-flex flex-column justify-center">
        <div class="d-flex justify-center">
          <h1>Gyakorlás befejezve!</h1>
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
              <h3 style="font-weight: normal;">{{ diffSelect }}</h3>
            </div>
  
            <v-divider class="my-2"></v-divider>
  
            <div v-if="timerSwitch" class="d-flex pl-2">
              <h3 style="font-weight: normal;">Eltelt idő</h3>
              <v-divider vertical class="mx-2"></v-divider>
              <h3 style="font-weight: normal;">{{ def_minuteTimer - minuteTimer }} : {{ def_secondTimer - secondTimer }}</h3>
            </div>
            <div v-else class="pl-2 align-center">
              <h3 style="font-weight: normal;">Nem volt beállítva idő!</h3>
            </div>
  
            <v-divider class="my-2"></v-divider>
  
            <div class="d-flex pl-2 align-center">
              <h3 style="font-weight: normal;">Táblák</h3>
              <v-divider vertical class="mx-2"></v-divider>
              <h3 style="font-weight: normal;">{{ Object.values(AlkatSelect).join(', ')  }}</h3>
            </div>
  
            <v-divider class="my-2"></v-divider>
  
            <div class="d-flex pl-2 align-center">
              <h3 style="font-weight: normal;">Láthatlan jegy:</h3>
              <v-divider vertical class="mx-2"></v-divider>
              <h3 style="font-weight: normal;">{{ showGrade(Math.floor(achivedPoint / fullPoint * 100)) }}</h3>
            </div>
          </div>
        </div>
        <div class="mb-2 mt-6 d-flex justify-center ga-4">
          <div>
            <v-btn
            elevation="0"
            @click="router.push({name : 'home'})"
            variant="outlined"
            >
              <v-icon class="mr-1" size="25">mdi-home</v-icon>
              <h2>Főoldal</h2>
            </v-btn>
          </div>
          
          <div>
            <v-btn
            elevation="0"
            variant="outlined"
            @click="reTryTraining()"
            >
              <v-icon class="mr-1" size="25">mdi-reload</v-icon>
              <h2>Újra próbálkozás</h2>
            </v-btn>
          </div>
        </div>
      </div>
    </v-container>
  </v-slide-y-transition>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router';
import { ref, computed, inject, onMounted, watch, onBeforeUnmount } from 'vue';
import { useDisplay, useTheme } from 'vuetify';
import { useGetCategories, useGetSubcategories, useGetTraningTables, useGetFinalStats } from '@/api/tables/tablesQuery';

const showError = inject("showError");
const showSucces = inject("showSucces");

const { mobile } = useDisplay();
const isMobile = computed(() => mobile.value);
const router = useRouter();

const get_token = getCookie("user");
const get_fullUser = ref(null);

const TkatSelect = ref(null);
const AlkatSelect = ref(null);
const TkatItems = ref([]);
const TkatArray = ref([]);
const AlkatItems = ref([]);
const AlkatArray = ref([]);
const sliderMax = ref(null)
const sliderValue = ref(5);
const minuteTimer = ref(2);
const def_minuteTimer = ref(2);
const secondTimer = ref(30);
const def_secondTimer = ref(30);
const timerSwitch = ref(false);
const diffSelect = ref('Könnyű');
const KivettAdatok = ref(null);
const MaradekAdatok = ref(null);
var currentTouchDragData = null;
const isDragging = ref(false);
const ghostPosition = ref({ x: 0, y: 0 });
const ghostContent = ref(null);
const timerShow = ref(null);
const traningEnd = ref(false);
let animationFrameId = null;
let mathjaxRenderTimeout = null;
const fullPoint = ref(null);
const achivedPoint = ref(null);

// --- Eseménykezelők ---

function reTryTraining(){
  sliderMax.value = null;
  sliderValue.value = 5;
  TkatSelect.value = null;
  AlkatSelect.value = null;
  minuteTimer.value = 2;
  secondTimer.value = 30;
  def_minuteTimer.value = 2;
  def_secondTimer.value = 30;
  diffSelect.value = 'Könnyű';
  KivettAdatok.value = null;
  MaradekAdatok.value = null;
  timerSwitch.value = false;
  fullPoint.value = null;
  achivedPoint.value = null;
  traningEnd.value = false;
  achivedPoint.value = null;
  timerShow.value = null;
  AlkatItems.value.length = 0;
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

const {mutate: getFinalStats} = useGetFinalStats();

const Befejezes = async () =>{
  clearInterval(timerShow.value);
  timerShow.value = null;
  traningEnd.value = true;
  await getFinalStats({tables: MaradekAdatok.value, tablak: Object.values(AlkatSelect.value).join(', ') , time: timerSwitch.value ? (minuteTimer.value * 60 + secondTimer.value) : null, diff: (diffSelect.value == 'Könnyű' ? 1 : (diffSelect.value == 'Normál' ? 2 : 3)), def_time: timerSwitch.value ?  (def_minuteTimer.value * 60 + def_secondTimer.value) : null, tpont: fullPoint.value, exam_id: null, token: get_token},{
    onSuccess: (response) =>{
      achivedPoint.value = response;
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

const {mutate: getTraningTables} = useGetTraningTables();

const StartTraning = async () =>{
  const idLista = AlkatSelect.value.map(obj => AlkatArray.value.filter(c => c.nev === obj).map(c => c.id)).flat().sort();
  await getTraningTables({alkatIds: idLista, sorok: sliderValue.value, diff: (diffSelect.value == 'Könnyű' ? 1 : (diffSelect.value == 'Normál' ? 2 : 3))}, {
    onSuccess: (response) => {
      KivettAdatok.value = response.kivettAdatok;
      MaradekAdatok.value = response.maradekAdatok;
      fullPoint.value = KivettAdatok.value.length;
      if(timerSwitch.value){
        def_minuteTimer.value = minuteTimer.value;
        def_secondTimer.value = secondTimer.value;
        timerShow.value = setInterval(() => {
          if(secondTimer.value == 0 && minuteTimer.value == 0){
            Befejezes();
          }else{
            if(secondTimer.value == 0){
              minuteTimer.value = Number(minuteTimer.value) -1;
              secondTimer.value = 59;
            }else{
              secondTimer.value = Number(secondTimer.value) -1;
            }
          }
        }, 1000);
      }
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