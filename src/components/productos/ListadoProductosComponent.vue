

<template>

<div>
    <v-row no-gutters>
        <v-col cols="12">
            <p class="text-lg-h6 font-weight-bold blue-grey--text text--lighten-2">Productos Y Servicios</p>
        </v-col>
    </v-row>
    <v-card>
        <v-card-title>
            <v-col cols="12" sm="4">
                <v-row>
                    <v-text-field v-model="search" append-icon="mdi-magnify" label="Buscar Producto" single-line hide-details></v-text-field>
                </v-row>
            </v-col>
            <v-spacer></v-spacer>
        </v-card-title>
        <v-data-table v-model="seleccionados" :headers="cabeceras" item-key="producto_id" :items="productos" :search="search" show-select>
            <template v-slot:[`item.precio_compra`]="{ item }">
                <span>{{item|precioNeto}}</span>
            </template>
            <template v-slot:[`item.f_modificacion`]="{ item }">
                <span>{{item.f_modificacion|formatDate}}</span>
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
            </template>
        </v-data-table>
        <v-row id="actions-productos">
            <v-col cols="12" sm="12" md="12" align="end">
                <v-btn outlined v-if="productos.length > 0" color="#385F73" dark class="mb-2 mr-md-2" @click="exportar(`productos/negocio/${negocio.negocio_id}/exportar`,'listado_productos.xlsx')">EXPORTAR XLS
                </v-btn>
                <v-btn v-if="seleccionados.length > 0" @click="eliminarSeleccionados" outlined color="#385F73" dark class="mb-2 mr-md-2">ELIMINAR SELECCIONADOS
                </v-btn>
                <v-btn @click="$router.push('/marcas')" outlined color="#385F73" dark class="mb-2 mr-md-2">IR A MARCAS
                </v-btn>
                <v-btn @click="$router.push('/categorias')" outlined color="#385F73" dark class="mb-2 mr-md-2 ">IR A CATEGORIAS
                </v-btn>
                <modal-producto @reload="cargarProductosYCategorias" :categorias="categorias" :marcas="marcas" :editable="editable" :dialog="dialog" :producto="itemProducto" @cerrar-dialog="close" @agregar-producto="agregarProducto($event)" @editar-producto="editarProducto($event)" @agregar-categoria="agregarCategoria($event)" @agregar-marca="agregarMarca($event)">
                </modal-producto>
            </v-col>
        </v-row>
    </v-card>

</div>

</template>

<script>

import ModalProducto from '@/components/productos/ModalProductoComponent'
export default {
    components: {
        ModalProducto
    },
    data: () => ({
        dialog: false,
        cabeceras: [{
            text: 'Código',
            align: 'center',
            sortable: true,
            value: 'codigo'
        }, {
            text: 'Descripción',
            value: 'descripcion'
        }, {
            text: 'Stock Disponible',
            align: 'center',
            value: 'stock'
        }, {
            text: 'Categoria',
            value: 'categoria.descripcion',
            sortable: true
        }, {
            text: 'Marca',
            value: 'marca.descripcion',
            sortable: true
        }, {
            text: 'Precio Neto',
            value: 'precio_compra',
            sortable: true
        }, {
            text: 'Fecha Últ Modificación',
            value: 'f_modificacion',
            sortable: true
        }, {
            text: 'Acciones',
            value: 'actions',
            sortable: false
        }, ],
        productos: [],
        categorias: [],
        marcas: [],
        search: '',
        indexEditable: -1,
        seleccionados: [],
        itemProducto: {
            categoria: {
                categoria_id: null
            },
            marca: {
                marca_id: null
            }
        },
        defaultProducto: {
            categoria: {
                categoria_id: null
            },
            marca: {
                marca_id: null
            }
        },
    }),


    mounted() {
        this.headerTabla = this.headersProductos;
        this.cargarProductosYCategorias();
    },
    methods: {
        cargarProductosYCategorias() {
                axios.all([axios.get(`productos/negocio/${this.negocio.negocio_id}`),
                        axios.get(`categorias/negocio/${this.negocio.negocio_id}`),
                        axios.get(`marcas/negocio/${this.negocio.negocio_id}`)
                    ])
                    .then(axios.spread((productos, categorias, marcas) => {
                        this.productos = productos.data.data;
                        this.categorias = categorias.data.data;
                        this.marcas = marcas.data.data;
                    }))
                    .catch(error => {
                      if(this.$store.getters.token){
                        this.notificacion('Ha ocurrido al recuperar los datos','error')
                      }
                    })
            },

            modalProducto(item) {
                this.indexEditable = this.productos.indexOf(item);
                this.itemProducto = Object.assign({}, item)
                this.dialog = true
            },
            agregarProducto(item) {
                axios.post(`productos/negocio/${this.negocio.negocio_id}/nuevo`, item)
                    .then(response => {
                        this.productos.push(response.data.data);
                        this.notificacion('Producto agregado.', "success");
                        this.close();
                    })
                    .catch(error => {
                        this.notificacion('Ha ocurrido al agregar el producto','error')
                    })
            },

            editarProducto(item) {

                this.$swal({
                    title: "¿Estas seguro que deseas modificar este producto?",
                    showCancelButton: true,
                }).then((result) => {
                    if (result.value) {
                        this.dialog = false
                        axios.put(`productos/editar/${item.producto_id}`, item)
                            .then(response => {
                                Object.assign(this.productos[this.indexEditable], response.data.data)
                                this.notificacion('Producto modificado.', 'success');
                                this.close();
                            })
                            .catch(error => {
                                this.notificacion('Ha ocurrido al modificar el producto','error')
                            })
                    }
                })
            },

            eliminarProducto(item) {
                this.$swal({
                    icon: 'question',
                    title: "¿Estas seguro que deseas eliminar este producto?",
                    showCancelButton: true,
                }).then((result) => {
                    if (result.value) {
                        axios.put(`productos/eliminar/${item.producto_id}`)
                            .then(response => {
                                const index = this.productos.indexOf(item)
                                this.productos.splice(index, 1)
                                this.notificacion('Producto eliminado.', 'success')
                            })
                            .catch(error => {
                                this.notificacion('Ha ocurrido un error al eliminar el producto','error')
                            })
                    }
                })
            },
            eliminarSeleccionados() {
                this.$swal({
                    icon: 'question',
                    title: "¿Estas seguro que deseas eliminar los productos seleccionados?",
                    showCancelButton: true,
                }).then((result) => {
                    if (result.value) {
                        axios.put(`productos/eliminarProductos`, {
                                productos: JSON.stringify(this.seleccionados)
                            })
                            .then(response => {
                                this.seleccionados.forEach(element => this.productos.splice(this.productos.indexOf(element), 1))
                                this.notificacion('Productos eliminados.', 'success')
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
                    this.itemProducto = Object.assign({}, this.defaultProducto);
                })
            },

    },

    computed: {
        editable() {
            return this.indexEditable > -1 ? true : false;
        },
    }
}

</script>
<style>
.v-data-table-header-mobile__wrapper {
  display: flex;
  margin-left: -21px;
}
</style>
