/* Profile */
<template>
  <div class="background-video-container">
    <video autoplay loop muted playsinline id="background-video">
      <source src="../components/background/profile_background.mp4" type="video/mp4"/>
    </video>
    <div class="background-overlay"></div>
  </div>
  <main 
  style="height: auto; background-color: transparent; position: relative; z-index: 2;" 
  class="d-flex justify-center align-center"
  :style="{overflow: $vuetify.display.smAndDown ? 'auto' : 'hidden'}"
  >
    <div style="height: 100vh; width: 75%; background-color: transparent; position: relative;" class="rounded">
      <div class="position-absolute" style="width: max-content; left: .5rem; top: .1vw;">
        <v-btn 
        icon
        @click="goBack" 
        style="z-index: 5; pointer-events: visible;">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
      </div>
      <div class="d-flex justify-center position-absolute ga-2" style="width: max-content; right: .5rem; top: .1vw;">
        <v-btn
        v-if="settingsShow"
        icon
        @click="handleDarkmodeSwitch"
        style="z-index: 5; pointer-events: visible;"
        >
          <v-icon>{{ DarkmodeChange ? 'mdi-weather-sunny' : 'mdi-weather-night' }}</v-icon>
        </v-btn>

        <v-btn
        v-if="settingsShow"
        icon
        @click="dialog = true"
        style="z-index: 5; pointer-events: visible;"
        >
          <v-icon>mdi-account-cog</v-icon>
        </v-btn>
      </div>
      <header>
        <div class="profile-header rounded-lg" style="height: 22vh; width: 100%; position: relative; overflow: hidden;">
          <v-btn
            class="rounded-lg"
            elevation="0"
            :style="{
              position: 'absolute',
              top: '0',
              left: '0',
              zIndex: '3',
              width: '100%',
              height: '100%',
              cursor: 'pointer',
              backgroundColor: 'transparent'
            }"
            @click="triggerBackPicFileInput">
            <template v-if="isBackImageAvailable" style="height: 100%;">
              <img 
                :src="backImage"
                @error="setDefaultBackground"
                class="background"
                ref="backgroundImg"
                style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 100%; height: 100%; object-fit: cover;"
                />
            </template>
          </v-btn>
          <input
            type="file"
            ref="fileBackPicInput"
            style="display: none;"
            @change="handlebackPicUpload"
          />
        </div>
        <div 
        class="d-flex flex-column justify-center align-center mt-4 overlay-div" 
        style="pointer-events: none;"
        :style="{top: $vuetify.display.smAndDown ? '-11rem' : '-12rem'}"
        >
          <v-btn 
            icon
            elevation="0"
            class="elevation-2"
            :style="{
              borderRadius: '50%',
              width: '13rem',
              height: '13rem',
              overflow: 'hidden',
              position: 'relative',
              pointerEvents: 'visible'
              }"
            @click="triggerProfPicFileInput"
            >
            <template v-if="isProfImageAvailable">
              <img
                :src="profileImage"
                class="profile-image"
                @error="handleProfImageError"
                style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 100%; height: 100%; object-fit: cover;"
              />
            </template>
            <template v-else>
              <img src="/src/components/background/test_profile.jpg"  alt="" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 100%; height: 100%; object-fit: cover;">
            </template>
          </v-btn>
          <h1 style="position: relative; color: rgb(var(--v-theme-profile_textColor)); font-size: xx-large;">
            {{ get_UserName }}
          </h1>
        </div>
        <input
          type="file"
          ref="fileProfPicInput"
          style="display: none;"
          @change="handleProfPicUpload"
        />
      </header>
      <div 
      style="background-color: transparent; position: relative; top: -21vh;"
      :style="{overflow: $vuetify.display.smAndDown ? 'auto' : 'hidden'}"
      >
      <v-row justify="space-evenly">
        <v-col
          v-for="elevation in 1"
          :key="elevation"
          cols="12"
        >
          <v-sheet
            class="pa-2 rounded-lg"
            color="profile_cardsColor"
            height="420"
            style="transition: .3s;"
          >
          <div id="chart">
            <apexchart type="line" height="350" :options="chartOptions" :series="series"></apexchart>
          </div>
          </v-sheet>
        </v-col>
      </v-row>
      <v-row justify="space-evenly">
        <v-col
          :key="elevation"
          cols="12"
          md="6"
        >
          <v-sheet
            class="pa-2 rounded-lg"
            color="profile_cardsColor"
            height="420"
            style="transition: .3s;"
          >
           
          </v-sheet>
        </v-col>
        <v-col
          :key="elevation"
          cols="12"
          md="6"
        >
          <v-sheet
            class="pa-2 rounded-lg"
            color="profile_cardsColor"
            height="420"
            style="transition: .3s;"
          >
          <h2>Legutobb megkezdett feladat</h2>
          <v-card>
            <v-card
            :color="color"
            :variant="variant"
            class="mx-auto"
          >
            <v-card-item>
              <div>
                <div class="text-overline mb-1">
                  {{ variant }}
                </div>
                <div class="text-h6 mb-1">
                  1. Határozd meg x értékét: Alapvető Lineáris Egyenlet
                </div>
                <div class="text-caption">Greyhound divisely hello coldly fonwderfully</div>
              </div>
            </v-card-item>
    
            <v-card-actions>
              <v-btn>
                Folytatas
              </v-btn>
            </v-card-actions>
          </v-card>
          </v-card>
          </v-sheet>
        </v-col>
      </v-row>

        <div class="pa-4 text-center">
          <v-dialog
            v-model="dialog"
            max-width="700"
          >
            <v-card>
              <v-card-title>
                <span class="text-h6">{{ get_UserName }} felhasználó beállításai</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <!-- Felhasználónév -->
                    <v-col cols="12" md="12">
                      <v-text-field
                        v-model="userName"
                        :label="get_UserName"
                        outlined
                      ></v-text-field>
                    </v-col>
                    <!-- E-mail -->
                    <v-col cols="12" md="12">
                      <v-text-field
                        v-model="email"
                        :label="get_fullUser.email"
                        outlined
                        type="email"
                      ></v-text-field>
                    </v-col>
                    <!-- Jelszó -->
                    <v-col cols="12" md="12">
                      <v-text-field
                        v-model="password"
                        label="Új Jelszó"
                        outlined
                        type="password"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="12">
                      <v-text-field
                        v-model="confpassword"
                        label="Új Jelszó megerősítés"
                        outlined
                        type="confpassword"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  text="Bezárás"
                  variant="plain"
                  @click="dialog = false"
                ></v-btn>
                <v-btn
                  color="success"
                  text="Mentés"
                  variant="tonal"
                  @click="saveSettings"
                >Mentés</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch, shallowRef, inject } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useProfilePicUpload } from '@/api/profile/profileQuery';
import { useProfileGetUser } from '@/api/profile/profileQuery';
import { useTheme } from 'vuetify';
import imageCompression from 'browser-image-compression';
import { useProfileDarkmodeSwitch } from '@/api/profile/profileQuery'
import VueApexCharts from 'vue3-apexcharts';
const dialog = shallowRef(false)

// Definiáld az adat típust
interface ProfilPicdata {
  id: number
  pic: Blob
  type: number
}

// Router és Route hook-ok
const router = useRouter();
const route = useRoute();

// Cookie lekérdezés
const getCookie = (name: string) => {
  const cookies = document.cookie.split('; ');
  for (const cookie of cookies) {
    const [key, value] = cookie.split('=');
    if (key === name) {
      return decodeURIComponent(value);
    }
  }
  return null;
};

const showError = inject<((msg: string) => void) | undefined>("showError");

var get_user_by_token = getCookie('user') != null && getCookie('user') != 'undefined' && typeof getCookie('user') != "object" ? getCookie('user') : null;

const get_fullUser = ref<any>(null);

const get_UserName = ref<string>('Betöltés...');

const get_fullUser_customs = ref<any>(null);

const settingsShow = ref(false);

const { mutate: ProfileGetUser } = useProfileGetUser();

const userId = route.params.id;
const apexchart = VueApexCharts;
const series = ref([
  {
    name: "Solved tasks",
    data: [10, 41, 35, 51, 49, 62, 69, 91, 148,5,100,45]
  }
]);


const chartOptions = ref({
            chart: {
              height: 350,
              type: 'line',
              zoom: {
                enabled: false
              }
            },
            dataLabels: {
              enabled: false
            },
            stroke: {
              curve: 'straight'
            },
            title: {
              text: 'Megoldott feladatok',
              align: 'left'
            },
            grid: {
              row: {
                colors: ['#f3f3f3', 'transparent'],
                opacity: 0.5
              },
            },
            xaxis: {
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep','Okt','Nov','Dec'],
            }
});


onMounted(async () => {
  try {
    await ProfileGetUser({token: get_user_by_token, id: Number(userId)}, {
      onSuccess: (get_user) => {
        get_UserName.value = get_user.user_name ? get_user.user_name : get_user.name;
        get_fullUser.value = get_user;
        get_fullUser_customs.value = get_user.User_customization;
        settingsShow.value = get_fullUser.value.id == userId;
        handlePtofilPicters(get_user.User_customization ? { profil_picture: get_user.User_customization.profil_picture, background_picture: get_user.User_customization.background_picture } : { profil_picture: get_user.profil_picture, background_picture: get_user.background_picture })
      },
      onError: (error) => {
        if (showError) {
          showError(error.response.data);
        }else{
          console.log(error.response.data);
        }
      },
    });
  } catch (error : any) {
    if (showError) {
      showError(error.response.data);
    }else{
      console.log(error.response.data);
    }
  }
});

const { mutate: ProfileDarkMode } = useProfileDarkmodeSwitch();
const DarkmodeChange = ref(false);
const handleDarkmodeSwitch = async () => {
  DarkmodeChange.value = !DarkmodeChange.value;

  // Téma módosítása
  theme.global.name.value = DarkmodeChange.value ? 'darkTheme' : 'lightTheme';

  // API hívás a sötét mód változtatásához
  if(get_fullUser.value != null){
    try {
      await ProfileDarkMode({id: get_fullUser.value.id, darkmode: DarkmodeChange.value, type: 4 });
    } catch (error: any) {
      if (showError) {
        showError(error.response.data);
      }else{
        console.log(error.response.data);
      }
    }
  }
};

const theme = useTheme();

// Változó figyelése
watch(get_fullUser, (newUser: any | null) => {
  if (newUser) {
    DarkmodeChange.value = newUser.User_customization ? newUser.User_customization.darkmode : newUser.darkmode;
    theme.global.name.value = DarkmodeChange.value ? 'darkTheme' : 'lightTheme';
  }
});

const profileImage = ref<string>('hibas-kep-url.jpg');
const backImage = ref<string>('hibas-kep-url.jpg');

const handlePtofilPicters = (data: { profil_picture: string | null, background_picture: string | null }) => {
  const base64ImageProf = data.profil_picture;
  const base64ImageBack = data.background_picture;

  if (base64ImageProf && base64ImageProf != null) {
    profileImage.value = base64ImageProf; // Közvetlenül beállítjuk a Base64 kódolt képet
    isProfImageAvailable.value = true;
  }

  if (base64ImageBack && base64ImageBack != null) {
    backImage.value = base64ImageBack; // Közvetlenül beállítjuk a Base64 kódolt képet
    isBackImageAvailable.value = true;
  }
};


// Állapotok
const compressedImageBlob = ref<Blob | null>(null);
const isProfImageAvailable = ref(true);
const isBackImageAvailable = ref(true);

// Kép hiba kezelése
const handleProfImageError = () => {
  isProfImageAvailable.value = false;
};

// Alapértelmezett háttér beállítása
const setDefaultBackground = (event: Event) => {
  const target = event.target as HTMLImageElement;
  target.style.display = 'none';
  isBackImageAvailable.value = false;
};

// Rejtett fájl input hivatkozás
const fileProfPicInput = ref<HTMLInputElement | null>(null);

const fileBackPicInput = ref<HTMLInputElement | null>(null);

// API hívás
const { mutate: ProfilePicUpload } = useProfilePicUpload();

// Fájl feltöltési kezelő
const handleProfPicUpload = async (event: Event) => {
  const input = event.target as HTMLInputElement;
  const file = input.files ? input.files[0] : null;

  if (file) {
    try {
      // Kép tömörítése
      const options = {
        maxSizeMB: 0.1,
        useWebWorker: true,
      };

      const compressedFile = await imageCompression(file, options);

      // Frissítjük a profilképet a tömörített fájl URL-jével
      profileImage.value = URL.createObjectURL(compressedFile);
      isProfImageAvailable.value = true;
      compressedImageBlob.value = compressedFile; // Tárolhatjuk a blob fájlt későbbi használatra

      // Tömörített fájl adatainak továbbítása
      var ProfPicUploaddata: ProfilPicdata = {
        id: Number(get_fullUser.value.id),
        pic: compressedFile,
        type: Number(0)
      };

      // Profilkép feltöltése
      ProfilePicUpload(ProfPicUploaddata);

    } catch (error : any) {
      if (showError) {
        showError(error.response.data);
      }else{
        console.log(error.response.data);
      }
    }
  }
};

// Fájl input triggerelése
const triggerProfPicFileInput = () => {
  if(get_fullUser.value != null && userId == get_fullUser.value.id){
    fileProfPicInput.value?.click();
  }
};

const handlebackPicUpload = async (event: Event) => {
  const input = event.target as HTMLInputElement;
  const file = input.files ? input.files[0] : null;

  if (file) {
    try {
      // Ellenőrizzük, hogy GIF fájl
      if (file.type === 'image/gif') {
        // Fájl bináris adatként történő beolvasása

          // GIF fájl adatainak továbbítása bináris formátumban
          var ProfBackUploaddata: ProfilPicdata = {
            id: Number(get_fullUser.value.id),
            pic: file, // A bináris adat Blob formátumban
            type: 1,
          };

          // Profilkép feltöltése
          ProfilePicUpload(ProfBackUploaddata);

          // A GIF fájl URL-jének létrehozása és megjelenítése
          backImage.value = URL.createObjectURL(file);
          isBackImageAvailable.value = true;
          compressedImageBlob.value = file; // Tárolhatjuk a blob fájlt későbbi használatra
      } else {
        // Ha nem GIF, akkor alkalmazunk tömörítést
        const options = {
          maxSizeMB: 0.1,
          useWebWorker: true,
        };

        const compressedFile = await imageCompression(file, options);

        // Tömörített fájl adatainak Blob-ként történő elküldése
        var ProfBackUploaddata: ProfilPicdata = {
          id: Number(get_fullUser.value.id),
          pic: compressedFile,  // A tömörített fájl Blob formátumban
          type: 1,
        };

        // Profilkép feltöltése
        ProfilePicUpload(ProfBackUploaddata);

        // Frissítjük a profilképet a tömörített fájl URL-jével
        backImage.value = URL.createObjectURL(compressedFile);
        isBackImageAvailable.value = true;
        compressedImageBlob.value = compressedFile; // Tárolhatjuk a blob fájlt későbbi használatra
      }
    } catch (error: any) {
      if (showError) {
        showError(error.response.data);
      }else{
        console.log(error.response.data);
      }
    }
  }
};

const triggerBackPicFileInput = () => {
  if(get_fullUser.value != null && userId == get_fullUser.value.id){
    fileBackPicInput.value?.click();
  }
};
</script>

<script lang="ts">
export default {
  data() {
    return {
      dialog: false, // Dialógus vezérlés
      userName: '', // Felhasználónév
      email: '', // E-mail cím
      password: '', // Jelszó
      confpassword: '',
    };
  },
  methods: {
      goBack() {
        this.$router.back();
      },
      saveSettings() {
        // Mentési logika
        console.log("Felhasználónév:", this.userName);
        console.log("E-mail:", this.email);
        console.log("Jelszó:", this.password);
        this.dialog = false; // Dialógus bezárása
      },
    },
  computed: {
    get_UserName() {
      return "PéldaFelhasználó"; // Cseréld le a valódi logikád szerint
    },
  },
  }
</script>

<style>
.background-video-container {
  position: absolute;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

#background-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
  overflow: hidden;
}

#background-video source {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.background-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(5px);
  z-index: -1;
}

.profile-header {
  position: relative;
  width: 100%;
  height: 11vw;
  background-color: rgb(var(--v-theme-profile_header_bc));
}

.profile-header img{
  background-attachment: fixed;
  background-size: cover;
  height: 100%;
}

.background {
  width: 100%;
  height: 100%;
}

.overlay-div {
  position: relative;
  z-index: 3;
  text-align: center;
}

.profile-image{
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
