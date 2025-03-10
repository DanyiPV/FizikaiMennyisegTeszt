import { defineStore } from 'pinia';

export const useColorStore = defineStore('colorStore', {
  state: () => ({
    value: 0, // Kezdeti érték
  }),
  getters: {
    color(state) {
      switch (state.value) {
        case 0: return 'blue-grey';
        case 1: return 'teal';
        case 2: return 'brown';
        case 3: return 'indigo';
        case 4: return 'indigo';
        case 5: return 'indigo';
        default: return 'blue-grey';
      }
    }
  },
  actions: {
    setValue(newValue: number) {
      this.value = newValue; // Az érték frissítése
    }
  }
});
