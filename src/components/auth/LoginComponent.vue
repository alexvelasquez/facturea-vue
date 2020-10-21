<template>
<div>
    <v-row>
        <v-col cols="12" align="center" class="text-h5 font-weight-black white--text">
            <p>CON FACTUREA MANEJAR TU NEGOCIO, ES OTRA COSA</p>
        </v-col>
    </v-row>
    <v-card class="mx-auto mt-10" max-width="400" outlined>
        <v-form ref="form">
          <v-row  class="mt-10">
              <v-col cols="12" align="center" class="text-oveline">
                  <p>Iniciar Sesión</p>
              </v-col>
              <v-col cols="12" align="center" class="text-oveline py-0 mt-10">
                  <v-text-field :rules="obligatorio" v-model="auth._username" class="px-5" label="Usuario" placeholder="nombre de usuario" dense outlined></v-text-field>
              </v-col>
              <v-col cols="12" align="center" class="text-oveline py-0">
                  <v-text-field :rules="obligatorio" type="password" v-model="auth._password" class="px-5" label="Contraseña" placeholder="Ingrese contraseña" outlined v-on:keyup.enter="login()" dense></v-text-field>
              </v-col>
          </v-row>
        </v-form>
        <v-row>
            <v-col cols="12" sm="12" md="12" align="center">
                <v-btn outlined color="#385F73" dark class="mb-2 mr-md-2" @click="login()">Iniciar sesión</v-btn>
                <modal-registro :dialog="dialog" @cerrar-dialog="dialog=false" @click="dialog=true">
                </modal-registro>
                <br>
                <a>
                    <p color="#385F73" class="text-subtitle-2">¿Olvidaste tu contraseña?</p>
                </a>

            </v-col>
        </v-row>
    </v-card>
</div>
</template>

<script>

import ModalRegistro from './ModalRegistro'
export default {
    components: {
        ModalRegistro
    },
    data() {
        return {
            auth:{},
            dialog: false,
            obligatorio: [
                v => !!v || 'Este campo es requerido'
            ],
        }
    },
    methods: {
        login() {
            if(this.$refs.form.validate()){
              axios.post(`login_check`, this.auth)
                  .then(response => {
                      if(response.response){ //si me llega un 401
                        if(response.response.data.code == 401 && response.response.data.message=='Invalid credentials.'){
                           this.notificacion('Credenciales invalidas', 'error')
                        }
                      }
                      else{
                        const token = response.data.token;
                        this.$store.commit('setToken', token); //seteo el token en vuex
                        axios.get(`currentUser`) /** obtengo los datos del usuario logueado*/
                            .then(response => {
                                const user = response.data.user;
                                const negocio = this.configurarNegocio(response.data.user.negocio);
                                delete user.negocio; // elimino el objeto negocio del usuario para trabajarlo de forma independiente
                                this.$store.commit('setUser', user); //
                                this.$store.commit('setNegocio', negocio); //
                                localStorage.setItem('access_token',token) /** set datos en localStorage */
                                localStorage.setItem('user', JSON.stringify(user))
                                localStorage.setItem('negocio', JSON.stringify(negocio))
                                this.notificacion(`BIENVENIDO ${user.name.toUpperCase()} `, 'success') // notificacion de bienvenida
                                this.$router.push("/");
                            })
                            .catch(error => {
                                this.$store.commit('setToken', null);
                                this.notificacion('Error al recuperar los datos del usuario.', 'error')
                            })
                      }
                  })
                  .catch(error => {
                      this.notificacion('Ha ocurrido un error')
                  })
              }
        },
        configurarNegocio(negocio){
          negocio.razon_social = negocio.razon_social ?? null;
          negocio.email = negocio.email ?? null;
          negocio.direccion = negocio.direccion ?? null;
          negocio.cuit_cuil = negocio.cuit_cuil ?? null;
          negocio.iibb = negocio.iibb ?? null;
          negocio.logo = negocio.logo ?? null;
          negocio.punto_vta = negocio.pto_vta ?? null;
          negocio.telefono = negocio.telefono ?? null;
          negocio.inicio_actividad = negocio.inicio_actividad ?? moment(negocio.inicio_actividad).format('YYYY-MM-DD') ?? null;
          negocio.localidad = negocio.localidad ?? {provincia:{provincia_id:null},localidad_id:null};
          negocio.condicion_iva = negocio.condicion_iva ?? {condicion_iva_id:null};
          return negocio;
        }
    }

}

</script>
