<template>
<v-dialog v-model="dialog" :max-width="'500px'" persistent>
    <template v-slot:activator="{ on, attrs }">
        <v-btn outlined color="#385F73" dark @click="$refs.form.reset()" class="mb-2 mr-md-2" v-bind="attrs" v-on="on">Nueva Categoria</v-btn>
    </template>
    <v-card>

        <v-tabs v-model="tab" background-color="transparent" color="#385F73" grow>
            <v-tab @click="tabImpor=false">{{editable ? 'MODIFICAR CATEGORIA' : 'NUEVA CATEGORIA'}}</v-tab>
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
                                        </v-row>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-card-text>
                    </v-form>
                    <v-card-actions class="pt-md-0">
                        <v-spacer></v-spacer>
                        <v-btn color="#385F73" text  @click="$emit('cerrar-dialog')">Cancelar</v-btn>
                        <v-btn v-if="!editable" color="#385F73" text @click="agregarCategoria">AGREGAR</v-btn>
                        <v-btn v-else color="#385F73" text @click="editarCategoria">MODIFICAR</v-btn>
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
            model: null,
            tab: null,
            tabImpor: false,
            obligatorio: [
                v => !!v || 'Este campo es requerido'
            ],
        }
    },
    methods: {
        agregarCategoria() {
                if (this.$refs.form.validate()) {
                    this.$emit('agregar-categoria', this.itemCategoria)
                    this.dialog = false;
                }
            },
            editarCategoria() {
                if (this.$refs.form.validate()) {
                    this.dialog = false;
                    this.$emit('editar-categoria', this.itemCategoria);
                }
            },
    },
    watch: {
        categoria() {
          if (this.$refs.form && !this.editable) {
              this.$refs.form.reset()
          };
        },
    },
    computed: {
        itemCategoria() {
            return this.categoria;
        },
    },
}

</script>
