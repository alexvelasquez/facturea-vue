<template>
    <div>
        <v-row justify="center">
        <v-col
            cols="mx-auto"
        >
          <v-card
            color="#385F73"
            dark
          >
            <v-card-subtitle class="text-center">Categorias</v-card-subtitle>
              <v-row align="center"
              justify="center">
              <v-col align = "center" cols="12" md="10" class="text-center">

              </v-col>
              <v-col cols="12" md="12" align="center">
                    <v-btn text>AUMENTAR</v-btn>
              </v-col>
              </v-row>
          </v-card>
        </v-col>
        <v-col
            cols="mx-auto"
        >
          <v-card
           
            color="#385F73"
            dark
          >
            <v-card-subtitle class="text-center">Marcas</v-card-subtitle>
              <v-row align="center"
              justify="center">
              <v-col align = "center" cols="12" md="10" class="text-center">
              </v-col>
              <v-col cols="12" md="12" align="center">
                    <aumento-marca :marcas="marcas"></aumento-marca>
                    <nueva-marca :categorias="categorias"></nueva-marca>
                    <listado-marca :categorias="categorias" :marcas="marcas"></listado-marca>
              </v-col>
              </v-row>
          </v-card>
        </v-col>
        <v-col
            cols="mx-auto"
        >
          <v-card
           
            color="#385F73"
            dark
          >
            <v-card-subtitle class="text-center">Limite de stock</v-card-subtitle>
              <v-row align="center"
              justify="center">
              <v-col align = "center" cols="12" md="10" class="text-center">
              <!-- <v-card-text class="text-button pb-0 text-center" dense>10</v-card-text> -->
              </v-col>
              <v-col cols="12" md="12" align="center">
                    <v-btn text>VER PRODUCTOS</v-btn>
              </v-col>
              </v-row>
          </v-card>
        </v-col>
        </v-row>
    </div>
</template>
<script>
import NuevaMarca from '@/components/marca/NuevaMarcaComponent'
import AumentoMarca from '@/components/marca/AumentoMarcaComponent'
import ListadoMarca from '@/components/marca/ListadoMarcaComponent'
export default {
   components:{NuevaMarca,AumentoMarca,ListadoMarca},
   props: {
      categorias: {
        type: Array,
        default: [],
      },
    },
  data() {
    return {
      marcas:[]
    }
  },
  mounted() {
    axios.get(`marcas/negocio/${this.$store.getters.negocioUser}`)
    .then(response=>{
      this.marcas = response.data.data;
    })
  },


}
</script>