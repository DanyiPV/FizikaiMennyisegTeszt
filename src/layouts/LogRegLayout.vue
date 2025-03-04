/* log-reg layout */
<template>
  <div style="overflow: hidden; height: 100vh; filter: blur(4px);">
    <video autoplay loop muted playsinline>
      <source src="../components/background/logreg_background.mp4" type="video/mp4" />
    </video>
    <div style="position: absolute; top: 0; left: 0; background-color: rgb(0, 0, 0 ,.4); height: 100%; width: 100%;"></div>
  </div>

  <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%); width: 500px; height: auto; max-height: 80vh;">
    <div class="text-center mb-2" style="color: white;">
      <h1 class="text" style="font-size: 5em; font-family: 'Orbitron', sans-serif;">Gravitas</h1>
      <h4 class="text" style="font-size: 1.5em;font-weight: normal;">Üdvözli önt az oldal!</h4>
    </div>

    <v-card
      class="mx-auto pa-12 pb-8"
      elevation="4"
      max-width="600"
      min-width="450"
      rounded="lg"
    >
    <div class="text-subtitle-1 text-medium-emphasis">Fiók</div>

      <v-text-field
        density="compact"
        placeholder="email cím"
        prepend-inner-icon="mdi-email-outline"
        variant="outlined"
        v-model="emailValue"
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

      <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between" v-if="route.name == 'login' || route.name == 'register'">
        Jelszó
          <a
            class="text-caption text-decoration-none text-blue"
            href="#"
            rel="noopener noreferrer"
            v-if="route.name == 'login'"
            @click.prevent="router.push({ name: 'forget-password' })"
          >
            Elfelejtette jelszavát?</a>
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
        Jelszó megerősítés
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
      ></v-checkbox>

      <div class="d-flex ga-2 mt-4" v-if="route.name == 'register' ">
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

if(getCookie('user') != null){
  deleteCookie('user');
}

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
const RegBtnValue = ref('Regisztrálás');

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
  setTimeout(async () => {
    await loginUser({email: emailValue.value, password: passwordValue.value, rememberMe: rememberMe.value},{
    onSuccess: (token) => {
      if (showSucces) {
        showSucces('Sikeres bejelentkezés!');
      }else{
        console.log('Sikeres bejelentkezés!');
      }

      if (rememberMe) {
          setCookieWithExpiry('user', token, 1);
        } else {
          setPersistentCookie('user', token);
        }
        router.push({ name: 'home' });
    },
    onError: (error) => {
      if (showError) {
        showError(error.response.data);
      }else{
        console.log(error.response.data);
      }
    }
  });
  },1000);
}

function setCookieWithExpiry(name, value, day) {
    const date = new Date();
    date.setDate(date.getDate() + day); 
    document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/`;
}

function setPersistentCookie(name, value) {
  document.cookie = `${name}=${value}; path=/`;
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