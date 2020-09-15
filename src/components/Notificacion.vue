<template>
    <v-snackbar
        v-model="notificacion.activo"
        :color="notificacion.tipo"
        bottom
        right
    >
      {{ notificacion.texto }}

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
  export default {
    methods: {
        cerrar(){
            this.$store.dispatch('notificacion',{
                activo:false,
                texto:'',
                tipo:''
            })
        }
    },
    computed: {
        notificacion:{
            // getter
            get: function () {
                return this.$store.getters.notificacion
            },
            // setter
            set: function (valor) {
                this.$store.dispatch('notificacion',valor)
            }
            
        }
    }
  }
</script>