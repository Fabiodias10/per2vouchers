<template>
  <div class="row items-center justify-center q-pt-md fabio">
    <div class="text-h6" v-if="code">Codigo: {{ code }}</div>

    <div class="geralll" id="scan" v-show="cameraStatus === 1"></div>
    <q-page-sticky class="fabio" position="bottom-right" :offset="[18, 18]">
      <q-btn
        icon="cancel"
        color="negative"
        label="Fechar"
        v-show="cameraStatus === 1"
        @click="onStop"
      />
    </q-page-sticky>
    <q-dialog v-model="alert">
      <q-card>
        <q-card-section>
          <div class="text-h6">Alert</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          {{ code }}
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
// import Quagga from "quagga";
import Quagga from "@ericblade/quagga2"; // ES6
import { conveniados } from "../stores/convenioVoucher";
// import adapter from 'webrtc-adapter';

export default {
  name: "camera",
  data() {
    return {
      renderizaTeste: [],
      code: "",
      dialog: false,
      cameraStatus: 0,
      selecionaCamera: null,
      options: [],
      model: "Selecione a camera",
      alert: false,
    };
  },

  methods: {
    iniciarLeitor() {
      const store = conveniados();
      this.cameraStatus = 1;
      Quagga.init(
        {
          inputStream: {
            name: "Live",
            type: "LiveStream",
            target: document.querySelector("#scan"),

            constraints: {
              // width: 1000,
              // height: 1000,
              // width: 100,
              // height: 400,
              facingMode: "environment",
              // deviceId: this.model.deviceId
              deviceId: store.IdCamera.deviceId,

              // "8cea22550b3c47e9ee115e35995cced39ad7d0993b670881f628dd4f0e36a48c",
            },

            singleChannel: true, // true: only the red color-channel is read
          },
          halfSample: true,
            //  patchSize: "medium",
          frequency: 5,
          decoder: {
            readers: [
              "code_128_reader",
              // 'code_39_reader',
              //'code_39_vin_reader',
              //'codabar_reader',
              //'upc_reader',
              //'upc_e_reader',
              //'code_93_reader'
            ],
            multiple: false,
          },
          numOfWorkers: 4, //navigator.hardwareConcurrency,
          locate: true,
        },
        (err) => {
          if (err) {
            console.log(err);
            return;
          }
          console.log("Initialization finished. Ready to start");
          Quagga.start();
          Quagga.onDetected(this.onDetected);
        }
      );
    },
    onDetected(data) {
      this.code = data.codeResult.code;
      this.cameraStatus = 0;
      this.alert = true;
      //  this.onStop();
    },
    onStop() {
      Quagga.stop();
      this.cameraStatus = 0;
      const store = conveniados();
      store.Camera = false;
      console.log("OnStop");
    },
  },

  mounted() {
    console.log("mounted camera");
    this.iniciarLeitor();
  },
  created () {

  },
};
</script>

<style>
canvas {
  display: none;
}
</style>
