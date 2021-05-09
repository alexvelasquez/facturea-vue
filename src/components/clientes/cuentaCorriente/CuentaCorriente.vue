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
        <v-btn color="#385F73" text @click="$router.push('/clientes')"
          >Volver</v-btn
        >
      </v-col>
    </v-row>
    <v-row v-if="cuentaCorriente">
      <v-col cols="12" md="7" lg="7">
        <v-card style="border-left: 5px solid #385f73">
          <v-card-title class="overline justify-left"
            >{{ cuentaCorriente.cliente.razon_social }} <br />
          </v-card-title>

          <v-card-subtitle class="overline text-center">
            Saldo a Pagar
          </v-card-subtitle>
          <v-card-text class="text-center text-h5">
              <span>{{ cuentaCorriente.total | formatPrecio }}</span>
              <v-row class="justify-end">
                <modal-pago @abonar="abonar($event)"></modal-pago>
              </v-row>
          </v-card-text>
        </v-card>
      </v-col>

      
      <v-col cols="12" md="5" lg="5">
        <v-card style="border-left: 5px solid #385f73">
          <v-card-title class="overline justify-left"
            ><span>Último movimiento: 
            <span v-if="movimientos.length">{{movimientos[0].f_creacion | formatDate}}</span>
            <span v-else>--</span>
            </span>
          </v-card-title>

          <v-card-subtitle class="overline text-center">
            Monto Pagado
          </v-card-subtitle>
          <v-card-text class="text-center text-h5">
              <span v-if="movimientos.length">{{movimientos[0].monto | formatPrecio}}</span>
              <span v-else>--</span>
              <v-row class="justify-end">
                <modal-movimientos :cliente="clienteId" @abonar="abonar($event)"></modal-movimientos>
              </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-card>
          <v-card-title
            ><v-col cols="6" sm="4"
              ><v-row>
                <v-text-field
                  v-model="search"
                  append-icon="mdi-magnify"
                  label="Buscar Compra"
                  single-line
                  hide-details
                ></v-text-field>
              </v-row>
            </v-col>
            <v-spacer></v-spacer>
          </v-card-title>
          <v-data-table
            :headers="cabeceras"
            item-key="estado_venta.estadoVentaId"
            :items="compras"
            :search="search"
          >
            <template v-slot:[`item.estado_venta.fCreacion`]="{ item }">
              <span>{{ item.estado_venta.fCreacion | formatDate }}</span>
            </template>
            <template
              v-slot:[`item.estado_venta.estado.descripcion`]="{ item }"
            >
              <v-chip
                class="ma-2 white--text"
                :color="colores[item.estado_venta.estado.codigo.toLowerCase()]"
              >
                <span>{{(item.estado_venta.estado.codigo === 'PAGADO' || item.estado_venta.estado.codigo === 'PENDIENTECOMPROBANTE') ? 'Pagado' :item.estado_venta.estado.descripcion}}</span>
              </v-chip>
            </template>
            <template v-slot:[`item.estado_venta.venta.montoDebido`]="{ item }">
              <span>{{ item.estado_venta.venta.montoDebido | formatPrecio }}</span>
            </template>
            <template v-slot:[`item.total`]="{ item }">
              <span>{{ item.total | formatPrecio }}</span>
            </template>
            <template v-slot:[`item.actions`]="{ item }">
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon
                    medium
                    color="#385F73"
                    class="mr-2"
                    @click="verDetalle(item.estado_venta)"
                    v-bind="attrs"
                    v-on="on"
                  >
                    list_alt
                  </v-icon>
                </template>
                <span>Visualizar</span>
              </v-tooltip>
              <v-tooltip
                top
                v-if="item.estado_venta.estado.codigo == 'PENDIENTECOMPROBANTE'"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-icon
                    medium
                    color="#385F73"
                    class="mr-2"
                    v-bind="attrs"
                    v-on="on"
                    @click="
                      redirect(
                        `/facturacion/${item.estado_venta.venta.ventaId}`
                      )
                    "
                  >
                    receipt_long
                  </v-icon>
                </template>
                <span>Generar Comprobante</span>
              </v-tooltip>
            </template>
          </v-data-table>
          <detalle-compra
            :itemsProductos="itemsProductos"
            :dialog="dialog"
            @closeDetalle="dialog = false"
            @descargarPDF="
              descargar(
                `ventas/pedido/descargar/${$event.venta_id}`,
                `pedido .pdf`
              )
            "
          ></detalle-compra>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import ModalPago from "@/components/clientes/cuentaCorriente/ModalPago";
import ModalMovimientos from "@/components/clientes/cuentaCorriente/ModalMovimientos";
import { cuentaCorriente } from "@/services/clientes";
import { agregarMovimiento,movimientos } from "@/services/movimiento";
import DetalleCompra from "@/components/clientes/cuentaCorriente/DetalleCompra.vue";
import { compras } from "@/services/clientes";
import { getDetalleVenta } from "@/services/ventas";
export default {
  components: { ModalPago, DetalleCompra, ModalMovimientos },
  props: {
    clienteId: {
      type: String,
    },
  },
  data: () => ({
    cuentaCorriente: null,
    dialog: false,
    search: "",
    compras: [],
    itemCompra: null,
    itemsProductos: [],
    movimientos:[],
    cabeceras: [
      {
        text: "Fecha de Compra",
        align: "center",
        sortable: true,
        value: "estado_venta.fCreacion",
      },
      {
        text: "Monto de Compra",
        align: "center",
        value: "total",
      },
      {
        text: "Monto debido",
        align: "center",
        value: "estado_venta.venta.montoDebido",
      },
      {
        text: "Estado",
        align: "center",
        sortable: true,
        value: "estado_venta.estado.descripcion",
      },
      {
        text: "Acciones",
        value: "actions",
        align: "center",
        sortable: false,
      },
    ],
    limit:1,
  }),

  mounted() {
    this.loadData()
  },


  methods: {
    async abonar(movimiento) {
      movimiento.cliente = this.clienteId;
      let response = await agregarMovimiento(movimiento);
      if (response.status === 200) {
        this.loadData()
        this.notificacion("Abonado Correctamente", "success");
      } else {
        this.notificacionError();
      }
    },
    async loadData(){
      this.cuentaCorriente = (await cuentaCorriente(this.clienteId)).data.data;
      this.movimientos = (await movimientos(this.clienteId,this.limit)).data.data;
      this.compras = (await compras(this.clienteId)).data.data;
    },
    async verDetalle(item) {
      this.itemsProductos = (await getDetalleVenta(item.estadoVentaId)).data.data;
      this.dialog=true;
    },
  },
};
</script>
