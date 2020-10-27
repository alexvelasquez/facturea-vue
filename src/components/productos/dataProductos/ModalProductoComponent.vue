

<template>

<v-dialog v-model="dialogProducto" max-width="700px" persistent>
    <template v-slot:activator="{ on, attrs }">
        <v-btn outlined color="#385F73" dark class="mb-2 mr-md-2" v-bind="attrs" v-on="on">Nuevo Producto</v-btn>
    </template>
    <v-card>

        <v-tabs v-model="tab" background-color="transparent" color="#385F73" grow>
            <v-tab>{{editable ? 'MODIFICAR PRODUCTO' : 'NUEVO PRODUCTO'}}</v-tab>
            <v-tab v-if="!editable">IMPORTAR PRODUCTOS</v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
            <v-tab-item>
                <v-card flat>
                    <v-form ref="form">
                        <v-card-text>
                            <v-container>
                                <v-row>
                                    <v-col cols="12" sm="6" md="6">
                                        <v-autocomplete v-model="producto.categoria.categoria_id" item-value="categoria_id" :items="categorias" :label="'Categoria'" placeholder="seleccione una categoria" item-text="descripcion" :search-input.sync="itemCategoria.descripcion" persistent-hint :rules="obligatorio"
                                        no-data-text="Escribir nombre de categoria" outlined dense>
                                            <template slot="no-data">
                                                <v-list v-if="itemCategoria.descripcion" dense>
                                                    <v-list-item-group color="primary">
                                                        <v-list-item>
                                                            <v-list-item-content>
                                                                    <v-btn text color="primary" @click="agregarCategoria">
                                                                      <v-list-item-title>"{{itemCategoria.descripcion}}"
                                                                          AGREGAR A CATEGORIAS
                                                                      </v-list-item-title>
                                                                    </v-btn>
                                                            </v-list-item-content>
                                                        </v-list-item>
                                                    </v-list-item-group>
                                                </v-list>
                                            </template>
                                        </v-autocomplete>
                                    </v-col>

                                    <v-col cols="12" sm="6" md="6">
                                        <v-autocomplete v-model="producto.marca.marca_id" item-value="marca_id" :items="marcas" :label="'Marca'" placeholder="seleccione una marca" item-text="descripcion" persistent-hint :rules="obligatorio" :search-input.sync="itemMarca.descripcion" outlined dense>
                                          <template slot="no-data">
                                              <v-list v-if="itemMarca.descripcion" dense>
                                                  <v-list-item-group color="primary">
                                                      <v-list-item>
                                                          <v-list-item-content>
                                                                  <v-btn text color="primary" @click="agregarMarca">
                                                                    <v-list-item-title>"{{itemMarca.descripcion}}"
                                                                        AGREGAR A MARCAS
                                                                    </v-list-item-title>
                                                                  </v-btn>
                                                          </v-list-item-content>
                                                      </v-list-item>
                                                  </v-list-item-group>
                                              </v-list>
                                          </template>
                                        </v-autocomplete>
                                    </v-col>
                                    <v-col cols="12" sm="12" md="5" class="pt-md-0">
                                        <v-row>
                                            <v-col cols="12" sm="12" md="12">
                                                <v-textarea height="120px" v-model="producto.descripcion" label="Descripción" placeholder="descripción del producto ó servicio" :rules="obligatorio" outlined dense>
                                                </v-textarea>
                                            </v-col>
                                        </v-row>
                                    </v-col>
                                    <v-col cols="12" sm="12" md="7" class="pt-md-0">
                                        <v-row>
                                            <v-col cols="12" sm="12" md="8">
                                                <v-text-field v-model="producto.codigo" label="Código" placeholder="código del producto" :rules="obligatorio" outlined dense>
                                                </v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="producto.stock" label="Stock" placeholder="0" :rules="obligatorio" type="number" outlined dense>
                                                </v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="6" class="pt-md-0">
                                                <v-text-field v-model="producto.precio_compra" label="Precio Compra" type="number" placeholder="0,0" :rules="obligatorio" outlined dense>
                                                </v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="6" class="ml-auto pt-md-0">
                                                <v-text-field v-model="producto.aumento" label="Aumento (%)" placeholder="0%" type="number" :rules="obligatorio" outlined dense>
                                                </v-text-field>
                                            </v-col>
                                        </v-row>
                                    </v-col>

                                </v-row>
                            </v-container>
                        </v-card-text>
                    </v-form>
                    <v-card-actions class="pt-md-0">
                        <v-spacer></v-spacer>
                        <v-btn color="#385F73" text @click="cerrarDialog">Cancelar</v-btn>
                        <v-btn v-if="!editable" color="#385F73" text @click="agregarProducto">AGREGAR</v-btn>
                        <v-btn v-else color="#385F73" text @click="editarProducto">MODIFICAR</v-btn>
                    </v-card-actions>

                </v-card>
            </v-tab-item>
            <v-tab-item>
                <v-card flat>
                    <v-card-text>
                        <v-container>
                            <v-row>
                                <v-col cols="12" sm="12" md="12">
                                    <v-file-input v-model="files" label="Archivo Producto" placeholder="subir archivo" multiple prepend-icon="mdi-paperclip">
                                        <template v-slot:selection="{ text }">
                                            <v-chip small label color="#385F73">
                                                {{ text }}
                                            </v-chip>
                                        </template>
                                    </v-file-input>
                                </v-col>
                                <v-col cols="12" sm="12" md="12" align="center">
                                    <p class="overline">¿No sabes como crear el archivo?</p>
                                </v-col>
                                <v-row style="margin-top: -34px;">
                                  <v-col cols="12" md="6" align="right">
                                      <v-btn block outlined color="#385F73" class="mr-md-3" @click="exportarXlsx(`productos/exportar_modelo`,'modelo.xlsx')" dark>Descargar modelo XSLX</v-btn>

                                  </v-col>
                                  <v-col cols="12" md="6" align="left">

                                      <v-btn block outlined color="#385F73" dark @click="exportarXlsx(`productos/exportar_ejemplo`,'ejemplo.xlsx')">Descargar ejemplo</v-btn>
                                  </v-col>
                                </v-row>
                            </v-row>
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="#385F73" @click="cerrarDialog" text>Cancelar</v-btn>
                        <v-btn color="#385F73" @click="cargarArchivo" text>Agregar</v-btn>
                    </v-card-actions>
                </v-card>
            </v-tab-item>
        </v-tabs-items>
    </v-card>
</v-dialog>

</template>

<script>

export default {
    props: {
        producto: {
            type: Object,
            default: {
                categoria: {
                    categoria_id: null
                },
                marca: {
                    marca_id: null
                }
            },
        },
        categorias: {
            type: Array,
            default: [],
        },
        marcas: {
            type: Array,
            default: []
        },
        dialog: {
            type: Boolean
        },
        editable: {
            type: Boolean
        },
    },

    data() {
        return {
            /** NUEVO PRODUCTO */
            itemCategoria:{},
            itemMarca:{},
            files: null,
            aliCuotas: [],
            model: null,
            allow: false,
            tab: null,
            activar: true,
            dialogProducto: this.dialog,
            obligatorio: [
                v => !!v || 'Este campo es requerido'
            ],
        }
    },
    methods: {

            agregarProducto() {
                    if (this.$refs.form.validate()) {
                        this.dialogProducto = false;
                        this.$emit('agregar-producto', this.producto)
                    }
                },
            editarProducto() {
                if (this.$refs.form.validate()) {
                    this.$emit('editar-producto', this.producto);

                }
            },
            agregarCategoria(){
                this.notificacion('Agregando categoria','warning')
                axios.post(`categorias/negocio/${this.negocio.negocio_id}/nuevo`,this.itemCategoria)
                .then(response=>{
                  this.categorias.push(response.data.data);
                  this.notificacion('Categoria agregada correctamente','success')
                })
            },
            agregarMarca() {
              this.notificacion('Agregando marca','warning')
                axios.post(`marcas/negocio/${this.negocio.negocio_id}/nuevo`,this.itemMarca)
                    .then(response => {
                        this.marcas.push(response.data.data);
                        this.notificacion('Marca agregada correctamente', 'success')
                    })
                    .catch(error => {
                        this.notificacion('Ha ocurrido al agregar la marca','error')
                    })
            },
            cerrarDialog() {
                !this.editable ? this.dialogProducto = false : this.$emit('cerrar-dialog');
            },
            cargarArchivo() {
                let formData = new FormData();
                formData.append('file', this.files[0]);
                axios.post(`productos/importar_excel`,
                        formData, {
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            }
                        }
                    ).then(response => {
                        this.notificacion(response.data.data, 'success')
                    })
                    .catch(error => {
                        this.notificacion('Ha ocurrido un error al cargar el archivo', 'error');
                    })
            },
            exportarXlsx(link,name){
              this.notificacion('Descargando..','warning');
              this.exportar(link,name);
              this.notificacion('Decargado','success');
            }
    },
    watch: {
        dialog() {
                this.dialogProducto = this.dialog;
            },
            producto() {
                if (this.$refs.form && !this.editable) {
                    this.$refs.form.reset()
                };
            },
    }
}

</script>
