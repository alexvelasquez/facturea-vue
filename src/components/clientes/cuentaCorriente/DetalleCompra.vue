

<template>

<v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="700">
        <v-card>
          <v-card-title class="justify-center">
              <span >DETALLE DE COMPRA</span>
          </v-card-title>
          <v-card-text>
            <v-simple-table>
                <template v-slot:default>
                    <thead>
                        <tr>
                          <th class="text-left">
                              Código
                          </th>
                            <th class="text-left">
                                Descripción
                            </th>
                            <th class="text-center">
                                Cantidad
                            </th>
                            <th class="text-center">
                                Subtotal
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in detalle" :key="item.producto_preventa_id">
                            <td>{{ item.producto.codigo }}</td>
                            <td>{{ item.producto.descripcion }}</td>
                            <td class="text-center">{{ item.cantidad }}</td>
                            <td class="text-center">{{ item.subtotal | formatPrecio}}</td>
                        </tr>
                    </tbody>
                </template>
            </v-simple-table>
          </v-card-text>
          <v-card-actions class="justify-center">

              <v-btn color="#385F73" text @click="$emit('cerrar-detalle')">
                  ACEPTAR
              </v-btn>
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
            default: false
        },
        detalle: {
            type: Array,
            default: []
        }
    },

}

</script>
