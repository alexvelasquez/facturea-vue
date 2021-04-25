

<template>

<v-dialog v-model="dialog" max-width="500px" persistent>
    <v-card>
        <v-tabs v-model="tab" background-color="transparent" color="#385F73" grow>
            <v-tab>Recuperar Contraseña</v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab">
            <v-tab-item>
                <v-card flat>
                    <v-form ref="form">
                        <v-card-text>
                            <v-container>
                                <v-row align="center" justify="center">
                                    <v-col cols="12">
                                        <v-alert dense outlined type="info" color="#385F73">
                                            Las credenciales serán enviadas al correo electrónico con el que se registró.
                                        </v-alert>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-col cols="12">
                                            <v-text-field label="Email" type="email" v-model="recuperar.email" color="#385F73" placeholder="Ingresar email" :rules="obligatorio" outlined dense>
                                            </v-text-field>
                                        </v-col>
                                    </v-col>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-card-text>
                    </v-form>
                    <v-card-actions class="pt-md-0">
                        <v-spacer></v-spacer>
                        <v-btn color="#385F73" text @click="cerrar">CANCELAR</v-btn>
                        <v-btn color="#385F73" text @click="recuperarClave">RECUPERAR</v-btn>
                    </v-card-actions>
                </v-card>
            </v-tab-item>
        </v-tabs-items>
    </v-card>
    <v-overlay :absolute="true" :value="busqueda">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
</v-dialog>

</template>

<script>

export default {
    props: {
        dialog: {
            type: Boolean,
            default:false
        },
    },
    data() {
        return {
            /** NUEVO PRODUCTO */
            tab: null,
            show: false,
            show1: false,
            recuperar: {
                email: null
            },
            busqueda: false,
            obligatorio: [
                v => !!v || 'Este campo es requerido'
            ],
        }
    },
    methods: {
        recuperarClave() {
                if (this.$refs.form.validate()) {
                    this.busqueda = true;
                    axios.put('usuario/recuperarClave', this.recuperar)
                        .then(response => {
                            this.busqueda = false;
                            if (response.response) {
                                this.notificacion(response.response.data.message, 'error');
                            }
                            if (response.data.code == 200) {
                                this.notificacion('Credenciales enviadas', 'success');
                                this.$emit('cerrar-dialog')
                                this.$refs.form.reset();
                            }
                        })
                }
            },
            cerrar() {
                this.$refs.form.reset();
                this.$emit('cerrar-dialog')
            }
    },
}

</script>
