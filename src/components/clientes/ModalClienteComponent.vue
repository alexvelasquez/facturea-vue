<template>
  <v-dialog v-model="dialogCliente" max-width="780px" persistent>
    <template v-slot:activator="{ on, attrs }">
      <v-btn outlined color="#385F73" dark class="mb-2 mr-md-2" v-bind="attrs" v-on="on"
        >Nuevo Cliente</v-btn
      >
    </template>
    <v-card>
      <v-tabs v-model="tab" background-color="transparent" color="#385F73" grow>
        <v-tab>{{ editable ? "MODIFICAR CLIENTE" : "NUEVO CLIENTE" }}</v-tab>
        <!-- <v-tab v-if="!editable">IMPORTAR CLIENTES</v-tab> -->
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item>
          <v-card flat>
            <v-form ref="form">
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="12" md="6">
                      <v-text-field
                        v-model="cliente.razon_social"
                        label="Denominación"
                        placeholder="Ingrese la denominación"
                        hint="campo obligatorio(*)"
                        :rules="obligatorio"
                        outlined
                        dense
                        persistent-hint
                      >
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" sm="12" md="6">
                      <v-text-field
                        v-model="cliente.email"
                        label="Email"
                        placeholder="email"
                        autocomplete="new-password"
                        outlined
                        dense
                      >
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="5">
                      <v-select
                        v-model="cliente.condicion_iva.condicion_iva_id"
                        @change="verificar()"
                        item-value="condicion_iva_id"
                        :items="condicionesIva"
                        label="Condición IVA"
                        placeholder="Seleccione una opción"
                        item-text="descripcion"
                        hint="campo obligatorio(*)"
                        :rules="obligatorio"
                        outlined
                        dense
                        persistent-hint
                      >
                        ></v-select
                      >
                    </v-col>
                    <v-col cols="12" sm="6" md="3">
                      <v-select
                        v-model="cliente.tipo_documento.tipo_documento_id"
                        item-value="tipo_documento_id"
                        :items="tiposDocumentos"
                        label="Tipo Documento"
                        placeholder=" "
                        item-text="descripcion"
                        hint="campo obligatorio(*)"
                        :rules="obligatorio"
                        outlined
                        dense
                        persistent-hint
                        :disabled="disabled"
                      >
                        ></v-select
                      >
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="cliente.documento"
                        label="Documento"
                        placeholder="0"
                        type="number"
                        outlined
                        dense
                        persistent-hint
                        :disabled="disabled"
                      >
                      </v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6" md="6">
                      <v-autocomplete
                        v-model="cliente.localidad.provincia.provincia_id"
                        item-value="provincia_id"
                        autocomplete="new-password"
                        :items="provincias"
                        :label="'Provincia'"
                        placeholder="seleccione una provincia"
                        item-text="descripcion"
                        persistent-hint
                        hint="campo obligatorio(*)"
                        :rules="obligatorio"
                        outlined
                        dense
                      >
                      </v-autocomplete>
                    </v-col>

                    <v-col cols="12" sm="6" md="6">
                      <v-autocomplete
                        v-model="cliente.localidad.localidad_id"
                        item-value="localidad_id"
                        autocomplete="new-password"
                        :items="localidades"
                        :label="'Localidad'"
                        placeholder="seleccione una localidad"
                        item-text="descripcion"
                        persistent-hint
                        hint="campo obligatorio(*)"
                        :rules="obligatorio"
                        outlined
                        dense
                      >
                      </v-autocomplete>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        v-model="cliente.direccion"
                        label="Direccion"
                        placeholder="Ingrese una dirección"
                        autocomplete="new-password"
                        outlined
                        dense
                      >
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        v-model="cliente.telefono"
                        label="Teléfono"
                        placeholder="Ingrese un teléfono"
                        autocomplete="new-password"
                        outlined
                        dense
                      >
                      </v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
            </v-form>
            <v-card-actions class="pt-md-0">
              <v-spacer></v-spacer>
              <v-btn color="#385F73" text @click="cerrarDialog">Cancelar</v-btn>
              <v-btn v-if="!editable" color="#385F73" text @click="agregarCliente"
                >AGREGAR</v-btn
              >
              <v-btn v-else color="#385F73" text @click="editarCliente">MODIFICAR</v-btn>
            </v-card-actions>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
    <v-overlay :absolute="true" :value="busqueda">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </v-dialog>
</template>

<script>
export default {
  props: {
    cliente: {
      type: Object,
      default: {
        localidad: {
          localidad_id: null,
        },
      },
    },
    provincias: {
      type: Array,
      default: [],
    },
    tiposDocumentos: {
      type: Array,
      default: [],
    },
    condicionesIva: {
      type: Array,
      default: [],
    },
    dialog: {
      type: Boolean,
    },
    editable: {
      type: Boolean,
    },
  },

  data() {
    return {
      /** NUEVO PRODUCTO */
      files: [],
      busqueda: false,
      localidades: [],
      disabled: false,
      model: null,
      allow: false,
      tab: null,
      activar: true,
      dialogCliente: this.dialog,
      obligatorio: [(v) => !!v || "Este campo es obligatorio(*)"],
    };
  },
  methods: {
    agregarCliente() {
      if (this.$refs.form.validate()) {
        this.dialogCliente = false;
        this.$emit("agregar-cliente", this.cliente);
      }
    },
    editarCliente() {
      if (this.$refs.form.validate()) {
        this.$emit("editar-cliente", this.cliente);
      }
    },
    verificar() {
      if (this.cliente.condicion_iva.condicion_iva_id) {
        this.disabled = false;
        if (this.cliente.condicion_iva.condicion_iva_id == this.consumidorFinal) {
          this.cliente.tipo_documento.tipo_documento_id = this.otroDocumento;
          this.cliente.documento = 0;
          this.disabled = true;
        }
      }
    },
    cerrarDialog() {
      this.dialogCliente = false;
      this.$emit("cerrar-dialog");
    },
  },
  watch: {
    dialog() {
      this.dialogCliente = this.dialog;
    },
    cliente() {
      if (this.$refs.form && !this.editable) {
        this.$refs.form.resetValidation();
      }
    },
    provinciaCliente() {
      if (this.provinciaCliente) {
        this.busqueda = true;
        axios
          .get(`datosGeograficos/localidades/${this.provinciaCliente}`)
          .then((response) => {
            this.localidades = response.data.data;
            this.busqueda = false;
          });
      }
    },
  },
  computed: {
    provinciaCliente() {
      return this.cliente.localidad.provincia.provincia_id;
    },
  },
};
</script>
