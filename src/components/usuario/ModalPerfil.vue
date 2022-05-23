

<template>

<v-dialog v-model="dialog" :max-width="'500px'" persistent>
    <v-card>
        <v-tabs v-model="tab" background-color="transparent" color="#385F73" grow>
            <v-tab>MI PERFIL</v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab">
            <v-tab-item>
                <v-card flat>
                    <v-form ref="form">
                        <v-card-text>
                            <v-container>
                                <v-row align="center" justify="center">
                                    <v-col cols="4" md="4">
                                      <v-img
                                        max-height="150"
                                        max-width="150"
                                        src="../../assets/images/perfil.png"
                                      ></v-img>
                                      <img  alt="">
                                    </v-col>
                                    <v-col cols="12" md="8">
                                      <v-col cols="12" md="12">
                                          <v-text-field disabled label="Nombre de usuario" v-model="usuario.username" color="#385F73" placeholder="nombre de la categoria" :rules="obligatorio" outlined dense>
                                          </v-text-field>
                                      </v-col>
                                      <v-col cols="12" md="12" style="margin-top: -30px;">
                                          <v-text-field label="Nombre" v-model="usuario.name" color="#385F73" placeholder="nombre de la categoria" :rules="obligatorio" outlined dense>
                                          </v-text-field>
                                      </v-col>
                                      <v-col cols="12" md="12" style="margin-top: -30px;">
                                          <v-text-field label="Apellido" v-model="usuario.lastname" color="#385F73" placeholder="nombre de la categoria" :rules="obligatorio" outlined dense>
                                          </v-text-field>
                                      </v-col>
                                      <v-col cols="12" md="12" style="margin-top: -30px;">
                                          <v-text-field label="Email" v-model="usuario.email" color="#385F73" placeholder="nombre de la categoria" :rules="obligatorio" outlined dense>
                                          </v-text-field>
                                      </v-col>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-card-text>
                    </v-form>
                    <v-card-actions class="pt-md-0">
                        <v-spacer></v-spacer>
                        <v-btn color="#385F73" text @click="cerrar">CANCELAR</v-btn>
                        <v-btn color="#385F73" text @click="modificarUsuario">MODIFICAR</v-btn>
                    </v-card-actions>
                </v-card>
            </v-tab-item>
        </v-tabs-items>
    </v-card>
</v-dialog>

</template>

<script>
import { mapFields } from 'vuex-map-fields'
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
            usuario:{},
            obligatorio: [
                v => !!v || 'Este campo es requerido'
            ],
        }
    },

    computed:{
        ...mapFields('user',['data']),
    },
    methods:{

        getUser(){
            return axios.get(`currentUser`);
        },
        async modificarUsuario(){
            if(this.$refs.form.validate()){
                this.$emit('cerrar-dialog')
                try{
                    this.data = (await this.getEditarUsuario()).data.data;
                    this.notificacion( 'Usuario modificado','success');
                }
                catch(e){
                    this.notificacion('Ha ocurrido un error, intente nuevamente','error');
                }
                        
            }
        },
        getEditarUsuario(){
            return axios.put('usuario/editar',this.usuario);
        },
        cerrar(){
            this.$refs.form.resetValidation();
            this.$emit('cerrar-dialog')
        }
    },
    watch:{
        async dialog(){
            if(this.dialog) this.usuario = (await this.getUser()).data.user;
        }
    },

}

</script>
