<style >

#input-142 {
    font-size: 23px;
    text-align: center;
}

</style>

<template>

<div>
    <v-row no-gutters>
        <v-col cols="12">
            <p class="text-lg-h6 font-weight-bold blue-grey--text text--lighten-2">Facturación</p>
        </v-col>
    </v-row>
    <v-card>
        <v-container>
            <v-row>
                <v-col cols="12" sm="12" md="12">
                    <v-row>
                        <v-col cols="12" sm="6" md="6">
                            <v-card class="mx-auto" outlined>
                                <v-list-item four-line>
                                    <v-list-item-content class="text-left">
                                        <v-list-item-title class="text-md-subtitle-1 font-weight-bold">{{negocio.razon_social}}</v-list-item-title>
                                        <v-list-item-subtitle>CUIT: {{negocio.cuit_cuil | formatCuitCuil}}</v-list-item-subtitle>
                                        <v-list-item-subtitle class="pt-2">Fecha de Inicio de Actividades: {{negocio.inicio_actividad | formatDate}}</v-list-item-subtitle>
                                        <v-list-item-subtitle>IIBB: {{negocio.iibb ? negocio.iibb : '-'}}</v-list-item-subtitle>
                                        <v-list-item-subtitle>IVA: {{negocio.condicion_iva ? negocio.condicion_iva.descripcion : '-'}}</v-list-item-subtitle>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-card>
                        </v-col>
                    </v-row>
                    <v-form ref="formFactura">
                        <v-row class="py-0">
                            <v-col cols="12" sm="6" md="5">
                                <v-autocomplete :rules="reglasValidacion.campoRequerido" hint="campo obligatorio(*)" persistent-hint v-model="facturacion.cliente" return-object item-text="razon_social" :items="clientes" label="Cliente" placeholder="Buscar por nombre o documento" :filter="customFilter"
                                outlined persistent-hint dense color="#385F73">
                                </v-autocomplete>
                            </v-col>
                            <v-col cols="12" sm="3" md="3">
                                <v-select :rules="reglasValidacion.campoRequerido" v-model="facturacion.comprobante" :items="tiposComprobantes" item-value="afipId" item-text="descripcion" placeholder="Seleccione una opción" label="Tipo Comprobante" hint="campo obligatorio(*)" persistent-hint outlined dense></v-select>
                            </v-col>
                            <v-col cols="12" sm="3" md="2">
                                <v-menu ref="emision" v-model="menuDate.fechaEmision" :close-on-content-click="false" :return-value.sync="facturacion.fecha_emision" transition="scale-transition" offset-y min-width="290px">
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-text-field :rules="reglasValidacion.campoRequerido" v-model="facturacion.fecha_emision" label="Fecha de emisión" prepend-icon="event" readonly v-bind="attrs" v-on="on" dense outlined hint="campo obligatorio(*)" persistent-hint></v-text-field>
                                    </template>
                                    <v-date-picker v-model="facturacion.fecha_emision" no-title scrollable>
                                        <v-spacer></v-spacer>
                                        <v-btn text color="primary" @click="menuDate.fechaEmision = false">Cancelar</v-btn>
                                        <v-btn text color="primary" @click="$refs.emision.save(facturacion.fecha_emision)">OK</v-btn>
                                    </v-date-picker>
                                </v-menu>
                            </v-col>
                        </v-row>
                        <v-divider></v-divider>
                        <v-row v-if="facturacion.cliente">
                            <v-col cols="12" sm="6" md="6">
                                <v-card class="mx-auto" outlined>
                                    <v-list-item four-line>
                                        <v-list-item-content class="text-left">
                                            <v-list-item-subtitle>Razón Social: {{facturacion.cliente.razon_social}}</v-list-item-subtitle>
                                            <v-list-item-subtitle class="pt-2">Documento: {{facturacion.cliente.documento}}</v-list-item-subtitle>
                                            <v-list-item-subtitle class="pt-2">Email: {{facturacion.cliente.email}}</v-list-item-subtitle>
                                            <v-list-item-subtitle class="pt-2">Domicilio: {{facturacion.cliente.direccion}}</v-list-item-subtitle>
                                            <v-list-item-subtitle class="pt-2">IVA: {{facturacion.cliente.condicion_iva.descripcion}}</v-list-item-subtitle>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-card>
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                                <v-row>
                                    <v-col cols="12" sm="12" md="12">
                                        <v-autocomplete :rules="reglasValidacion.campoRequerido" hint="campo obligatorio(*)" persistent-hint v-model="facturacion.concepto" :items="tiposConceptos" item-value="Id" item-text="Desc" label="Conceptos" placeholder="Seleccione un concepto" outlined persistent-hint dense
                                        color="#385F73">
                                        </v-autocomplete>
                                    </v-col>
                                    <v-col cols="12" sm="4" md="4" v-show="facturacion.concepto && !conceptoProduto">
                                        <v-menu ref="fDesde" v-model="menuDate.fechaDesde" :close-on-content-click="false" :return-value.sync="facturacion.fecha_desde" transition="scale-transition" offset-y min-width="290px">
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-text-field v-model="facturacion.fecha_desde" label="Fecha Desde" prepend-icon="event" readonly v-bind="attrs" v-on="on" dense outlined></v-text-field>
                                            </template>
                                            <v-date-picker v-model="facturacion.fecha_desde" no-title scrollable>
                                                <v-spacer></v-spacer>
                                                <v-btn text color="primary" @click="menuDate.fechaDesde = false">Cancel</v-btn>
                                                <v-btn text color="primary" @click="$refs.fDesde.save(facturacion.fecha_desde)">OK</v-btn>
                                            </v-date-picker>
                                        </v-menu>
                                    </v-col>
                                    <v-col cols="12" sm="4" md="4" v-show="facturacion.concepto && !conceptoProduto">
                                        <v-menu ref="fHasta" v-model="menuDate.fechaHasta" :close-on-content-click="false" :return-value.sync="facturacion.fecha_hasta" transition="scale-transition" offset-y min-width="290px">
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-text-field v-model="facturacion.fecha_hasta" label="Fecha Hasta" prepend-icon="event" readonly v-bind="attrs" v-on="on" dense outlined></v-text-field>
                                            </template>
                                            <v-date-picker v-model="facturacion.fecha_hasta" no-title scrollable>
                                                <v-spacer></v-spacer>
                                                <v-btn text color="primary" @click="menuDate.fechaHasta = false">Cancel</v-btn>
                                                <v-btn text color="primary" @click="$refs.fHasta.save(facturacion.fecha_hasta)">OK</v-btn>
                                            </v-date-picker>
                                        </v-menu>
                                    </v-col>
                                    <v-col cols="12" sm="4" md="4" v-show="facturacion.concepto && !conceptoProduto">
                                        <v-menu ref="fVto" v-model="menuDate.fechaVto" :close-on-content-click="false" :return-value.sync="facturacion.fecha_vto" transition="scale-transition" offset-y min-width="290px">
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-text-field v-model="facturacion.fecha_vto" label="Fecha de vencimiento" prepend-icon="event" readonly v-bind="attrs" v-on="on" dense outlined></v-text-field>
                                            </template>
                                            <v-date-picker v-model="facturacion.fecha_vto" no-title scrollable>
                                                <v-spacer></v-spacer>
                                                <v-btn text color="primary" @click="menuDate.fechaVto = false">Cancel</v-btn>
                                                <v-btn text color="primary" @click="$refs.fVto.save(facturacion.fecha_vto)">OK</v-btn>
                                            </v-date-picker>
                                        </v-menu>
                                    </v-col>

                                </v-row>

                            </v-col>
                        </v-row>

                        <v-row v-if="facturacion.cliente">
                            <v-col cols="12" sm="6" md="4">
                                <v-select :rules="reglasValidacion.campoRequerido" hint="campo obligatorio(*)" persistent-hint :items="condicionesVta" item-value="condicion_venta_id" item-text="descripcion" placeholder="Seleccione una opción" label="Condición de venta" dense outlined></v-select>
                            </v-col>
                            <v-col cols="12" sm="6" md="3">
                                <v-text-field color="#385F73" label="Nro Remito" outlined placeholder="0" type="number" dense></v-text-field>
                            </v-col>
                        </v-row>
                    </v-form>
                    <v-divider></v-divider>
                    <v-form ref="formProducto">
                        <v-row v-if="facturacion.cliente">
                            <v-col cols="12" sm="3" md="1">
                                <v-text-field :rules="reglasValidacion.numeroPositivo" v-model="nuevoProducto.cantidad" label="Cantidad" outlined min="0.1" type="number" dense></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="3" md="3">
                                <v-autocomplete :rules="reglasValidacion.objectoVacio" v-model="nuevoProducto.producto" :items="productos" return-object item-text="descripcion" label="Descripción" placeholder="Buscar por descripción o código" outlined persistent-hint dense color="#385F73">
                                </v-autocomplete>
                            </v-col>
                            <v-col cols="12" sm="2" md="2">
                                <v-text-field  v-model="nuevoProducto.precio_unitario" color="#385F73" label="Precio Unitario" outlined placeholder="0.0" type="number" dense disabled></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="1" md="1">
                                <v-text-field v-model="nuevoProducto.bonificacion" color="#385F73" label="Bon.(%)" outlined placeholder="0" type="number" dense></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="2" md="2" v-if="esResponsableInscripto">
                                <v-autocomplete :rules="reglasValidacion.objectoVacio" v-model="nuevoProducto.iva" :items="tiposAliCuotas" return-object item-text="descripcion" label="IVA(%)" placeholder="Seleccionar" outlined persistent-hint dense color="#385F73">
                                </v-autocomplete>
                            </v-col>
                            <v-col cols="12" sm="2" md="2">
                                <v-text-field v-model="nuevoProducto.subtotal" color="#385F73" label="Subtotal" outlined placeholder="0.0" type="number" dense disabled></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="1" md="1">
                                <v-btn outlined color="#385F73" dark @click="agregarNuevoProducto" block>Agregar</v-btn>
                            </v-col>
                        </v-row>
                    </v-form>
                    <v-row v-if="facturacion.cliente">
                        <v-col cols="12">
                            <v-data-table v-model="selected" :headers="headers" :items="facturacion.productos" item-key="name" show-select hide-default-footer>
                                <template v-slot:[`item.cantidad`]="{ item }">
                                    <span>{{item.cantidad|formatNumber}}</span>
                                </template>
                                <template v-slot:[`item.precio_unitario`]="{ item }">
                                    <span>{{item.precio_unitario|formatPrecio}}</span>
                                </template>
                                <template v-slot:[`item.monto_bonif`]="{ item }">
                                    <span>{{item.monto_bonif|formatPrecio}}</span>
                                </template>
                                <template v-slot:[`item.subtotal`]="{ item }">
                                    <span>{{item.subtotal|formatPrecio}}</span>
                                </template>
                                <template v-slot:item.actions="{ item }">
                                    <v-icon medium color="#385F73" class="mr-2" @click="editItem(item)" v-bind="item">
                                        mdi-pencil
                                    </v-icon>
                                    <v-icon medium color="red" class="mr-2" @click="editItem(item)" v-bind="item">
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
                            </v-row>
                        </v-col>

                    </v-row>
                    <v-divider></v-divider>
                    <v-row v-if="facturacion.cliente">
                        <v-col cols="12" md="4" offset-md="8">
                            <v-col cols="6">
                                <v-text-field color="#385F73" label="Descuento%" outlined placeholder="0.0" type="number" dense></v-text-field>
                            </v-col>
                            <v-col cols="12" style="margin-top:-35px">
                                <v-text-field disabled class="total-factura" v-model="facturacion.total" color="#385F73" label="TOTAL" outlined placeholder="0.0" type="number" dense height="100px"></v-text-field>
                            </v-col>
                        </v-col>
                    </v-row>
                    <v-row v-if="facturacion.cliente">
                        <v-col cols="12" align="center">
                            <v-col cols="12" sm="12" md="3">
                                <v-btn outlined color="#385F73" dark block>Emitir Comprobante</v-btn>
                            </v-col>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </v-container>
    </v-card>
</div>

</template>

<script>

export default {
    data: () => ({
        date: new Date().toISOString().substr(0, 10),
        facturacion: {
            fecha_emision: new Date().toISOString().substr(0, 10),
            fecha_desde: null,
            fecha_hasta: null,
            fecha_vto: null,
            productos:[],
            total: 0
        },
        clientes: [],
        productos: [],
        reglasValidacion:{
          numeroPositivo: [
              v => !!v || 'Este campo es requerido',
              v => v > 0 || 'Debe ser mayor a 0',
          ],
          objectoVacio: [
              v => Object.keys(v).length > 0 || 'Este campo es requerido',
          ],
          campoRequerido: [
              v => !!v || 'Este campo es requerido',
          ],
        },
        nuevoProducto: {
            cantidad: 1,
            producto: {},
            precio_unitario: 0,
            bonificacion: 0,
            monto_bonif:0,
            iva: {},
            monto_iva: 0,
            subtotal: 0
        },
        nuevoProductoDefault: {
            cantidad: 1,
            producto: {},
            precio_unitario: 0,
            bonificacion: 0,
            monto_bonif:0,
            iva: {},
            monto_iva: 0,
            subtotal: 0
        },
        tiposComprobantes: [],
        tiposAliCuotas: [],
        tiposConceptos: [],
        condicionesVta: [],
        menuDate:{fechaEmision: false,
                  fechaHasta: false,
                  fechaDesde: false,
                  fechaVto: false},
        selected: [],
        headers: [{
            text: 'Descripción',
            align: 'start',
            sortable: false,
            value: 'producto.descripcion',
        }, {
            text: 'Cantidad',
            value: 'cantidad',
            sortable: false,
        }, {
            text: 'Precio unitario',
            sortable: false,
            value: 'precio_unitario',
        },
        {
            text: 'Bonificacion %',
            sortable: false,
            value: 'bonificacion'
        }, {
            text: 'Importe Bonif.',
            sortable: false,
            value: 'monto_bonif'
        }],
        productos: []
    }),
    mounted() {
        this.adapterHeader();
        this.cargarDatosFacturacion()
    },
    methods: {
        cargarDatosFacturacion() {
                this.facturacion.negocio = this.negocio;
                axios.all([axios.get(`clientes/negocio/${this.negocio.negocio_id}`),
                        axios.get(`productos/negocio/${this.negocio.negocio_id}`),
                        axios.get(`afip/tiposAliCuotas`),
                        axios.get(`afip/tiposComprobantesIVA`, {
                            params: {
                                afip_id: this.negocio.condicion_iva.afip_id
                            }
                        }),
                        axios.get(`afip/tiposConceptos`),
                        axios.get(`afip/condicionesVenta`)
                    ])
                    .then(axios.spread((clientes, productos, tiposAliCuotas, tiposComprobantes, tiposConceptos, condicionesVta) => {
                        this.productos = productos.data.data;
                        this.clientes = clientes.data.data;
                        this.tiposAliCuotas = tiposAliCuotas.data.data;
                        this.tiposComprobantes = tiposComprobantes.data.data;
                        this.tiposConceptos = tiposConceptos.data.data
                        this.condicionesVta = condicionesVta.data.data;
                    }))
                    .catch(error => {
                        this.notificacion('Ha ocurrido un error, intente nuevamente', 'error')
                    })
            },
            /** agrego un nuevo producto al listado de productos a facturar */
            agregarNuevoProducto() {
                if (this.$refs.formProducto.validate()) {
                    this.facturacion.productos.push(Object.assign({}, this.nuevoProducto));
                    this.aumentarTotal();
                    this.restartFormProducto();

                }
            },
            /** incremetno el total */
            aumentarTotal() {
                this.facturacion.total = parseFloat(parseFloat(this.facturacion.total + this.nuevoProductoSubtotal).toFixed(2))
            },
            /** filtro para buscar por razon social de cliente o dni */
            customFilter(item, queryText, itemText) {
                const textOne = item.razon_social.toLowerCase()
                const textTwo = item.documento.toString().toLowerCase()
                const searchText = queryText.toLowerCase()
                return textOne.indexOf(searchText) > -1 || textTwo.indexOf(searchText) > -1
            },
            adapterHeader(){
              /** cambio el header del datatable, dependiendo la condicion_iva del usuario */
              if(this.esResponsableInscripto)
              {
                this.headers.push( {
                    text: 'IVA Aplicado',
                    sortable: false,
                    value: 'iva.descripcion'
                }, {
                    text: 'Importe IVA',
                    sortable: false,
                    value: 'monto_iva'
                })
              }
              this.headers.push({
                          text: 'Subtotal',
                          value: 'subtotal',
                          align: 'center',
                          sortable: false
                      },{
                          text: 'Acciones',
                          value: 'actions',
                          align: 'center',
                          sortable: false
                      })
            },
            /** reestablezco el formulario de nuevo producto*/
            restartFormProducto(){
              this.nuevoProducto = this.nuevoProductoDefault;
              this.$refs.formProducto.resetValidation()
            }
    },
    watch: {
            clienteSelected() {
                if (this.clienteSelected) {
                    /** selecciono la primero opcion del tipo comprobante*/
                    this.facturacion.comprobante = this.tiposComprobantes[0].afipId;
                }
            },
            /** si cambia el producto, cambia el subtotal */
            nuevoProductoProducto() {
                if (this.nuevoProductoProducto.producto_id) {
                    this.nuevoProducto.precio_unitario = parseFloat(this.calcularPrecioNeto(this.nuevoProducto.producto));
                    this.nuevoProducto.monto_bonif = this.calcularBonificacion;
                    this.nuevoProducto.subtotal = this.calculoSubtotal;
                }
            },
            /** si cambia la cantidad, cambia el subtotal */
            nuevoProductoCantidad() {
                /** formateo la cantidad*/
                this.nuevoProducto.cantidad = parseFloat(this.nuevoProductoCantidad);
                if (this.nuevoProductoProducto.producto_id) {
                    this.nuevoProducto.monto_bonif = this.calcularBonificacion;
                    this.nuevoProducto.subtotal = this.calculoSubtotal;
                }
            },
            /** si cambia el IVA, cambia el subtotal */
            nuevoProductoIva() {
                if (this.nuevoProducto.producto.producto_id && this.nuevoProductoIva.tipo_alicuota_id) {
                    this.nuevoProducto.monto_bonif = this.calcularBonificacion;
                    this.nuevoProducto.monto_iva = parseFloat(parseFloat(parseFloat(this.nuevoProducto.precio_unitario) * this.nuevoProductoIva.valor).toFixed(2))
                    this.nuevoProducto.subtotal = this.calculoSubtotal;
                }
            },
            nuevoProductoBonificacion(){
              if (this.nuevoProducto.producto.producto_id) {
                  this.nuevoProducto.monto_bonif = this.calcularBonificacion;
                  this.nuevoProducto.subtotal = this.calculoSubtotal;
              }
            },
            conceptoFactura(){
              if(!this.conceptoProduto){
                  this.facturacion.fecha_desde = new Date().toISOString().substr(0, 10);
                  this.facturacion.fecha_hasta = new Date().toISOString().substr(0, 10);
                  this.facturacion.fecha_vto = new Date().toISOString().substr(0, 10);
              }
              else{
                  this.facturacion.fecha_desde = null;
                  this.facturacion.fecha_hasta = null;
                  this.facturacion.fecha_vto = null;
              }
            }


    },
    computed: {
        negocio() {
                return this.$store.getters.negocioUser
            },
            clienteSelected() {
                return this.facturacion.cliente
            },
            conceptoFactura() {
              return this.facturacion.concepto;
            },
            conceptoProduto() {
                return this.facturacion.concepto == 1;
            },
            nuevoProductoProducto() {
                return this.nuevoProducto.producto;
            },
            nuevoProductoCantidad() {
                return this.nuevoProducto.cantidad;
            },
            nuevoProductoIva() {
                return this.nuevoProducto.iva;
            },
            nuevoProductoSubtotal() {
                return this.nuevoProducto.subtotal;
            },
            nuevoProductoBonificacion(){
                return this.nuevoProducto.bonificacion;
            },
            calcularBonificacion(){
              return parseFloat(parseFloat(parseFloat(((this.nuevoProducto.precio_unitario + this.nuevoProducto.monto_iva).toFixed(2) * this.nuevoProductoCantidad) * (this.nuevoProductoBonificacion / 100)).toFixed(2)));
            },
            calculoSubtotal() {
                return parseFloat(parseFloat(parseFloat(((this.nuevoProducto.precio_unitario + this.nuevoProducto.monto_iva).toFixed(2) * this.nuevoProductoCantidad) - this.nuevoProducto.monto_bonif).toFixed(2)));
            },
            esResponsableInscripto(){
              return this.negocio.condicion_iva.afip_id === 1;
            },

    }
}

</script>
