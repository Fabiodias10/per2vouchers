<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar style="background-color: #1b2a35">
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> Validação OnLine </q-toolbar-title>

        <div>versao: {{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Essential Links </q-item-label>

        <q-select
          outlined
          rounded
          v-model="model"
          :options="options"
          label="Selecione a câmera"
          class="q-ma-md"
        />
      </q-list>
      <p>{{ hehe }}</p>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import { conveniados } from "../stores/convenioVoucher";
import { storeLogin } from "../stores/logon";
import { Notify } from "quasar";

const storeslogon = storeLogin()

export default defineComponent({
  name: "MainLayout",
  data() {
    return {
      leftDrawerOpen: false,
      model: undefined,
      options: undefined,
      hehe:undefined
    };
  },
  methods: {
    notificacao() {
      Notify.create({
        position: "top",
        message: `Camera ${this.model.label} selecionada!`,
        type: "info",
        timeout: 2000,
        textColor: 'black',
  // classes: 'glossy'
      });
    },
    toggleLeftDrawer() {
      this.leftDrawerOpen = !this.leftDrawerOpen;
    },
    teste() {
      const store = conveniados();

      if (
        navigator.mediaDevices &&
        typeof navigator.mediaDevices.getUserMedia === "function"
      ) {

      }

      if (!navigator.mediaDevices?.enumerateDevices) {
        console.log("enumerateDevices() not supported.");
      } else {
        // List cameras and microphones.
        navigator.mediaDevices
          .enumerateDevices()
          .then((devices) => {
            // console.log(devices);

            const a = devices.filter((response) => {
              return response.kind == "videoinput";
            });
            // console.log(a);

            let contaCamera = 1;
            let h = "";

            const b = a.map((response) => {
              if (response.label == "") {
                h = `Camera ${contaCamera++}`;
              } else {
                h = response.label;
              }

              return {
                kind: response.kind,
                groupId: response.groupId,
                label: h,
                deviceId: response.deviceId,
              };
            });
            console.log(b);
            // console.log(b[b.length -1]); //ultimo valor do array

            this.options = b;

          })
          .catch((err) => {
            console.error(`${err.name}: ${err.message}`);
          });
      }
    },
  },
  watch: {
    model() {
      const store = conveniados();
      console.log("Mudei de camera");
      localStorage.setItem("camera", JSON.stringify(this.model));
      store.IdCamera = this.model;

      // this.notificacao();
      this.leftDrawerOpen = false;
    },
  },
  mounted() {
    console.log("mount layout");
    this.teste();
  },
  created() {

    const plataforma = this.$q.platform.is;
    console.log("created");
    console.log(plataforma);

    storeslogon.Plataforma = plataforma

    this.hehe = plataforma

    if (localStorage.getItem("camera")) {
      console.log("existe no localstorage a preferencia da camera");
    } else {
      console.log("NAOO existe no localstorage a preferencia da camera");
    }
    const q = JSON.parse(localStorage.getItem("camera"));
    this.model = q;

    const store = conveniados();
    store.IdCamera = q;
  },
});
</script>
