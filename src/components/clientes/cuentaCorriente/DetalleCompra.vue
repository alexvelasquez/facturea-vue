<template>
  <v-row justify="center" v-if="itemsProductos">
    <v-dialog v-model="dialog" width="800px" persistent>
      <v-card>
        <v-card-title class="justify-space-between">
          <span class="button">COMPRA</span>
          <span class="button">TOTAL: <span class="text-body-1">{{total() | formatPrecio }}</span></span>
        </v-card-title>
        <v-card-text>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">Código</th>
                  <th class="text-left">Descripción</th>
                  <th class="text-left">Cantidad</th>
                  <th class="text-left">Precio</th>
                  <th class="text-left">Descuento</th>
                  <th class="text-left">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in itemsProductos" :key="item.producto_preventa_id">
                  <td>{{ item.producto.codigo }}</td>
                  <td>{{ item.producto.descripcion }}</td>
                  <td>{{ item.cantidad | formatNumber }}</td>
                  <td>{{ item.precio_unitario | formatPrecio }}</td>
                  <td>{{ item.bonificacion }}</td>
                  <td>{{ item.subtotal | formatPrecio}}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn color="#385F73" text @click="$emit('descargarPDF', itemsProductos[0].venta)"> DESCARGAR </v-btn>
          <v-btn color="#385F73" text @click="$emit('closeDetalle')"> CERRAR </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
    itemsProductos: {
      type: Array,
      default: [],
    },
  },
  data(){
    return {
      venta:null
    }
  },
  methods:{
    total(){
      var total = 0;
       this.itemsProductos.map(item => {total = total + item.subtotal})
       return total;
    }
  }
};
</script>
