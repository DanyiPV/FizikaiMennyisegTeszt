<template>
    <v-layout class="overflow-visible" v-if="isMobile">
      <v-bottom-navigation
        v-model="value"
        :bg-color="color"
        mode="shift"
        mandatory
      >

        <v-btn>
          <v-icon>mdi-home</v-icon>
  
          <span>Főoldal</span>
        </v-btn>
  
        <v-btn>
          <v-icon>mdi-book-open-variant</v-icon>
  
          <span>Gyakorlás</span>
        </v-btn>
  
        <v-btn>
          <v-icon>mdi-file-document-edit-outline</v-icon>
  
          <span>Dolgozat</span>
        </v-btn>

        <v-btn>
          <v-icon>mdi-school-outline</v-icon>
  
          <span>Tanulás</span>
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
                <div class="d-flex ga-2">
                    <v-btn icon @click="dialog = true" v-if="get_fullUser"><v-icon>mdi-account</v-icon></v-btn>
                    <v-btn icon @click="HandleChangeDarkmode()" ><v-icon color="icon_color">{{ DarkmodeChange ? 'mdi-weather-sunny' : 'mdi-weather-night' }}</v-icon></v-btn>
                    <v-btn icon @click="deleteCookie('user')"><v-icon color="error">mdi-logout</v-icon></v-btn>
                </div>
            </v-app-bar>

            <v-navigation-drawer
                v-if="!isMobile"
                v-model="drawer"
                :location="isMobile ? 'left' : undefined"
                temporary
                color="nav_bc"
            >
                <v-list class="d-flex flex-column ga-2">
                    
                    <v-list-item class="pa-0 px-2">
                        <v-btn
                        style="border: .1vw solid rgb(var(--v-theme-text_color)); height: max-content; width: 100%; display: block; align-items: center; justify-content: center;"
                        class="justify-center rounded cursor-pointer py-2 px-0 w-100"
                        >
                            <div class="d-flex align-center ga-3 w-100" style="width: 100%; height: 100%;">
                                <v-icon size="30" class="ml-4">mdi-home</v-icon>
                                <h1 style="text-transform: uppercase; width: 100%;">Főoldal</h1>
                            </div>
                        </v-btn>
                    </v-list-item>

                    <v-list-item class="pa-0 px-2">
                        <v-btn
                        style="border: .1vw solid rgb(var(--v-theme-text_color)); height: max-content; width: 100%; display: block; align-items: center; justify-content: center;"
                        class="justify-center rounded cursor-pointer py-2 px-0 w-100"
                        >
                            <div class="d-flex align-center ga-3 w-100" style="width: 100%; height: 100%;">
                                <v-icon size="30" class="ml-4">mdi-book-open-variant</v-icon>
                                <h1 style="text-transform: uppercase; width: 100%;">Gyakorlás</h1>
                            </div>
                        </v-btn>
                    </v-list-item>

                    <v-list-item class="pa-0 px-2">
                        <v-btn
                        style="border: .1vw solid rgb(var(--v-theme-text_color)); height: max-content; width: 100%; display: block; align-items: center; justify-content: center;"
                        class="justify-center rounded cursor-pointer py-2 px-0 w-100"
                        >
                            <div class="d-flex align-center ga-3 w-100" style="width: 100%; height: 100%;">
                                <v-icon size="30" class="ml-4">mdi-file-document-edit-outline</v-icon>
                                <h1 style="text-transform: uppercase; width: 100%;">Dolgozat</h1>
                            </div>
                        </v-btn>
                    </v-list-item>

                    <v-list-item class="pa-0 px-2">
                        <v-btn
                        style="border: .1vw solid rgb(var(--v-theme-text_color)); height: max-content; width: 100%; display: block; align-items: center; justify-content: center;"
                        class="justify-center rounded cursor-pointer py-2 px-0 w-100"
                        >
                            <div class="d-flex align-center ga-3 w-100" style="width: 100%; height: 100%;">
                                <v-icon size="30" class="ml-4">mdi-school-outline</v-icon>
                                <h1 style="text-transform: uppercase; width: 100%;">Tanulás</h1>
                            </div>
                        </v-btn>
                    </v-list-item>

                </v-list>
            </v-navigation-drawer>

            <v-main style="height: 100vh; background-color: rgb(var(--v-theme-background));">
                <RouterView></RouterView>
            </v-main>
        </v-layout>
    </v-card>

    <v-dialog
        v-model="dialog"
        max-width="1200"
    >
        <v-card style="display: flex; flex-direction: column; height: auto; overflow: hidden;">
            <v-layout>
                <div
                  style="max-width: max-content; border-radius: 0 !important; background-color: rgb(var(--v-theme-settings_drawer_bc)); min-height: max-content; height: auto; transition: .3s; z-index: 5;"
                  class="d-flex flex-column position-relative"
                  :style="{left: SettingsMenu ? '-60rem' : '0vw'}"
                  >
                    <div>
                      <div class="my-2 mx-16 d-flex justify-center">
                        <v-icon color="custom_drawer_icon" class="mx-2">mdi-cog</v-icon>
                        <h3 style="font-weight: normal;">Beállítások</h3>
                      </div>
                      <v-divider color="default_btn_bc" style="transition: .3s;"></v-divider>
                      <v-expand-transition>
                        <div class="w-100 d-flex align-center pa-2 pl-4 cursor-pointer position-relativ custom-drawer-btn" style="border-radius: 0;" @click="ProfSettingsActive">
                          <v-icon style="flex: 0; text-align: center;" size="20">mdi-account</v-icon>
                          <h4
                            style="flex: 1; text-align: center; margin: 0; text-transform: capitalize; font-weight: normal;"
                          >
                            fiók
                          </h4>
                          <v-slide-x-reverse-transition hide-on-leave>
                            <div 
                            v-if="ProfSettingDraw" 
                            style="background-color: rgb(var(--v-theme-surface)); position: absolute; max-width: 2rem; max-height: 2rem; width: 100%; height: 100%; right: 0; border-top-left-radius: 20px; border-bottom-left-radius: 20px; transition: .3s;"
                            class="d-flex align-center"
                            >
                              <v-icon color="custom_drawer_icon" class="ml-1">mdi-radiobox-marked</v-icon>
                            </div>
                          </v-slide-x-reverse-transition>
                        </div>
                      </v-expand-transition>
                      <v-divider inset color="default_btn_bc" style="transition: .3s;"></v-divider>
                      <v-expand-transition>
                        <div class="rounded-0 w-100 d-flex align-center pa-2 pl-4 cursor-pointer position-relativ custom-drawer-btn" @click="EmailSettingsActive">
                          <v-icon style="flex: 0; text-align: center;" size="20">mdi-email</v-icon>
                          <h4 style="flex: 1; text-align: center; margin: 0; text-transform: capitalize; font-weight: normal;">
                            email
                          </h4>
                          <v-slide-x-reverse-transition hide-on-leave>
                            <div 
                            v-if="EmailSettingDraw" 
                            style="background-color: rgb(var(--v-theme-surface)); position: absolute; max-width: 2rem; max-height: 2rem; width: 100%; height: 100%; right: 0; border-top-left-radius: 20px; border-bottom-left-radius: 20px; transition: .3s;"
                            class="d-flex align-center"
                            >
                              <v-icon color="custom_drawer_icon" class="ml-1">mdi-radiobox-marked</v-icon>
                            </div>
                          </v-slide-x-reverse-transition>
                        </div>
                      </v-expand-transition>
                      <v-divider inset color="default_btn_bc" style="transition: .3s;"></v-divider>
                      <v-expand-transition>
                        <div class="rounded-0 w-100 d-flex align-center pa-2 pl-4 cursor-pointer position-relativ custom-drawer-btn" @click="PassSettingsActive">
                          <v-icon style="flex: 0; text-align: center;" size="20">mdi-lock</v-icon>
                          <h4 style="flex: 1; text-align: center; margin: 0; text-transform: capitalize; font-weight: normal;">
                            jelszó
                          </h4>
                          <v-slide-x-reverse-transition hide-on-leave>
                            <div 
                            v-if="PassSettingDraw" 
                            style="background-color: rgb(var(--v-theme-surface)); position: absolute; max-width: 2rem; max-height: 2rem; width: 100%; height: 100%; right: 0; border-top-left-radius: 20px; border-bottom-left-radius: 20px; transition: .3s;"
                            class="d-flex align-center"
                            >
                              <v-icon color="custom_drawer_icon" class="ml-1">mdi-radiobox-marked</v-icon>
                            </div>
                          </v-slide-x-reverse-transition>
                        </div>
                      </v-expand-transition>

                      <v-divider inset color="default_btn_bc" style="transition: .3s;"></v-divider>
                      
                      <v-expand-transition>
                        <div class="rounded-0 w-100 d-flex align-center pa-2 pl-4 cursor-pointer position-relativ custom-drawer-btn" @click="NotifActive">
                          <v-icon style="flex: 0; text-align: center;" size="20">mdi-bell</v-icon>
                          <h4 style="flex: 1; text-align: center; margin: 0; text-transform: capitalize; font-weight: normal;">
                            értesítések
                          </h4>
                          <v-slide-x-reverse-transition hide-on-leave>
                            <div 
                            v-if="NotifDraw" 
                            style="background-color: rgb(var(--v-theme-surface)); position: absolute; max-width: 2rem; max-height: 2rem; width: 100%; height: 100%; right: 0; border-top-left-radius: 20px; border-bottom-left-radius: 20px; transition: .3s;"
                            class="d-flex align-center"
                            >
                              <v-icon color="custom_drawer_icon" class="ml-1">mdi-radiobox-marked</v-icon>
                            </div>
                          </v-slide-x-reverse-transition>
                        </div>
                      </v-expand-transition>

                      <v-divider color="default_btn_bc" style="transition: .3s;"></v-divider>
                      
                      <div class="my-2 d-flex justify-center">
                        <v-icon color="custom_drawer_icon" class="mx-2">mdi-shield</v-icon>
                        <h3 style="font-weight: normal;">Admin panel</h3>
                      </div>

                      <v-divider color="default_btn_bc" style="transition: .3s;"></v-divider>

                      <v-expand-transition>
                        <div class="w-100 d-flex align-center pa-2 pl-4 cursor-pointer position-relativ custom-drawer-btn" style="border-radius: 0;" @click="UsersActive">
                          <v-icon style="flex: 0; text-align: center;">mdi-account-multiple</v-icon>
                          <h4
                            style="flex: 1; text-align: center; margin: 0; text-transform: capitalize; font-weight: normal;"
                          >
                          felhasználók 
                          </h4>
                          <v-slide-x-reverse-transition hide-on-leave>
                            <div 
                            v-if="UsersDraw" 
                            style="background-color: rgb(var(--v-theme-surface)); position: absolute; max-width: 2rem; max-height: 2rem; width: 100%; height: 100%; right: 0; border-top-left-radius: 20px; border-bottom-left-radius: 20px; transition: .3s;"
                            class="d-flex align-center"
                            >
                              <v-icon color="custom_drawer_icon" class="ml-1"  size="20">mdi-radiobox-marked</v-icon>
                            </div>
                          </v-slide-x-reverse-transition>
                        </div>
                      </v-expand-transition>

                      <v-divider inset color="default_btn_bc" style="transition: .3s;"></v-divider>

                      <v-expand-transition>
                        <div class="w-100 d-flex align-center pa-2 pl-4 cursor-pointer position-relativ custom-drawer-btn" style="border-radius: 0;" @click="AdminNotifActive">
                          <v-icon style="flex: 0; text-align: center;">mdi-alert-circle</v-icon>
                          <h4
                            style="flex: 1; text-align: center; margin: 0; text-transform: capitalize; font-weight: normal;"
                          >
                          bejelentések
                          </h4>
                          <v-slide-x-reverse-transition hide-on-leave>
                            <div 
                            v-if="AdminNotifDraw" 
                            style="background-color: rgb(var(--v-theme-surface)); position: absolute; max-width: 2rem; max-height: 2rem; width: 100%; height: 100%; right: 0; border-top-left-radius: 20px; border-bottom-left-radius: 20px; transition: .3s;"
                            class="d-flex align-center"
                            >
                              <v-icon color="custom_drawer_icon" class="ml-1"  size="20">mdi-radiobox-marked</v-icon>
                            </div>
                          </v-slide-x-reverse-transition>
                        </div>
                      </v-expand-transition>

                      <v-divider color="default_btn_bc" style="transition: .3s;"></v-divider>
                    </div>

                </div>

                <v-main 
                class="d-flex flex-column justify-center py-4 px-2 position-relative" 
                style="height: auto; z-index: 3;"
                :style="{left: SettingsMenu ? '-16.25em' : '0vw', width: isMobile ? '100%' : ''}"
                >
                  <div v-if="isMobile" style="height: max-content; width: 100%;" class="pl-2">
                    <v-icon size="30" icon @click="SettingsMenu = !SettingsMenu">
                      mdi-menu
                    </v-icon>
                  </div>

                  <div style="height: 100%;">
                    <v-slide-y-transition mode="out-in">
                        <div :key="activePanel" class="w-100" style="height: auto;">
                            
                            <v-fade-transition mode="out-in">
                                <div v-if="activePanel == 'profile'" class="d-flex flex-column justify-center">
                                    <h1 class="text-center">Fiók név változtatás</h1>

                                    <div 
                                    class="d-flex"
                                    :class="{
                                        'flex-column mt-1': isMobile, 
                                        'mt-5 ga-5 align-center': !isMobile
                                    }"
                                    >
                                    <v-text-field
                                        clearable
                                        v-model="userNameInput"
                                        :label="get_fullUser.user_name"
                                        variant="outlined"
                                        :disabled="ProfInputDisabled || ConfirmCode"
                                        placeholder="Felhasználó név..."
                                        :rules="[ 
                                        (v) => (!v || v.length >= 6) || 'Minimum 6 karakteres név kell.', 
                                        (v) => (!v || v.length <= 24) || 'Maximum 24 karakter lehet.' 
                                        ]"
                                    />
                                    <div 
                                    class="d-flex ga-2 position-relative" 
                                    :class="{
                                        'justify-space-around': isMobile, 
                                    }"
                                    :style="{top: !isMobile ? '-1rem' : ''}">
                                        <v-btn variant="flat" @click="ProfInputDisabled = false" :disabled="!ProfInputDisabled">Módosítás</v-btn>
                                        <v-expand-transition>
                                        <v-btn
                                            :disabled="ProfInputDisabled || !userNameInput || userNameInput === get_user_name || userNameInput.length < 6 || userNameInput.length > 24"
                                            :loading="loading"
                                            variant="flat"
                                            @click="SendConfirmCode"
                                            v-if="!ConfirmCode"
                                        >
                                            Mentés
                                        </v-btn>
                                        </v-expand-transition>
                                    </div>
                                    </div>
                                </div>
                            </v-fade-transition>

                        </div>
                    </v-slide-y-transition>
                  </div>
                </v-main>
            </v-layout>
        </v-card>
    </v-dialog>

</template>

<script setup>
import { useRouter, useRoute } from 'vue-router';
import { ref, computed, inject, onMounted } from 'vue'
import { useDisplay } from 'vuetify';
import { useTheme } from 'vuetify';
import { useChangeDarkmode, useGetProfil } from '@/api/profile/profileQuery';

const showError = inject("showError");
const showSucces = inject("showSucces");

const { mobile } = useDisplay();
const isMobile = computed(() => mobile.value);

const get_token = getCookie("user");
const route = useRoute();
const router = useRouter();
const theme = useTheme();
const value = ref(0);
const drawer = ref(false);
const DarkmodeChange = ref(false);
const dialog = ref(false);
const ProfSettingDraw = ref(true);
const EmailSettingDraw = ref(false);
const PassSettingDraw = ref(false);
const NotifDraw = ref(false);
const UsersDraw = ref(false);
const AdminNotifDraw = ref(false);
const activePanel = ref('profile');
const userNameInput = ref('');
const userEmailInput = ref('');
const CurrentPasswordInput = ref('');
const NewPasswordInput = ref('');
const NewPasswordConfirmInput = ref('');
const otpCode = ref(null);
const ResponseContent = ref(null);
const ResponseError = ref(null);
const ReportLoading = ref(false);
const UsersLoading = ref(false);
const NotifsLoading = ref(false);
const SettingsMenu = ref(false);
const ReportDelete = ref(false);
const ReportAccept = ref(false);
const CloseMessage = ref('');
const searchQuery = ref('');
const users_UserName = ref('');
const users_UserEmail = ref('');
const users_UserPassword = ref('');
const loading = ref(false);
const get_fullUser = ref(null);

function ProfSettingsActive(){
  ProfSettingDraw.value = true;
  EmailSettingDraw.value = false;
  PassSettingDraw.value = false;
  NotifDraw.value = false;
  LeaderBoardDraw.value = false;
  PostDraw.value = false;
  UsersDraw.value = false;
  AdminNotifDraw.value = false;
  activePanel.value = 'profile';
  ResponseContent.value = null;
  ResponseError.value = null;
  userNameInput.value = '';
  userEmailInput.value = '';
  CurrentPasswordInput.value = '';
  NewPasswordInput.value = '';
  NewPasswordConfirmInput.value = '';

  EmailInputDisabled.value = true;
  loading.value = false;
}

function EmailSettingsActive(){
  ProfSettingDraw.value = false;
  EmailSettingDraw.value = true;
  PassSettingDraw.value = false;
  NotifDraw.value = false;
  LeaderBoardDraw.value = false;
  PostDraw.value = false;
  UsersDraw.value = false;
  AdminNotifDraw.value = false;
  activePanel.value = 'email';
  ResponseContent.value = null;
  ResponseError.value = null;
  userNameInput.value = '';
  userEmailInput.value = '';
  CurrentPasswordInput.value = '';
  NewPasswordInput.value = '';
  NewPasswordConfirmInput.value = '';
  
  ProfInputDisabled.value = true;
  ConfirmCode.value = false;
  loading.value = false;
}

function PassSettingsActive(){
  ProfSettingDraw.value = false;
  EmailSettingDraw.value = false;
  PassSettingDraw.value = true;
  NotifDraw.value = false;
  LeaderBoardDraw.value = false;
  PostDraw.value = false;
  UsersDraw.value = false;
  AdminNotifDraw.value = false;
  activePanel.value = 'password';
  ResponseContent.value = null;
  ResponseError.value = null;
  userNameInput.value = '';
  userEmailInput.value = '';
  CurrentPasswordInput.value = '';
  NewPasswordInput.value = '';
  NewPasswordConfirmInput.value = '';
  
  ProfInputDisabled.value = true;
  EmailInputDisabled.value = true;
  ConfirmCode.value = false;
  loading.value = false;
}

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

const {mutate: getProfil} = useGetProfil();

onMounted(async () => {
  if(get_token){
    await getProfil(get_token, {
      onSuccess: (load_user) => {
        get_fullUser.value = load_user;
        DarkmodeChange.value = load_user.Usersetting.darkmode;
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
        get_fullUser.value.Usersetting.darkmode = DarkmodeChange.value;
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