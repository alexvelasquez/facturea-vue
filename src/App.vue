<template>
  <v-app id="app" :class="loggedIn ? 'app-logued' : 'app-not-logued'">
    <loader></loader>
    <base-component> </base-component>
    <notificacion></notificacion>
    <mensajes-component
      :active="active"
      :mensaje="mensaje"
    ></mensajes-component>
  </v-app>
</template>

<script>
import BaseComponent from "@/components/BaseComponent";
import Loader from "@/components/Loader";
import Notificacion from "@/components/Notificacion";
import { getNotificaciones } from "@/services/notificaciones";
import { negocio } from "@/services/negocio";
import MensajesComponent from "@/components/MensajesComponent.vue";
export default {
  name: "App",
  components: { BaseComponent, Loader, Notificacion, MensajesComponent },
  data() {
    return {
      active: false,
      mensaje:{}
    };
  },
  watch: {
    async $route(to, from) {
      if (to.name !== "Login" && to.name !== "Logout") {
        const responseNegocio = (await negocio());
        if(responseNegocio.status === 200){
          this.negocio = responseNegocio.data.data;
        }
        const responseNotificaciones = await getNotificaciones();
        if (responseNotificaciones.status === 200 && responseNotificaciones.data.data) {
          this.mensaje = responseNotificaciones.data.data;
          this.active = true;
        } else {
          this.mensaje = {};
          this.active = false;
        }


      }
    },
  },
};
</script>
<style media="screen">
.app-logued {
  background-color: #eceff1 !important;
  border-color: #eceff1 !important;
}
.app-not-logued {
  background-color: #385f73 !important;
}
</style>
