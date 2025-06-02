<template>
  <div class="d-flex justify-center">
    <v-progress-circular indeterminate v-if="!get_fullUser"></v-progress-circular>
  </div>

  <v-slide-y-transition mode="in-out">
    <v-container v-if="get_fullUser">
      <v-row>
        <v-col cols="12" md="6">
          <div style="border: .1vw solid rgb(var(--v-theme-text_color)); width: 100%;" class="rounded">
            <v-card color="transparent">
              <v-card-title style="font-family: 'Orbitron', sans-serif;" class="d-flex align-center">
                <v-icon size="35" class="mr-3">mdi-book-open-variant</v-icon>
                <h3>Gyakorlás</h3>
              </v-card-title>
              
              <v-divider></v-divider>

              <v-card-text>
                <h2 style="font-weight: normal;">Ezen a felületen tudsz gyakorolni / felkészülni a dolgozatokra!</h2>
              </v-card-text>

              <v-divider></v-divider>

              <v-card-actions class="align-center d-flex justify-center">
                <v-btn 
                style="width: 60%; border: .1vw solid rgb(var(--v-theme-text_color));"
                class="rounded-lg align-center"
                @click="router.push({name: 'training'})">
                  Ugrás a felületre
                </v-btn>
              </v-card-actions>
            </v-card>
          </div>
        </v-col>
        
        <v-col cols="12" md="6" v-if="get_fullUser && ((get_fullUser.osztaly == 'T' && get_fullUser.user_role == 'teacher' && get_fullUser.admin == 0) || (get_fullUser.osztaly == 'A' && get_fullUser.user_role == 'admin' && get_fullUser.admin == 1))">
          <div style="border: .1vw solid rgb(var(--v-theme-text_color)); width: 100%;" class="rounded">
            <v-card color="transparent">
              <v-card-title style="font-family: 'Orbitron', sans-serif;" class="d-flex align-center">
                <v-icon size="35" class="mr-3">mdi-book-plus</v-icon>
                <h3>Dolgozat kiírása</h3>
              </v-card-title>
              
              <v-divider></v-divider>

              <v-card-text>
                <h2 style="font-weight: normal;">Ezen a felületen lehet kiírni dolgozatokat egyes osztályoknak!</h2>
              </v-card-text>

              <v-divider></v-divider>

              <v-card-actions class="align-center d-flex justify-center">
                <v-btn 
                style="width: 60%; border: .1vw solid rgb(var(--v-theme-text_color));"
                class="rounded-lg text-center"
                @click="router.push({name: 'exam-publish'})">
                  Ugrás a felületre
                </v-btn>
              </v-card-actions>
            </v-card>
          </div>
        </v-col>

        <v-col cols="12" md="6" v-else>
          <div style="border: .1vw solid rgb(var(--v-theme-text_color)); width: 100%;" class="rounded">
            <v-card color="transparent">
              <v-card-title style="font-family: 'Orbitron', sans-serif;" class="d-flex align-center">
                <v-icon size="35" class="mr-3">mdi-file-document-edit-outline</v-icon>
                <h3>Dolgozat</h3>
              </v-card-title>
              
              <v-divider></v-divider>

              <v-card-text>
                <h2 style="font-weight: normal;">Ezen a felületen tekintheted meg a régi / jelenlegi / közeledő dolgozatokat!</h2>
              </v-card-text>

              <v-divider></v-divider>

              <v-card-actions class="align-center d-flex justify-center">
                <v-btn 
                style="width: 60%; border: .1vw solid rgb(var(--v-theme-text_color));"
                class="rounded-lg text-center"
                @click="router.push({name: 'exam'})">
                  Ugrás a felületre
                </v-btn>
              </v-card-actions>
            </v-card>
          </div>
        </v-col>
      </v-row>

      
      <v-row>
        <v-col cols="12" md="6">
          <div style="border: .1vw solid rgb(var(--v-theme-text_color));" class="rounded">
            <v-card color="transparent">
              <v-card-title style="font-family: 'Orbitron', sans-serif;" class="d-flex align-center">
                <v-icon size="35" class="mr-3">mdi-school-outline</v-icon>
                <h3>Tanulás</h3>
              </v-card-title>
              
              <v-divider></v-divider>

              <v-card-text>
                <h2 style="font-weight: normal;">Ezen a felületen kezdheted el a tanulást, áttekintheted az egyes táblázatokat és felkészülhetsz a dolgozatokra!</h2>
              </v-card-text>

              <v-divider></v-divider>

              <v-card-actions class="align-center d-flex justify-center">
                <v-btn 
                style="width: 60%; border: .1vw solid rgb(var(--v-theme-text_color));"
                class="rounded-lg text-center" @click="router.push({name: 'learning'})">
                  Ugrás a felületre
                </v-btn>
              </v-card-actions>
            </v-card>
          </div>
        </v-col>

        <v-col cols="12" md="6">
          <div style="border: .1vw solid rgb(var(--v-theme-text_color)); width: 100%;" class="rounded">
            <v-card color="transparent">
              <v-card-title style="font-family: 'Orbitron', sans-serif;" class="d-flex align-center">
                <v-icon size="35" class="mr-3">mdi-chart-bar</v-icon>
                <h3>Eredmény</h3>
              </v-card-title>
              
              <v-divider></v-divider>

              <v-card-text>
                <h2 style="font-weight: normal;">{{ get_fullUser && ((get_fullUser.osztaly == 'T' && get_fullUser.user_role == 'teacher') || (get_fullUser.osztaly == 'A' && get_fullUser.user_role == 'admin')) ? 'Ezen a felületen tekintheted meg az eredményeidet vagy egyes osztályoknak vagy diáknak az eredményét lehet megtekinteni!' : 'Ezen a felületen tekintheted meg az eredményeidet!' }}</h2>
              </v-card-text>

              <v-divider></v-divider>

              <v-card-actions class="align-center d-flex justify-center">
                <v-btn 
                style="width: 60%; border: .1vw solid rgb(var(--v-theme-text_color));"
                class="rounded-lg text-center"
                @click="router.push({name: 'results'})">
                  Ugrás a felületre
                </v-btn>
              </v-card-actions>
            </v-card>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-slide-y-transition>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router';
import { ref, computed, inject, onMounted, watch } from 'vue';
import { useDisplay, useTheme } from 'vuetify';
import { useGetProfil } from '@/api/profile/profileQuery';

const showError = inject("showError");
const showSucces = inject("showSucces");

const { mobile } = useDisplay();
const isMobile = computed(() => mobile.value);
const router = useRouter();

const get_fullUser = ref(null);

const {mutate: getProfil} = useGetProfil();

onMounted(async () => {
  await getProfil(undefined,{
    onSuccess: (load_user) => {
      get_fullUser.value = load_user;
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
});
</script>