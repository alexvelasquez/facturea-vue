

<template>

<v-dialog v-model="dialog" :max-width="'500px'" persistent>
    <template v-slot:activator="{ on, attrs }">
        <v-btn outlined color="#385F73" dark class="mb-2 mr-md-2" v-bind="attrs" v-on="on">Nueva Marca</v-btn>
    </template>
    <v-card>

        <v-tabs v-model="tab" background-color="transparent" color="#385F73" grow>
            <v-tab @click="tabImpor=false">{{editable ? 'MODIFICAR MARCA' : 'NUEVA MARCA'}}</v-tab>
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
                                                <v-text-field v-model="itemMarca.descripcion" label="Nombre" color="#385F73" placeholder="nombre de la marca" :rules="obligatorio" outlined dense>
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
                        <v-btn color="#385F73" text @click="$emit('cerrar-dialog')">Cancelar</v-btn>
                        <v-btn v-if="!editable" color="#385F73" text @click="agregarMarca">AGREGAR</v-btn>
                        <v-btn v-else color="#385F73" text @click="editarMarca">MODIFICAR</v-btn>
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
        marca: {
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
            checkbox: false,
            files: [],
            model: null,
            allow: false,
            tab: null,
            activar: true,
            tabImpor: false,
            obligatorio: [
                v => !!v || 'Este campo es requerido'
            ],
        }
    },
    methods: {
        agregarMarca() {
                if (this.$refs.form.validate()) {
                    this.$emit('agregar-marca', this.itemMarca)
                    this.dialog = false;
                }
            },
            editarMarca() {
                if (this.$refs.form.validate()) {
                    this.$emit('editar-marca', this.itemMarca);
                    this.dialog = false;
                }
            },
    },
    watch: {
        marca() {
            if (this.$refs.form && !this.editable) {
                this.$refs.form.reset()
            };
        },
    },
    computed: {
        itemMarca() {
            return this.marca;
        },
    },
}

</script>
