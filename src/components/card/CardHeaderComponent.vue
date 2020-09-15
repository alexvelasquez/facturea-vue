<template>
    <div>
        <v-row justify="center">
        <v-col
            v-for="(c,index) in cards"
            :key = index
            cols="mx-auto"
        >
          <v-card
           
            color="#385F73"
            dark
          >
            <v-card-subtitle class="text-center">{{c.title}}</v-card-subtitle>
              <v-row align="center"
              justify="center">
              <v-col align = "center" cols="12" md="10" class="text-center">
                    <v-autocomplete v-if="c.editable"
                        v-model="categoria"
                        :item-value="c.key"
                        :items="c.values"
                        placeholder="Seleccionar.."
                        persistent-hint
                        item-text="descripcion"
                        dense
                    >
                    </v-autocomplete>
                  <!-- <a href="" style="text-decoration:none;" class="text-lg-h6 font-weight-bold blue-grey--text text--lighten-2">
                    <v-card-text  class="text-button pb-0" >Seleccionar..</v-card-text>
                  </a> -->
                <v-card-text v-else class="text-button pb-0 text-center" dense>10</v-card-text>
              </v-col>
              </v-row>

            <v-card-actions>
              <v-btn v-for="(a,index) in c.actions" :key="index" text>{{a}}</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        </v-row>
    </div>
</template>
<script>
export default {
   props: {
      cards: {
        type: Object,
        default: {},
      },
    },

    data() {
      return {
        categoria:''
      }
    },
}
</script>