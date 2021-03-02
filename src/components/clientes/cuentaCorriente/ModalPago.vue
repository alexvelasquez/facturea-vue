<template>
  <v-dialog v-model="dialog" max-width="500px" max-height="100px" persistent>
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        outlined
        color="#385F73"
        dark
        class="mb-2 mr-md-2"
        v-bind="attrs"
        v-on="on"
        @click="dialog = true"
        >ABONAR</v-btn
      >
    </template>
    <v-card>
      <v-tabs v-model="tab" background-color="transparent" color="#385F73" grow>
        <v-tab>ABONAR</v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item>
          <v-card flat>
            <v-form ref="form">
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="12" md="12">
                      <v-text-field
                        label="Monto a abonar"
                        :rules="requerido"
                        v-model="movimiento.monto"
                        placeholder="0"
                        type="number"
                        hint="Este campo es obligatorio"
                        persistent-hint
                        outlined
                        dense
                      >
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" sm="12" md="12">
                      <v-textarea
                        height="120px"
                        label="Observación"
                        v-model="movimiento.observacion"
                        placeholder="..."
                        outlined
                        dense
                      >
                      </v-textarea>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
            </v-form>
            <v-card-actions class="pt-md-0">
              <v-spacer></v-spacer>
              <v-btn color="#385F73" text @click="dialog = false">Cancelar</v-btn>
              <v-btn color="#385F73" text @click="abonar">Abonar</v-btn>
            </v-card-actions>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      tab: null,
      dialog: false,
      movimiento: {
        monto: null,
        observacion: null,
      },
      requerido: [(v) => !!v || "Este campo es requerido"],
    };
  },
  methods: {
    abonar() {
      if (this.$refs.form.validate()) {
        this.$emit("abonar", this.movimiento);
        this.dialog = false;
      }
    },
  },
};
</script>
