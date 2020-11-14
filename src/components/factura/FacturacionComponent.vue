<style >

#input-142 {
    font-size: 23px;
    text-align: center;
}

</style>

<template>

<div>
    <v-row v-if="!facturaElectronicaRegistrada">
        <v-col cols="12">
            <v-alert type="warning" colored-border elevation="2" prominent border="left" dismissible>
                <v-row align="center">
                    <v-col class="grow">Para poder utilizar el servicio de facturación electrónica descargue el instructivo y siga los pasos</v-col>
                    <v-col class="shrink">
                        <v-btn color="warning" @click="descargarInstructivo()">Descargar Instructivo</v-btn>
                    </v-col>
                </v-row>
            </v-alert>
        </v-col>
    </v-row>
    <v-row no-gutters>
        <v-col cols="12">
            <p class="text-lg-h6 font-weight-bold blue-grey--text text--lighten-2">Comprobante</p>
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
                                <v-autocomplete v-model="facturacion.cliente" :rules="reglasValidacion.campoRequerido" :items="clientes" label="Buscar cliente" item-text="razon_social" item-value="cliente_id" hint="campo obligatorio(*)" outlined persistent-hint dense return-object>
                                </v-autocomplete>
                            </v-col>
                            <v-col cols="12" sm="3" md="3">
                                <v-select v-model="facturacion.comprobante" :items="tiposComprobantes" item-value="afipId" item-text="descripcion" placeholder="Seleccione una opción" label="Tipo Comprobante" hint="campo obligatorio(*)" persistent-hint outlined dense></v-select>
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
                        <v-row v-if="facturacion.cliente.cliente_id">
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
                                        <v-autocomplete :rules="reglasValidacion.campoRequerido" hint="campo obligatorio(*)" persistent-hint v-model="facturacion.concepto" :items="tiposConceptos" item-value="Id" item-text="Desc" label="Conceptos" placeholder="Seleccione un concepto" outlined
                                        persistent-hint dense color="#385F73">
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

                        <v-row v-if="facturacion.cliente.cliente_id">
                            <v-col cols="12" sm="6" md="4">
                                <v-select v-model="facturacion.condicion_vta" :rules="reglasValidacion.campoRequerido" hint="campo obligatorio(*)" persistent-hint :items="condicionesVta" item-value="condicion_venta_id" item-text="descripcion" placeholder="Seleccione una opción" label="Condición de venta"
                                dense outlined></v-select>
                            </v-col>
                            <!-- <v-col cols="12" sm="6" md="3">
                                <v-text-field color="#385F73" label="Nro Remito" outlined placeholder="0" type="number" dense></v-text-field>
                            </v-col> -->
                        </v-row>
                    </v-form>
                    <v-divider></v-divider>
                    <v-form ref="formProducto" v-if="!editable && !pedidoId && facturacion.cliente.cliente_id">
                        <v-row>
                            <v-col cols="12" sm="3" md="1">
                                <v-text-field :rules="reglasValidacion.numeroPositivo" v-model="nuevoProducto.cantidad" label="Cantidad" outlined min="0.1" type="number" dense></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="3" md="3">
                                <v-autocomplete :rules="reglasValidacion.objectoVacio" v-model="nuevoProducto.producto" :items="productos" return-object item-text="descripcion" label="Descripción" placeholder="Buscar por descripción o código" outlined persistent-hint dense color="#385F73">
                                </v-autocomplete>
                            </v-col>
                            <v-col cols="12" sm="2" md="2">
                                <v-text-field v-model="nuevoProducto.precio_unitario" color="#385F73" label="Precio Unitario" outlined placeholder="0.0" type="number" dense disabled></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="1" md="1">
                                <v-text-field v-model="nuevoProducto.bonificacion" color="#385F73" label="Bon.(%)" outlined placeholder="0" type="number" dense></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="2" md="2" v-if="esResponsableInscripto">
                                <v-autocomplete :rules="reglasValidacion.objectoVacio" v-model="nuevoProducto.alicuota" :items="tiposAliCuotas" return-object item-text="descripcion" label="IVA(%)" placeholder="Seleccionar" outlined persistent-hint dense color="#385F73">
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
                    <v-row v-if="facturacion.cliente.cliente_id">
                        <v-col cols="12">
                            <v-data-table v-model="selected" :headers="headers" :items="facturacion.productos" item-key="producto.producto_id" hide-default-footer>
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
                                    <v-icon medium color="#385F73" class="mr-2" @click="modalItemProducto(item)" v-bind="item" :disabled="pedidoId">
                                        mdi-pencil
                                    </v-icon>
                                    <v-icon medium color="red" class="mr-2" @click="eliminarProducto(item)" v-bind="item" :disabled="pedidoId">
                                        mdi-close
                                    </v-icon>
                                </template>
                            </v-data-table>
                            <v-row v-if="!pedidoId">
                                <v-col cols="12" justify="end" align="center">
                                    <modal-factura :dialog="dialog" :nuevo-producto="nuevoProducto" :productos="productos" :tipos-ali-cuotas="tiposAliCuotas" @cerrar-dialog="cerrarDialog" @editar-producto="editarProducto($event)">
                                    </modal-factura>
                                </v-col>
                            </v-row>
                        </v-col>

                    </v-row>
                    <v-divider></v-divider>
                    <v-row v-if="facturacion.cliente.cliente_id">
                        <v-col cols="12" md="4" offset-md="8">
                            <v-col cols="6">

                            </v-col>
                            <v-col cols="12" style="margin-top:-35px">
                                <v-card class="mx-auto" max-width="344" outlined>
                                    <v-list-item>
                                        <v-list-item-content>
                                            <div class="mb-4 grey--text">Total</div>
                                            <v-list-item-title align="center" class="headline mb-1">{{facturacion.importes.total|formatPrecio}}</v-list-item-title>

                                        </v-list-item-content>
                                    </v-list-item>
                                </v-card>
                                <!-- <v-text-field disabled class="total-factura" v-model="facturacion.importes.total" color="#385F73" label="TOTAL" outlined placeholder="0.0" type="number" dense height="100px"></v-text-field> -->
                            </v-col>
                        </v-col>
                    </v-row>
                    <v-row v-if="facturacion.cliente.cliente_id">
                        <v-col cols="12" align="center">
                            <v-col cols="12" sm="12" md="3">
                                <v-btn outlined color="#385F73" dark block @click="descargarComprobante">Emitir Comprobante</v-btn>
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

import ModalFactura from '@/components/factura/ModalFacturaComponent'
import Montos from '@/mixins/montos'
export default {
    components: {
        ModalFactura
    },
    mixins: [Montos],
    props: {
        pedidoId: {
            type: String,
            default: null
        }
    },
    data: () => ({
        date: new Date().toISOString().substr(0, 10),
        facturacion: {
            cliente: {},
            concepto: 1,
            condicion_vta: 1,
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
                total: 0
            }
        },
        dialog: false,
        clientes: [],
        productos: [],
        importes: {
            1: 'noGravado',
            2: 'exento'
        },
        reglasValidacion: {
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
        tiposComprobantes: [],
        tiposAliCuotas: [],
        tiposConceptos: [],
        condicionesVta: [],
        menuDate: {
            fechaEmision: false,
            fechaHasta: false,
            fechaDesde: false,
            fechaVto: false
        },
        selected: [],
        indexEditable: -1,
        itemEdit: {},
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
        }, {
            text: 'Bonificacion %',
            sortable: false,
            value: 'bonificacion'
        }, {
            text: 'Importe Bonif.',
            sortable: false,
            value: 'monto_bonif'
        }],
        productos: [],
        pedido: null,
        tipo: 'RECIBO',
    }),
    mounted() {
        this.adapterHeader();
        this.consultarPorTipo();
        /** pregunto si el usuario quiere descargar un comprobante o un reciob **/

        // this.cargarDatosFacturacion();
    },
    methods: {
        cargarDatosComprobante() {
                let tipoComprobante = (this.tipo == 'FACTURA' ? this.negocio.condicion_iva.afip_id : null);
                axios.all([axios.get(`clientes/negocio/${this.negocio.negocio_id}`),
                        axios.get(`productos/negocio/${this.negocio.negocio_id}`),
                        axios.get(`afip/tiposAliCuotas`),
                        axios.get(`afip/tiposComprobantesIVA`, {
                            params: {
                                afip_id: tipoComprobante
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
                        this.facturacion.comprobante = this.tiposComprobantes[0].afipId
                    }))
                    .catch(error => {
                        this.notificacion('Ha ocurrido un error, intente nuevamente', 'error')
                    })
                    /** si se factura un pedido **/
                if (this.pedidoId) {
                    this.cargarPedido();
                }
            },
            consultarPorTipo() {
                /** */
                if (this.facturaElectronicaRegistrada) {
                    this.$swal({
                        icon: 'question',
                        iconHtml: '؟',
                        title: "¿Que deseas generar?",
                        confirmButtonText: 'Factura',
                        cancelButtonColor: '#385F73',
                        cancelButtonText: 'Recibo',
                        allowOutsideClick: false,
                        showCancelButton: true,
                    }).then((result) => {
                        if (result.value) {
                            this.tipo = 'FACTURA';
                            this.cargarDatosComprobante()
                        } else {
                            this.cargarDatosComprobante()
                        }
                    })
                } else {
                    this.cargarDatosComprobante()
                }
            },
            adapterHeader() {
                /** cambio el header del datatable, dependiendo la condicion_iva del usuario */
                if (this.esResponsableInscripto) {
                    this.headers.push({
                        text: 'IVA Aplicado',
                        sortable: false,
                        value: 'alicuota.descripcion'
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
                }, {
                    text: 'Acciones',
                    value: 'actions',
                    align: 'center',
                    sortable: false
                })
            },
            cargarPedido() {
                axios.get(`preventas/${this.pedidoId}`)
                    .then(response => {
                        console.log(this.clientes);
                        this.facturacion.cliente = response.data.data.preventa.cliente;
                        this.facturacion.preventa = response.data.data.preventa.preventa_id;
                        this.facturacion.productos = response.data.data.productos;
                        this.sumarImportesTotales();
                    })
            },
            /** agrego un nuevo producto al listado de productos a facturar */
            agregarNuevoProducto() {
                if (this.$refs.formProducto.validate()) {
                    this.facturacion.productos.push(Object.assign({}, this.nuevoProducto));
                    /** verifico si es incluye iva */
                    this.sumarImportesTotales();
                    this.$nextTick(() => {
                        this.restartFormProducto();
                    })

                }
            },
            cerrarDialog() {
                this.dialog = false;
                this.indexEditable = -1;
                this.$nextTick(() => {
                    this.restartFormProducto();

                })
            },
            /** filtro para buscar por razon social de cliente o dni */
            customFilter(item, queryText, itemText) {
                const textOne = item.razon_social.toLowerCase()
                const textTwo = item.documento.toString().toLowerCase()
                const searchText = queryText.toLowerCase()
                return textOne.indexOf(searchText) > -1 || textTwo.indexOf(searchText) > -1
            },
            /** reestablezco el formulario de nuevo producto*/
            restartFormProducto() {
                this.nuevoProducto = Object.assign({}, this.nuevoProductoDefault);
                this.$refs.formProducto.resetValidation()
            },
            /** descargo el comprobante **/
            descargarComprobante() {
                let dataComprobante = Object.assign({}, this.facturacion);
                dataComprobante.cliente =dataComprobante.cliente.cliente_id;
                axios.post(`comprobantes/generar`, dataComprobante)
                    .then((response) => {
                        const link = document.createElement('a');
                        link.href = response.data.data.file;
                        link.setAttribute('download', 'factura.pdf');
                        document.body.appendChild(link);
                        link.click();
                    })
                    .catch((error) => {
                        this.notificacion('Ha ocurrido un error', 'error');
                    });
            },
            /** descargo el comprobante **/
            descargarInstructivo() {
                axios.get(`afip/instructivo`)
                    .then((response) => {
                        const link = document.createElement('a');
                        link.href = response.data.data.file;
                        link.setAttribute('download', 'instructivo_facturacion_electronica.pdf');
                        document.body.appendChild(link);
                        link.click();
                    })
                    .catch((error) => {
                        this.notificacion('Ha ocurrido un error', 'error');
                    });
            },
            sumarImportesTotales() {
                this.resetMontosTotales();
                this.facturacion.productos.forEach(producto => {
                    if (Object.keys(producto.alicuota).length != 0) {
                        /** si es exento o no gravado*/
                        if (producto.alicuota.afip_id == 1 || producto.alicuota.afip_id == 2) {
                            this.facturacion.importes[this.importes[producto.alicuota.afip_id]] = this.parseFloatMonto(this.facturacion.importes[this.importes[producto.alicuota.afip_id]] + producto.subtotal_sin_iva);
                        } else {
                            this.facturacion.importes.gravado = this.parseFloatMonto(this.facturaMontoGravado + producto.subtotal_sin_iva);
                            this.facturacion.importes.iva = this.parseFloatMonto(this.facturacion.importes.iva + producto.monto_iva);
                        }
                    } else {
                        this.facturacion.importes.gravado = this.parseFloatMonto(this.facturaMontoGravado + producto.subtotal_sin_iva);
                    }

                    this.facturacion.importes.total = this.parseFloatMonto(this.facturacion.importes.total + producto.subtotal);
                });
            },

            actualizarMontos() {
                this.nuevoProducto.monto_bonif = this.calculoMontoBonif;
                this.nuevoProducto.subtotal_sin_iva = this.calculoSubtotalSinIva;
                this.nuevoProducto.monto_iva = this.calculoMontoIva;
                this.nuevoProducto.subtotal = this.calculoSubtotal;
            },
            modalItemProducto(item) {
                this.indexEditable = this.facturaProductos.indexOf(item);
                this.nuevoProducto = Object.assign({}, item)
                this.dialog = true
            },
            resetMontosTotales() {
                this.facturacion.importes.noGravado = 0;
                this.facturacion.importes.exento = 0;
                this.facturacion.importes.gravado = 0;
                this.facturacion.importes.iva = 0;
                this.facturacion.importes.total = 0
            },
            editarProducto(item) {
                Object.assign(this.facturaProductos[this.indexEditable], item)
                this.sumarImportesTotales();
                this.cerrarDialog()
            },
            eliminarProducto(item) {
                const index = this.facturacion.productos.indexOf(item)
                this.facturacion.productos.splice(index, 1)
                this.sumarImportesTotales();
            }


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
        }


    },
    computed: {
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
                return this.facturacion.productos;
            },
            editable() {
                return this.indexEditable != -1;
            }

    }
}

</script>
