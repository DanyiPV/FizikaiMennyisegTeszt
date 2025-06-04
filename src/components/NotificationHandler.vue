<template>
  <v-slide-x-reverse-transition>
    <div
    v-if="notifications != null"
    style="background-color: rgb(var(--v-theme-primary), .6); position: absolute; top: 15rem; right: 0; border-top-left-radius: 12px; border-bottom-left-radius: 12px;" 
    class="px-4 py-2 d-flex ga-2 align-center">
      <v-progress-circular :model-value="value" :rotate="360" :size="40" color="text_color">
        <v-icon size="15" color="text_color">mdi-bell</v-icon>
      </v-progress-circular>
      <div style="max-width: 15rem;" class="ml-2">
        <h4 style="color: rgb(var(--v-theme-text_color)); font-weight: normal;">{{ notifications }}</h4>
      </div>
    </div>
  </v-slide-x-reverse-transition>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import socket from '../socket';
import { useUserStore } from '../stores/userStore';
import {useGetNotifications, useShownNotification} from '../api/notifications/notificationQuery'

const userStore = useUserStore();

const notifications = ref(null);

function sendNotification() {
   socket.emit("send_notification", {
    room: "A",
    message: "Teszt üzenet",
    id: 0,
    type: 0
  });
}

const value = ref(100)      
var interval = -1;

const {mutate: getNotifications} = useGetNotifications();

const {mutate: shownNotification} = useShownNotification();

onMounted(async () =>{
   watch(
    () => userStore.className,
    async (newClassName) => {
      if (newClassName) {
        await getNotifications(newClassName, {
          onSuccess: async (notifs) => {
            for (const notif of notifs) {
              notifications.value = notif.message;
              shownNotification(notif.id);

              value.value = 100;
              const interval = setInterval(() => {
                if (value.value >= 0) {
                  value.value -= 2;
                } 
                
                if(value.value < 0){       
                  notifications.value = null;
                  clearInterval(interval);
                }
              }, 100);

              await new Promise(resolve => setTimeout(resolve, 5500));
            }
          }
        });
      }
    })
})

onMounted(() => {
  // 1. Csak egyszer regisztráljuk az üzenetfogadót
  socket.on('receive_notification', (message, id, type) => {
    notifications.value = message.message;  

    if (message.type == 0) {
      userStore.unreadNotifs.normal++;
    } else {
      userStore.unreadNotifs.admin++;
    }

    shownNotification(message.id);

    setTimeout(() => {
      notifications.value = null;
      value.value = 100;
      clearInterval(interval);
    }, 5200);

    interval = setInterval(() => {
      if (value.value > 0) {
        value.value -= 2;
      } else {
        clearInterval(interval);
      }
    }, 100);
  });

  // 2. Ez a watcher továbbra is csak a join_room-ot kezeli, ha változik a className
  watch(
    () => userStore.className,
    (newClassName) => {
      if (newClassName) {
        socket.emit('join_room', newClassName);
      }
    },
    { immediate: true }
  );
});
</script>
