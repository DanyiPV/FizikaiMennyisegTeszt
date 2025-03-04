/* log-reg layout */
<template>
  <div class="background-video-container">
    <video autoplay loop muted playsinline id="background-video">
      <source src="../components/background/logreg_background.mp4" type="video/mp4" />
    </video>
    <div class="background-overlay"></div>
  </div>

  <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%);" :style="{ top: route.name === 'login' ? '42%' : '46%' }">

    <div class="image-text-container" style="color: white;">
      <h1 class="text" style="font-size: 3vw; font-family: 'Orbitron', sans-serif;">Gravitas</h1>
      <h4 class="text" style="font-weight: normal;">Üdvözli önt az oldal!</h4>
    </div>

    <v-card
      class="mx-auto pa-12 pb-8"
      elevation="8"
      max-width="448"
      min-width="420"
      rounded="lg"
    >
      <v-expand-transition class="d-flex flex-column justify-center align-center">
        <div v-if="SuccessOpen">
          <v-icon :color="SuccessText.split(' ')[0] == 'Sikeres' ? 'green' : 'red'" size="120">
            {{ SuccessText.split(' ')[0] == "Sikeres" ? 'mdi-check' : 'mdi-close' }}
          </v-icon>
          <h2 class="text-center">{{ SuccessText }}</h2>
          <div class="dropdown-content text-center" :style="{marginTop: $vuetify.display.smAndDown ? '3vw' : '1vw'}">
            <p :style="{fontSize: $vuetify.display.smAndDown ? '3vw' : '.9vw'}">{{ SuccessMessage }}</p>
          </div>
        </div>
      </v-expand-transition>

      <div class="text-subtitle-1 text-medium-emphasis" v-if="route.name != 'set-new-password' && route.name != 'success-register'">Fiók</div>

      <v-text-field
        density="compact"
        placeholder="email cím"
        prepend-inner-icon="mdi-email-outline"
        variant="outlined"
        v-model="emailValue"
        v-if="route.name != 'set-new-password' && route.name != 'success-register'"
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
        v-model="RegdataRef.user_name"
        :rules="[(v) => !!v || 'Kötelező ezt a mezőt kitölteni', (v) => (v && v.length <= 24) || 'Maximum 24 karakter lehet.', (v) => v.length >= 6 || 'Minimum 6 karakteres név kell.']"
      ></v-text-field>

      <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between" v-if="route.name == 'login' || route.name == 'register' || route.name == 'set-new-password'">
        {{ PasswordValue }}
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
      ></v-checkbox>

      <div class="d-flex ga-2 mt-4">
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
        class="mb-4 mt-4"
        color="blue"
        size="large"
        variant="tonal"
        block
        v-if="route.name == 'login'"
        :disabled="!LogindataRef.password || !LogindataRef.email"
        :loading="loading"
        @click="handleLogin"
      >
        Bejelentkezés
      </v-btn>

    <v-btn
        class="mb-4 mt-4"
        color="blue"
        size="large"
        variant="tonal"
        block
        v-if="route.name == 'register'"
        :disabled="RegBtnValue == 'Email elküldve' || RegdataRef.password !== confirmPassword || !RegdataRef.password || !RegdataRef.email || !RegdataRef.user_name"
        @click="handleRegister"
        :loading="loading"
        >
        {{ RegBtnValue }}
    </v-btn>

    <v-btn
        class="mb-4 mt-4"
        color="blue"
        size="large"
        variant="tonal"
        block
        v-if="route.name == 'forget-password'"
        :disabled="!ForgetPassworddataRef.email"
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
        :disabled="!SetNewPassworddataRef.password || !confirmPassword"
        @click="handSetNewPassword"
        :loading="loading"
        >
        {{ SetBtnValue }}
    </v-btn>

      <v-card-text class="text-center" @click="RegisterPushHandler" v-if="route.name == 'login'">
        <a
          class="text-blue text-decoration-none"
          rel="noopener noreferrer"
          :style="{ cursor: 'pointer' }"
        >
          Regisztrálás <v-icon icon="mdi-chevron-right"></v-icon>
        </a>
      </v-card-text>

      <h2 v-if="route.name == 'register'" class="text-center">Van már fiókod?</h2>
      <v-card-text class="text-center" @click="LoginPushHandler" v-if="route.name == 'register' || route.name == 'success-register'">
        <a
          class="text-blue text-decoration-none"
          rel="noopener noreferrer"
          :style="{ cursor: 'pointer' }"
        >
          Bejelentkezés <v-icon icon="mdi-chevron-right"></v-icon>
        </a>
      </v-card-text>

      <v-card-text class="text-center" @click="LoginPushHandler" v-if="route.name == 'forget-password' || route.name == 'set-new-password'">
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

  <v-snackbar
    v-model="snackbar"
    :timeout="2000"
    color="white"
    :location="dynamicLocation"
    :style="dynamicStyle"
    justify-space-between
    :max-width="'15vw'"
  >
    <div class="d-flex justify-space-between align-center w-auto" style="gap: 1.2vw;">
      <span style="font-size: 1.5vh;" class="text-center">{{ errorMessage }}</span>
      <v-btn
        color="red"
        @click="snackbar = false"
        icon="mdi-close" 
        class="rounded-circle"
        size="x-small"
      >
      </v-btn>
    </div>
  </v-snackbar>

</template>

<script setup lang="ts">
  import { useRouter, useRoute } from 'vue-router';
  import { ref, computed, inject, onMounted } from 'vue'
  import type { RegisterData } from '@/api/register/register'
  import { useRegisterUser } from '@/api/register/registerQuery'

  import { useUserActivation } from '@/api/register/registerQuery'

  import type { LoginData } from '@/api/login/login'
  import { useLoginUser } from '@/api/login/loginQuery'

  import type { ForgetPasswordData } from '@/api/forget-password/ForgetPassword'
  import { useForgetPassword } from '@/api/forget-password/ForgetPasswordQuery'

  import type { SetNewPasswordData } from '@/api/set-new-password/SetNewPassword'
  import { useSetNewPassword } from '@/api/set-new-password/SetNewPasswordQuery'

  import { useDisplay } from 'vuetify';
  import { useTheme } from 'vuetify';

  if(getCookie('user') != null){
    deleteCookie('user');
  }

  const showError = inject<((msg: string) => void) | undefined>("showError");

  const route = useRoute();
  const router = useRouter();
  const theme = useTheme();

  theme.global.name.value = 'lightTheme';
  
  const loading = ref(false)

  var RegBtnValue = ref("Regisztrálás");

  var SuccessText = ref("");
  var SuccessMessage = ref("");
  var SuccessOpen = ref(false);

  const selectedYear = ref(9);
  const selectedClass = ref('A');

  const LoginPushHandler = () =>{
    SuccessOpen.value = false;
    router.push({ name: 'login' });
  }

  const RegisterPushHandler = () =>{
    SuccessOpen.value = false;
    router.push({ name: 'register' })
  }

  var RegisterToken = route.query.token ? (route.query.token as string) : 'null';

  const { mutate: UserActivation } = useUserActivation() //, isPending
  
  if(RegisterToken != 'null' && route.name == 'success-register'){
    const userActivation = async () =>{
      SuccessOpen.value = false;
      UserActivation({token: RegisterToken} ,{
          onSuccess: (response) => {
            SuccessText.value = "Sikeres regisztrálás!";
            SuccessMessage.value = response;
            SuccessOpen.value = true;
          },
          onError: (err: any) => {
            SuccessText.value = "Nem sikerült regisztrálás!";
            SuccessMessage.value = err.response.data;
            SuccessOpen.value = true;
          },
        }
      )
    };
    userActivation();
  }else if(RegisterToken == 'null' && route.name == 'success-register'){
    SuccessText.value = "Nem sikerült regisztrálás!";
    SuccessMessage.value = "Rossz az elérésí út!";
    SuccessOpen.value = true;
  }

  const PasswordValue = ref("Jelszó");
  const ConfPasswordValue = ref("Jelszó megerősítése");
  
  const { mutate: registerUser } = useRegisterUser(loading, RegBtnValue) //, isPending

  const handleRegister = async () => {
  if (RegdataRef.value.user_name && RegdataRef.value.email && RegdataRef.value.password &&
    RegdataRef.value.user_name.length <= 12 && RegdataRef.value.email.length <= 35 && RegdataRef.value.password.length <= 30
  ) {
      loading.value = true;
      registerUser(RegdataRef.value, {
          onSuccess: (response) => {
            loading.value = false
            RegBtnValue.value = 'Email elküldve';
          },
          onError: (err: any) => {
            if (showError) {
              showError(err.response.data);
            }else{
              console.log(err.response.data);
            }
          },
        }
      );
    }
  };

  const errorMessage = ref('');
  
  const snackbar = ref(false);
   
  const { mutate : loginUser} = useLoginUser() //, isPending
  
  const rememberMe = ref(false);

  const handleLogin = () => {
    if (LogindataRef.value.email && LogindataRef.value.password) {
      LogindataRef.value.rememberMe = rememberMe.value;
      loginUser(LogindataRef.value, {
        onError: (err: any) => {
          if (showError) {
            showError(err.response.data);
          }else{
            console.log(err.response.data);
          }
        },
        onSuccess: (token) => {
          if (rememberMe) {
            setCookieWithExpiry('user', token, 1);
          } else {
            setPersistentCookie('user', token);
          }
          router.push({ name: 'home' });
        },
      });
    }
  };

  function setCookieWithExpiry(name: string, value: string, day: number) {
    const date = new Date();
    date.setDate(date.getDate() + day); 
    document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/`;
  }

  function setPersistentCookie(name: string, value: string) {
    document.cookie = `${name}=${value}; path=/`;
  }

  const ForgetBtnValue = ref("Email küldése");

  const { mutate: forgetPassword} = useForgetPassword(loading, ForgetBtnValue) //, isPending

  const handleForgetPassword = async () => {
  if (ForgetPassworddataRef) {
      loading.value = true
      forgetPassword(ForgetPassworddataRef.value, {
          onError: (err: any) => {
            errorMessage.value = err.response.data || "Hiba történt a bejelentkezés során.";
            snackbar.value = true;
          },
        }
      );
    }
  };

  const SetBtnValue = ref("Új jelszó beállítás");

  const { mutate: setNewPassword} = useSetNewPassword(loading, SetBtnValue) //, isPending

  const handSetNewPassword = () => {
    if (SetNewPassworddataRef.value.password) {
      SetNewPassworddataRef.value.token = route.query.token ? (route.query.token as string) : 'null';
      loading.value = true
      setNewPassword(SetNewPassworddataRef.value, {
          onError: (err: any) => {
            if (showError) {
              showError(err.response.data);
            }else{
              console.log(err.response.data);
            }
          },
        }
      );
    }
  };

  if(route.name == 'set-new-password'){
    PasswordValue.value = "Új jelszó"
    ConfPasswordValue.value = "Új jelszó megerősítése"
  }else{
    PasswordValue.value = "Jelszó"
    ConfPasswordValue.value = "Jelszó megerősítése"
  }

  const LogindataRef = ref<LoginData>({
    email: '',
    password: '',
    rememberMe: false
  })

  const RegdataRef = ref<RegisterData>({
    user_name: '',
    email: '',
    password: ''
  })

  const ForgetPassworddataRef = ref<ForgetPasswordData>({
    email: '',
  })

  const SetNewPassworddataRef = ref<SetNewPasswordData>({
    token: '',
    password: '',
  })

  const emailValue = computed({
    get() {
      if (route.name == 'register') {
        return RegdataRef.value.email;
      } 
      else if (route.name == 'login') {
        return LogindataRef.value.email;
      }
      else if (route.name == 'forget-password') {
        return ForgetPassworddataRef.value.email;
      }

      return '';
    },
    set(newValue) {
      if (route.name == 'register') {
        RegdataRef.value.email = newValue;
      } 
      else if (route.name == 'login') {
        LogindataRef.value.email = newValue;
      }
      else if (route.name == 'forget-password') {
        ForgetPassworddataRef.value.email = newValue;
      }
    }
  });
  const passwordValue = computed({
    get() {
      if (route.name == 'register') {
        return RegdataRef.value.password;
      } 
      else if (route.name == 'login') {
        return LogindataRef.value.password;
      }
      else if (route.name == 'set-new-password') {
        return SetNewPassworddataRef.value.password;
      }
      return '';
    },
    set(newValue) {
      if (route.name == 'register') {
        RegdataRef.value.password = newValue;
      } 
      else if (route.name == 'login') {
        LogindataRef.value.password = newValue;
      }
      else if (route.name == 'set-new-password') {
        SetNewPassworddataRef.value.password = newValue;
      }
    }
  });

  const dynamicLocation = computed(() => {
    return route.name === 'register' ? 'center' : 'bottom';
  });

  const { smAndDown } = useDisplay();
  
  const dynamicStyle = computed(() => {
    const baseStyle: any = {};

    if (dynamicLocation.value === 'bottom') {
      baseStyle.bottom = smAndDown.value ? '10vh' : '15vh';
      if(smAndDown.value){
        baseStyle.bottom = '5rem';
      }
      else{
        baseStyle.bottom = '10rem';
      }
    } else if (dynamicLocation.value === 'center') {
      if(smAndDown.value){
        baseStyle.top = '-30rem';
      }
      else{
        baseStyle.left = '50rem';
      }
    }
    return baseStyle;
  });

  const visible = ref(false);
  const confirmPassword = ref('');

  function getCookie(name: string): string | null {
    const cookies = document.cookie.split('; ');
    for (const cookie of cookies) {
      const [key, value] = cookie.split('=');
      if (key === name) {
        return decodeURIComponent(value);
      }
    }
    return null;
  }

  function deleteCookie(name: string): void {
    document.cookie += `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }
</script>

<script lang="ts">
export default {
  data() {
    return {
      loading: false, 
      visible: false,
      rememberMe: false,
    }
  },
  methods: {
    load() {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
      }, 3000);
    },
  },
}
</script>


<style scoped>
.my-box {
  padding: 20px;
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  text-align: center;
}

.background-video-container {
  position: relative;
  width: 100%;
  height: 100vh;
}

#background-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
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

.image-text-container{
  width: 100%;
  height: max-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;
  margin-bottom: 1.5vh;
}
.image-text-container img{
  height: 25vh;
}
.image-text-container h1{
  color: rgb(var(--v-theme-login_title));
  font-size: xx-large;
}
.image-text-container p{
  color: rgb(var(--v-theme-login_title));
  font-size: small;
}
</style>