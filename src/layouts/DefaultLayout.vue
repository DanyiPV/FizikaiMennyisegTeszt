<template>
    <v-layout class="overflow-visible" v-if="isMobile">
      <v-bottom-navigation
        v-model="colorStore.value"
        :bg-color="color_BottomNav"
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
          <v-icon>mdi-file-document-edit</v-icon>
          <span>Dolgozat</span>
        </v-btn>

        <v-btn @click="router.push({name: 'learning'})">
          <v-icon>mdi-school</v-icon>
          <span>Tanulás</span>
        </v-btn>

        <v-btn>
          <v-icon>mdi-chart-bar</v-icon>
          <span>Eredmény</span>
        </v-btn>

        <v-btn
          v-if="get_fullUser && ((get_fullUser.osztaly == 'T' && get_fullUser.user_role == 'teacher') || (get_fullUser.osztaly == 'A' && get_fullUser.user_role == 'admin'))"
        >
          <v-icon>mdi-book-plus</v-icon>
          <span>Kiírás</span>
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
                    <v-btn icon @click="dialog = true" v-if="get_fullUser">
                      <v-avatar size="40">
                        <template v-if="get_fullUser.Usersetting.profPic">
                          <img
                            :src="get_fullUser.Usersetting.profPic"
                            style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 100%; height: 100%; object-fit: cover;"
                          />
                        </template>
                        <template v-else>
                          <v-icon size="25" color="icon_color">mdi-account</v-icon>
                        </template>
                      </v-avatar>
                    </v-btn>

                    
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
                      style="border: .1vw solid rgb(var(--v-theme-text_color)); height: max-content; width: 100%; display: block; align-items: center; justify-content: center; background-color: transparent;"
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
                      style="border: .1vw solid rgb(var(--v-theme-text_color)); height: max-content; width: 100%; display: block; align-items: center; justify-content: center; background-color: transparent;"
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
                      style="border: .1vw solid rgb(var(--v-theme-text_color)); height: max-content; width: 100%; display: block; align-items: center; justify-content: center; background-color: transparent;"
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
                      style="border: .1vw solid rgb(var(--v-theme-text_color)); height: max-content; width: 100%; display: block; align-items: center; justify-content: center; background-color: transparent;"
                      class="justify-center rounded cursor-pointer py-2 px-0 w-100"
                      @click="router.push({name: 'learning'}); colorStore.value = 3"
                      >
                          <div class="d-flex align-center ga-3 w-100" style="width: 100%; height: 100%;">
                              <v-icon size="30" class="ml-4">mdi-school-outline</v-icon>
                              <h1 style="text-transform: uppercase; width: 100%;">Tanulás</h1>
                          </div>
                      </v-btn>
                    </v-list-item>

                    <v-list-item class="pa-0 px-2">
                      <v-btn
                      style="border: .1vw solid rgb(var(--v-theme-text_color)); height: max-content; width: 100%; display: block; align-items: center; justify-content: center; background-color: transparent;"
                      class="justify-center rounded cursor-pointer py-2 px-0 w-100"
                      >
                          <div class="d-flex align-center ga-3 w-100" style="width: 100%; height: 100%;">
                              <v-icon size="30" class="ml-4">mdi-chart-bar</v-icon>
                              <h1 style="text-transform: uppercase; width: 100%;">Eredmény</h1>
                          </div>
                      </v-btn>
                    </v-list-item>

                    <v-list-item class="pa-0 px-2" v-if="get_fullUser && ((get_fullUser.osztaly == 'T' && get_fullUser.user_role == 'teacher') || (get_fullUser.osztaly == 'A' && get_fullUser.user_role == 'admin'))">
                      <v-btn
                      style="border: .1vw solid rgb(var(--v-theme-text_color)); height: max-content; width: 100%; display: block; align-items: center; justify-content: center; background-color: transparent;"
                      class="justify-center rounded cursor-pointer py-2 px-0 w-100"
                      >
                          <div class="d-flex align-center ga-3 w-100" style="width: 100%; height: 100%;">
                              <v-icon size="30" class="ml-4">mdi-book-plus</v-icon>
                              <h1 style="text-transform: uppercase; width: 100%;">Kiírás</h1>
                          </div>
                      </v-btn>
                    </v-list-item>

                </v-list>
            </v-navigation-drawer>

            <v-main style="min-height: 100vh; background-color: rgb(var(--v-theme-background));">
                <RouterView></RouterView>

                <div v-if="isMobile" class="mb-14">

                </div>
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
                        <div class="rounded-0 w-100 d-flex align-center pa-2 pl-4 cursor-pointer position-relativ custom-drawer-btn" @click="editPicActive">
                          <v-icon style="flex: 0; text-align: center;" size="20">mdi-image-edit</v-icon>
                          <h4 style="flex: 1; text-align: center; margin: 0; font-weight: normal;">
                            Profil kép
                          </h4>
                          <v-slide-x-reverse-transition hide-on-leave>
                            <div 
                            v-if="editPicDraw" 
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
                        <div class="w-100 d-flex align-center pa-2 pl-4 cursor-pointer position-relativ custom-drawer-btn" style="border-radius: 0;" @click="ProfSettingsActive">
                          <v-icon style="flex: 0; text-align: center;" size="20">mdi-account</v-icon>
                          <h4
                            style="flex: 1; text-align: center; margin: 0; font-weight: normal;"
                          >
                            Fiók név
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

                      <v-divider color="default_btn_bc" style="transition: .3s;"></v-divider>
                      
                      <div class="my-2 d-flex justify-center" v-if="get_fullUser.admin && get_fullUser.user_role == 'admin' && get_fullUser.osztaly == 'A'">
                        <v-icon color="custom_drawer_icon" class="mx-2">mdi-shield</v-icon>
                        <h3 style="font-weight: normal;">Admin panel</h3>
                      </div>

                      <v-divider color="default_btn_bc" style="transition: .3s;" v-if="get_fullUser.admin && get_fullUser.user_role == 'admin' && get_fullUser.osztaly == 'A'"></v-divider>

                      <v-expand-transition>
                        <div class="w-100 d-flex align-center pa-2 pl-4 cursor-pointer position-relativ custom-drawer-btn" style="border-radius: 0;" @click="UsersActive" v-if="get_fullUser.admin && get_fullUser.user_role == 'admin' && get_fullUser.osztaly == 'A'">
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

                      <v-divider inset color="default_btn_bc" style="transition: .3s;" v-if="get_fullUser.admin && get_fullUser.user_role == 'admin' && get_fullUser.osztaly == 'A'"></v-divider>

                      <v-expand-transition>
                        <div class="w-100 d-flex align-center pa-2 pl-4 cursor-pointer position-relativ custom-drawer-btn" style="border-radius: 0;" @click="AdminNotifActive" v-if="get_fullUser.admin && get_fullUser.user_role == 'admin' && get_fullUser.osztaly == 'A'">
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

                      <v-divider color="default_btn_bc" style="transition: .3s;" v-if="get_fullUser.admin && get_fullUser.user_role == 'admin' && get_fullUser.osztaly == 'A'"></v-divider>
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
                            <div v-if="activePanel == 'editPic'" class="d-flex flex-column justify-center">
                              <h1 class="text-center">Profil kép megváltoztatása</h1>

                              <div style="min-height: 15vh; max-height: 30vh;" class="d-flex justify-center mt-2">
                                <v-btn 
                                  icon
                                  elevation="0"
                                  class="elevation-2"
                                  :style="{
                                    borderRadius: '50%',
                                    width: '11rem',
                                    height: '11rem',
                                    overflow: 'hidden',
                                    position: 'relative',
                                    pointerEvents: 'visible'
                                    }"
                                  @click="triggerProfPicFileInput"
                                  >
                                  <template v-if="get_fullUser.Usersetting.profPic">
                                    <img
                                      :src="get_fullUser.Usersetting.profPic"
                                      class="profile-image"
                                      @error="handleProfImageError"
                                      style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 100%; height: 100%; object-fit: cover;"
                                    />
                                  </template>
                                  <template v-else>
                                    <img src="/src/components/background/test_profile.jpg"  alt="" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 100%; height: 100%; object-fit: cover;">
                                  </template>
                                </v-btn>
                                
                                <input
                                type="file"
                                ref="fileProfPicInput"
                                style="display: none;"
                                @change="handleProfPicUpload"
                                />
                              </div>

                              <div class="d-flex justify-center mt-1">
                                <p style="opacity: .7; color: rgb(var(--v-theme-text_color));">Kattints a képre a cseréhez!</p>
                              </div>
                              <div class="d-flex justify-center mt-3">
                                <div style="width: max-content; background-color: rgb(var(--v-theme-settings_drawer_bc)); box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);" class="px-8 py-1 rounded-pill cursor-default">
                                  <h2 style="color: rgb(var(--v-theme-text_color)); font-style: italic;">{{ get_fullUser.user_name }}</h2>
                                </div>
                              </div>

                            </div>
                          </v-fade-transition>

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
                                        :disabled="ProfInputDisabled || !userNameInput || userNameInput === get_fullUser.user_name || userNameInput.length < 6 || userNameInput.length > 24"
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

                        <v-fade-transition mode="out-in">
                          <div v-if="activePanel == 'email'" class="w-100">
                            <h1 class="text-center">Email változtatás</h1>

                            <div 
                              class="d-flex"
                              :class="{
                                'flex-column mt-1': isMobile, 
                                'mt-5 ga-5 align-center': !isMobile
                              }"
                            >
                              <v-text-field
                              v-model="userEmailInput"
                              clearable
                              :label="get_fullUser.email"
                              variant="outlined"
                              :disabled="EmailInputDisabled || ConfirmCode"
                              placeholder="Email cím..."
                              ></v-text-field>
                              <div 
                              class="d-flex ga-2 position-relative" 
                              :class="{
                                'justify-space-around mt-2': isMobile, 
                              }"
                              :style="{top: !isMobile ? '-1rem' : ''}">
                                <v-btn variant="flat" @click="EmailInputDisabled = false" :disabled="!EmailInputDisabled">Módosítás</v-btn>
                                <v-btn
                                :disabled="EmailInputDisabled || !userEmailInput || userNameInput === get_fullUser.email"
                                :loading="loading"
                                variant="flat"
                                @click="SendConfirmCode"
                                v-if="!ConfirmCode"
                                >
                                Mentés
                                </v-btn>
                              </div>
                            </div>
                          </div>
                        </v-fade-transition>

                        <v-fade-transition mode="out-in">
                          <div v-if="activePanel == 'password'" class="w-100">
                            <h1 class="text-center">Jelszó változtatás</h1>

                            <div class="d-flex flex-column align-center my-5 ga-5 w-100">
                              <v-text-field
                              v-model="CurrentPasswordInput"
                              clearable
                              variant="outlined"
                              label="Jelenlegi jelszó"
                              style="width: 80%;"
                              ></v-text-field>
                              <v-text-field
                              v-model="NewPasswordInput"
                              clearable
                              variant="outlined"
                              label="Új jelszó"
                              style="width: 80%;"
                              :rules="[
                                (v) => (CurrentPasswordInput == '' || v != CurrentPasswordInput) || 'Nem lehet ugyan az a jelszó!',
                                (v) => (!v || v.length >= 8) || 'Minimum 8 karakteres jelszó kell.',
                                (v) => (!v || v.length <= 30) || 'Maximum 30 karakter lehet.'
                              ]"
                              ></v-text-field>
                              <v-text-field
                              v-model="NewPasswordConfirmInput"
                              clearable
                              variant="outlined"
                              label="Új jelszó megerősítése"
                              style="width: 80%;"
                              :rules="[
                                (v) => (!v || !NewPasswordInput || v == NewPasswordInput) || 'A jelszavak nem egyeznek.',
                              ]"
                              ></v-text-field>
                              <v-btn
                                :disabled="!CurrentPasswordInput || !NewPasswordInput || !NewPasswordConfirmInput || CurrentPasswordInput == NewPasswordInput || NewPasswordInput != NewPasswordConfirmInput || NewPasswordInput.length < 8 || NewPasswordInput.length > 30"
                                :loading="loading"
                                variant="flat"
                                @click="SendConfirmCode"
                                >
                                Mentés
                                </v-btn>
                            </div>
                          </div>
                        </v-fade-transition>

                        <v-fade-transition mode="out-in">
                          <div v-if="activePanel == 'users'" class="w-100 h-100">
                            <h1 class="text-center mb-2">Felhasználók</h1>
                              <div 
                                class="d-flex"
                                :class="{
                                  'flex-column mt-1': isMobile, 
                                  'mt-5 ga-5 align-center': !isMobile
                                }"
                              >
                                <v-text-field
                                  v-model="searchQuery"
                                  label="Keresés"
                                  clearable
                                  icon="mdi-magnify"
                                  variant="outlined"
                                  :style="{width: isMobile ? '100%' : '40%'}"
                                >
                                </v-text-field>
                                <div
                                class="d-flex position-relative" 
                                :class="{
                                  'justify-space-around mb-2': isMobile, 
                                }"
                                :style="{top: !isMobile ? '-1rem' : ''}">
                                <div 
                                :style="{width: isMobile ? '50%' : ''}"
                                :class="{
                                  'mr-3': !isMobile, 
                                }">
                                  <div class="d-flex ga-1">
                                    <v-btn elevation="0" @click="AdminType('A')" style="width: 50%;" :style="{backgroundColor: adminTypeButton == 'A' ? 'gray' : 'transparent'}">admin</v-btn>
                                    <v-divider vertical></v-divider>
                                    <v-btn elevation="0" @click="AdminType('T')" style="width: 50%;" :style="{backgroundColor: adminTypeButton == 'T' ? 'gray' : 'transparent'}">tanár</v-btn>
                                  </div>
                                  <v-divider></v-divider>
                                  <div class="d-flex ga-1">
                                    <v-btn elevation="0" @click="ActivatedType(2)" style="width: 50%;" :style="{backgroundColor: activatedTypeButton == 2 ? 'gray' : 'transparent'}">bannolt</v-btn>
                                    <v-divider vertical></v-divider>
                                    <v-btn elevation="0" @click="ActivatedType(0)" style="width: 50%;" :style="{backgroundColor: activatedTypeButton == 0 ? 'gray' : 'transparent'}">nem aktivált</v-btn>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div style="border: .1vw solid rgb(var(--v-theme-text_color)); height: auto; min-height: 40vh; max-height: 40vh; overflow: auto;" class="rounded mb-5 mt-2 pt-2 px-2 d-flex flex-column adminUsers">
                              
                              <v-expansion-panels v-for="(user, index) in AllUsers" class="d-flex" elevation="0" style="position: relative;" @update:modelValue="handlePanelToggle">
                                <v-slide-y-transition mode="out-in">
                                  <v-expansion-panel style="background-color: rgb(var(--v-theme-settings_drawer_bc)); position: relative;" class="mb-2">
                                    <v-expansion-panel-title class="px-4 py-2">
                                      <div class="w-100 rounded position-relative align-center d-flex">
                                        <div class="d-flex flex-row ga-2 my-1 align-center">
                                          <v-tooltip location="right">
                                            <template v-slot:activator="{ props }">
                                              <div 
                                                v-bind="props" 
                                                class="d-flex flex-row align-center pa-1 pr-3 rounded-pill" 
                                                style="width: max-content; cursor: pointer; background-color: rgb(var(--v-theme-primary));"
                                              >
                                              <div>
                                                <img 
                                                  :src="user.Usersetting.profPic == null ? '/src/components/background/test_profile.jpg' : user.Usersetting.profPic"  
                                                  alt="" 
                                                  style="height: 3rem; width: 3rem; border-radius: 50%;" 
                                                  class="mr-3"
                                                >
                                              </div>
                                                <h2 style="font-weight: normal;">{{ user.user_name }}</h2>
                                              </div>
                                            </template>
                                            <span>{{ user.user_role }}</span>
                                          </v-tooltip>
                                        </div>
                                        <div style="position: absolute; right: 2vw; background-color: rgb(var(--v-theme-error), .2);" class="pa-2 rounded-pill" v-if="user.activated == 2">
                                          <h3 style="color: rgb(var(--v-theme-error));">KITíLTVA</h3>
                                        </div>
                                        <div style="position: absolute; right: 2vw; background-color: rgb(var(--v-theme-warning), .2);" class="pa-2 rounded-pill" v-if="user.activated == 0">
                                          <h3 style="color: rgb(var(--v-theme-warning));">NEM AKTIVÁLVA</h3>
                                        </div>
                                        <div style="position: absolute; right: 2vw; background-color: rgb(var(--v-theme-admin_bc), .2);" class="pa-2 rounded-pill" v-if="user.admin">
                                          <h3 style="color: rgb(var(--v-theme-admin_bc));">ADMIN</h3>
                                        </div>
                                        <div style="position: absolute; right: 2vw; background-color: rgb(var(--v-theme-teacher_bc), .2);" class="pa-2 rounded-pill" v-if="!user.admin && user.osztaly != null && user.osztaly == 'T'">
                                          <h3 style="color: rgb(var(--v-theme-teacher_bc));">TANÁR</h3>
                                        </div>
                                        <div style="position: absolute; right: 2vw; background-color: rgb(var(--v-theme-student_bc), .2);" class="pa-2 rounded-pill" v-if="!user.admin && user.osztaly != null && user.osztaly != 'T' && user.osztaly != 'A'">
                                          <h3 style="color: rgb(var(--v-theme-student_bc));">{{ user.osztaly }}</h3>
                                        </div>
                                      </div>
                                    </v-expansion-panel-title>

                                    <v-expansion-panel-text style="position: relative;">

                                      <h4 style="font-weight: normal;" class="mt-1 ml-2">Név megváltoztatás (A felhasználó névnek min. 6 és max. 24 karakter lehet!):</h4>

                                      <div 
                                      class="d-flex align-center ga-2 my-2"
                                      :class="{
                                        'flex-column mt-1': isMobile
                                      }"
                                      >
                                        <v-text-field v-model="users_UserName" :label="user.user_name" variant="outlined" hide-details :style="{width: isMobile ? '100%' : ''}"></v-text-field>
                                        <v-btn variant="flat" @click="setNewSetting(user,user.id, users_UserName, 1)" :disabled="!users_UserName">változtatás</v-btn>
                                      </div>
                                      
                                      <h4 style="font-weight: normal;" class="mt-1 ml-2">Email megváltoztatás (A felhasználó eamil címe max. 35 karakter lehet!):</h4>

                                      <div 
                                      class="d-flex align-center ga-2 my-2"
                                      :class="{
                                        'flex-column mt-1': isMobile
                                      }"
                                      >
                                        <v-text-field v-model="users_UserEmail" :label="user.email" variant="outlined" hide-details :style="{width: isMobile ? '100%' : ''}"></v-text-field>
                                        <v-btn variant="flat" @click="setNewSetting(user,user.id, users_UserEmail, 2)" :disabled="!users_UserEmail">változtatás</v-btn>
                                      </div>

                                      <h4 style="font-weight: normal;" class="ml-2">Jelszó megváltoztatás (A felhasználó jelszava min. 8 és max. 24 karakter lehet!):</h4>

                                      <div 
                                      class="d-flex align-center ga-2 my-2"
                                      :class="{
                                        'flex-column mt-1': isMobile
                                      }"
                                      >
                                        <v-text-field v-model="users_UserPassword" label="új jelszó..."variant="outlined" hide-details :style="{width: isMobile ? '100%' : ''}"></v-text-field>
                                        <v-btn variant="flat" @click="setNewSetting(user,user.id, users_UserPassword, 3)" :disabled="!users_UserPassword">változtatás</v-btn>
                                      </div>

                                      <div class="d-flex flex-column align-start" style="width: 30%;" v-if="user.osztaly == null && user.user_role == 'student'">
                                        <div class="d-flex ga-2 mt-4 mb-2" style="width: 100%;">
                                          <v-combobox
                                            v-model="selectedYear"
                                            label="Évfolyam"
                                            :items="['9', '10', '11']"
                                            variant="outlined"
                                            style="width: 100%;"
                                            hide-details
                                          ></v-combobox>
                                    
                                          <v-combobox
                                            v-model="selectedClass"
                                            label="Osztály"
                                            :items="['A', 'B', 'C', 'K']"
                                            variant="outlined"
                                            style="width: 100%;"
                                            hide-details
                                          ></v-combobox>
                                        </div>
                                        <div class="d-flex justify-center" style="width: 100%;">
                                          <v-btn variant="flat" @click="setClass(user,selectedYear + '/' + selectedClass)">beállít</v-btn>
                                        </div>
                                      </div>


                                      <div class="d-flex ga-5 pl-1 mt-10 position-relative">
                                        <v-tooltip location="top">
                                          <template v-slot:activator="{ props }">
                                            <div v-if="user.activated == 0" v-bind="props">
                                              <v-btn variant="flat" @click="setUserRoles(user, user.id, 1)">
                                                <v-icon size="25">mdi-account-check</v-icon>
                                              </v-btn>
                                            </div>
                                          </template>
                                          <span>AKTIVÁLÁS</span>
                                        </v-tooltip>

                                        <v-tooltip location="top">
                                          <template v-slot:activator="{ props }">
                                            <div v-if="user.activated != 2" v-bind="props">
                                              <v-btn variant="flat" @click="setUserRoles(user, user.id, 2)">
                                                <v-icon size="25">mdi-account-lock</v-icon>
                                              </v-btn>
                                            </div>
                                          </template>
                                          <span>KITILTÁS</span>
                                        </v-tooltip>

                                        <v-tooltip location="right">
                                          <template v-slot:activator="{ props }">
                                            <div v-if="user.activated == 2" v-bind="props">
                                              <v-btn variant="flat" @click="setUserRoles(user, user.id, 3)">
                                                <v-icon size="25">mdi-account-lock-open</v-icon>
                                              </v-btn>
                                            </div>
                                          </template>
                                          <span>KITILTÁS VISSZAVONÁSA</span>
                                        </v-tooltip>
                
                                        <v-tooltip location="right">
                                          <template v-slot:activator="{ props }">
                                            <div v-if="!user.admin && user.osztaly != null && user.activated == 1 && user.osztaly != 'T'" v-bind="props">
                                              <v-btn variant="flat" @click="setUserRoles(user, user.id, 6)">
                                                <v-icon size="25">mdi-account-school</v-icon>
                                              </v-btn>
                                            </div>
                                          </template>
                                          <span>TANÁRRÁ AVATÁS</span>
                                        </v-tooltip>

                                        <v-tooltip location="top">
                                          <template v-slot:activator="{ props }">
                                            <div v-if="!user.admin && user.osztaly != null && user.activated == 1 && user.osztaly == 'T'" v-bind="props">
                                              <v-btn variant="flat" @click="setUserRoles(user, user.id, 3)">
                                                <v-icon size="25">mdi-account-remove</v-icon>
                                              </v-btn>
                                            </div>
                                          </template>
                                          <span>TANÁR MEGVONÁS</span>
                                        </v-tooltip>

                                        <v-tooltip location="right">
                                          <template v-slot:activator="{ props }">
                                            <div v-if="!user.admin && user.osztaly != null && user.activated == 1  && user.osztaly == 'T'" v-bind="props">
                                              <v-btn variant="flat" @click="setUserRoles(user, user.id, 4)">
                                                <v-icon size="25">mdi-key</v-icon>
                                              </v-btn>
                                            </div>
                                          </template>
                                          <span>ADMINNÁ AVATÁS</span>
                                        </v-tooltip>

                                        <v-tooltip location="right">
                                          <template v-slot:activator="{ props }">
                                            <div v-if="user.admin && user.osztaly != null && user.osztaly == 'A'" v-bind="props">
                                              <v-btn variant="flat" @click="setUserRoles(user, user.id, 5)">
                                                <v-icon size="25">mdi-key-remove</v-icon>
                                              </v-btn>
                                            </div>
                                          </template>
                                          <span>ADMIN MEGVONÁS</span>
                                        </v-tooltip>

                                      </div>
                                    </v-expansion-panel-text>
                                  </v-expansion-panel>
                                </v-slide-y-transition>
                              </v-expansion-panels>
                              
                              <div class="d-flex justify-center mx-3 my-5" v-if="UsersLoading">
                                <v-progress-circular indeterminate></v-progress-circular>
                              </div>
                            </div>
                          </div>
                        </v-fade-transition>

                        <v-expand-transition mode="out-in">
                          <div v-if="ConfirmCode && ResponseContent == null" class="text-center mt-4">
                            <h4 style="font-weight: normal;">A megerősítő kód el lett küldve email-ben!</h4>
                            <v-otp-input v-model="otpCode" length="6"></v-otp-input>
                          </div>
                        </v-expand-transition>

                        <v-expand-transition mode="out-in">
                          <div v-if="ResponseContent != null" class="text-center mt-4">
                            <h2>{{ ResponseContent }}</h2>
                          </div>
                        </v-expand-transition>

                        <v-expand-transition mode="out-in">
                          <div v-if="ResponseError != null" class="text-center my-4">
                            <v-icon size="50" color="red">mdi-alert</v-icon>
                            <h2 style="color: red;">{{ ResponseError }}</h2>
                          </div>
                        </v-expand-transition>

                      </div>
                    </v-slide-y-transition>
                  </div>
                </v-main>
            </v-layout>
            <v-divider></v-divider>
            <v-card-actions>
              <v-btn
                text="Bezárás"
                variant="plain"
                @click="dialog = false"
              ></v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

</template>

<script setup>
import { useRouter, useRoute } from 'vue-router';
import { ref, computed, inject, onMounted, watch } from 'vue'
import { useDisplay, useTheme } from 'vuetify';
import { useChangeDarkmode, useGetProfil } from '@/api/profile/profileQuery';
import { useGetSettingsConfirm, useSetSettings, useProfilePicUpload, useGetAllUser, useSetUserNewSettings, useSetUserRoles, usesetNewClass } from '@/api/settingsConfirms/settingsConfrimQuery';
import imageCompression from 'browser-image-compression';
import { useColorStore } from '../stores/bottomNav';

const showError = inject("showError");
const showSucces = inject("showSucces");

const { mobile } = useDisplay();
const isMobile = computed(() => mobile.value);
watch(isMobile, async (newValue) => {
  SettingsMenu.value = newValue;
});

const colorStore = useColorStore();
const color_BottomNav = computed(() => colorStore.color); 

const get_token = getCookie("user");
const route = useRoute();
const router = useRouter();
const theme = useTheme();
const value = ref(0);
const drawer = ref(false);
const DarkmodeChange = ref(false);
const dialog = ref(false);
const ProfSettingDraw = ref(false);
const EmailSettingDraw = ref(false);
const PassSettingDraw = ref(false);
const editPicDraw = ref(true);
const UsersDraw = ref(false);
const AdminNotifDraw = ref(false);
const activePanel = ref('editPic');
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
const ProfInputDisabled = ref(true);
const EmailInputDisabled = ref(true);
const ConfirmCode = ref(false);
const fileProfPicInput = ref(null);
var timeout = null;
const activatedTypeButton = ref(null);
const adminTypeButton = ref(null);
const AllUsers = ref([]);
const selectedClass = ref('A');
const selectedYear = ref('9');

const { mutate : getAllUser} = useGetAllUser()

const UsersActive = async () =>{
  ProfSettingDraw.value = false;
  EmailSettingDraw.value = false;
  PassSettingDraw.value = false;
  editPicDraw.value = false;
  UsersDraw.value = true;
  AdminNotifDraw.value = false;
  activePanel.value = 'users';
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

  UsersLoading.value = true;
  await getAllUser({name: null,activated_type: null, admin: null, token: get_token}, {
    onSuccess: (response) => {
      AllUsers.value = response;
      UsersLoading.value = false;
    },
    onError: (error) => {
      if (showError) {
        showError(error.response.data);
      }else{
        console.log(error.response.data);
      }
      UsersLoading.value = false;
    },
  });
}

function ProfSettingsActive(){
  ProfSettingDraw.value = true;
  EmailSettingDraw.value = false;
  PassSettingDraw.value = false;
  editPicDraw.value = false;
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

function handlePanelToggle(){
 users_UserName.value = ''; 
 users_UserEmail.value = ''; 
 users_UserPassword.value = '';
}

const { mutate : setNewClass} = usesetNewClass()

const setClass = async (user,osztaly) =>{
  await setNewClass({id: user.id, osztaly: osztaly, token: get_token}, {
    onSuccess: (response) => {
      user.osztaly = osztaly;
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

const { mutate : setUserNewSettings} = useSetUserNewSettings()

const setNewSetting = async(user,id, model, type) =>{
  await setUserNewSettings({content: model, id: id, type: type, token: get_token}, {
    onSuccess: (response) => {
      if(type == 1){
        user.user_name = response;
        if(user.id == get_fullUser.value.id){
          get_fullUser.value.user_name = response;
          get_user_name.value = response;
        }
      }
      else if(type == 2){
        user.email = response;
      }
      else if(type == 3){
        user.password = response;
      }
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

const { mutate : setNewUserRoles} = useSetUserRoles()

const setUserRoles = async (user, id, type) => {
  await setNewUserRoles({id: id, type: type, token: get_token}, {
    onSuccess: (response) => {
      if(type == 1){
        user.activated = 1;
      }
      else if(type == 2){
        user.user_role = 'banned';
        user.activated = 2;
        user.admin = 0;
        if(get_fullUser.value.id == id){
          deleteCookie('user');
        }
      }
      else if(type == 3){
        user.user_role = 'student';
        user.activated = 1;
        user.osztaly = null;
        user.admin = 0;
      }
      else if(type == 4){
        user.user_role = 'admin';
        user.admin = 1;
      }
      else if(type == 5){
        user.user_role = 'student';
        user.osztaly = null;
        user.admin = 0;
      }else if(type == 6){
        user.user_role = 'teacher';
        user.osztaly = 'T';
        user.activated = 1;
        user.admin = 0;
      }
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

function AdminType(value) {
  adminTypeButton.value = adminTypeButton.value === null ||  adminTypeButton.value != value ? value : null;
}

function ActivatedType(number) {
  activatedTypeButton.value = activatedTypeButton.value === number ? null : number;
}

// Watch az activatedTypeButton-ra
watch(activatedTypeButton, async (newValue, oldValue) => {
  UsersLoading.value = true;
  await getAllUser({
      name: searchQuery.value,
      activated_type: newValue,
      admin: adminTypeButton.value, 
      token: get_token
    }, 
    {
    onSuccess: (response) => {
      AllUsers.value = response;
      UsersLoading.value = false;
    }
  })
});

// Watch az adminTypeButton-ra
watch(adminTypeButton, async (newValue, oldValue) => {
  UsersLoading.value = true;
  await getAllUser({
      name: searchQuery.value,
      activated_type: activatedTypeButton.value, 
      admin: newValue, 
      token: get_token
    }, 
    {
    onSuccess: (response) => {
      AllUsers.value = response;
      UsersLoading.value = false;
    }
  })
});

watch(searchQuery, async (newValue) => {
  clearTimeout(timeout);

  if (newValue !== "") {
    UsersLoading.value = true;
    timeout = setTimeout( async () => {
      await getAllUser({
        name: newValue,
        activated_type: activatedTypeButton.value, 
        admin: adminTypeButton.value, 
        token: get_token
      }, 
      {
      onSuccess: (response) => {
        AllUsers.value = response;
        UsersLoading.value = false;
      }
    })
  }, 300);
  }else{
    UsersLoading.value = true;
    timeout = setTimeout( async () => {
      await getAllUser({
        name: null,
        activated_type: activatedTypeButton.value, 
        admin: adminTypeButton.value, 
        token: get_token
      }, 
      {
      onSuccess: (response) => {
        AllUsers.value = response;
        UsersLoading.value = false;
      }
    })
  }, 300);
  }
});

function EmailSettingsActive(){
  ProfSettingDraw.value = false;
  EmailSettingDraw.value = true;
  PassSettingDraw.value = false;
  editPicDraw.value = false;
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
  editPicDraw.value = false;
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

const editPicActive = async() =>{
  ProfSettingDraw.value = false;
  EmailSettingDraw.value = false;
  PassSettingDraw.value = false;
  editPicDraw.value = true;
  UsersDraw.value = false;
  AdminNotifDraw.value = false;
  activePanel.value = 'editPic';
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

const { mutate: ProfilePicUpload } = useProfilePicUpload();

const handleProfPicUpload = async (event) => {
  const input = event.target;
  const file = input.files ? input.files[0] : null;

  if (file) {
    try {
      // Kép tömörítése
      const options = {
        maxSizeMB: 0.1,
        useWebWorker: true,
      };

      const compressedFile = await imageCompression(file, options);

      get_fullUser.value.Usersetting.profPic = URL.createObjectURL(compressedFile);

      var ProfPicUploaddata = {
        id: Number(get_fullUser.value.id),
        pic: compressedFile,
        type: Number(0)
      };

      // Profilkép feltöltése
      await ProfilePicUpload(ProfPicUploaddata,{
        onSuccess: (response) =>{
          ResponseContent.value = response;
        }
      });

      setTimeout(() => {
        ResponseContent.value = null;
      }, 3000);

    } catch (error) {
      console.log(error);
      if (showError) {
        showError(error);
      }else{
        console.log(error);
      }
    }
  }
};

// Fájl input triggerelése
const triggerProfPicFileInput = () => {
  fileProfPicInput.value?.click();
};

const {mutate: getSettingsConfirm} = useGetSettingsConfirm();

const SendConfirmCode = async () => {
  loading.value = true;
  await getSettingsConfirm({email: get_fullUser.value.email, user_name: get_fullUser.value.user_name, id: get_fullUser.value.id}, {
    onSuccess: (response) => {
      ConfirmCode.value = true;
      loading.value = false;
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

const {mutate: setNewSettings} = useSetSettings();

watch(otpCode, async (newVal) => {
  ResponseError.value = null;
  if (newVal != null && newVal.length === 6) {
    var content = [];

    if(ProfSettingDraw.value){
      content = [userNameInput.value];
    }
    else if(EmailSettingDraw.value){
      content = [userEmailInput.value];
    }
    else if(PassSettingDraw.value){
      content = [CurrentPasswordInput.value, NewPasswordInput.value, get_fullUser.value.password];
    }

    await setNewSettings({content: content, code: newVal, id: get_fullUser.value.id, type: activePanel.value}, {
    onSuccess: (response) => {
      otpCode.value = null;
      if(activePanel.value == 'profile'){
        ResponseContent.value = "A fiók név sikeresen meg lett változtatva!";
        get_fullUser.value.user_name = response;
      }
      else if(activePanel.value == 'email'){
        ResponseContent.value = "A fiókhoz tartozó e-mail sikeresen meg lett változtatva!";
        get_fullUser.value.email = response;
      }
      else if(activePanel.value == 'password'){
        ResponseContent.value = "A fiókhoz tartozó jelszó sikeresen meg lett változtatva!";
        get_fullUser.value.password = response;
      }
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

        deleteCookie('user');
        router.push({name : 'login'})
      },
    });
  }

  if(isMobile.value){
    SettingsMenu.value = true;
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

<style scoped>
.adminUsers, .adminNotif{
  transition: .3s;
}

.adminUsers::-webkit-scrollbar, .adminNotif::-webkit-scrollbar {
  width: 8px; /* Görgetősáv szélessége */
}

.adminUsers::-webkit-scrollbar-track, .adminNotif::-webkit-scrollbar-track {
  background: transparent; /* Háttérszín */
  border-radius: 10px;
}

.adminUsers::-webkit-scrollbar-thumb, .adminNotif::-webkit-scrollbar-thumb {
  background: rgb(var(--v-theme-settings_drawer_bc)); /* Görgetősáv színe */
  border-radius: 10px;
}

.adminUsers::-webkit-scrollbar-thumb:hover ,  .adminNotif::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.7);
}

.custom-drawer-btn, .custom-drawer-btn h4{
  transition: .3s;
}
.custom-drawer-btn:hover{
  background-color: rgb(var(--v-theme-secondary), .3);
}
</style>