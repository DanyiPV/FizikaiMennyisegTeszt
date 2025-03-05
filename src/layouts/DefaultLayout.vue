<template>
    <v-layout class="overflow-visible" v-if="isMobile">
      <v-bottom-navigation
        v-model="value"
        :bg-color="color"
        mode="shift"
        mandatory
      >
        <v-btn>
          <v-icon>mdi-television-play</v-icon>
  
          <span>Video</span>
        </v-btn>
  
        <v-btn>
          <v-icon>mdi-music-note</v-icon>
  
          <span>Music</span>
        </v-btn>
  
        <v-btn>
          <v-icon>mdi-book</v-icon>
  
          <span>Book</span>
        </v-btn>
  
        <v-btn>
          <v-icon>mdi-image</v-icon>
  
          <span>Image</span>
        </v-btn>
      </v-bottom-navigation>
    </v-layout>

    <v-card>
        <v-layout>
            <v-app-bar color="nav_bc" elevation="0">
                <v-app-bar-nav-icon variant="text" v-if="!isMobile" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

                <v-toolbar-title style="font-family: 'Orbitron', sans-serif;">
                    <h2>Gravitas</h2>
                </v-toolbar-title>

                <v-spacer></v-spacer>

                <v-btn icon @click="HandleChangeDarkmode()" ><v-icon color="icon_color">{{ DarkmodeChange ? 'mdi-weather-sunny' : 'mdi-weather-night' }}</v-icon></v-btn>
                <v-btn icon @click="deleteCookie('user')"><v-icon color="error">mdi-logout</v-icon></v-btn>
            </v-app-bar>

            <v-navigation-drawer
                v-if="!isMobile"
                v-model="drawer"
                :location="isMobile ? 'left' : undefined"
                temporary
                color="nav_bc"
            >
                <v-list class="d-flex flex-column ga-2">
                    <v-list-item style="border: .1vw solid black;" class="mx-2 rounded pl-8 cursor-pointer">
                        <div class="d-flex align-center">
                            <v-icon size="35">mdi-home</v-icon>
                            <div class="text-center" style="width: 100%;">
                                <h2 style="text-transform: uppercase;">Főoldal</h2>
                            </div>
                        </div>
                    </v-list-item>

                    <v-list-item style="border: .1vw solid black;" class="mx-2 rounded pl-8 cursor-pointer">
                        <div class="d-flex align-center">
                            <v-icon size="35">mdi-home</v-icon>
                            <div class="text-center" style="width: 100%;">
                                <h2 style="text-transform: uppercase;">Főoldal</h2>
                            </div>
                        </div>
                    </v-list-item>

                    <v-list-item style="border: .1vw solid black;" class="mx-2 rounded pl-8 cursor-pointer">
                        <div class="d-flex align-center">
                            <v-icon size="35">mdi-home</v-icon>
                            <div class="text-center" style="width: 100%;">
                                <h2 style="text-transform: uppercase;">Főoldal</h2>
                            </div>
                        </div>
                    </v-list-item>

                    <v-list-item style="border: .1vw solid black;" class="mx-2 rounded pl-8 cursor-pointer">
                        <div class="d-flex align-center">
                            <v-icon size="35">mdi-home</v-icon>
                            <div class="text-center" style="width: 100%;">
                                <h2 style="text-transform: uppercase;">Főoldal</h2>
                            </div>
                        </div>
                    </v-list-item>
                </v-list>
            </v-navigation-drawer>

            <v-main style="height: 100vh; background-color: rgb(var(--v-theme-background));">
                <RouterView></RouterView>
            </v-main>
        </v-layout>
    </v-card>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router';
import { ref, computed, inject, onMounted } from 'vue'
import { useDisplay } from 'vuetify';
import { useTheme } from 'vuetify';
import { useChangeDarkmode, useGetDarkmode } from '@/api/profile/profileQuery';

const showError = inject("showError");
const showSucces = inject("showSucces");

const { mobile } = useDisplay();
const isMobile = computed(() => mobile.value);

const get_token = getCookie("user");
const route = useRoute();
const router = useRouter();
const theme = useTheme();
const value = ref(1);
const drawer = ref(false);
const DarkmodeChange = ref(false);

const color = computed(() => {
  switch (value.value) {
    case 0: return 'blue-grey';
    case 1: return 'teal';
    case 2: return 'brown';
    case 3: return 'indigo';
    case 4: return 'indigo';
    case 5: return 'indigo';
    default: return 'blue-grey';
  }
});

const {mutate: getDarkmode} = useGetDarkmode();

onMounted(async () => {
  if(get_token){
    await getDarkmode(get_token, {
      onSuccess: (darkmode) => {
        DarkmodeChange.value = darkmode.darkmode;
        theme.global.name.value = DarkmodeChange.value ? 'darkTheme' : 'lightTheme';
      },
      onError: (error) => {
        if (showError) {
          showError(error.response.data);
        }else{
          console.log(error.response.data);
        }
      },
    });
  }
});

const {mutate: ChangeDarkmode} = useChangeDarkmode();

const HandleChangeDarkmode = async ()=>{
  if(get_token != null){
    await ChangeDarkmode({token: get_token, type: !DarkmodeChange.value },{
      onSuccess: (response) =>{
        DarkmodeChange.value = !DarkmodeChange.value;
        theme.global.name.value = DarkmodeChange.value ? 'darkTheme' : 'lightTheme';
        if (showSucces) {
          showSucces(response);
        }else{
          console.log(response);
        }
      },
      onError: (error) => {
        if (showError) {
          showError(error.response.data);
        }else{
          console.log(error.response.data);
        }
      }
    });
  }
}

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
}
</script>

<style scoped>

</style>