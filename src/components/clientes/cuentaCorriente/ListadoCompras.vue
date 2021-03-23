<template>
  <div>
    <v-row no-gutters justify="space-between">
      <v-col cols="6">
        <p class="text-lg-h6 font-weight-bold blue-grey--text text--lighten-2">
          Compras
        </p>
      </v-col>
      <v-col cols="4" align="end">
        <v-btn color="#385F73" text @click="$router.push(`/clientes/cuentacorriente/${clienteId}`)">Volver</v-btn>
      </v-col>
    </v-row>
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
        <template v-slot:[`item.estado_venta.estado.descripcion`]="{ item }">
          <v-chip class="ma-2 white--text" :color="colores[item.estado_venta.estado.codigo.toLowerCase()]">
            {{ item.estado_venta.estado.descripcion }}
          </v-chip>
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
          <v-tooltip top v-if="item.estado_venta.estado.codigo == 'PENDIENTECOMPROBANTE'">
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                medium
                color="#385F73"
                class="mr-2"
                v-bind="attrs"
                v-on="on"
                @click="redirect(`/facturacion/${item.estado_venta.venta.ventaId}`)"
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
        @closeDetalle="dialog=false"
        @descargarPDF="
          descargar(
            `ventas/pedido/descargar/${itemPedido.venta}`,
            `pedido ${itemPedido.fecha}.pdf`
          )
        "
      ></detalle-compra>
    </v-card>
  </div>
</template>

<script>
import DetalleCompra from "@/components/clientes/cuentaCorriente/DetalleCompra.vue";
export default {
  components:{DetalleCompra},
  props: {
    clienteId: {
      type: String,
    },
  },
  data: () => ({
    dialog: false,
    search:"",
    compras:[],
    itemCompra:null,
    itemsProductos:[],
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

  }),

  mounted() {
    this.cargarComprasClientes();
  },
  methods: {
    cargarComprasClientes() {
        axios.get(`clientes/compras/${this.clienteId}`)
        .then(response=>{
            this.compras = response.data.data;
        })
    },
    verDetalle(item) {
      console.log(item)
      axios.get(`ventas/pedido/productos/${item.venta.ventaId}`).then((response) => {
        this.itemsProductos = response.data.data;
        this.dialog = true;
      });
    },
  }

};
</script>
