

<template>

<v-dialog v-model="dialogCategoria" :max-width="'500px'" persistent>
    <template v-slot:activator="{ on, attrs }">
        <v-btn outlined color="#385F73" dark @click="$refs.form.reset()" class="mb-2 mr-md-2" v-bind="attrs" v-on="on">Nueva Categoria</v-btn>
    </template>
    <v-card>

        <v-tabs v-model="tab" background-color="transparent" color="#385F73" grow>
            <v-tab @click="tabImpor=false">{{editable ? 'MODIFICAR CATEGORIA' : 'NUEVA CATEGORIA'}}</v-tab>
            <v-tab v-if="!editable" @click="tabImpor=true">IMPORTAR CATEGORIAS</v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
            <v-tab-item>
                <v-card flat>
                    <v-form ref="form">
                        <v-card-text>
                            <v-container>
                                <v-row>
                                    <v-col cols="12" sm="12" md="12" class="pt-md-0">
                                        <v-row>
                                            <v-col cols="12" sm="12" md="12">
                                                <v-text-field v-model="itemCategoria.descripcion" label="Nombre" color="#385F73" placeholder="nombre de la categoria" :rules="obligatorio" outlined dense>
                                                </v-text-field>
                                            </v-col>
                                            <v-col cols="12" style="margin-top: -46px;">
                                              <v-checkbox
                                              v-model="incrementar"
                                              color="secondary"
                                              label="Aumentar"
                                            ></v-checkbox>
                                            </v-col>
                                            <v-col cols="12" md="4" v-if="incrementar" style="margin-top: -30px;">
                                              <v-text-field
                                                  type="number"
                                                  label="Porcentaje %"
                                                  color="#385F73"
                                                  placeholder="0"
                                                  outlined
                                                  dense>
                                              </v-text-field>
                                            </v-col>
                                            <v-col cols="12" md="8" style="margin-top: -45px;" v-if="incrementar">
                                              <v-checkbox
                                              v-model="aplicarCuenta"
                                              color="secondary"
                                              label="Aplicar cuenta corriente"
                                            ></v-checkbox>
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
                        <v-btn v-if="!editable" color="#385F73" text @click="agregarCategoria">AGREGAR</v-btn>
                        <v-btn v-else color="#385F73" text @click="editarCategoria">MODIFICAR</v-btn>
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
                                <v-row>
                                    <v-col cols="12" sm="12" md="12" justify="end" align="center" class="py-md-0">
                                        <p class="text-button">¿ No sabes como crear el archivo ?</p>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="6" justify="center" align="center" class="pt-md-0">
                                        <v-btn outlined color="#385F73" class="mr-md-3" dark>Descargar modelo XSLX</v-btn>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="6" justify="center" align="center" class="pt-md-0">
                                        <v-btn outlined color="#385F73" dark>Descargar ejemplo</v-btn>
                                    </v-col>
                                </v-row>
                            </v-row>
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="#385F73" text @click="cerrarDialog">Cancelar</v-btn>
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
        categoria: {
            type: Object,
            default: {},
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
            marcas: [],
            files: [],
            incrementar:false,
            aplicarCuenta:false,
            model: null,
            allow: false,
            tab: null,
            activar: true,
            dialogCategoria: this.dialog,
            tabImpor: false,
            obligatorio: [
                v => !!v || 'Este campo es requerido'
            ],
        }
    },
    methods: {
        agregarCategoria() {
                if (this.$refs.form.validate()) {
                    this.dialogCategoria = false;
                    this.$emit('agregar-categoria', this.itemCategoria)
                }
            },
            editarCategoria() {
                if (this.$refs.form.validate()) {
                    this.dialogCategoria = false;
                    this.$emit('editar-categoria', this.itemCategoria);
                }
            },
            refreshDialog() {
                /** se hace esto debido a que la props dialog no puede set modificada */
                this.dialogCategoria = false;
                this.$refs.form.reset()
            },
            cerrarDialog() {
                this.refreshDialog();
                this.$emit('cerrar-dialog');
            }
    },
    watch: {
        dialog() {
            this.dialogCategoria = this.dialog;
        },
    },
    computed: {
        itemCategoria() {
            return this.categoria;
        },
    },
}

</script>
