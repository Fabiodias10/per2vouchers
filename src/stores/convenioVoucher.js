import { defineStore } from "pinia";

export const conveniados = defineStore("conveniados", {
  state: () => ({
    Vouchers: undefined,
    Convenios: undefined,
    itemSelecionado: undefined,
    Camera: undefined,
    IdCamera:undefined

  })
})
