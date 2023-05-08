<template>
  <q-layout>
    <q-page-container>
      <q-page
        class="geral col-12 column self-center items-center justify-center"
      >
        <q-card class="my-card shadow-3">
          <q-card-section class="titulos">
            <q-separator vertical color="blue" />
            <div class="text-h1 column items-center">
              <img src="../assets/logoPerto.png" width="140" />
            </div>
            <div class="column items-center q-mt-sm">Validação On-Line</div>
          </q-card-section>

          <q-card-section class="q-mx-auto">
            <q-input
              dense
              tabindex="1"
              rounded
              v-model="Credenciais.UserName"
              label="Usuario"
              type="email"
              class="q-my-md"
            >
              <template v-slot:prepend>
                <q-icon name="account_circle" />
              </template>
            </q-input>

            <q-input
              dense
              tabindex="2"
              :type="isPwd ? 'password' : 'text'"
              rounded
              v-model="Credenciais.Password"
              label="Senha"
              class="q-my-sm"
            >
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>

              <template v-slot:prepend>
                <q-icon name="lock" />
              </template>
            </q-input>
            <!-- <q-separator></q-separator> -->
            <div class="row justify-center items-center">
              <q-input
                dense
                tabindex="3"
                rounded
                outlined
                v-model.number="Credenciais.EquipmentId"
                label="Equipamento"
                type="text"
                class="q-my-md"
                style="width: 150px"
              >
                <template v-slot:prepend>
                  <q-icon name="smartphone" />
                </template>
              </q-input>
            </div>
          </q-card-section>

          <q-card-actions vertical align="center" class="q-mx-xl q-mb-md">
            <q-btn
              size="md"
              tabindex="3"
              push
              icon="check"
              label="Acessar"
              class="q-mx-sm full-width"
              @click="autentica()"
              :loading="load"
            >
              <template v-slot:loading>
                <q-spinner-ios size="30px" color="secundary" />
              </template>
            </q-btn>

            <!-- <div class="column items-end justify-end">
            <p>Largura {{larguraTela}}</p>
            <p>Altura {{alturaTela}}</p>
          </div> -->
          </q-card-actions>
          <!-- <q-card-section
        style="height: 50px"
        class="versao text-caption column justify-end items-end"
      >
        Versao: 5.1.0
      </q-card-section> -->
        </q-card>
      </q-page>
    </q-page-container>

    <!-- <div v-if="apareceDialog">
      <dialogUnidade :unidades="mandaUnidades" />
    </div> -->
    <!-- <div v-if="io" class="row justify-center">
        <q-img style="width: 300px" src="ios.png" />
      </div> -->

    <!-- <q-page-container class="col-12 column items-center justify-end"  >

        <div class=" popup   ">
          <img src="/ios.png" style="height: 120px;width: 300px" >
        </div>
      </q-page-container> -->
    <router-view />
    <q-dialog v-model="io" seamless position="bottom">
      <q-card
        style="width: 400px; color: black; background-color: silver"
        color="primary"
        class=""
      >
        <!-- <q-linear-progress :value="0.6" color="red" /> -->

        <!-- <q-img  src="ios.png" /> -->
        <!-- <q-btn class="float-right q-mx-sm" size="8px" flat round icon="close" v-close-popup   /> -->
        <q-card-section class="flex flex-center tela_ios">
          <strong class="q-mr-xs"> Instale </strong> este aplicativo Web no seu
          <strong class="q-ml-xs"> Iphone:</strong>
          <br />
          <p>
            Toque em <q-icon name="ios_share" size="22px" /> e adicione à Tela
            Inicial
          </p>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-layout>
</template>

<script>
import axios from "axios";
import { date } from "quasar";
import { storeLogin } from "../stores/logon";
import {conveniados} from '../stores/convenioVoucher'
// import dialogUnidade from "../components/dialogUnidade.vue";
import { defineComponent } from "vue";
import { Notify, QSpinnerGears } from "quasar";
// import {
//   getDatabase,
//   ref,
//   set,
//   serverTimestamp,
//   child,
//   get,
//   push,
//   update,
// } from "firebase/database";

// import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default defineComponent({
  name: "authPerto",
  components: {
    // dialogUnidade,
  },

  data() {
    return {
      Credenciais: {
        UserName: null,
        Password: null,
        EquipmentId: null,
      },
      isPwd: true,
      io: false,
      load: false,
      // dialogUnidadeShow: false,
      mandaUnidades: [],
    };
  },
  methods: {
    autentica() {
      const store = storeLogin();
      const storeConveniados = conveniados()
      store.credenciais.login = this.Credenciais.UserName;
      store.credenciais.password = this.Credenciais.Password;
      store.credenciais.equipamento = this.Credenciais.EquipmentId;
      //  window.location.reload();
      this.load = true;

      axios
        .post(
          `https://cloud.per2park.com.br:32209/api/v0/UserMob/DesconectOthers`,
          {
            Description: `Desconectado pelo usuário:${this.Credenciais.UserName}`,
            EqpId: this.Credenciais.EquipmentId,
            Status: "OUT",
          },
          {
            timeout: 10000,
          }
        )
        .then((response) => {
          console.log(response.data);
          axios
            .post(
              `https://cloud.per2park.com.br:32209/api/v0/UserMob/userMobValidationByAgreementPer2Voucher`,

              this.Credenciais,
              {
                timeout: 15000,
              }
            )
            .then((result) => {
              const token = result.data[1];
              localStorage.setItem("Equipamento", this.Credenciais.EquipmentId);
              localStorage.setItem("token", token); //guarda token no localstorage
              console.log(result.data);
              store.Cliente = result.data[0];
              store.Locations = result.data[0].Locations;
              store.Token = result.data[1];

              const formattedString = date.formatDate(
                Date.now(),
                "DD/MM/YY HH:mm"
              );
              store.HoraLogin = formattedString;

              axios
                .get(
                  `https://cloud.per2park.com.br:32209/api/v0/Equipment/getEquipment`,
                  {
                    params: { id: this.Credenciais.EquipmentId },
                    headers: {
                      Authorization: `Bearer ${store.Token}`,
                    },
                  }
                )
                .then((response) => {
                  console.log(response);
                  store.Validador = response.data;
                  store.IdValidador = response.data.Local.Id;

                  axios
                    .post(
                      `https://cloud.per2park.com.br:32209/api/v0/Voucher/getVouchersOnlineValidation`,
                      { id: response.data.Local.Id },
                      {
                        headers: {
                          Authorization: `Bearer ${store.Token}`,
                        },
                      }
                    )
                    .then((response) => {
                      console.log(response);
                      storeConveniados.Vouchers = response.data
                      localStorage.setItem("vouchers",JSON.stringify(response.data))

                      axios.post(`https://cloud.per2park.com.br:32209/api/v0/Affiliated/getAffiliatedsWithRate`,
                      {id: store.IdValidador},
                      {
                        headers: {
                          Authorization: `Bearer ${store.Token}`,
                        },
                      }

                      )
                      .then((response) => {
                        console.log(response);
                        storeConveniados.Convenios = response.data
                        localStorage.setItem("convenios",JSON.stringify(response.data)  )

                        this.$router.push('/indexpage')

                      })

                    })
                    .catch((err) => {
                      console.log("nao conseguiu carregar os vouchers");
                    })
                })
                .catch((err) => {
                  console.log("nao conseguiu get equipamento");
                });
            })
            .catch((err) => {
              console.log(err.message);
              this.erro = err.message;
              // this.teste("negative", this.erroTela, "top");
              setTimeout(() => {
                this.load = false;
              }, 1600);
            });
          this.confirm = false;
        })
        .catch((err) => {
          console.log("Erro ao desconectar outro usuario");
        });
    },

    ios() {
      // Detecta se o dispositivo está no iOS
      const isIos = () => {
        const userAgent = window.navigator.userAgent.toLowerCase();
        return /iphone|ipad|ipod/.test(userAgent);
      };
      // Detects if device is in standalone mode
      const isInStandaloneMode = () =>
        "standalone" in window.navigator && window.navigator.standalone;
      // Verifica se deve exibir notificação popup de instalação:
      if (isIos() && !isInStandaloneMode()) {
        this.souIOS = true;

        this.io = true;
        chamaDialog("Estou no IOS");
        // console.log("Estou no IOS");
        // this.setState({ showInstallMessage: true });
      } else {
        this.souIOS = false;
        //this.io = true;
        console.log("Não é IOS");
        // chamaDialog("nao sou ios")
      }
    },
  },

  computed: {
    apareceDialog() {
      const store = storeLogin();

      return store.dialogSelecionaUnidade;
    },
  },
  mounted() {
    this.isPwd = true;
    this.ios();
    // const store = storeLogin();
    // store.Locations = "locations";
    // this.teste = store.Locations;

    console.log(window.screen);
    console.log(this.$q.platform);
    this.servidor = localStorage.getItem("ipservidor");
  },
  // unmounted() {
  //   localStorage.removeItem("ipservidor");
  // },
});
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Oswald&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Oswald&family=Ubuntu&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Kanit&family=Oswald&family=Ubuntu&display=swap");

/* .q-page { */
/* border: 3px solid silver; */
/* border-radius: 3px; */
/* } */
.my-card {
  min-width: 340px;
  border-radius: 10px;
}

.geral {
  opacity: 1;
  /* background-image: url("/fundo3.png"); */
  font-family: "Kanit";

  background-size: 1466px 1000px;
}

.versao {
  color: gray;
  padding: 4px;
}

.q-btn {
  font-family: "Kanit";
  font-size: 14px;
  color: #1b2a35;
  background-color: #53b7e8;
}

.q-input {
  padding: 3px;
}

.titulos {
  background-color: #1b2a35;
  color: white;
  font-family: "Kanit";
  font-size: 16px;
}
</style>
