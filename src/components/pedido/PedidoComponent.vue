<template>
  <div>
    <v-row no-gutters>
      <v-col cols="12">
        <p class="text-lg-h6 font-weight-bold blue-grey--text text--lighten-2">
          {{ title }}
        </p>
      </v-col>
    </v-row>
    <div>
      <v-breadcrumbs :items="options" large>
        <template v-slot:item="{ item }">
          <v-breadcrumbs-item
            style="cursor: pointer"
            @click="$router.push(item.href)"
            :disabled="item.disabled"
          >
            {{ item.text.toUpperCase() }}
          </v-breadcrumbs-item>
        </template>
      </v-breadcrumbs>
      <div class="d-flex">
        <v-expansion-panels multiple v-model="panel">
          <v-expansion-panel>
            <v-expansion-panel-header>AGREGAR PEDIDO</v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-row>
                <v-col cols="12" sm="6" md="6" class="px-5 pl-md-10">
                  <v-row>
                    <v-col cols="12" md="8">
                      <v-autocomplete
                        v-model="pedido.cliente"
                        :items="clientes"
                        label="Buscar cliente"
                        item-text="razon_social"
                        item-value="cliente_id"
                        persistent-hint
                        hide-selected
                        dense
                        return-object
                      >
                        <template slot="selection" slot-scope="data">
                          {{ data.item.razon_social }}
                        </template>
                      </v-autocomplete>
                    </v-col>
                    <v-col cols="12" md="4">
                      <v-menu
                        ref="emision"
                        v-model="menuDate.fechaEmision"
                        :close-on-content-click="false"
                        :return-value.sync="pedido.fecha"
                        transition="scale-transition"
                        offset-y
                        min-width="290px"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            :rules="reglasValidacion.campoRequerido"
                            v-model="pedido.fecha"
                            label="Fecha"
                            prepend-icon="event"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                            dense
                            outlined
                            persistent-hint
                          ></v-text-field>
                        </template>
                        <v-date-picker v-model="pedido.fecha" no-title scrollable>
                          <v-spacer></v-spacer>
                          <v-btn
                            text
                            color="primary"
                            @click="menuDate.fechaEmision = false"
                            >Cancelar</v-btn
                          >
                          <v-btn
                            text
                            color="primary"
                            @click="$refs.emision.save(pedido.fecha)"
                            >OK</v-btn
                          >
                        </v-date-picker>
                      </v-menu>
                    </v-col>
                    <v-col cols="12" sm="12" md="12" v-if="pedido.cliente.cliente_id">
                      <v-card class="mx-auto" tile>
                        <v-list-item two-line>
                          <v-list-item-content>
                            <v-list-item-title>RAZÓN SOCIAL</v-list-item-title>
                            <v-list-item-subtitle>{{
                              pedido.cliente.razon_social
                            }}</v-list-item-subtitle>
                          </v-list-item-content>
                        </v-list-item>

                        <v-list-item two-line>
                          <v-list-item-content>
                            <v-list-item-title>CUIL/CUIL</v-list-item-title>
                            <v-list-item-subtitle>{{
                              pedido.cliente.documento
                            }}</v-list-item-subtitle>
                          </v-list-item-content>
                        </v-list-item>

                        <v-list-item class="pb-4" two-line>
                          <v-list-item-content>
                            <v-list-item-title>TELÉFONO Y DIRECCIÓN</v-list-item-title>
                            <v-list-item-subtitle>
                              {{ pedido.cliente.telefono }} - Calle 167 e/ 525 y 526
                            </v-list-item-subtitle>
                          </v-list-item-content>
                        </v-list-item>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="6"
                  class="px-5 pr-md-10"
                  v-if="pedido.cliente"
                >
                  <v-card class="mx-auto" tile v-if="pedido.cliente.cliente_id">
                    <v-form ref="formProducto">
                      <v-list-item two-line>
                        <v-list-item-content>
                          <v-list-item-title>PRODUCTO</v-list-item-title>

                          <v-autocomplete
                            v-model="nuevoProductoProducto"
                            :rules="reglasValidacion.objetoVacio"
                            :items="productos"
                            label="Buscar"
                            item-text="descripcion"
                            item-value="producto_id"
                            persistent-hint
                            hide-selected
                            return-object
                            :hint="hint"
                          >
                            <template v-slot:item="data">
                              <v-list-item-content>
                                <v-list-item-title
                                  v-html="data.item.descripcion"
                                ></v-list-item-title>
                                <v-list-item-subtitle
                                  v-html="'Código: ' + data.item.codigo"
                                ></v-list-item-subtitle>
                              </v-list-item-content>
                            </template>
                          </v-autocomplete>
                        </v-list-item-content>
                      </v-list-item>
                      <v-list-item
                        two-line
                        :disabled="!nuevoProductoProducto.producto_id"
                      >
                        <v-list-item-content>
                          <v-list-item-subtitle>DATOS ADICIONALES</v-list-item-subtitle>
                          <v-row>
                            <v-col cols="12" :md="esResponsableInscripto ? '3' : '4'">
                              <v-text-field
                                v-model="nuevoProductoCantidad"
                                :rules="reglasValidacion.cantidad"
                                label="Cantidad"
                                outlined
                                placeholder="0"
                                min="0.1"
                                type="number"
                                dense
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12" :md="esResponsableInscripto ? '3' : '4'">
                              <v-text-field
                                v-model="nuevoProductoBonificacion"
                                color="#385F73"
                                label="Bonificación.(%)"
                                outlined
                                placeholder="0"
                                type="number"
                                dense
                              ></v-text-field>
                            </v-col>
                            <v-col
                              cols="12"
                              :md="esResponsableInscripto ? '3' : '4'"
                              v-if="esResponsableInscripto"
                            >
                              <v-select
                                v-model="nuevoProductoIva"
                                persistent-hint
                                :items="alicuotas"
                                :rules="reglasValidacion.objetoVacio"
                                item-text="descripcion"
                                placeholder="0"
                                label="IVA(%)"
                                hide-selected
                                return-object
                                dense
                                outlined
                              ></v-select>
                            </v-col>
                            <v-col cols="12" :md="esResponsableInscripto ? '3' : '4'">
                              <v-text-field
                                v-model="nuevoProductoSubtotal"
                                color="#385F73"
                                label="Subtotal"
                                outlined
                                placeholder="0"
                                type="number"
                                dense
                                disabled
                              ></v-text-field>
                            </v-col>
                          </v-row>
                        </v-list-item-content>
                      </v-list-item>
                    </v-form>
                    <v-list-item two-line :disabled="!nuevoProductoProducto.producto_id">
                      <v-list-item-content>
                        <v-btn block color="#385F73" dark @click="agregarPedido()"
                          >Agregar</v-btn
                        >
                      </v-list-item-content>
                    </v-list-item>
                  </v-card>
                </v-col>
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </div>
    </div>
    <v-card class="mt-4">
      <v-row v-if="listado.length > 0">
        <v-col cols="12">
          <v-data-table
            v-model="selected"
            :headers="headers"
            :items="listado"
            item-key="producto.producto_id"
            show-select
            hide-default-footer
          >
            <template v-slot:[`item.cantidad`]="{ item }">
              <span>{{ item.cantidad | formatNumber }}</span>
            </template>
            <template v-slot:[`item.precio_unitario`]="{ item }">
              <span>{{ item.precio_unitario | formatPrecio }}</span>
            </template>
            <template v-slot:[`item.monto_bonif`]="{ item }">
              <span>{{ item.monto_bonif | formatPrecio }}</span>
            </template>
            <template v-if="esResponsableInscripto" v-slot:[`item.monto_iva`]="{ item }">
              <span>{{ item.monto_iva | formatPrecio }}</span>
            </template>
            <template v-slot:[`item.subtotal`]="{ item }">
              <span>{{ item.subtotal | formatPrecio }}</span>
            </template>
            <template v-slot:item.actions="{ item }">
              <v-icon
                medium
                color="#385F73"
                class="mr-2"
                v-bind="item"
                @click="modalItemProducto(item)"
              >
                mdi-pencil
              </v-icon>
              <v-icon
                medium
                color="red"
                class="mr-2"
                v-bind="item"
                @click="eliminarItemProducto(item)"
              >
                mdi-close
              </v-icon>
            </template>
          </v-data-table>
          <v-row>
            <v-col cols="12" justify="end" align="center">
              <v-col cols="12" sm="12" md="3" offset-md="9">
                <v-btn outlined color="#385F73" dark block>Eliminar Seleccionados</v-btn>
              </v-col>
            </v-col>
            <modal-pedido
              :dialog="dialog"
              :nuevo-producto="nuevoProducto"
              :hint="hint"
              :productos="productos"
              :reglas="reglasValidacion"
              :tipos-ali-cuotas="alicuotas"
              @cerrar-dialog="cerrarDialog"
              @editar-producto="editarProducto($event)"
            >
            </modal-pedido>
          </v-row>
        </v-col>
      </v-row>
    </v-card>
    <v-card v-if="listado.length > 0">
      <v-row>
        <v-col cols="12" md="" align="right">
          <v-col cols="12" sm="12" md="6">
            <v-btn
              color="#385F73"
              dark
              block
              @click="pedidoId ? modificarPedido() : cargarPedido()"
              >{{ pedidoId ? "Modificar" : "Cargar" }} Pedido</v-btn
            >
          </v-col>
        </v-col>
        <v-col cols="12" md="4" align="right">
          <v-list-item>
            <v-list-item-content>
              <div class="mb-4 grey--text">TOTAL</div>
              <v-list-item-title class="headline mb-1">{{
                pedido.total | formatPrecio
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
import ModalPedido from "@/components/pedido/ModalPedido";
import Montos from "@/mixins/montos";
export default {
  components: {
    ModalPedido,
  },
  mixins: [Montos],
  props: {
    pedidoId: {
      type: String,
      default: null,
    },
  },
  data: () => ({
    panel: [0],
    dialog: false,
    indexEditable: -1,
    pedido: {
      cliente: {},
      fecha: new Date().toISOString().substr(0, 10),
      productos: [],
      total: 0,
    },
    pedidoDefault: {
      fecha: new Date().toISOString().substr(0, 10),
      productos: [],
    },
    selected: [],
    clientes: [],
    productos: [],
    alicuotas: [],
    hint: "",
    menuDate: {
      fechaEmision: false,
    },
    headers: [
      {
        text: "Descripción",
        align: "start",
        sortable: false,
        value: "producto.descripcion",
      },
      {
        text: "Cantidad",
        value: "cantidad",
        sortable: false,
      },
      {
        text: "Precio unitario",
        sortable: false,
        value: "precio_unitario",
      },
      {
        text: "Bonificacion %",
        sortable: false,
        value: "bonificacion",
      },
      {
        text: "Importe Bonif.",
        sortable: false,
        value: "monto_bonif",
      },
    ],
    cantidadPrevia: -1,
  }),
  mounted() {
    this.adapterHeader();
    this.cargarDatosPedido();
  },

  methods: {
    cargarDatosPedido() {
      axios
        .all([
          axios.get(`clientes/negocio/${this.negocio.negocio_id}`),
          axios.get(`productos/negocio/${this.negocio.negocio_id}`),
          axios.get(`afip/tiposAliCuotas`),
        ])
        .then(
          axios.spread((clientes, productos, alicuotas) => {
            this.clientes = clientes.data.data;
            this.productos = productos.data.data;
            this.alicuotas = alicuotas.data.data;
          })
        );
      if (this.pedidoId) {
        axios
          .all([
            axios.get(`ventas/pedido/${this.pedidoId}`),
            axios.get(`ventas/pedido/productos/${this.pedidoId}`),
          ])
          .then(
            axios.spread((pedido, producto) => {
              this.pedido.cliente = pedido.data.data.cliente;
              this.pedido.productos = producto.data.data;
              this.sumarImportesTotales();
            })
          );
      }
    },
    adapterHeader() {
      /** cambio el header del datatable, dependiendo la condicion_iva del usuario */
      if (this.esResponsableInscripto) {
        this.headers.push(
          {
            text: "IVA Aplicado",
            sortable: false,
            value: "alicuota.descripcion",
          },
          {
            text: "Importe IVA",
            sortable: false,
            value: "monto_iva",
          }
        );
      }
      this.headers.push(
        {
          text: "Subtotal",
          value: "subtotal",
          align: "center",
          sortable: false,
        },
        {
          text: "Acciones",
          value: "actions",
          align: "center",
          sortable: false,
        }
      );
    },
    modalItemProducto(item) {
      this.indexEditable = this.listado.indexOf(item);
      this.cantidadPrevia = item.cantidad;
      this.nuevoProducto = Object.assign({}, item);
      this.panel = [];
      this.dialog = true;
    },
    reestablecer() {
      this.nuevoProducto = Object.assign({}, this.nuevoProductoDefault);
      this.$refs.formProducto.resetValidation();
    },

    agregarPedido() {
      if (this.$refs.formProducto.validate()) {
        this.listado.push(Object.assign({}, this.nuevoProducto));
        this.actualizarStock(this.nuevoProducto, "agregar");
        this.sumarImportesTotales();
        this.$nextTick(() => {
          this.reestablecer();
        });
      }
    },
    editarProducto(item) {
      item.cantidad_previa = this.cantidadPrevia;
      this.actualizarStock(item, "editar");
      Object.assign(this.listado[this.indexEditable], item);
      this.sumarImportesTotales();
      this.cerrarDialog();
    },
    eliminarItemProducto(item) {
      this.$swal({
        icon: "question",
        title: "¿Estás seguro que deseas eliminar este producto?",
        showCancelButton: true,
      }).then((result) => {
        if (result.value) {
          /** verifico si es un producto que ya se encuentra cargado de la bbdd **/
          if (item.producto_preventa_id) {
            axios
              .delete(`productoPreventa/eliminar/${item.producto_preventa_id}`)
              .then((response) => {
                const index = this.listado.indexOf(item);
                this.actualizarStock(item, "eliminar");
                this.listado.splice(index, 1);
                this.sumarImportesTotales();
                this.notificacion("Eliminado correctamente", "success");
              });
          } else {
            const index = this.listado.indexOf(item);
            this.actualizarStock(item, "eliminar");
            this.listado.splice(index, 1);
            this.sumarImportesTotales();
            this.reestablecer();
            this.notificacion("Eliminado correctamente", "success");
          }
        }
      });
    },
    cerrarDialog() {
      this.dialog = false;
      this.panel = [0];
      this.indexEditable = -1;
      this.$nextTick(() => {
        this.reestablecer();
      });
    },

    actualizarStock(item, tipo) {
      let indice = this.productos
        .map(function (e) {
          return e.producto_id;
        })
        .indexOf(item.producto.producto_id);

      switch (tipo) {
        case "agregar":
          this.productos[indice].stock = this.productos[indice].stock - item.cantidad;
          break;
        case "eliminar":
          this.productos[indice].stock = this.productos[indice].stock + item.cantidad;
          break;
        case "editar":
          if (this.productos[indice].producto_id == item.producto.producto_id) {
            if (item.cantidad_previa < item.cantidad) {
              this.productos[indice].stock =
                this.productos[indice].stock - (item.cantidad - item.cantidad_previa);
            } else if (item.cantidad_previa > item.cantidad) {
              this.productos[indice].stock =
                this.productos[indice].stock + (item.cantidad_previa - item.cantidad);
            }
            this.nuevoProductoProducto = this.productos[indice];
          }
          break;
      }
    },
    cargarPedido() {
      this.$swal({
        title: "¿Estás seguro que deseas cargar este pedido?",
        showCancelButton: true,
      }).then((result) => {
        if (result.value) {
          axios.post(`ventas/pedido/nuevo`, this.pedido).then((response) => {
            if (response.data.code === 201) {
              this.pedido = Object.assign({}, this.pedidoDefault);
              this.notificacion("Cargado correctamente", "success");
              this.$router.push("/pedidos");
            } else {
              this.notificacion("Ha ocurrido un error", "error");
            }
          });
        }
      });
    },
    /** modificar pedido **/
    modificarPedido() {
      this.$swal({
        title: "¿Estás seguro que deseas modificar este pedido?",
        showCancelButton: true,
      }).then((result) => {
        if (result.value) {
          axios
            .put(`preventas/preventa/${this.pedidoId}/editar`, this.pedido)
            .then((response) => {
              if (response.data.code === 200) {
                this.notificacion("Modificado correctamente", "success");
                this.$router.push("/pedidos");
              } else {
                this.notificacion("Ha ocurrido un error", "error");
              }
            });
        }
      });
    },

    sumarImportesTotales() {
      this.pedido.total = 0;
      this.listado.forEach((producto) => {
        this.pedido.total = this.parseFloatMonto(this.pedido.total + producto.subtotal);
      });
    },
  },
  watch: {
    nuevoProductoProducto() {
      this.hint = this.nuevoProductoProducto.producto_id
        ? "Precio: $" +
          this.calcularPrecioNeto(this.nuevoProductoProducto) +
          " - Disponibles: " +
          this.nuevoProductoProducto.stock
        : "";
    },
  },
  computed: {
    listado: {
      get() {
        return this.pedido.productos;
      },
      set(value) {
        this.pedido.productos = value;
      },
    },
    options() {
      return [
        {
          text: "Pedidos",
          disabled: false,
          href: "/pedidos",
        },
        {
          text: this.title,
          disabled: true,
          href: "",
        },
      ];
    },
    title() {
      return this.pedidoId ? "Editar Pedido" : "Nuevo Pedido";
    },
    reglasValidacion() {
      return {
        cantidad: [
          (v) => !!v || "Este campo es requerido",
          (v) => v > 0 || "Debe ser mayor a 0",
          (v) => v <= this.nuevoProductoProducto.stock || `Stock no disponible`,
        ],
        objetoVacio: [(v) => Object.keys(v).length > 0 || "Este campo es requerido"],
        campoRequerido: [(v) => !!v || "Este campo es requerido"],
      };
    },
  },
};
</script>
