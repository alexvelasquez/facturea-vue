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
                <span >{{c.value}}</span>
              </v-col>
              <v-col cols="12" md="12" align="center">
                    <v-btn text>VER PACIENTES</v-btn>
              </v-col>
              </v-row>
          </v-card>
        </v-col>
        </v-row>
    </div>
</template>
<script>
export default {
   props: {
      cards: {
        type: Array,
        default: {},
      },
    },

}
</script>
