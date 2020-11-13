

<template>
    <v-dialog v-model="dialog" width="600px">
          <template v-slot:activator="{ on, attrs }">
              <v-btn outlined color="#385F73" dark class="mb-2 mr-md-2" @click="loadMovimientos()" >MOVIMIENTOS</v-btn>
          </template>
        <v-card>
            <v-card-title class="justify-center">
                <span class="headline">Movimientos de {{cliente | upper}}</span>
            </v-card-title>
            <v-card-text justify="center" align="center" >
                <v-container style="max-width: 600px;" v-if="movimientos.length > 0">
                    <v-timeline dense clipped>
                        <v-timeline-item v-for="movimiento in movimientos" :key="movimiento.movimiento_id" class="mb-4" color="grey" small >
                            <v-row justify="space-between">
                                <v-col cols="7">
                                  Pago efectuado de {{movimiento.monto_pagado | formatPrecio}}
                                </v-col>
                                <v-col class="text-right" cols="5">
                                    {{movimiento.f_creacion | formatDateTime}}
                                </v-col>
                            </v-row>
                        </v-timeline-item>
                    </v-timeline>
                </v-container>
                <span class="group pa-2" v-else>
                  <v-icon large>search</v-icon>
                  El cliente no registró ningun movimiento
                </span>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="#385F73" @click="dialog = false" text>ACEPTAR</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script>
  export default {
    props:{
      cliente:String,
      clienteId:String
    },
    data: () => ({
      dialog: false,
      movimientos:[]
    }),
    methods:{
      loadMovimientos(){
        axios.get(`clientes/movimientos/${this.clienteId}`)
        .then(result=>{
          this.movimientos = result.data.data;
          this.dialog = true;
        })
      }
    }
  }
</script>
