

<template>

<div>
    <v-row no-gutters>
        <v-col cols="12">
            <p class="text-lg-h6 font-weight-bold blue-grey--text text--lighten-2">Pedidos {{title}}</p>
        </v-col>
    </v-row>
    <div>
        <v-row justify="center">
            <v-col v-for="(c,index) in cards[0]" :key="index" cols="mx-auto">
                <v-card color="#385F73" dark>
                    <v-card-subtitle class="text-center">{{c.title}}</v-card-subtitle>
                    <v-row align="center" justify="center">
                        <v-col align="center" cols="12" md="10" class="text-center">
                            <span>{{ totales[index] }}</span>
                        </v-col>
                        <v-col cols="12" md="12" align="center">
                            <v-btn @click="estado=c.value_action" text>{{c.actions}}</v-btn>
                        </v-col>
                    </v-row>
                </v-card>
            </v-col>
        </v-row>
    </div>
    <v-card>
        <v-card-title>
            <v-col cols="6" sm="4">
                <v-row>
                    <v-text-field v-model="search" append-icon="mdi-magnify" label="Buscar Pedido" single-line hide-details></v-text-field>
                </v-row>
            </v-col>
            <v-spacer></v-spacer>


        </v-card-title>
        <v-data-table :headers="headers" :items="pedidos" :search="search">
            <template v-slot:[`item.fecha`]="{ item }">
                <span>{{item.fecha|formatDate}}</span>
            </template>
            <template v-slot:item.estado="{item}">
                <v-chip class="ma-2 white--text" :color="colores[item.estado.toLowerCase()]">
                    {{item.estado|capitalize}}
                </v-chip>
            </template>
            <template v-slot:item.actions="{ item }">
              <v-tooltip top>
                  <template v-slot:activator="{ on, attrs }">
                      <v-icon medium color="#385F73" class="mr-2" @click="verDetalle(item)" v-bind="attrs" v-on="on">
                          list_alt
                      </v-icon>
                  </template>
                  <span>Visualizar</span>
              </v-tooltip>
                <v-tooltip top v-if="item.estado == 'PENDIENTE'">
                    <template v-slot:activator="{ on, attrs }">
                        <v-icon medium color="#385F73" class="mr-2" @click="" v-bind="attrs" v-on="on" @click="$router.push(`/pedidos/editar/${item.preventa_id}`)">
                            mdi-pencil
                        </v-icon>
                    </template>
                    <span>Editar</span>
                </v-tooltip>
                <v-tooltip top v-if="item.estado == 'PENDIENTE'">
                    <template v-slot:activator="{ on, attrs }">
                        <v-icon medium color="#385F73" class="mr-2" @click="" v-bind="attrs" v-on="on" @click="cancelarPreventa(item)">
                            auto_delete
                        </v-icon>
                    </template>
                    <span>Cancelar</span>
                </v-tooltip>
                <v-tooltip top v-if="item.estado == 'PENDIENTE'">
                    <template v-slot:activator="{ on, attrs }">
                        <v-icon medium color="#385F73" class="mr-2" @click="" v-bind="attrs" v-on="on" @click="realizarPreventa(item)">
                            event_available
                        </v-icon>
                    </template>
                    <span>Realizar</span>
                </v-tooltip>
                <v-tooltip top v-if="item.estado != 'PENDIENTE'">
                    <template v-slot:activator="{ on, attrs }">
                        <v-icon medium color="#385F73" class="mr-2" @click="" v-bind="attrs" v-on="on" @click="volverPreventaPendiente(item)">
                            pending_actions
                        </v-icon>
                    </template>
                    <span>Volver a pendiente</span>
                </v-tooltip>
                <v-tooltip top v-if="item.estado == 'REALIZADO'">
                    <template v-slot:activator="{ on, attrs }">
                        <v-icon medium color="#385F73" class="mr-2" @click="" v-bind="attrs" v-on="on" @click="redirect(`/facturacion/${item.preventa_id}`)">
                          receipt_long
                        </v-icon>
                    </template>
                    <span>Generar Comprobante</span>
                </v-tooltip>
                <v-tooltip top v-if="item.estado == 'CANCELADO'">
                    <template v-slot:activator="{ on, attrs }">
                        <v-icon medium color="#385F73" class="mr-2" @click="" v-bind="attrs" v-on="on" @click="realizarPreventa(item)">
                          close
                        </v-icon>
                    </template>
                    <span>Eliminar Pedido</span>
                </v-tooltip>
            </template>
        </v-data-table>
        <modal-detalle :pedidoProductos="pedidoProductos" :dialog="dialog" @closeDetalle="cerrarDetalle()" @descargarPDF="descargarPreventa()"></modal-detalle>
        <v-row>
            <v-col cols="12" sm="12" md="12" align="end">
                <v-btn outlined color="#385F73" dark class="mb-2 mr-md-2" @click="$router.push('/pedidos/nuevo')">Nuevo Pedido</v-btn>
            </v-col>
        </v-row>
    </v-card>
</div>

</template>

<script>

import ModalDetalle from '@/components/pedido/ModalDetalle.vue'
export default {
    components: {
        ModalDetalle
    },
    data: () => ({
        colores: {
            pendiente: 'primary',
            realizado: 'finish',
            cancelado: 'cancel'
        },
        totales: [],
        headers: [{
            text: 'Fecha de Pedido',
            align: 'center',
            sortable: false,
            value: 'fecha',
        }, {
            text: 'Cliente',
            align: 'center',
            value: 'cliente'
        }, {
            text: 'Estado',
            align: 'center',
            value: 'estado'
        }, {
            text: 'Acciones',
            value: 'actions',
            align: 'center',
            sortable: false
        }, ],
        pedidos: [],
        estado: null,
        editedIndex: -1,
        editedItem: {
            name: '',
            calories: 0,
            fat: 0,
            carbs: 0,
            protein: 0,
        },
        defaultItem: {
            name: '',
            calories: 0,
            fat: 0,
            carbs: 0,
            protein: 0,
        },
        search: '',
        model: null,
        allow: false,
        tab: null,
        dialog:false,
        pedidoProductos:[],
        itemPedido:null

    }),
    mounted() {
        this.cargarDatosIniciales();
    },
    methods: {

        cargarDatosIniciales() {
                axios.all([axios.get(`clientes/negocio/${this.negocio.negocio_id}`),
                        axios.get(`productos/negocio/${this.negocio.negocio_id}`),
                        axios.get(`afip/tiposAliCuotas`)
                    ])
                    .then(axios.spread((clientes, productos, alicuotas) => {
                        this.clientes = clientes.data.data;
                        this.productos = productos.data.data;
                        this.alicuotas = alicuotas.data.data;
                    }))
                    .catch((error) => {
                        this.notificacion('Ha ocurrido al cargar los datos', 'error');
                    });
                this.listadoPedidos();
            },

            listadoPedidos() {
                axios.get(`preventas/negocio/${this.negocio.negocio_id}`, {
                        params: {
                            tipo: 2,
                            estado: this.estado
                        }
                    })
                    .then(response => {
                        this.pedidos = response.data.data.pedidos;
                        this.totales = response.data.data.totales;
                        /** modifico los totales pendientes y realizados**/

                    })
                    .catch((error) => {
                        this.notificacion('Ha ocurrido al cargar los datos', 'error');
                    });
            },

            cancelarPreventa(item) {
                this.$swal({
                    icon: 'question',
                    title: "¿Estás seguro que deseas eliminar este pedido?",
                    showCancelButton: true,
                }).then((result) => {
                    if (result.value) {
                        /** estado 4, es el estado cancelado o eliminado*/
                        axios.put(`preventas/cambiarEstado/${item.preventa_id}`, {
                                estado: this.estadoCancelado
                            })
                            .then(response => {
                                if (response.data.code == 200) {
                                    this.listadoPedidos();
                                    this.notificacion('Pedido Cancelado', 'success');
                                }
                            })
                    }
                })
            },
            realizarPreventa(item) {
                this.$swal({
                    title: "¿Estás seguro que deseas marcar como realizado este pedido?",
                    showCancelButton: true,
                }).then((result) => {
                    if (result.value) {
                        /** estado 2, es el estado realizado*/
                        axios.put(`preventas/cambiarEstado/${item.preventa_id}`, {
                                estado: this.estadoRealizado
                            })
                            .then(response => {
                                if (response.data.code == 200) {
                                    this.listadoPedidos()
                                    this.notificacion('Pedido realizado', 'success');

                                }
                            })
                    }
                })
            },

            volverPreventaPendiente(item) {
                this.$swal({
                    title: "¿Estás seguro que deseas cambiar el estado de este pedido?",
                    showCancelButton: true,
                }).then((result) => {
                    if (result.value) {
                        /** estado 2, es el estado realizado*/
                        axios.put(`preventas/cambiarEstado/${item.preventa_id}`, {
                                estado: this.estadoPendiente
                            })
                            .then(response => {
                                if (response.data.code == 200) {
                                    this.listadoPedidos()
                                    this.notificacion('Se cambio a pendiente correctamente', 'success');

                                }
                            })
                    }
                })
            },
            /** descargo el comprobante **/
            descargarPreventa() {
                this.dialog = false;
                axios.get(`preventas/descargar/${this.itemPedido.preventa_id}`)
                    .then((response) => {
                        const link = document.createElement('a');
                        link.href = response.data.data.file;
                        link.setAttribute('download', 'pedido.pdf');
                        document.body.appendChild(link);
                        link.click();
                    })
                    .catch((error) => {
                        this.notificacion('Ha ocurrido un error', 'error');
                    });
            },
            verDetalle(item){
              this.itemPedido = item;
              axios.get(`preventas/${item.preventa_id}`)
              .then((response)=>{
                this.pedidoProductos = response.data.data.productos;
                this.dialog = true;
              })
            },
            cerrarDetalle(){
              this.dialog = false;
              this.itemPedido = null
            },

    },
    computed: {
            formTitle() {
                return this.editedIndex === -1 ? 'Nuevo Producto' : 'Editar Producto'
            },
            cards() {

                return [{
                    total: {
                        title: 'PEDIDOS TOTALES',
                        value: 0,
                        actions: 'VER TODOS LOS PEDIDOS',
                        value_action: null
                    },
                    pendiente: {
                        title: 'PEDIDOS PENDIENTES',
                        value: 0,
                        actions: 'VER PENDIENTES',
                        value_action: this.estadoPendiente
                    },
                    realizado: {
                        title: 'PEDIDOS REALIZADOS',
                        value: 0,
                        actions: 'VER REALIZADOS',
                        value_action: this.estadoRealizado
                    },
                    cancelado: {
                        title: 'PEDIDOS CANCELADOS',
                        value: 0,
                        actions: 'VER CANCELADOS',
                        value_action: this.estadoCancelado
                    }
                }]
            },
            title() {
                switch (this.estado) {
                    case this.estadoPendiente:
                        return 'Pendientes'
                        break;
                    case this.estadoRealizado:
                        return 'Realizados'
                        break;
                    case this.estadoCancelado:
                        return 'Cancelado'
                        break;
                    default:
                        return 'Totales'

                }
            }
    },
    watch: {
            estado() {
                this.listadoPedidos();
            }
    },

}

</script>
