<template>
<v-dialog v-model="dialogRegister" max-width="600px" persistent>
<template v-slot:activator="{ on, attrs }">
<v-btn outlined color="#385F73" dark class="mb-2 mr-md-2" v-bind="attrs" v-on="on">
    CREAR CUENTA</v-btn>
</template>
<v-card>

    <v-tabs v-model="tab" background-color="transparent" color="#385F73" grow>
        <v-tab>REGISTRARME</v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
        <v-tab-item>
            <v-card flat>
                <v-form ref="form">
                    <v-card-text>
                        <v-container>
                            <v-row>
                                    <v-col cols="12" md="6"  style="margin-bottom:-25px">
                                      <v-text-field :rules="reglasValidacion.campoRequerido" v-model="registro.nombre" label="Nombre" placeholder="Ingrese su nombre" outlined dense>
                                      </v-text-field>
                                    </v-col>
                                    <v-col cols="12" md="6"  style="margin-bottom:-25px">
                                      <v-text-field :rules="reglasValidacion.campoRequerido" v-model="registro.apellido" label="Apellido" placeholder="Ingrese su apellido" outlined dense>
                                      </v-text-field>
                                    </v-col>
                                    <v-col cols="12" md="6" style="margin-bottom:-25px">
                                      <v-text-field :rules="reglasValidacion.campoRequerido" v-model="registro.user" label="Nombre de usuario" placeholder="Ingrese su nombre de usuario" outlined dense>
                                      </v-text-field>
                                    </v-col>
                                    <v-col cols="12" md="6" style="margin-bottom:-25px">
                                      <v-text-field :rules="reglasValidacion.campoRequerido" v-model="registro.email" label="Email" placeholder=" " outlined dense>
                                      </v-text-field>
                                    </v-col>
                                    <v-col cols="12" md="6" style="margin-bottom:-25px">
                                      <v-text-field  :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'" :type="show ? 'text' : 'password'" :rules="reglasValidacion.campoRequerido" v-model="registro.clave" label="Contraseña" placeholder=" " outlined dense @click:append="show = !show">
                                      </v-text-field>
                                    </v-col>
                                    <v-col cols="12" md="6" style="margin-bottom:-25px">
                                      <v-text-field :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :type="show1 ? 'text' : 'password'" :rules="reglasValidacion.claveSimilar" v-model="registro.repetirClave" label="Repetir contraseña" placeholder=" "  @click:append="show1 = !show1" outlined dense>
                                      </v-text-field>
                                    </v-col>
                            </v-row>
                        </v-container>
                    </v-card-text>
                </v-form>
                <v-card-actions class="pt-md-0">
                    <v-spacer></v-spacer>
                    <v-btn color="#385F73" @click="cerrarDialog()" text>CANCELAR</v-btn>
                    <v-btn color="#385F73" @click="registrarme()" text>REGISTRAR</v-btn>
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
        dialog: {
            type: Boolean
        },

    },

    data() {
        return {
            /** NUEVO PRODUCTO */
            show: false,
            show1: false,
            files: [],
            aliCuotas: [],
            registro:{},
            model: null,
            allow: false,
            tab: null,
            activar: true,
            dialogRegister: this.dialog,
        }
    },
    methods: {

        registrarme() {
                if (this.$refs.form.validate()) {
                    this.dialogProducto = false;
                    this.$emit('registrar', this.producto)
                }
            },

            cerrarDialog() {
               this.dialogRegister = false;
               this.$emit('cerrar-dialog');
            }
    },
    watch: {
        dialog() {
                if(this.$refs.form){
                  this.$refs.form.reset();
                }
                this.dialogRegister = this.dialog;
            },
    },
    computed:{
      reglasValidacion() {
          return {
              campoRequerido: [
                  v => !!v || 'Este campo es requerido',
              ],
              emailSimilar: [
                  v => this.registro.email == this.registro.repetirEmail|| 'Las contraseñas no coindicen'
              ],
              claveSimilar: [
                  v => !!v || 'Este campo es requerido',
                  v => this.registro.clave == this.registro.repetirClave || 'Las contraseñas no coindicen'
              ]
          }
      }
    }
}

</script>
