<style></style>

<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" width="600px" persistent>
      <v-card>
        <v-card-title class="justify-center">
          <span class="button">PEDIDO</span>
        </v-card-title>
        <v-card-text>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">Código</th>
                  <th class="text-left">Descripción</th>
                  <th class="text-left">Cantidad</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in pedidoProductos" :key="item.producto_preventa_id">
                  <td>{{ item.producto.codigo }}</td>
                  <td>{{ item.producto.descripcion }}</td>
                  <td>{{ item.cantidad }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn color="#385F73" text @click="$emit('descargarPDF')"> DESCARGAR </v-btn>
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
    pedidoProductos: {
      type: Array,
      default: [],
    },
  },
};
</script>
