<template>
  <v-dialog v-model="dialog" max-width="700px" persistent>
    <v-card>
      <v-tabs v-model="tab" background-color="transparent" color="#385F73" grow>
        <v-tab>MODIFICAR PRODUCTO</v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab">
        <v-tab-item>
          <v-card flat>
            <v-form ref="form">
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" md="3">
                      <v-text-field
                        v-model="nuevoProducto.cantidad"
                        :rules="reglas.cantidad"
                        label="Cantidad"
                        outlined
                        min="0.1"
                        type="number"
                        dense
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" md="9">
                      <v-autocomplete
                        v-model="nuevoProducto.producto"
                        :items="productos"
                        return-object
                        item-text="descripcion"
                        label="Descripción"
                        :hint="hint"
                        placeholder="Buscar producto"
                        outlined
                        persistent-hint
                        dense
                        color="#385F73"
                      >
                        <template v-slot:item="data">
                          <v-list-item-content>
                            <v-list-item-title
                              v-html="data.item.descripcion"
                            ></v-list-item-title>
                            <v-list-item-subtitle
                              v-html="
                                `Código: ${data.item.codigo} | Disponible: ${data.item.stock}`
                              "
                            ></v-list-item-subtitle>
                          </v-list-item-content>
                        </template>
                      </v-autocomplete>
                    </v-col>
                    <v-col cols="12" md="3">
                      <v-text-field
                        v-model="nuevoProducto.bonificacion"
                        color="#385F73"
                        label="Bon.(%)"
                        outlined
                        placeholder="0"
                        type="number"
                        dense
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="3" v-if="esResponsableInscripto">
                      <v-autocomplete
                        v-model="nuevoProducto.tipo_alicuota"
                        :items="tiposAliCuotas"           
                        return-object
                        item-text="descripcion"
                        label="IVA(%)"
                        placeholder="Seleccionar"
                        outlined
                        persistent-hint
                        dense
                        color="#385F73"
                      >
                      </v-autocomplete>
                    </v-col>
                    <v-col cols="12" md="3">
                      <v-text-field
                        v-model="nuevoProducto.subtotal"
                        color="#385F73"
                        label="Subtotal"
                        outlined
                        placeholder="0.0"
                        type="number"
                        dense
                        disabled
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
            </v-form>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="#385F73" text @click="cerrarDialog">Cancelar</v-btn>
              <v-btn color="#385F73" text @click="editarProducto"
                >MODIFICAR</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
    nuevoProducto: {
      type: Object,
      default: {},
    },
    productos: Array,
    esResponsableInscripto: Boolean,
    tiposAliCuotas: { type: Array, default: [] },
    reglas: {
      type: Object,
      default: {},
    },
    hint: {
      type: String,
      default: "",
    },
  },

  data() {
    return {
      /** NUEVO PRODUCTO */
      model: null,
      allow: false,
      tab: null,
      activar: true,
      obligatorio: [(v) => !!v || "Este campo es requerido"],
    };
  },
  methods: {
    editarProducto() {
      if (this.$refs.form.validate()) {
        this.$emit("editar-producto", this.nuevoProducto);
      }
    },
    cerrarDialog() {
      this.$emit("cerrar-dialog");
    },
  },
  watch: {
    dialog() {
      if (this.$form) {
        this.$form.resetValidation();
      }
    },
  },
};
</script>
