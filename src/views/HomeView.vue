<template>
  <v-container>
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

      <v-col cols="12" md="6">
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
              class="rounded-lg text-center">
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
    <v-row justify="center" v-if="get_fullUser && ((get_fullUser.osztaly == 'T' && get_fullUser.user_role == 'teacher') || (get_fullUser.osztaly == 'A' && get_fullUser.user_role == 'admin'))">
      <v-col cols="12" md="6" offset-md="0">
        <div style="border: .1vw solid rgb(var(--v-theme-text_color));" class="rounded">
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
              class="rounded-lg text-center">
                Ugrás a felületre
              </v-btn>
            </v-card-actions>
          </v-card>
        </div>
      </v-col>
    </v-row>
  </v-container>
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

const get_token = getCookie("user");
const get_fullUser = ref(null);

const {mutate: getProfil} = useGetProfil();

onMounted(async () => {
  if(get_token){
    await getProfil(get_token, {
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