<template>
  <v-dialog v-model="dialog" max-width="500px" max-height="100px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        outlined
        color="#385F73"
        dark
        class="mb-2 mr-md-2"
        v-bind="attrs"
        v-on="on"
        @click="loadMovimientos()"
        >VER MAS</v-btn
      >
    </template>
        <v-card v-if="movimientos.length" class="overflow-y-auto" max-height="400">
          <v-card-title dark class="overline justify-center">
            <span>Movimientos</span>
          </v-card-title>

          <v-card-text>
            <v-timeline dense clipped>
              <v-timeline-item  v-for="m in movimientos" :key="m.movimiento_id" class="mb-4" color="grey" small>
                <v-row justify="space-between" >
                  <v-col class="text-left" cols="6"
                    ><span>Pago realizado</span><br><span> {{m.monto | formatPrecio}}</span></v-col
                  >
                  <v-col class="text-center" cols="6"><span>{{m.f_creacion | formatDateTime}}</span></v-col>
                </v-row>
              </v-timeline-item>
            </v-timeline>
          </v-card-text>
          <v-card-actions class="pt-md-0">
              <v-spacer></v-spacer>
              <v-btn color="#385F73" text @click="cerrar()">Cancelar</v-btn>
          </v-card-actions>
        </v-card>
  </v-dialog>
</template>

<script>
import { movimientos } from "@/services/movimiento";
export default {
  data() {
    return {
      dialog: false,
      movimientos: []
    };
  },
  props:['cliente'],
  methods: {
    async loadMovimientos(){
      this.movimientos = (await movimientos(this.cliente,null)).data.data
      this.dialog = true;
    },
    cerrar(){
      this.movimientos=[];
      this.dialog = false
    }
  },

};
</script>
