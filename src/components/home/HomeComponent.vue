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
                  RECAUDACIÓN
                </div>
                <v-list-item-title align="center" class="headline mb-2">
                  {{ totales.recaudacion.total | formatPrecio }}
                </v-list-item-title>
                <v-row>
                  <v-col align="center" cols="6" style="border-top: 2px solid" class>
                    <p class="text" style="font-size: 14px">COBRADO</p>
                    <v-list-item-title align="center">
                      {{ totales.recaudacion.pagado | formatPrecio }}
                    </v-list-item-title>
                  </v-col>
                  <v-col align="center" cols="6" style="border-top: 2px solid">
                    <p class="text" style="font-size: 14px">A COBRAR</p>
                    <v-list-item-title align="center">
                      {{ totales.recaudacion.pendientePago | formatPrecio }}
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
                <v-list-item-title align="center" class="headline mb-2">
                  {{ totales.comprobantes.total | number }}
                </v-list-item-title>
                <v-row>
                  <v-col align="center" cols="6" style="border-top: 2px solid">
                    <p class="text" style="font-size: 14px">FACTURAS</p>
                    <v-list-item-title align="center">
                      {{ totales.comprobantes.factura | number }}
                    </v-list-item-title>
                  </v-col>
                  <v-col align="center" cols="6" style="border-top: 2px solid">
                    <p class="text" style="font-size: 14px">RECIBOS</p>
                    <v-list-item-title align="center">
                      {{ totales.comprobantes.recibo | number }}
                    </v-list-item-title>
                  </v-col>
                </v-row>
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-col>
        <v-col cols="12" md="4" v-if="pedidoProductosHabilitado">
          <v-card outlined color="#385F73" dark>
            <v-list-item three-line>
              <v-list-item-content class="align-center">
                <div align="center" style="font-size: 14px" class="text mb-2">
                  PEDIDOS
                </div>
                <v-list-item-title align="center" class="headline mb-2">
                  {{ totales.pedidos.total | number }}
                </v-list-item-title>
                <v-row>
                  <v-col align="center" cols="6" style="border-top: 2px solid">
                    <p class="text" style="font-size: 14px">PENDIENTES</p>
                    <v-list-item-title align="center">
                      {{ totales.pedidos.pendiente | number }}
                    </v-list-item-title>
                  </v-col>
                  <v-col align="center" cols="6" style="border-top: 2px solid">
                    <p class="text" style="font-size: 14px">REALIZADOS</p>
                    <v-list-item-title align="center">
                      {{ totales.pedidos.realizado | formatNumber }}
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
    <div>
      <mensajes-component :active="active" :mensaje="mensaje"></mensajes-component>
      <line-chart
        v-if="dataGraficos.datasets"
        :labels="dataGraficos.labels"
        :datasets="dataGraficos.datasets"
      ></line-chart>
    </div>
  </div>
</template>

<script>
import LineChart from "@/components/grafics/LineChartComponent.vue";
import MensajesComponent from "@/components/MensajesComponent.vue";
import DateRangoFecha from "@/components/home/DateRangoFecha.vue";
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
      ventas: {},
      dataGraficos: {},
      periodo: {
        fechaHasta: moment().format("YYYY-MM-DD"),
        fechaDesde: moment().subtract(30, "d").format("YYYY-MM-DD"),
      },
      totales: { recaudacion: {}, comprobantes: {}, pedidos: {} },
    };
  },
  mounted() {
    axios.get(`notificaciones`).then((response) => {
      if (response.data.data != null) {
        this.mensaje = response.data.data;
        this.active = true;
      }
    });
    // this.graficos();
  },
  methods: {
    graficos() {
      axios
        .get(`comprobantePreventa/negocio/${this.negocio.negocio_id}/ventas`, {
          params: this.periodo,
        })
        .then((response) => {
          this.dataGraficos = {};
          if (response.data.data.graficos) {
            this.dataGraficos = response.data.data.graficos ?? null;
          }
          this.totales = response.data.data.totales;
        })
        .catch((error) => {});
    },
  },
  watch: {
    periodo() {
      this.graficos();
    },
  },
};
</script>
