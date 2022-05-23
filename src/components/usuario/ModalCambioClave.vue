

<template>

<v-dialog v-model="dialog" max-width="400px" persistent>
    <v-card>
        <v-tabs v-model="tab" background-color="transparent" color="#385F73" grow>
            <v-tab>Cambiar contraseña</v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab">
            <v-tab-item>
                <v-card flat>
                    <v-form ref="form">
                        <v-card-text>
                            <v-container>
                                <v-row align="center" justify="center">
                                    <v-col cols="12">
                                        <v-col cols="12">
                                            <v-text-field label="Contraseña Actual" type="password" v-model="clave.actual" color="#385F73" placeholder="Ingresar contraseña actual" :rules="reglasValidacion.obligatorio" outlined dense>
                                            </v-text-field>
                                        </v-col>
                                        <v-col cols="12" style="margin-top:-20px">
                                            <v-text-field v-model="clave.nueva" :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'" :type="show ? 'text' : 'password'" :rules="reglasValidacion.obligatorio" label="Nueva Contraseña" placeholder="Ingresar nueva contraseña" outlined dense @click:append="show = !show">
                                            </v-text-field>
                                        </v-col>
                                        <v-col cols="12" style="margin-top:-20px">
                                            <v-text-field v-model="claveRepetida" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :type="show1 ? 'text' : 'password'" label="Repetir nueva contraseña" placeholder="Repertir la nueva contraseña" :rules="reglasValidacion.claveSimilar" @click:append="show1 = !show1"
                                            outlined dense>
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
                        <v-btn color="#385F73" text @click="modificarClave">MODIFICAR</v-btn>
                    </v-card-actions>
                </v-card>
            </v-tab-item>
        </v-tabs-items>
    </v-card>
    <v-overlay :absolute="true" :value="busqueda">
      <v-progress-circular
        indeterminate
        size="64"
      ></v-progress-circular>
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
            clave: {
                actual: null,
                nueva: null,
            },
            busqueda: false,
            claveRepetida: null,
            obligatorio: [
                v => !!v || 'Este campo es requerido'
            ],
        }
    },
    methods: {
        modificarClave() {
            if(this.$refs.form.validate()){
              this.busqueda=true;
              axios.put('usuario/editarClave',this.clave)
              .then(response=>{
                  this.busqueda = false;
                  if(response.response){
                    this.notificacion(response.response.data.message,'error');
                  }
                  if(response.data.code == 200){
                    this.notificacion('Contraseña modificada','success');
                    this.$emit('cerrar-dialog')
                    this.$refs.form.reset();
                  }
              })
            }
        },
        cerrar(){
          this.$refs.form.reset();
          this.$emit('cerrar-dialog')
        }
    },
    computed: {
        reglasValidacion() {
            return {
                obligatorio: [
                    v => !!v || 'Este campo es requerido',
                ],
                claveSimilar: [
                    v => !!v || 'Este campo es requerido',
                    v => this.clave.nueva == this.claveRepetida || 'Las contraseñas no coindicen'
                ]
            }
        }
    }

}

</script>
