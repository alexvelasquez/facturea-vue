<template>
    <div>
        <v-stepper-items>
          <v-stepper-content
            :step="stepContent"
          >
            <v-card
              class="mb-12"
              color="grey lighten-1"
              height="200px"
            ></v-card>

            <v-btn
              color="primary" @click="siguiente()">
              Continuar
            </v-btn>

            <v-btn text>Cancelar</v-btn>
          </v-stepper-content>
        </v-stepper-items>
    </div>
</template>
<script>
export default {
   props: {
      stepContent: {
        type: Number
      },

    },
    methods: {
        siguiente(){
            this.stepContent = this.stepContent + 1;
            this.$emit('siguiente',this.stepContent)
        }
    },
}
</script>