

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
                                        <v-autocomplete v-model="producto.categoria.categoria_id" item-value="categoria_id" :items="categorias" :label="'Categoria'" placeholder="seleccione una categoria" item-text="descripcion" persistent-hint :rules="obligatorio" outlined dense>
                                        </v-autocomplete>
                                    </v-col>

                                    <v-col cols="12" sm="6" md="6">
                                        <v-autocomplete v-model="producto.marca.marca_id" item-value="marca_id" :items="marcas" :label="'Marca'" placeholder="seleccione una marca" item-text="descripcion" persistent-hint :rules="obligatorio" outlined dense>
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
                                            <v-col cols="12" sm="6" md="4" >
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
                                <v-col cols="12" sm="12" md="12" justify="end" align="center">
                                    <p class="text-button">¿ No sabes como crear el archivo ?</p>
                                </v-col>
                                <v-col cols="12" sm="12" md="12" justify="end" align="center" ondrop="dropHandler(event);">
                                    <v-btn outlined color="#385F73" class="mr-md-3" dark>Descargar modelo XSLX</v-btn>

                                    <v-btn outlined color="#385F73" dark>Descargar ejemplo</v-btn>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="#385F73" text>Cancelar</v-btn>
                        <v-btn color="#385F73" text>Agregar</v-btn>
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
            files: [],
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
            cerrarDialog() {
                !this.editable ? this.dialogProducto = false : this.$emit('cerrar-dialog');
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
            }
    }
}

</script>
