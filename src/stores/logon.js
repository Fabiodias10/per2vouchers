import { defineStore } from "pinia";

export const storeLogin = defineStore("storeLogin", {
  state: () => ({
    Cliente: undefined,
    Locations: undefined,
    Token: undefined,

    credenciais: {
      login: undefined,
      password: undefined,
      equipamento: undefined,
    },
    HoraLogin: undefined,
    Validador: undefined,
    IdValidador: undefined,

    Plataforma:{

      // platform:undefined,
      // desktop:undefined,
      // name:undefined
    }

  }),
  getters: {
    // nomeUnidadesAtivo: (state) => {
    //   const filtraAtivo = state.Locations.filter((items) => {
    //     return items.IndActive == 1;
    //   });
    //   const a = filtraAtivo.map((item) => {
    //     return {
    //       Nome: item.Name,
    //       Id: item.Id,
    //     };
    //   });
    //   return a;
    //   // return state.Locations[0].Name;
    // },
    // nomeCliente: (state) => {
    //   return {
    //     Nome: state.Cliente.Client.Name,
    //     Id: state.Cliente.Client.Id,
    //   };
    // },
  },
  actions: {
    increment() {
      this.counter++;
    },
  },
});
