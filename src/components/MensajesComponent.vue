<template>
  <div class="text-center">
    <v-dialog
      v-model="active"
      width="500"
      persistent
    >
      <v-card>
        <v-card-title  class="justify-center button grey lighten-5">
          {{ mensaje.titulo }}
        </v-card-title>

        <v-card-text>
          <span v-html="mensaje.mensaje"></span>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions class="justify-center">
          <v-btn
            color="primary"
            text
            @click="irMensaje(mensaje.redireccion)"
          >
            Aceptar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
  export default {

    props:{
      mensaje: {
          type: Object,
          default:{},
      },
      active: {
          type: Boolean,
          default:false,
      },
    },
    methods:{
      irMensaje(link){
        this.active = false;
        this.redirect(link)
      }
    }
  }
</script>
