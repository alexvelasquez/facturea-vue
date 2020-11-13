<template>
<div>
    <v-row no-gutters>
        <v-col cols="12">
            <p class="text-lg-h6 font-weight-bold blue-grey--text text--lighten-2">Clientes</p>
        </v-col>
    </v-row>
    <v-card>
        <v-card-title>
            <v-col cols="6" sm="4">
                <v-row>
                    <v-text-field v-model="search" append-icon="mdi-magnify" label="Buscar Cliente" single-line hide-details></v-text-field>
                </v-row>
            </v-col>
            <v-spacer></v-spacer>
        </v-card-title>
        <v-data-table v-model="seleccionados" :headers="cabeceras" item-key="cliente_id" :items="clientes" :search="search" show-select>
            <template v-slot:[`item.direccion`]="{ item }">
                <span>{{item.localidad.descripcion|capitalize}} - {{item.localidad.provincia.descripcion|upper}}</span>
            </template>
            <template v-slot:[`item.precio_compra`]="{ item }">
                <span>{{item|precioNeto}}</span>
            </template>
            <template v-slot:[`item.email`]="{ item }">
                <span>{{item.email ? item.email : '--'}}</span>
            </template>
            <template v-slot:[`item.telefono`]="{ item }">
                <span>{{item.telefono ? item.telefono : '--'}}</span>
            </template>
            <template v-slot:[`item.f_modificacion`]="{ item }">
                <span>{{item.f_modificacion|formatDate}}</span>
            </template>
            <template v-slot:[`item.monto_debido`]="{ item }">
                <span>{{item.monto_debido|formatPrecio }}</span>
            </template>
            <template v-slot:[`item.actions`]="{item}">
              <v-tooltip top>
                  <template v-slot:activator="{ on, attrs }">
                      <v-icon medium color="#385F73" class="mr-2" v-bind="attrs" v-on="on" @click="modalProducto(item)">
                          mdi-pencil
                      </v-icon>
                  </template>
                  <span>Editar</span>
              </v-tooltip>
              <v-tooltip top >
                  <template v-slot:activator="{ on, attrs }">
                      <v-icon medium color="#385F73" class="mr-2" v-bind="attrs" v-on="on" @click="eliminarProducto(item)">
                          mdi-close
                      </v-icon>
                  </template>
                  <span>Eliminar</span>
              </v-tooltip>
              <v-tooltip top v-if="item.monto_debido > 0">
                  <template v-slot:activator="{ on, attrs }">
                      <v-icon medium color="#385F73" class="mr-2" v-bind="attrs" v-on="on" @click="redirect(`/clientes/cuentacorriente/${item.cliente_id}`)">
                          style
                      </v-icon>
                  </template>
                  <span>Cuenta Corriente</span>
              </v-tooltip>
            </template>
        </v-data-table>
        <v-row id="actions-clientes">
            <v-col cols="12" sm="12" md="12" align="end">
                <!-- <v-btn outlined color="#385F73" dark class="mb-2 mr-md-2">EXPORTAR XLS
                </v-btn> -->
                <v-btn v-if="seleccionados.length > 0" @click="eliminarSeleccionados" outlined color="#385F73" dark class="mb-2 mr-md-2">ELIMINAR SELECCIONADOS
                </v-btn>
                <modal-cliente :provincias="provincias" :tiposDocumentos="tiposDocumentos" :condicionesIva="condicionesIva" :editable="editable" :dialog="dialog" :cliente="itemCliente" @cerrar-dialog="close" @agregar-cliente="agregarProducto($event)" @editar-cliente="editarProducto($event)">
                </modal-cliente>
            </v-col>
        </v-row>
    </v-card>

</div>

</template>

<script>

import ModalCliente from '@/components/clientes/ModalClienteComponent'
export default {
    components: {
        ModalCliente
    },
    data: () => ({
        dialog: false,
        cabeceras: [{
            text: 'Razon Social',
            align: 'center',
            sortable: true,
            value: 'razon_social'
        }, {
            text: 'Email',
            align: 'center',
            value: 'email'
        }, {
            text: 'Direccion',
            value: 'direccion',
            sortable: true
        }, {
            text: 'Teléfono',
            value: 'telefono',
              align: 'center',
            sortable: true
        }, {
            text: 'Condición IVA',
            value: 'condicion_iva.descripcion',
            sortable: true
        },
        {
            text: 'Deuda',
            value: 'monto_debido',
            sortable: true
        },
        {
            text: 'Acciones',
            value: 'actions',
            align: 'center',
            sortable: false
        }, ],
        search: '',
        seleccionados: [],

        clientes: [],
        provincias: [],
        tiposDocumentos: [],
        condicionesIva: [],

        indexEditable: -1,
        itemCliente: {
            condicion_iva: {
                condicion_iva_id: null
            },
            tipo_documento: {
                tipo_documento_id: null
            },
            localidad: {
                localidad_id: null,
                provincia: {
                    provincia_id: null
                }
            },
        },
        defaultCliente: {
          condicion_iva: {
              condicion_iva_id: null
          },
          tipo_documento: {
              tipo_documento_id: null
          },
          localidad: {
              localidad_id: null,
              provincia: {
                  provincia_id: null
              }
          },
        },
    }),


    mounted() {
        this.headerTabla = this.headersProductos;
        this.cargarDatosClientes();
    },
    methods: {
        cargarDatosClientes() {
                axios.all([axios.get(`clientes/negocio/${this.negocio.negocio_id}`),
                        axios.get(`datosGeograficos/provincias`),
                        axios.get(`afip/tiposDocumentos`),
                        axios.get(`afip/condicionesIva`)
                    ])
                    .then(axios.spread((clientes, provincias, tiposDocumentos, condicionesIva) => {
                        this.clientes = clientes.data.data;
                        this.provincias = provincias.data.data;
                        this.tiposDocumentos = tiposDocumentos.data.data;
                        this.condicionesIva = condicionesIva.data.data;
                    }))
                    .catch(error => {
                        if(this.$store.getters.token){
                          this.notificacion('Ha ocurrido al recuperar los datos','error')
                        }
                    })
            },

            modalProducto(item) {
                this.indexEditable = this.clientes.indexOf(item);
                this.itemCliente = Object.assign({}, item)
                this.dialog = true
            },
            agregarProducto(item) {
                axios.post(`clientes/negocio/${this.negocio.negocio_id}/nuevo`, item)
                    .then(response => {
                        this.clientes.push(response.data.data);
                        this.notificacion('Producto agregado correctamente', "success");
                        this.close();
                    })
            },

            editarProducto(item) {
                this.$swal({
                    icon:"warning",
                    title: "¿Estas seguro que deseas modificar este cliente?",
                    showCancelButton: true,
                }).then((result) => {
                    if (result.value) {
                        this.dialog = false
                        axios.put(`clientes/editar/${item.cliente_id}`, item)
                            .then(response => {
                                Object.assign(this.clientes[this.indexEditable], response.data.data)
                                this.notificacion('Cliente modificado correctamente', 'success');
                                this.close();
                            })
                    }
                })
            },

            eliminarProducto(item) {
                this.$swal({
                    icon: 'warning',
                    title: "¿Estas seguro que deseas eliminar este cliente?",
                    showCancelButton: true,
                }).then((result) => {
                    if (result.value) {
                        axios.put(`clientes/eliminar/${item.cliente_id}`)
                            .then(response => {
                                const index = this.clientes.indexOf(item)
                                this.clientes.splice(index, 1)
                                this.notificacion('Eliminado correctamente', 'success')
                            })
                    }
                })
            },
            eliminarSeleccionados() {
                this.$swal({
                    icon: 'warning',
                    title: "¿Estas seguro que deseas eliminar los clientes seleccionados?",
                    showCancelButton: true,
                }).then((result) => {
                    if (result.value) {
                        axios.put(`clientes/eliminarClientes`, {
                                clientes: JSON.stringify(this.seleccionados)
                            })
                            .then(response => {
                              if(response.data.code == 200) {
                                this.seleccionados.forEach(element => this.clientes.splice(this.clientes.indexOf(element), 1))
                                this.notificacion('Eliminados correctamente', 'success')
                              }
                              else{
                                this.notificacion('Ha ocurrido un error', 'error')
                              }
                            })
                            .catch(error => {
                                this.notificacion('Ha ocurrido un error', 'error')
                            })
                    }
                })
            },

            close() {
                this.dialog = false;
                this.indexEditable = -1;
                this.$nextTick(() => {
                    this.itemCliente = Object.assign({}, this.defaultCliente);
                })
            },

    },

    computed: {
        editable() {
            return this.indexEditable > -1 ? true : false;
        },
        clienteCondicionIva(){
          return this.itemCliente;
        }
    }
}

</script>
