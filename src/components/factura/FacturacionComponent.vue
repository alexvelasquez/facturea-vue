<style>
#input-142 {
  font-size: 23px;
  text-align: center;
}
</style>

<template>
  <div>
    <v-row v-if="!this.negocio.factura_electronica === 'S'">
      <v-col cols="12">
        <v-alert
          type="warning"
          colored-border
          elevation="2"
          prominent
          border="left"
          dismissible
        >
          <v-row align="center">
            <v-col class="grow"
              >Para poder utilizar el servicio de facturación electrónica
              descargue el instructivo y siga los pasos</v-col
            >
            <v-col class="shrink">
              <v-btn color="warning" @click="descargarInstructivo()"
                >Descargar Instructivo</v-btn
              >
            </v-col>
          </v-row>
        </v-alert>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="12">
        <p class="text-lg-h6 font-weight-bold blue-grey--text text--lighten-2">
          Comprobante
        </p>
      </v-col>
    </v-row>
    <v-card>
      <v-container>
        <v-row>
          <v-col cols="12" sm="12" md="12">
            <v-row>
              <v-col cols="12" sm="6" md="8">
                <v-card class="mx-auto" outlined>
                  <v-list-item four-line>
                    <v-list-item-content class="text-left">
                      <v-list-item-title
                        class="text-md-subtitle-1 font-weight-bold"
                        >{{ negocio.razon_social }}</v-list-item-title
                      >
                      <v-list-item-subtitle
                        >CUIT: {{ negocio.cuit_cuil }}</v-list-item-subtitle
                      >
                      <v-list-item-subtitle class="pt-2"
                        >Fecha de Inicio de Actividades:
                        {{
                          negocio.inicio_actividad | formatDate
                        }}</v-list-item-subtitle
                      >
                      <v-list-item-subtitle
                        >IIBB:
                        {{
                          negocio.iibb ? negocio.iibb : "-"
                        }}</v-list-item-subtitle
                      >
                      <v-list-item-subtitle
                        >IVA:
                        {{
                          negocio.condicion_iva
                            ? negocio.condicion_iva.descripcion
                            : "-"
                        }}</v-list-item-subtitle
                      >
                    </v-list-item-content>
                  </v-list-item>
                </v-card>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
                v-if="this.negocio.factura_electronica === 'S'"
              >
                <v-row justify="end" align="end" class="mt-10">
                  <v-switch
                    v-model="tipoFactura"
                    label="Factura Electrónica"
                  ></v-switch>
                </v-row>
              </v-col>
            </v-row>
            <v-form ref="formFactura">
              <v-row class="py-0">
                <v-col cols="12" sm="6" md="5">
                  <v-autocomplete
                    v-model="clienteSelected"
                    :rules="reglasValidacion.campoRequerido"
                    :items="clientes"
                    label="Buscar cliente"
                    item-text="razon_social"
                    item-value="cliente_id"
                    hint="campo obligatorio(*)"
                    outlined
                    persistent-hint
                    dense
                    return-object
                  >
                  </v-autocomplete>
                </v-col>
                <v-col cols="12" sm="3" md="3">
                  <v-select
                    v-model="facturacion.comprobante"
                    :items="tiposComprobantes"
                    item-value="afipId"
                    item-text="descripcion"
                    placeholder="Seleccione una opción"
                    label="Tipo Comprobante"
                    hint="campo obligatorio(*)"
                    persistent-hint
                    outlined
                    dense
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="3" md="2">
                  <v-menu
                    ref="emision"
                    v-model="menuDate.fechaEmision"
                    :close-on-content-click="false"
                    :return-value.sync="facturacion.fecha_emision"
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        :rules="reglasValidacion.campoRequerido"
                        v-model="facturacion.fecha_emision"
                        label="Fecha de emisión"
                        prepend-icon="event"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                        dense
                        outlined
                        hint="campo obligatorio(*)"
                        persistent-hint
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="facturacion.fecha_emision"
                      no-title
                      scrollable
                    >
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
                        @click="$refs.emision.save(facturacion.fecha_emision)"
                        >OK</v-btn
                      >
                    </v-date-picker>
                  </v-menu>
                </v-col>
              </v-row>
              <v-divider v-if="clienteSelected" class="my-5"></v-divider>
              <v-row v-if="clienteSelected">
                <v-col cols="12" sm="6" md="6">
                  <v-card class="mx-auto" outlined>
                    <v-list-item four-line>
                      <v-list-item-content class="text-left">
                        <v-list-item-subtitle
                          >Razón Social:
                          {{
                            clienteSelected.razon_social
                          }}</v-list-item-subtitle
                        >
                        <v-list-item-subtitle class="pt-2"
                          >Documento:
                          {{ clienteSelected.documento }}</v-list-item-subtitle
                        >
                        <v-list-item-subtitle class="pt-2"
                          >Email:
                          {{ clienteSelected.email }}</v-list-item-subtitle
                        >
                        <v-list-item-subtitle class="pt-2"
                          >Domicilio:
                          {{ clienteSelected.direccion }}</v-list-item-subtitle
                        >
                        <v-list-item-subtitle class="pt-2"
                          >IVA:
                          {{
                            clienteSelected.condicion_iva.descripcion
                          }}</v-list-item-subtitle
                        >
                      </v-list-item-content>
                    </v-list-item>
                  </v-card>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-row>
                    <v-col cols="12" sm="12" md="12">
                      <v-select
                        :rules="reglasValidacion.campoRequerido"
                        hint="campo obligatorio(*)"
                        persistent-hint
                        v-model="facturacion.concepto"
                        :items="tiposConceptos"
                        item-value="afip_id"
                        item-text="descripcion"
                        label="Conceptos"
                        placeholder="Seleccione un concepto"
                        outlined
                        persistent-hint
                        dense
                        color="#385F73"
                      >
                      </v-select>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="4"
                      md="4"
                      v-show="facturacion.concepto && !conceptoProduto"
                    >
                      <v-menu
                        ref="fDesde"
                        v-model="menuDate.fechaDesde"
                        :close-on-content-click="false"
                        :return-value.sync="facturacion.fecha_desde"
                        transition="scale-transition"
                        offset-y
                        min-width="290px"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="facturacion.fecha_desde"
                            label="Fecha Desde"
                            prepend-icon="event"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                            dense
                            outlined
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="facturacion.fecha_desde"
                          no-title
                          scrollable
                        >
                          <v-spacer></v-spacer>
                          <v-btn
                            text
                            color="primary"
                            @click="menuDate.fechaDesde = false"
                            >Cancel</v-btn
                          >
                          <v-btn
                            text
                            color="primary"
                            @click="$refs.fDesde.save(facturacion.fecha_desde)"
                            >OK</v-btn
                          >
                        </v-date-picker>
                      </v-menu>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="4"
                      md="4"
                      v-show="facturacion.concepto && !conceptoProduto"
                    >
                      <v-menu
                        ref="fHasta"
                        v-model="menuDate.fechaHasta"
                        :close-on-content-click="false"
                        :return-value.sync="facturacion.fecha_hasta"
                        transition="scale-transition"
                        offset-y
                        min-width="290px"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="facturacion.fecha_hasta"
                            label="Fecha Hasta"
                            prepend-icon="event"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                            dense
                            outlined
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="facturacion.fecha_hasta"
                          no-title
                          scrollable
                        >
                          <v-spacer></v-spacer>
                          <v-btn
                            text
                            color="primary"
                            @click="menuDate.fechaHasta = false"
                            >Cancel</v-btn
                          >
                          <v-btn
                            text
                            color="primary"
                            @click="$refs.fHasta.save(facturacion.fecha_hasta)"
                            >OK</v-btn
                          >
                        </v-date-picker>
                      </v-menu>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="4"
                      md="4"
                      v-show="facturacion.concepto && !conceptoProduto"
                    >
                      <v-menu
                        ref="fVto"
                        v-model="menuDate.fechaVto"
                        :close-on-content-click="false"
                        :return-value.sync="facturacion.fecha_vto"
                        transition="scale-transition"
                        offset-y
                        min-width="290px"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="facturacion.fecha_vto"
                            label="Fecha de vencimiento"
                            prepend-icon="event"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                            dense
                            outlined
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="facturacion.fecha_vto"
                          no-title
                          scrollable
                        >
                          <v-spacer></v-spacer>
                          <v-btn
                            text
                            color="primary"
                            @click="menuDate.fechaVto = false"
                            >Cancel</v-btn
                          >
                          <v-btn
                            text
                            color="primary"
                            @click="$refs.fVto.save(facturacion.fecha_vto)"
                            >OK</v-btn
                          >
                        </v-date-picker>
                      </v-menu>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>

              <v-row v-if="clienteSelected">
                <v-col cols="12" sm="6" md="4">
                  <v-select
                    v-model="facturacion.condicion_vta"
                    :rules="reglasValidacion.campoRequerido"
                    hint="campo obligatorio(*)"
                    persistent-hint
                    :items="condicionesVenta"
                    item-value="condicion_venta_id"
                    item-text="descripcion"
                    placeholder="Seleccione una opción"
                    label="Condición de venta"
                    dense
                    outlined
                  ></v-select>
                </v-col>
                <!-- <v-col cols="12" sm="6" md="3">
                                <v-text-field color="#385F73" label="Nro Remito" outlined placeholder="0" type="number" dense></v-text-field>
                            </v-col> -->
              </v-row>
              <v-divider class="my-5"></v-divider>
            </v-form>
            <v-form
              ref="formProducto"
              v-if="!editable && !pedidoId && clienteSelected"
            >
              <v-row>
                <v-col cols="12" sm="3" md="1">
                  <v-text-field
                    :rules="reglasValidacion.numeroPositivo"
                    v-model="nuevoProducto.cantidad"
                    label="Cantidad"
                    outlined
                    min="0.1"
                    type="number"
                    dense
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="3" md="3">
                  <v-autocomplete
                    :rules="reglasValidacion.objectoVacio"
                    v-model="nuevoProducto.producto"
                    :items="productos"
                    return-object
                    item-text="descripcion"
                    label="Descripción"
                    placeholder="Buscar Producto"
                    outlined
                    hide-selected
                    persistent-hint
                    dense
                    color="#385F73"
                  >
                    <template v-slot:item="data">
                      <v-list-item-content>
                        <v-list-item-title
                          v-html="data.item.descripcion"
                        ></v-list-item-title>
                        <v-list-item-subtitle
                          v-html="
                            `Código: ${data.item.codigo} | Disponible: ${data.item.stock}`
                          "
                        ></v-list-item-subtitle>
                      </v-list-item-content>
                    </template>
                  </v-autocomplete>
                </v-col>
                <v-col cols="12" sm="2" md="2">
                  <v-text-field
                    v-model="nuevoProducto.precio_unitario"
                    color="#385F73"
                    label="Precio Unitario"
                    outlined
                    placeholder="0.0"
                    type="number"
                    dense
                    disabled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="1" md="1">
                  <v-text-field
                    v-model="nuevoProducto.bonificacion"
                    color="#385F73"
                    label="Bon.(%)"
                    outlined
                    placeholder="0"
                    type="number"
                    dense
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="2" md="2" v-if="esResponsableInscripto">
                  <v-autocomplete
                    :rules="reglasValidacion.objectoVacio"
                    v-model="nuevoProducto.tipo_alicuota"
                    :items="tiposAlicuotas"
                    return-object
                    item-text="descripcion"
                    label="IVA(%)"
                    placeholder="Seleccionar"
                    outlined
                    persistent-hint
                    dense
                    color="#385F73"
                  >
                  </v-autocomplete>
                </v-col>
                <v-col cols="12" sm="2" md="2">
                  <v-text-field
                    v-model="nuevoProducto.subtotal"
                    color="#385F73"
                    label="Subtotal"
                    outlined
                    placeholder="0.0"
                    type="number"
                    dense
                    disabled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="1" md="1">
                  <v-btn
                    outlined
                    color="#385F73"
                    dark
                    @click="agregarNuevoProducto"
                    block
                    >Agregar</v-btn
                  >
                </v-col>
              </v-row>
            </v-form>
            <v-row v-if="clienteSelected">
              <v-col cols="12">
                <v-data-table
                  v-model="selected"
                  :headers="headers"
                  :items="productosSelected"
                  item-key="producto.producto_id"
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
                  <template v-slot:[`item.subtotal`]="{ item }">
                    <span>{{ item.subtotal | formatPrecio }}</span>
                  </template>
                  <template v-slot:[`item.actions`]="{ item }">
                    <v-icon
                      medium
                      color="#385F73"
                      class="mr-2"
                      @click="modalItemProducto(item)"
                      v-bind="item"
                      :disabled="facturaCargada"
                    >
                      mdi-pencil
                    </v-icon>
                    <v-icon
                      medium
                      color="red"
                      class="mr-2"
                      @click="eliminarProducto(item)"
                      v-bind="item"
                      :disabled="facturaCargada"
                    >
                      mdi-close
                    </v-icon>
                  </template>
                </v-data-table>
                <v-row v-if="!pedidoId">
                  <v-col cols="12" justify="end" align="center">
                    <modal-factura
                      :dialog="dialog"
                      :nuevo-producto="nuevoProducto"
                      :productos="productos"
                      :tipos-ali-cuotas="tiposAlicuotas"
                      :es-responsable-inscripto="esResponsableInscripto"
                      @cerrar-dialog="cerrarDialog"
                      @editar-producto="editarProducto($event)"
                    >
                    </modal-factura>
                  </v-col>
                </v-row>
              </v-col>
              <v-divider class="my-5"></v-divider>
            </v-row>
            <v-row v-if="clienteSelected">
              <v-col cols="12" md="4" offset-md="8">
                <v-col cols="6"> </v-col>
                <v-col cols="12" style="margin-top: -35px">
                  <v-card class="mx-auto" max-width="344" outlined>
                    <v-list-item>
                      <v-list-item-content>
                        <div class="mb-4 grey--text">Total</div>
                        <v-list-item-title
                          align="center"
                          class="headline mb-1"
                          >{{
                            facturacion.importes.total | formatPrecio
                          }}</v-list-item-title
                        >
                      </v-list-item-content>
                    </v-list-item>
                  </v-card>
                  <!-- <v-text-field disabled class="total-factura" v-model="facturacion.importes.total" color="#385F73" label="TOTAL" outlined placeholder="0.0" type="number" dense height="100px"></v-text-field> -->
                </v-col>
              </v-col>
            </v-row>
            <v-row v-if="clienteSelected">
              <v-col cols="12" align="center">
                <v-col cols="12" sm="12" md="3">
                  <v-btn
                    outlined
                    color="#385F73"
                    dark
                    block
                    @click="descargarComprobante"
                    >Emitir Comprobante</v-btn
                  >
                </v-col>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <mensajes-component
          :active="active"
          :mensaje="mensaje"
        ></mensajes-component>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import MensajesComponent from "@/components/MensajesComponent";
import { venta } from "@/services/ventas";
import { clientes } from "@/services/clientes";
import { productos } from "@/services/producto";
import {
  generarComprobante,
  getInstructivo,
  getTiposConceptos,
  getCondicionesVenta,
  getTiposAlicuotas,
  getTipoComprobante,
} from "@/services/afip.js";
import ModalFactura from "@/components/factura/ModalFacturaComponent";
import Montos from "@/mixins/montos";
export default {
  components: {
    ModalFactura,
    MensajesComponent,
  },
  mixins: [Montos],
  props: {
    pedidoId: {
      type: String,
      default: null,
    },
  },
  data: () => ({
    active: false,
    mensaje: {},
    tiposConceptos: [],
    condicionesVenta: [],
    tiposAlicuotas: [],
    clienteSelected: null,
    productosSelected: [],
    date: new Date().toISOString().substr(0, 10),
    facturacion: {
      cliente: {},
      concepto: 1,
      condicion_vta: null,
      fecha_emision: new Date().toISOString().substr(0, 10),
      fecha_desde: null,
      fecha_hasta: null,
      fecha_vto: null,
      productos: [],
      importes: {
        noGravado: 0,
        exento: 0,
        gravado: 0,
        iva: 0,
        total: 0,
      },
    },
    dialog: false,
    clientes: [],
    productos: [],
    importes: {
      1: "noGravado",
      2: "exento",
    },
    reglasValidacion: {
      numeroPositivo: [
        (v) => !!v || "Este campo es requerido",
        (v) => v > 0 || "Debe ser mayor a 0",
      ],
      condicionVta: [(v) => !!v != -1 || "Este campo es requerido"],
      objectoVacio: [
        (v) => Object.keys(v).length > 0 || "Este campo es requerido",
      ],
      campoRequerido: [(v) => !!v || "Este campo es requerido"],
    },
    tiposComprobantes: [],
    menuDate: {
      fechaEmision: false,
      fechaHasta: false,
      fechaDesde: false,
      fechaVto: false,
    },
    selected: [],
    indexEditable: -1,
    itemEdit: {},
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
    productos: [],
    pedido: null,
    tipoFactura: false,
  }),
  async mounted() {
    try {
      /** verifico que no haya completado la configuración y ademas no tenga una notificacion previa */
      if (
        this.negocio.configuracion === "N" &&
        !Object.keys(this.mensaje).length
      ) {
        this.mensaje.titulo = "COMPLETAR DATOS";
        this.mensaje.mensaje =
          "Para utilizar esta sección, debe completar los datos de <strong>Configuración</strong>";
        this.mensaje.redireccion = "/configuracion";
        this.active = true;
      } else {
        this.clientes = (await clientes()).data.data;
        this.productos = (await productos()).data.data;
        this.tiposConceptos = (await getTiposConceptos()).data.data;
        this.condicionesVenta = (await getCondicionesVenta()).data.data;
        this.tiposAlicuotas = (await getTiposAlicuotas()).data.data;
        this.tiposComprobantes = (await getTipoComprobante(null)).data.data;

        this.facturacion.comprobante = this.tiposComprobantes[0].afipId;
        /** si se factura un pedido **/
        if (this.pedidoId) {
          const response = await venta(this.pedidoId);
          if (response.status === 200) {
            this.clienteSelected = response.data.data.cliente;
            this.facturacion.venta = response.data.data.venta_id;
            this.productosSelected = response.data.data.productos_venta;
            this.facturacion.venta = this.pedidoId;
            this.sumarImportesTotales();
          } else {
            this.notificacionError();
          }
        }
        this.adaptarTablaProductos();
      }
    } catch (e) {
      console.log(e);
      this.notificacion("Ha ocurrido un error, intente nuevamente", "error");
    }
  },
  methods: {
    /** agrego un nuevo producto al listado de productos a facturar */
    agregarNuevoProducto() {
      if (this.$refs.formProducto.validate()) {
        this.productosSelected.push(Object.assign({}, this.nuevoProducto));
        /** verifico si es incluye iva */
        this.sumarImportesTotales();
        this.$nextTick(() => {
          this.restartFormProducto();
        });
      }
    },
    cerrarDialog() {
      this.dialog = false;
      this.indexEditable = -1;
      this.$nextTick(() => {
        this.restartFormProducto();
      });
    },
    /** filtro para buscar por razon social de cliente o dni */
    customFilter(item, queryText, itemText) {
      const textOne = item.razon_social.toLowerCase();
      const textTwo = item.documento.toString().toLowerCase();
      const searchText = queryText.toLowerCase();
      return (
        textOne.indexOf(searchText) > -1 || textTwo.indexOf(searchText) > -1
      );
    },
    /** reestablezco el formulario de nuevo producto*/
    restartFormProducto() {
      this.nuevoProducto = Object.assign({}, this.nuevoProductoDefault);
      this.$refs.formProducto.resetValidation();
    },
    /** descargo el comprobante **/
    async descargarComprobante() {
      if(this.$refs.formFactura.validate()){
        this.facturacion.productos = this.filterObjProducts(this.productosSelected);
        const response = await generarComprobante(this.facturacion);
        if (response.status === 200) {
          const link = document.createElement("a");
          link.href = response.data.data.file;
          link.setAttribute(
            "download",
            `comprobante-${moment().format("dd-mm-yyyy hh:mm:ss")}.pdf`
          );
          document.body.appendChild(link);
          link.click();
        } else {
          this.notificacionError();
        }
      }
    },
    /** descargo el comprobante **/
    async descargarInstructivo() {
      const response = await getInstructivo();
      if (response.status === 200) {
        const link = document.createElement("a");
        link.href = response.data.data.file;
        link.setAttribute(
          "download",
          "instructivo_facturacion_electronica.pdf"
        );
        document.body.appendChild(link);
        link.click();
      } else {
        this.notificacionError();
      }
    },
    sumarImportesTotales() {
      this.resetMontosTotales();
      this.productosSelected.forEach((producto) => {
        /** responsable inscripto */
        if (producto.tipo_alicuota.afip_id) {
          /** si es exento o no gravado*/
          if (
            producto.tipo_alicuota.afip_id == 1 ||
            producto.tipo_alicuota.afip_id == 2
          ) {
            this.facturacion.importes[
              this.importes[producto.tipo_alicuota.afip_id]
            ] = this.parseFloatMonto(
              this.facturacion.importes[
                this.importes[producto.tipo_alicuota.afip_id]
              ] + producto.subtotal_sin_iva
            );
          } else {
            this.facturacion.importes.gravado = this.parseFloatMonto(
              this.facturaMontoGravado + producto.subtotal_sin_iva
            );
            this.facturacion.importes.iva = this.parseFloatMonto(
              this.facturacion.importes.iva + producto.monto_iva
            );
          }
        } else {
          this.facturacion.importes.gravado = this.parseFloatMonto(
            this.facturaMontoGravado + producto.subtotal_sin_iva
          );
        }

        this.facturacion.importes.total = this.parseFloatMonto(
          this.facturacion.importes.total + producto.subtotal
        );
      });
    },

    modalItemProducto(item) {
      this.indexEditable = this.facturaProductos.indexOf(item);
      this.nuevoProducto = Object.assign({}, item);
      this.dialog = true;
    },
    resetMontosTotales() {
      this.facturacion.importes.noGravado = 0;
      this.facturacion.importes.exento = 0;
      this.facturacion.importes.gravado = 0;
      this.facturacion.importes.iva = 0;
      this.facturacion.importes.total = 0;
    },
    editarProducto(item) {
      Object.assign(this.facturaProductos[this.indexEditable], item);
      this.sumarImportesTotales();
      this.cerrarDialog();
    },
    eliminarProducto(item) {
      const index = this.productosSelected.indexOf(item);
      this.productosSelected.splice(index, 1);
      this.sumarImportesTotales();
    },
    adaptarTablaProductos() {
      if (this.negocio.condicion_iva && this.esResponsableInscripto) {
        this.headers.push(
          {
            text: "IVA Aplicado",
            sortable: false,
            value: "tipo_alicuota.descripcion",
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

    /** filtro el array de productos seleccionados para que viajen solo los ids del producto y no el objeto */
    filterObjProducts() {
      var productosFactura = this.productosSelected.map((producto) => {
        var obj = Object.assign({},producto);
        obj.producto = producto.producto.producto_id;
        if (producto.tipo_alicuota) {
          obj.tipo_alicuota = producto.tipo_alicuota.tipo_alicuota_id;
        }
        return obj;
      });
      return productosFactura;
    },
  },
  watch: {
    conceptoFactura() {
      if (!this.conceptoProduto) {
        this.facturacion.fecha_desde = new Date().toISOString().substr(0, 10);
        this.facturacion.fecha_hasta = new Date().toISOString().substr(0, 10);
        this.facturacion.fecha_vto = new Date().toISOString().substr(0, 10);
      } else {
        this.facturacion.fecha_desde = null;
        this.facturacion.fecha_hasta = null;
        this.facturacion.fecha_vto = null;
      }
    },
    clienteSelected() {
      this.facturacion.cliente = this.clienteSelected.cliente_id;
    },
    async tipoFactura() {
      const tipo = this.tipoFactura ? this.negocio.condicion_iva.afip_id : null;
      this.tiposComprobantes = (await getTipoComprobante(tipo)).data.data;
      this.facturacion.comprobante = this.tiposComprobantes[0].afipId;
    },
  },
  computed: {
    esResponsableInscripto() {
      return this.negocio.condicion_iva
        ? this.negocio.condicion_iva.afip_id === 1
        : false;
    },
    conceptoFactura() {
      return this.facturacion.concepto;
    },
    conceptoProduto() {
      return this.facturacion.concepto == 1;
    },
    facturaMontoGravado() {
      return this.facturacion.importes.gravado;
    },
    facturaMontoTotal() {
      return this.facturacion.importes.total;
    },
    facturaMontoIva() {
      return this.facturacion.importes.iva;
    },
    facturaProductos() {
      return this.productosSelected;
    },
    editable() {
      return this.indexEditable != -1;
    },
    facturaCargada() {
      return typeof this.pedidoId === "string";
    },
  },
};
</script>
