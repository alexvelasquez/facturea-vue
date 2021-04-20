<template>
  <div class="home">
    <v-row no-gutters>
      <v-col cols="12">
        <p class="text-lg-h6 font-weight-bold blue-grey--text text--lighten-2">Inicio</p>
      </v-col>
    </v-row>
    <div>
      <v-row justify="center">
        <v-col cols="12" md="4">
          <v-card outlined color="#385F73" dark>
            <v-list-item three-line>
              <v-list-item-content class="align-center">
                <div align="center" style="font-size: 14px" class="text mb-2">
                  COMPRAS TOTALES
                </div>
                <v-list-item-title align="center" class="headline mb-2 pb-2">
                  {{ (parseFloat(totales.cobrado) + parseFloat(totales.aCobrar)) | formatPrecio }}
                </v-list-item-title>
                <v-row >
                  <v-col align="center" cols="6" style="border-top: 2px solid" class>
                    <p class="text" style="font-size: 14px">COBRADO</p>
                    <v-list-item-title align="center">
                      {{ totales.cobrado | formatPrecio }}
                    </v-list-item-title>
                  </v-col>
                  <v-col align="center" cols="6" style="border-top: 2px solid">
                    <p class="text" style="font-size: 14px">A COBRAR</p>
                    <v-list-item-title align="center">
                      {{ totales.aCobrar | formatPrecio }}
                    </v-list-item-title>
                  </v-col>
                </v-row>
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-col>
        <v-col cols="12" md="4">
          <v-card outlined color="#385F73" dark>
            <v-list-item three-line>
              <v-list-item-content class="align-center">
                <div align="center" style="font-size: 14px" class="text mb-2">
                  COMPROBANTES EMITIDOS
                </div>
                <v-list-item-title align="center" class="headline mb-2 pb-2">
                  {{ (parseInt(totales.facturas)+parseInt(totales.recibos)) | number }}
                </v-list-item-title>
                <v-row>
                  <v-col align="center" cols="6" style="border-top: 2px solid">
                    <p class="text" style="font-size: 14px">FACTURAS</p>
                    <v-list-item-title align="center">
                      {{ totales.facturas | number }}
                    </v-list-item-title>
                  </v-col>
                  <v-col align="center" cols="6" style="border-top: 2px solid">
                    <p class="text" style="font-size: 14px">RECIBOS</p>
                    <v-list-item-title align="center">
                      {{ totales.recibos| number }}
                    </v-list-item-title>
                  </v-col>
                </v-row>
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-col>
        <v-col cols="12" md="4" v-if="negocio.pedido === 'S'">
          <v-card outlined color="#385F73" dark>
            <v-list-item three-line>
              <v-list-item-content class="align-center">
                <div align="center" style="font-size: 14px" class="text mb-2">
                  PEDIDOS
                </div>
                <v-list-item-title align="center" class="headline mb-2 pb-2">
                  {{ (parseInt(totales.pendientes)+parseInt(totales.realizados)) | number }}
                </v-list-item-title>
                <v-row>
                  <v-col align="center" cols="6" style="border-top: 2px solid">
                    <p class="text" style="font-size: 14px">PENDIENTES</p>
                    <v-list-item-title align="center">
                      {{ totales.pendientes | number }}
                    </v-list-item-title>
                  </v-col>
                  <v-col align="center" cols="6" style="border-top: 2px solid">
                    <p class="text" style="font-size: 14px">REALIZADOS</p>
                    <v-list-item-title align="center">
                      {{ totales.realizados | number }}
                    </v-list-item-title>
                  </v-col>
                </v-row>
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-col>
        <v-col cols="12">
          <v-row no-gutters>
            <v-col cols="12">
              <p class="text font-weight-bold blue-grey--text text--lighten-2">
                Informes: {{ periodo.fechaDesde | formatDate }} -
                {{ periodo.fechaHasta | formatDate }}
              </p>
            </v-col>
          </v-row>
          <date-rango-fecha @buscar="periodo = $event"></date-rango-fecha>
        </v-col>
      </v-row>
    </div>
    <div v-if="totales.graficos">
      <mensajes-component :active="active" :mensaje="mensaje"></mensajes-component>
      <line-chart :labels="totales.graficos.labels" :datasets="totales.graficos.values"></line-chart>
    </div>
  </div>
</template>

<script>
import LineChart from "@/components/grafics/LineChartComponent.vue";
import MensajesComponent from "@/components/MensajesComponent.vue";
import DateRangoFecha from "@/components/home/DateRangoFecha.vue";
import { getNotificaciones } from "@/services/notificaciones.js";
import { negocio } from "@/services/negocio";
import { informe } from "@/services/home";
import axios from "axios";
export default {
  name: "Home",
  components: {
    LineChart,
    MensajesComponent,
    DateRangoFecha,
  },
  data() {
    return {
      active: false,
      mensaje: {},
      negocio:{},
      periodo: {
        fechaHasta: moment().format("YYYY-MM-DD"),
        fechaDesde: moment().subtract(30, "d").format("YYYY-MM-DD"),
      },
      totales:{},
    };
  },
  async mounted() {
    const response = (await getNotificaciones())
    if(response.status === 200 && response.data.data){
      this.mensaje = response.data.data;
      this.active = true;
    }
    this.negocio = (await negocio()).data.data;
    this.totales = (await informe(this.periodo)).data.data;
  },
  watch: {
    async periodo(){
      this.totales.graficos = null;
      this.totales = (await informe(this.periodo)).data.data;
    },
  },
  
};
</script>
