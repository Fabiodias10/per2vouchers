import { defineStore } from "pinia";

export const storeEquipamentos = defineStore("storeEquipamentos", {
  state: () => ({
    geral: undefined,
    equipSocket: undefined,
  }),
  getters: {},
  actions: {
    increment() {
      this.counter++;
    },
  },
});
