<template>
    <v-snackbar
        v-model="notification.activo"
        :color="notification.tipo"
        bottom
        right
    >
      {{ notification.texto }}

      <template v-slot:action="{ attrs }">
        <v-btn
          text
          v-bind="attrs"
          @click="cerrar"
        >
          cerrar
        </v-btn>
      </template>
    </v-snackbar>
</template>
<script>
import { mapFields } from 'vuex-map-fields'
import { mapActions } from 'vuex'
export default {
  computed: {
    ...mapFields('config',['notification']),
  },
  methods: {
    ...mapActions('config',['cerrarNotificacion']),
    cerrar(){
      this.cerrarNotificacion({})
    }
  }
}
</script>