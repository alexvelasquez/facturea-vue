<template>

<div>
    <v-row>
        <v-col cols="12" align="center" class="text-h5 font-weight-black white--text">
            <p><img :src="logo" style="margin-bottom: -15px;"><span>CON FACTUREA, MANEJAR TU NEGOCIO ES OTRA COSA</span></p>
        </v-col>
    </v-row>
    <v-card class="mx-auto mt-10" max-width="400" outlined>
        <v-form ref="form">
            <v-row class="mt-10">
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
                <modal-registro :dialog="dialog" @cerrar-dialog="dialog=false" @click="dialog=true"></modal-registro>
                <br>
                <a>
                    <p color="#385F73" class="text-subtitle-2" @click="dialogRecuperar=true">¿Olvidaste tu contraseña?</p>
                </a>

            </v-col>
        </v-row>
        <v-row>
            <modal-recuperar-clave :dialog="dialogRecuperar" @cerrar-dialog="dialogRecuperar=false"></modal-recuperar-clave>
        </v-row>
    </v-card>
</div>

</template>

<script>
import { mapFields } from 'vuex-map-fields'
import { getTokens,getCurrentUser } from '@/services/usuario';
import logo from '@/assets/images/logo.png'
import ModalRegistro from './ModalRegistro'
import ModalRecuperarClave from '@/components/usuario/ModalRecuperarClave.vue'
export default {
    components: {
        ModalRegistro,
        ModalRecuperarClave
    },
    data() {
        return {
            logo: logo,
            auth: {},
            dialog: false,
            dialogRecuperar:false,
            obligatorio: [
                v => !!v || 'Este campo es requerido'
            ],
        }
    },
  computed: {
    ...mapFields('user',['data','token']),
  },
    methods: {
        async login() {
            if (this.$refs.form.validate()) {
                try {
                    const response = (await getTokens(this.auth));
                    if(response.status=== 200){
                        this.token = response.data.token;
                        axios.defaults.headers.Authorization = `Bearer ${this.token}`;/** set token */
                        this.data = (await getCurrentUser()).data.user;
                        this.notificacion(`BIENVENIDO ${this.userName} `, 'success') // notificacion de bienvenida
                        this.redirect('/');
                    }
                    if(response.status === 401){
                        this.notificacion('Credenciales invalidas','error');
                    }
                }
                catch(e){
                    this.notificacion('Ha ocurrido un error','error');
                }
            }
        },
    }
}

</script>
