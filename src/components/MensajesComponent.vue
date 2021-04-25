<template>
  <div class="text-center">
    <v-dialog v-model="active" width="500" persistent>
      <v-card>
        <v-card-title class="justify-center button grey lighten-5">
          {{ mensaje.titulo }}
        </v-card-title>

        <v-card-text>
          <span v-html="mensaje.mensaje"></span>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions class="justify-center">
          <v-btn color="primary" text @click="irMensaje(mensaje)">
            Aceptar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import {confirmar} from '@/services/notificaciones'
export default {
  props: {
    mensaje: {
      type: Object,
      default: {},
    },
    active:{
      type: Boolean,
      default:false
    }
  },
  methods: {
    async irMensaje(mensaje) {      
      this.active = false;
      if(mensaje.notificacion_id) await confirmar(mensaje.notificacion_id)
      if(mensaje.redireccion) this.redirect(mensaje.redireccion);
    },
  },
};
</script>
