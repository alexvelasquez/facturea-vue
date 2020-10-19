<template>
    <div>
    <v-row >
        <v-col cols="12" align="center" class="text-h5 font-weight-black white--text">
            <p >CON FACTUREA MANEJAR TU NEGOCIO, ES OTRA COSA</p>
        </v-col>
    </v-row>
  <v-card
    class="mx-auto mt-10"
    max-width="400"
    outlined
  >
  <v-row class="mt-10">
        <v-col cols="12" align="center" class="text-oveline">
            <p >Iniciar Sesion</p>
        </v-col>
        <v-col cols="12" align="center" class="text-oveline py-0 mt-10">
          <v-text-field
            v-model="username"
            class="px-5"
            label="Usuario"
            placeholder="nombre de usuario"
            dense
            outlined
          ></v-text-field>
        </v-col>
        <v-col cols="12" align="center" class="text-oveline py-0">
          <v-text-field
          type="password"
            v-model="pass"
            class="px-5"
            label="Contraseña"
            placeholder="Ingrese contraseña"
            outlined
            v-on:keyup.enter="login()"
            dense
          ></v-text-field>
        </v-col>
  </v-row>
   <v-row>
      <v-col cols="12" sm="12" md="12" align="center">
          <v-btn
          outlined
          color="#385F73"
          dark
          class="mb-2 mr-md-2"
          @click="login()"
        >Iniciar sesion</v-btn>
        <modal-registro :dialog="dialog" @cerrar-dialog="dialog=false" @click="dialog=true"></modal-registro>
        <br>
         <a><p color="#385F73" class="text-subtitle-2">¿Olvidaste tu contraseña?</p></a>

      </v-col>
   </v-row>
  </v-card>
    </div>
</template>
<script>
import ModalRegistro from './ModalRegistro'
export default {
    components:{ModalRegistro},
    data() {
      return {
        username:'',
        pass:'',
        dialog:false,
      }
    },
    methods: {
      login(){
        this.$store.dispatch("login",{
          _username:this.username,
          _password:this.pass
        })
        .then(success => {
          this.$router.push("/")
        })
      }
    },
}
</script>
