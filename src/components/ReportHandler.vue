<template>
    <v-scale-transition mode="in-out" v-if="visible">
        <div style="width: max-content; position: fixed; bottom: 1.5rem; right: 1.5rem;" class="d-flex justify-center">
            <v-btn color="primary" icon class="px-3" size="55" @click="reportDialog = true; reportType = null; reportMessage = ''">
                <v-icon color="text_color" size="35">
                    mdi-bug
                </v-icon>
            </v-btn>
        </div>
    </v-scale-transition>

    <v-dialog max-width="800" v-model="reportDialog">
        <v-card title="Bejelentés">
            <v-card-text>
                <v-radio-group label="Bejelentés fajtája" hide-details v-model="reportType">
                    <v-radio label="Rendszerhiba – ha nem működik valami technikailag (pl. nem tölt be oldal)" value="Rendszerhiba"></v-radio>
                    <v-radio label="Funkcióhiba – ha valamilyen konkrét funkció nem működik (pl. gomb nem csinál semmit)." value="Funkcióhiba"></v-radio>
                    <v-radio label="Tartalmi hiba – pl. hibás információ, elírás, elavult adat." value="Tartalmi hiba"></v-radio>
                    <v-radio label="Biztonsági probléma – adatvédelmi gond, gyanús viselkedés, sebezhetőség." value="Biztonsági probléma"></v-radio>
                    <v-radio label="Karbantartási igény / hibabejelentés – ha fizikai dolgokra is vonatkozik (pl. eszköz vagy helyiség hibája)." value="Karbantartási igény"></v-radio>
                    <v-radio label="Adatbeviteli hiba – űrlap nem menti az adatot, vagy hibás validáció." value="Adatbeviteli hiba"></v-radio>
                    <v-radio label="Megjelenítési hiba – ha valami nem néz ki jól (pl. reszponzivitás, mobilos nézet)." value="Megjelenítési hiba"></v-radio>
                </v-radio-group>

                <v-divider class="my-6"></v-divider>

                <v-text-field label="Bejelentés oka" variant="outlined" v-model="reportMessage"></v-text-field>
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn text="Küldés" :disabled="!reportType || reportMessage == ''" @click="SendNewReport()"></v-btn>
                <v-btn text="Bezárás" @click="reportDialog = false"></v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup>
import { ref, onMounted, inject, watch } from 'vue';
import { useRoute } from 'vue-router';
import axiosClient from '@/lib/axios';
import {useSendReport} from '../api/notifications/notificationQuery'
import socket from '../socket';

const {mutate: sendReport} = useSendReport();

const route = useRoute();

const showError = inject("showError");
const showSucces = inject("showSucces");

const SendNewReport = async () =>{
    await sendReport({message: 'Új bejelentés érkezett!', extra: reportType.value + ';'+reportMessage.value},{
        onSuccess: (response) =>{
            if (showSucces) {
                showSucces('A bejelentés sikeresen elküldve!');
            }else{
                console.log('A bejelentés sikeresen elküldve!');
            }

            socket.emit("send_notification", {
                room: "A",
                message: "Új bejelentés érkezett!",
                id: response,
                type: 1
            });
        },
        onError: (error) =>{
            if (showError) {
                showError(error.response.data);
            }else{
                console.log(error.response.data);
            }
        }
    });
    reportDialog.value = false;
}

const reportDialog = ref(false);
const visible = ref(false);
const reportType = ref(null);
const reportMessage = ref('');

const checkAuth = async () => {
  try {
    const res = await axiosClient.get('/check-cookie');
    if (!res.data.valid) {
      if (
        route.name == 'login' ||
        route.name == 'register' ||
        route.name == 'forget-password' ||
        route.name == 'set-new-password'
      ) {
        visible.value = false;
        return;
      }
    }
    visible.value = true;
  } catch (e) {
    console.error('Hiba a hitelesítés ellenőrzésénél:', e);
    visible.value = false;
  }
};

onMounted(checkAuth);

// Figyeljük a route változását
watch(
  () => route.name,
  async () => {
    await checkAuth();
  }
);
</script>
