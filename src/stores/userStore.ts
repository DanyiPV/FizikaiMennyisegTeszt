import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    className: '',
    unreadNotifs: {normal: 0, admin: 0},
    userId: null,
  })
});
