<style media="screen">
.swal2-input {
  height: 34px !important;
  font-family: "Roboto" !important;
}
</style>

<template>
  <div>
    <v-row no-gutters justify="space-between">
      <v-col cols="6">
        <p class="text-lg-h6 font-weight-bold blue-grey--text text--lighten-2">
          Cuenta Corriente
        </p>
      </v-col>
      <v-col cols="4" align="end">
        <v-btn color="#385F73" text @click="$router.push('/clientes')">Volver</v-btn>
      </v-col>
    </v-row>
    <v-row v-if="cuentaCorriente">
      <v-col cols="12" md="7" lg="7">
        <v-card class="mt-15" style="border-left: 5px solid #385f73">
          <v-card-title class="overline justify-left">{{cuentaCorriente.cliente.razon_social}} <br> 
           </v-card-title>

          <v-card-subtitle class="overline text-center">
            Saldo a Pagar 
          </v-card-subtitle
          >
          <v-card-text class="text-center text-h5">
            <span class="caption"></span> {{cuentaCorriente.monto | formatPrecio }}</v-card-subtitle>
          </v-card-text>
          <v-card-actions class="justify-end">
            <!-- <v-btn text>Abonar</v-btn> -->
            <modal-pago @abonar="abonar($event)"></modal-pago>
              <v-btn
                outlined
                color="#385F73"
                dark
                class="mb-2 mr-md-2"
                @click="$router.push(`/clientes/compras/${clienteId}`)"
                >COMPRAS</v-btn
              >
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="12" md="5" lg="5">
        <v-card class="overflow-y-auto" max-height="400">
          <v-card-title dark class="overline justify-center">
            <span></span>Últimos Movimientos
          </v-card-title>

          <v-card-text>
            <v-timeline dense clipped v-if="cuentaCorriente.movimientos.length">
              <v-timeline-item  v-for="(m, index) in cuentaCorriente.movimientos" :key="m.cuenta_corriente_id" class="mb-4" color="grey" small v-if="index < cantMovimientos">
                <v-row justify="space-between" >
                  <v-col cols="7">{{m.tipo_movimiento.codigo | descripMovimiento}}</v-col>
                  <v-col class="text-center" cols="5"
                    ><span>{{m.tipo_movimiento.codigo === 'AUMENTO' ? '+' : '-'}} {{ parseFloat(m.valor) | formatPrecio}}</span> <br /><span> {{m.f_creacion | formatDateTime}}</span></v-col
                  >
                </v-row>
              </v-timeline-item>
            </v-timeline>
            <div v-else class="text-center">
              <span> No hay movimientos disponibles</span>
            </div>
          </v-card-text>

          <v-card-actions class="justify-center" v-if="cuentaCorriente.movimientos.length">
            <v-btn text class="overline" @click="cantMovimientos = cantMovimientos + 10"> Ver mas </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import ModalPago from "@/components/clientes/cuentaCorriente/ModalPago";
import { cuentaCorriente } from "@/services/clientes";
import { agregarMovimiento } from "@/services/movimiento";

export default {
  components:{ModalPago},
  props: {
    clienteId: {
      type: String,
    },
  },
  data: () => ({
    cuentaCorriente:null,
    cantMovimientos:10
  }),

  async mounted() {
    this.cuentaCorriente = (await cuentaCorriente(this.clienteId)).data.data;
  },
  methods: {
      async abonar(movimiento){
        movimiento.cuenta_corriente = this.cuentaCorriente.cuenta_corriente_id;
        let response = (await agregarMovimiento(movimiento))
        if(response.status === 200){
            console.log(Object.assign({}, result.data.data));
            this.$nextTick(() => {
              this.cuentaCorriente = Object.assign({}, result.data.data);
            });
            this.notificacion("Abonado Correctamente", "success");
        }
        else{
          this.notificacionError();
        }
      }
  },
};
</script>