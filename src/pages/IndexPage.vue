<template>
  <q-page class="geral  " >

    <div  v-if="vida">
      <camera />
    </div>

    <!-- <div class="test q-pa-md  q-gutter-md"> -->
<!-- <div class="test row justify-center items-start q-pa-md"> -->


    <div v-if="!vida" class="row justify-around items-center q-mx-md  ">
      <div class=" col-md-12 col-xs-11 col-sm-12 milena ">
        <div class="row wrap">

      <q-item
        @click="testando(item)"
        dark
        v-ripple
        clickable
        v-for="(item, index) in convenios"
        :key="index"
        class="my-card-convenio shadow-6  q-ma-md col-md-2 col-sm-5 col-xs-11   "
      >
        <q-item-section>
          <q-item-section class="text-subtitle2 text-center">
            Convênio
          </q-item-section>
          <q-item-section class="text-subtitle2 text-center titulo">
            {{ item.Name }}
          </q-item-section>
          <q-item-section class="text-subtitle2 text-center">
            Tarifa diferenciada
          </q-item-section>
        </q-item-section>
      </q-item>

      <q-item
        @click="testando(item)"
        dark
        v-ripple
        clickable

        class="my-card-voucher shadow-6  q-ma-md col-md-2 col-sm-5 col-xs-11  "
        v-for="(item, index) in vouchers"
        :key="index"
      >
        <q-item-section >
          <q-item-label   class="row justify-end align-center available "
            >{{ item.StampQuantityAvailable }}

            <i class=" q-mt-sm q-ml-sm fa-sharp fa-solid fa-ticket fa-xl"></i>
          </q-item-label>

          <q-item-section class="text-subtitle2 text-center">
            {{ item.Affiliated.Name }}
          </q-item-section>
          <q-item-section class="text-subtitle2 text-center titulo">
            {{ item.Voucher.Description }}
          </q-item-section>

          <q-item-section class="text-subtitle2 text-center">
            {{
              item.Voucher.Unity == 1
                ? `Desconto de ${item.Voucher.Value} minuto(s)`
                : item.Voucher.Unity == 2
                ? `Desconto de R$${item.Voucher.Value},00`
                : `Desconto de ${item.Voucher.Value * 100}%`
            }}
          </q-item-section>
        </q-item-section>
      </q-item>
    </div>
  </div>
</div>
  <!-- </div> -->
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import Quagga from '@ericblade/quagga2'; // ES6
import { conveniados } from "../stores/convenioVoucher";
import camera from "../components/camera.vue";
import { store } from "quasar/wrappers";

export default defineComponent({
  name: "IndexPage",
  data() {
    return {
      vouchers: undefined,
      convenios: undefined,
      active: true,
    };
  },

  components: {
    camera,
  },
  computed: {
    vida() {
      const storeConveniados = conveniados();

      return storeConveniados.Camera;
    },
  },

  methods: {
    testando(item) {
      const storeConveniados = conveniados();
      storeConveniados.itemSelecionado = item;
      // console.log(item);
      storeConveniados.Camera = true;

    },


  },
  created() {
    this.vouchers = JSON.parse(localStorage.getItem("vouchers"));
    this.convenios = JSON.parse(localStorage.getItem("convenios"));
  },
  mounted() {
    console.log("mounted indexpage");


  },
});
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Oswald&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Oswald&family=Ubuntu&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Kanit&family=Oswald&family=Ubuntu&display=swap");


.my-card-convenio {
  min-width: 280px;
  /* max-width: auto; */
  /* width: auto; */
  height: 170px;
  font-family: "Kanit";
  border-radius: 10px;
  cursor:pointer;

  background-color: #e85656;
  transition: 0.5s ease;
  /* opacity:0.2; */
  /* margin:50px */
  cursor:pointer;
}
.my-card-convenio:hover
 {
  /* background-color: rgb(150, 37, 37); */
  /* -xpedu-filter: blur(5px); */
  transition: 0.5s ease;

  transform: scale(1.04);




  /* opacity:1; */
  /* box-shadow: inset 0 0 0 25px #53a7ea; */
  /* border-radius:50%; */
  /* margin:50px */
}
.my-card-voucher {
  min-width: 280px;
  /* width: auto; */
  /* max-width: auto; */
  /* max-width: 280px; */
  height:   170px;
  font-family: "Kanit";
  border-radius: 10px ;
  cursor:pointer;
  background-color: #0064b1;
  transition: 0.5s ease;
}
.my-card-voucher:hover {
  /* background-color: #035ca0; -xpedu-filter: blur(5px); */
  transition: 0.5s ease;

  transform: scale(1.04);
}
.geral {
  background-image: url("/fundo3.png");
  background-size: 1466px 800px;
  /* border: 2px solid green; */
  /* margin: 10px; */
}
.titulo {
  /* color: blueviolet; */
  font-size: 20px;
  /* font-style: normal; */
}
.test{
  /* border: 3px solid red; */

}
.available{
  /* border: 2px solid red; */
}
.milena{

  /* border: 4px solid #e85656; */
  /* width: auto;
  display: flex;
  justify-content: space-around; */
}

/* class="my-card-voucher shadow-8  col-xs-12 col-md-2 col-sm-1  " */
/* class="my-card-convenio shadow-8 col  col-xs-12 col-md-2 col-sm-1  " */


</style>
