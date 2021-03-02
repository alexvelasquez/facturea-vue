<template>
  <div>
    <v-row no-gutters>
      <v-col cols="12">
        <p class="text-lg-h6 font-weight-bold blue-grey--text text--lighten-2">
          Pedidos {{ estado | capitalize }}s
        </p>
      </v-col>
    </v-row>
    <v-card>
      <v-card-title>
        <v-row justify="end">
          <v-col cols="12" md="3">
            <v-select
              v-model="estado"
              :items="estados"
              item-value="codigo"
              item-text="descripcion"
              placeholder="Seleccione una opción"
              label="Estado"
              dense
              outlined
            ></v-select>
          </v-col>
        </v-row>
      </v-card-title>
      <v-data-table :headers="headers" :items="pedidos" :search="search">
        <template v-slot:[`item.fecha`]="{ item }">
          <span>{{ item.fecha | formatDate }}</span>
        </template>
        <template v-slot:item.estado="{ item }">
          <v-chip class="ma-2 white--text" :color="colores[item.estado.toLowerCase()]">
            {{ item.estado | capitalize }}
          </v-chip>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                medium
                color="#385F73"
                class="mr-2"
                @click="verDetalle(item)"
                v-bind="attrs"
                v-on="on"
              >
                list_alt
              </v-icon>
            </template>
            <span>Visualizar</span>
          </v-tooltip>
          <v-tooltip top v-if="item.estado == 'PENDIENTE'">
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                medium
                color="#385F73"
                class="mr-2"
                v-bind="attrs"
                v-on="on"
                @click="$router.push(`/pedidos/editar/${item.venta}`)"
              >
                mdi-pencil
              </v-icon>
            </template>
            <span>Editar</span>
          </v-tooltip>
          <v-tooltip top v-if="item.estado == 'PENDIENTE'">
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                medium
                color="#385F73"
                class="mr-2"
                v-bind="attrs"
                v-on="on"
                @click="cambiarEstado(item, 'CANCELADO')"
              >
                auto_delete
              </v-icon>
            </template>
            <span>Cancelar</span>
          </v-tooltip>
          <v-tooltip top v-if="item.estado == 'PENDIENTE'">
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                medium
                color="#385F73"
                class="mr-2"
                v-bind="attrs"
                v-on="on"
                @click="cambiarEstado(item, 'REALIZADO')"
              >
                event_available
              </v-icon>
            </template>
            <span>Realizar</span>
          </v-tooltip>
          <v-tooltip top v-if="item.estado != 'PENDIENTE'">
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                medium
                color="#385F73"
                class="mr-2"
                v-bind="attrs"
                v-on="on"
                @click="cambiarEstado(item, 'PENDIENTE')"
              >
                pending_actions
              </v-icon>
            </template>
            <span>Volver a pendiente</span>
          </v-tooltip>
          <v-tooltip top v-if="item.estado == 'REALIZADO'">
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                medium
                color="#385F73"
                class="mr-2"
                v-bind="attrs"
                v-on="on"
                @click="redirect(`/facturacion/${item.venta}`)"
              >
                receipt_long
              </v-icon>
            </template>
            <span>Generar Comprobante</span>
          </v-tooltip>
          <v-tooltip top v-if="item.estado == 'CANCELADO'">
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                medium
                color="#385F73"
                class="mr-2"
                v-bind="attrs"
                v-on="on"
                @click="eliminarPedido(item)"
              >
                close
              </v-icon>
            </template>
            <span>Eliminar Pedido</span>
          </v-tooltip>
        </template>
      </v-data-table>
      <modal-detalle
        :pedidoProductos="pedidoProductos"
        :dialog="dialog"
        @closeDetalle="cerrarDetalle()"
        @descargarPDF="
          descargar(
            `ventas/pedido/descargar/${itemPedido.venta}`,
            `pedido ${itemPedido.fecha}.pdf`
          )
        "
      ></modal-detalle>
      <v-row>
        <v-col cols="12" sm="12" md="12" align="end">
          <v-btn
            outlined
            color="#385F73"
            dark
            class="mb-2 mr-md-2"
            @click="$router.push('/pedidos/nuevo')"
            >Nuevo Pedido</v-btn
          >
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
import ModalDetalle from "@/components/pedido/ModalDetalle.vue";
export default {
  components: {
    ModalDetalle,
  },
  data: () => ({
    colores: {
      pendiente: "primary",
      realizado: "finish",
      cancelado: "cancel",
    },
    totales: [],
    headers: [
      {
        text: "Fecha de Pedido",
        align: "center",
        sortable: false,
        value: "fecha",
      },
      {
        text: "Cliente",
        align: "center",
        value: "cliente",
      },
      {
        text: "Estado",
        align: "center",
        value: "estado",
      },
      {
        text: "Acciones",
        value: "actions",
        align: "center",
        sortable: false,
      },
    ],
    estado: "PENDIENTE",
    estados: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
    },
    defaultItem: {
      name: "",
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
    },
    search: "",
    model: null,
    allow: false,
    tab: null,
    dialog: false,
    pedidoProductos: [],
    itemPedido: null,
    pedidos: [],
  }),
  mounted() {
    this.cargarDatos();
  },
  methods: {
    listadoEstados() {
      return axios.get(`ventas/estados`).then((response) => {
        return response.data.data;
      });
    },
    listadoPedidos() {
      return axios.get(`ventas/pedidos/${this.estado}`).then((response) => {
        return response.data.data;
      });
    },
    async cargarDatos() {
      this.estados = await this.listadoEstados();
      this.pedidos = await this.listadoPedidos();
    },

    cambiarEstado(item, estado) {
      this.$swal({
        icon: "warning",
        title: "¿Estás seguro que deseas cambiar el estado de este pedido?",
        showCancelButton: true,
      }).then((result) => {
        if (result.value) {
          /** estado 4, es el estado cancelado o eliminado*/
          axios
            .put(`ventas/pedido/estado/${item.venta}`, {
              codigo: estado,
            })
            .then((response) => {
              if (response.data.code == 200) {
                this.estado = estado;
                this.notificacion(`El pedido cambio a ${estado}.`, "success");
              }
            });
        }
      });
    },

    eliminarPedido(item) {
      this.$swal({
        icon: "warning",
        title: "¿Estás seguro que deseas eliminar este pedido?",
        showCancelButton: true,
      }).then((result) => {
        if (result.value) {
          /** estado 4, es el estado cancelado o eliminado*/
          axios.put(`ventas/pedido/eliminar/${item.venta}`).then((response) => {
            if (response.data.code == 200) {
              const index = this.pedidos.indexOf(item);
              this.pedidos.splice(index, 1);
              this.notificacion(`Pedido eliminado correctamente.`, "success");
            }
          });
        }
      });
    },
    verDetalle(item) {
      this.itemPedido = item;
      axios.get(`ventas/pedido/productos/${item.venta}`).then((response) => {
        this.pedidoProductos = response.data.data;
        this.dialog = true;
      });
    },
    cerrarDetalle() {
      this.dialog = false;
      this.itemPedido = null;
    },
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nuevo Producto" : "Editar Producto";
    },
  },
  watch: {
    async estado() {
      this.pedidos = await this.listadoPedidos();
    },
  },
};
</script>
