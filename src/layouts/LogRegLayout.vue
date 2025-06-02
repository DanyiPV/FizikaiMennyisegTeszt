/* log-reg layout */
<template>
  <div style="overflow: hidden; max-height: 100vh; filter: blur(4px);">
    <video autoplay loop muted playsinline>
      <source src="../components/background/logreg_background.mp4" type="video/mp4" />
    </video>
    <div style="position: absolute; top: 0; left: 0; background-color: rgb(0, 0, 0 ,.4); height: 100%; width: 100%;"></div>
  </div>

  <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%); height: auto; max-height: 80vh;">
    <div class="text-center mb-2" style="color: white;">
      <h1 class="text" style="font-size: 5em; font-family: 'Orbitron', sans-serif;">Gravitas</h1>
      <h4 class="text" style="font-size: 1.5em;font-weight: normal;">Üdvözli önt az oldal!</h4>
    </div>

    <v-card
      class="mx-auto pa-12 pb-8"
      elevation="4"
      max-width="600"
      :min-width="isMobile ? '400' : '500'"
      rounded="lg"
    >
      <div class="text-subtitle-1 text-medium-emphasis" v-if="route.name != 'set-new-password'">Fiók</div>

      <v-text-field
      density="compact"
      placeholder="email cím"
      prepend-inner-icon="mdi-email-outline"
      variant="outlined"
      v-model="emailValue"
      v-if="route.name != 'set-new-password'"
      :rules="[
        (v) => !!v || 'Kötelező ezt a mezőt kitölteni', (v) => (v && v.length <= 35) || 'Maximum 35 karakter lehet.']" 
      ></v-text-field>

      <div class="text-subtitle-1 text-medium-emphasis" v-if="route.name == 'register'">Fiók név</div>

      <v-text-field
        density="compact"
        placeholder="Felhasználó név..."
        prepend-inner-icon="mdi-account-outline"
        variant="outlined"
        v-if="route.name == 'register'"
        v-model="userNameValue"
        :rules="[(v) => !!v || 'Kötelező ezt a mezőt kitölteni', (v) => (v && v.length <= 24) || 'Maximum 24 karakter lehet.', (v) => v.length >= 6 || 'Minimum 6 karakteres név kell.']"
      ></v-text-field>

      <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between" v-if="route.name == 'login' || route.name == 'register' || route.name == 'set-new-password'">
        {{ PasswordValue }}
        <router-link
          class="text-caption text-decoration-none text-blue"
          v-if="route.name === 'login'"
          :to="{ name: 'forget-password' }"
        >
          Elfelejtette jelszavát?
        </router-link>
      </div>

      <v-text-field
        :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
        :type="visible ? 'text' : 'password'"
        density="compact"
        placeholder="Írja be a jelszavát..."
        prepend-inner-icon="mdi-lock-outline"
        variant="outlined"
        @click:append-inner="visible = !visible"
        v-model="passwordValue"
        v-if="route.name == 'login' || route.name == 'register' || route.name == 'set-new-password'"
        :rules="[(v) => !!v || 'Kötelező ezt a mezőt kitölteni', (v) => (v && v.length <= 30) || 'Maximum 30 karakter lehet.',  (v) => v.length >= 8 || 'Minimum 8 karakteres jelszó kell.',]"
      ></v-text-field>

      <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between" v-if="route.name == 'register' || route.name == 'set-new-password'">
         {{ ConfPasswordValue }}
      </div>

      <v-text-field
        :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
        :type="visible ? 'text' : 'password'"
        density="compact"
        placeholder="Erősítse meg a jelszavát..."
        prepend-inner-icon="mdi-lock-outline"
        variant="outlined"
        @click:append-inner="visible = !visible"
        v-if="route.name == 'register' || route.name == 'set-new-password'"
        v-model="confirmPassword"
        :rules="[(v) => !!v || 'Kötelező ezt a mezőt kitölteni', (v) => (v && v.length <= 30) || 'Maximum 30 karakter lehet.', (v) => (v && confirmPassword == passwordValue) || 'Nem egyezik a két jelszó']"
      ></v-text-field>

      <v-checkbox
        v-model="rememberMe"
        :label="`Maradjak bejelentkezve`"
        v-if="route.name == 'login'"
        hide-details
      ></v-checkbox>

      <div class="d-flex ga-2 mt-4" v-if="route.name == 'register' ">
        <v-select
          v-model="selectedYear"
          label="Évfolyam"
          :items="['9', '10', '11']"
          variant="outlined"
          style="width: 100%;"
          hide-details
        ></v-select>

        <v-select
          v-model="selectedClass"
          label="Osztály"
          :items="['A', 'B', 'C', 'K']"
          variant="outlined"
          style="width: 100%;"
          hide-details
        ></v-select>
      </div>

      <v-btn
        class="my-4"
        color="blue"
        size="large"
        variant="tonal"
        block
        v-if="route.name == 'login'"
        :disabled="!emailValue || !passwordValue"
        @click="handleLogin"
        :loading="loading"
      >
        Bejelentkezés
      </v-btn>

      <v-btn
        class="mb-4 mt-4"
        color="blue"
        size="large"
        variant="tonal"
        block
        v-if="route.name == 'forget-password'"
        :disabled="!emailValue"
        @click="handleForgetPassword"
        :loading="loading"
        >
        {{ ForgetBtnValue }}
      </v-btn>

      <v-btn
          class="mb-4 mt-4"
          color="blue"
          size="large"
          variant="tonal"
          block
          v-if="route.name == 'set-new-password'"
          :disabled="!passwordValue || !confirmPassword"
          @click="handSetNewPassword"
          :loading="loading"
          >
          {{ SetBtnValue }}
      </v-btn>

      <v-btn
          class="my-4"
          color="blue"
          size="large"
          variant="tonal"
          block
          v-if="route.name == 'register'"
          :disabled="RegBtnValue == 'Regisztrálva' || passwordValue !== confirmPassword || !passwordValue || !emailValue || !userNameValue"
          @click="handleRegister"
          :loading="loading"
          >
          {{ RegBtnValue }}
      </v-btn>

      <v-card-text class="text-center" @click="router.push({name: 'register'})" v-if="route.name == 'login'">
        <a
          class="text-blue text-decoration-none"
          rel="noopener noreferrer"
          :style="{ cursor: 'pointer' }"
        >
          Regisztrálás <v-icon icon="mdi-chevron-right"></v-icon>
        </a>
      </v-card-text>

      <h2 v-if="route.name == 'register'" class="text-center">Van már fiókod?</h2>
      <v-card-text class="text-center" @click="router.push({name: 'login'})" v-if="route.name == 'register' || route.name == 'success-register'">
        <a
          class="text-blue text-decoration-none"
          rel="noopener noreferrer"
          :style="{ cursor: 'pointer' }"
        >
          Bejelentkezés <v-icon icon="mdi-chevron-right"></v-icon>
        </a>
      </v-card-text>

      <v-card-text class="text-center" @click="router.push({name: 'login'})" v-if="route.name == 'forget-password' || route.name == 'set-new-password'">
        <a
          class="text-blue text-decoration-none"
          rel="noopener noreferrer"
          :style="{ cursor: 'pointer' }"
        >
        <v-icon icon="mdi-chevron-left"></v-icon> Bejelentkezés
        </a>
      </v-card-text>

    </v-card>

  </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router';
import { ref, computed, inject, onMounted } from 'vue'
import { useDisplay } from 'vuetify';
import { useTheme } from 'vuetify';
import { useRegisterUser } from '@/api/register/registerQuery';
import { useLoginUser } from '@/api/login/loginQuery';
import { useUserStore } from '../stores/userStore';
import { useForgetPassword, useSetNewPassword } from '@/api/new-password/NewPasswordQuery'

const userStore = useUserStore();

userStore.unreadNotifs = 0;

const { mobile } = useDisplay();
const isMobile = computed(() => mobile.value);

const showError = inject("showError");
const showSucces = inject("showSucces");

const route = useRoute();
const router = useRouter();
const theme = useTheme();

const visible = ref(false);
const loading = ref(false);
const rememberMe = ref(false);
const emailValue = ref('');
const userNameValue = ref('');
const passwordValue = ref('');
const confirmPassword = ref('');
const selectedClass = ref('A');
const selectedYear = ref('9');
const PasswordValue = ref("Jelszó");
const ConfPasswordValue = ref("Jelszó megerősítése");
const RegBtnValue = ref('Regisztrálás');
const ForgetBtnValue = ref('Email küldése');
const SetBtnValue = ref("Új jelszó beállítás");
const isSetNewPassword = route.name === 'set-new-password';
PasswordValue.value = isSetNewPassword ? "Új jelszó" : "Jelszó";
ConfPasswordValue.value = isSetNewPassword ? "Új jelszó megerősítése" : "Jelszó megerősítése";

const { mutate: forgetPassword } = useForgetPassword(loading, ForgetBtnValue)

const { mutate: setNewPassword } = useSetNewPassword(loading, SetBtnValue)

const handleForgetPassword = async () => {
  if (emailValue?.value) {
    loading.value = true;
    forgetPassword({email: emailValue.value}, {
      onSuccess: () => {showSucces ? showSucces("Email elküldve!") : console.log("Email elküldve!")},
      onError: (err) => {showError ? showError(err.response.data) : console.log(err.response.data)}
    });
  }
};

const handSetNewPassword = () => {
  if (passwordValue?.value) {
    loading.value = true;
    setNewPassword({password: passwordValue.value, token: String(route.query.token)}, {
      onSuccess: () => {showSucces ? showSucces("Sikeresen be lett állítva az új jelszó!") : console.log("Sikeresen be lett állítva az új jelszó!")},
      onError: (err) => showError ? showError(err.response.data) : console.log(err.response.data),
    });
  }
};

const {mutate: registerUser} = useRegisterUser(loading, RegBtnValue);

const handleRegister = async () =>{
  try{
    if(emailValue.value.split('@').length == 1){
      const error = new Error('Nincs jól megformázva az email!');

      throw error;
    }

    if(emailValue.value.split('@')[0] == userNameValue.value){
      const error = new Error('Nem egyezhet meg az email és a felhasználó név!');

      throw error;
    }

    await registerUser({email: emailValue.value, user_name: userNameValue.value, password: passwordValue.value, osztaly: selectedYear.value+"/"+selectedClass.value},{
      onSuccess: (response) => {
        if (showSucces) {
          showSucces('Sikeres regisztráció!');
        }else{
          console.log('Sikeres regisztráció!');
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

  }catch(error){
    if (showError) {
      showError(error.message);
    }else{
      console.log(error.message);
    }
  }
}

const {mutate: loginUser} = useLoginUser(loading, RegBtnValue);

const handleLogin = async () =>{
  loading.value = true;
  await loginUser({email: emailValue.value, password: passwordValue.value, rememberMe: rememberMe.value},{
    onSuccess: (response) => {
      if (showSucces) {
        showSucces('Sikeres bejelentkezés!');
      }else{
        console.log('Sikeres bejelentkezés!');
      }
      router.push({ name: 'home' });
      loading.value = false;
    },
    onError: (error) => {
      if (showError) {
        showError(error.response.data);
      }else{
        console.log(error.response.data);
      }
      loading.value = false;
    }
  });
}
</script>

<style scoped>
</style>