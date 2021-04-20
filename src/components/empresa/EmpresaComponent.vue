provincia<template>
  <div>
    <v-row no-gutters>
      <p class="text-lg-h6 font-weight-bold blue-grey--text text--lighten-2">
        Configuración
      </p>
    </v-row>
    <v-card>
      <v-container>
        <p
          class="text-subtitle-1 font-weight-bold blue-grey--text text--lighten-2"
        >
          Datos Negocio
        </p>
        <v-form ref="form">
          <v-row>
            <v-col cols="12" md="8">
              <v-row style="margin-bottom:-30px">
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="negocio.razon_social"
                    :rules="reglasValidacion.campoRequerido"
                    label="Nombre(*)"
                    outlined
                    placeholder="Ingrese un nombre"
                    dense
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="negocio.email"
                    :rules="reglasValidacion.campoRequerido"
                    label="Email(*)"
                    outlined
                    placeholder="Ingrese un email"
                    dense
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row style="margin-bottom:-30px">
                <v-col cols="12" md="6">
                  <v-autocomplete
                    v-model="negocio.localidad.provincia.provincia_id"
                    :items="provincias"
                    :rules="reglasValidacion.campoRequerido"
                    label="Provincia(*)"
                    item-value="provincia_id"
                    item-text="descripcion"
                    placeholder="Seleccione una opción"
                    autocomplete="new-password"
                    outlined
                    persistent-hint
                    dense
                    color="#385F73"
                  >
                  </v-autocomplete>
                </v-col>
                <v-col cols="12" md="6">
                  <v-autocomplete
                    v-model="negocio.localidad.localidad_id"
                    :items="localidades"
                    :rules="reglasValidacion.campoRequerido"
                    label="Localidad(*)"
                    item-value="localidad_id"
                    autocomplete="new-password"
                    item-text="descripcion"
                    placeholder="Seleccione una opción"
                    outlined
                    persistent-hint
                    dense
                    color="#385F73"
                    :disabled="negocio.localidad.provincia.provincia_id == null"
                  >
                  </v-autocomplete>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="negocio.direccion"
                    :rules="reglasValidacion.campoRequerido"
                    label="Dirección fiscal(*)"
                    outlined
                    placeholder="Ingrese una dirección"
                    dense
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="3">
                  <v-text-field
                    v-model="negocio.telefono"
                    :rules="reglasValidacion.campoRequerido"
                    label="Teléfono(*)"
                    outlined
                    placeholder="Ingrese un teléfono"
                    dense
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="3">
                  <v-text-field
                    v-model="negocio.cuit_cuil"
                    :rules="reglasValidacion.campoRequerido"
                    label="CUIT/CUIL(*)"
                    outlined
                    placeholder="Ingrese CUIT/CUIL"
                    dense
                  ></v-text-field>
                </v-col>
              </v-row>
              <p
                v-if="negocio.factura_electronica === 'S'"
                class="text-subtitle-1 font-weight-bold blue-grey--text text--lighten-2"
              >
                Datos Facturación
              </p>
              <v-row
                v-if="negocio.factura_electronica === 'S'"
                style="margin-bottom:-30px"
              >
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="negocio.nombre_fantasia"
                    :rules="reglasValidacion.campoRequerido"
                    label="Nombre de fantasia(*)"
                    outlined
                    placeholder="Ingrese un nombre"
                    dense
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-select
                    v-model="negocio.condicion_iva.condicion_iva_id"
                    :items="condicionesIva"
                    item-value="condicion_iva_id"
                    item-text="descripcion"
                    :rules="reglasValidacion.campoRequerido"
                    label="Condición ante al IVA(*)"
                    placeholder="Seleccione una opción"
                    outlined
                    persistent-hint
                    dense
                    color="#385F73"
                  ></v-select>
                </v-col>
              </v-row>
              <v-row
                v-if="negocio.factura_electronica === 'S'"
                style="margin-bottom:-30px"
              >
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="negocio.iibb"
                    :rules="reglasValidacion.campoRequerido"
                    label="IIBB(*)"
                    outlined
                    placeholder="0"
                    dense
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                  <v-menu
                    v-model="menu"
                    :close-on-content-click="false"
                    transition="scale-transition"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="negocio.inicio_actividad"
                        :rules="reglasValidacion.campoRequerido"
                        label="Inic. Actividades(*)"
                        placeholder="YYYY-MM-DD"
                        persistent-hint
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                        dense
                        outlined
                        clearable
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="negocio.inicio_actividad"
                      no-title
                      @input="menu = false"
                    ></v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="negocio.punto_vta"
                    :rules="reglasValidacion.campoRequerido"
                    label="Punto de Venta(*)"
                    outlined
                    placeholder="0"
                    type="number"
                    dense
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12" md="4" align="center">
              <v-col cols="12" md="12" align="center">
                <v-file-input
                  v-if="!editable"
                  @change="onFileChange"
                  accept="image/png, image/jpeg"
                  placeholder="Click aquí para agregar logo"
                  prepend-icon="mdi-camera"
                  label="Logo"
                  :error-messages="errorImagen"
                  outlined
                  persistent-hint
                  hint="Tamaño máximo recomendable 120x60px"
                  dense
                ></v-file-input>
                <div v-else>
                  <div class="subtitle-1" align="left">Logo Empresa</div>
                  <v-alert outlined color="grey">
                    <div>
                      <v-hover v-slot:default="{ hover }">
                        <v-card
                          :max-width="imagen.width"
                          :width="imagen.width"
                          :elevation="hover ? 12 : 2"
                          class="card-img"
                          :class="{ 'on-hover': hover }"
                        >
                          <v-img :src="logo">
                            <div align="end">
                              <v-btn
                                @click="eliminarLogo"
                                circle
                                :color="hover ? 'black' : 'transparent'"
                                title="eliminar"
                                icon
                              >
                                <v-icon
                                  circle
                                  medium
                                  :color="hover ? 'black' : 'transparent'"
                                >
                                  close
                                </v-icon>
                              </v-btn>
                            </div>
                          </v-img>
                        </v-card>
                      </v-hover>
                    </div>
                  </v-alert>
                </div>
              </v-col>
            </v-col>
            <v-col cols="12">
              <span class="caption">(*) campos obligatorios</span>
            </v-col>
          </v-row>
        </v-form>
        <v-row>
          <v-col cols="12" sm="12" md="12" align="end">
            <v-btn
              outlined
              color="#385F73"
              dark
              class="mb-2 mr-md-2"
              @click="modificar"
              >GUARDAR CAMBIOS</v-btn
            >
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import { negocio, editarNegocio } from "@/services/negocio";
import { getCondicionesIva } from "@/services/afip";
import { getProvincias,getLocalidades } from "@/services/datosGeograficos";
export default {
  data() {
    return {
      valid: false,
      empresa: null,
      url: null,
      imagen: {},
      provincias: [],
      condicionesIva: [],
      menu: false,
      editable: false,
      url: "",
      negocio: { localidad: { provincia: {} }, condicion_iva: {} },
      errorImagen: null,
      localidades: [],
      valor: "valorr",
      date: moment().format("YYYY-MM-DD"),
    };
  },
  async mounted() {
    await this.cargarDatosLogo();
    this.negocio = (await negocio()).data.data;
    this.provincias = (await getProvincias()).data.data;
    this.condicionesIva = (await getCondicionesIva()).data.data;
  },
  methods: {
    cargarDatosLogo() {
      if (this.logo) {
        this.imagen = new Image();
        this.imagen.src = this.logo;
        this.imagen.url = this.logo;
        this.editable = true;
      }
    },
    onFileChange(e) {
      if (e) {
        this.logo = e;
        var reader = new FileReader();
        reader.readAsDataURL(e);
        reader.onload = (e) => {
          let img = new Image();
          img.onload = () => {
            if (img.width > 120 && img.height > 60) {
              this.errorImagen = "La imagen supera el tamaño recomendado";
            } else {
              this.errorImagen = null;
              this.imagen.width = img.width;
              this.imagen.height = img.height;
              this.imagen.url = e.target.result;
              this.editable = true;
            }
          };
          img.src = e.target.result;
          this.logo = img.src;
        };
      } else {
        this.errorImagen = null;
        this.logo = null;
        this.editable = false;
      }
    },

    async modificar() {
      if (this.$refs.form.validate()) {
        let response = await editarNegocio(this.negocio);
        if (response.status === 200) {
          this.notificacion("Modificado correctamente", "success");
          this.redirect("/home");
        } else {
          this.notificacionError();
        }
      }
    },
    eliminarLogo() {
      this.editable = false;
      this.logo = "";
    },
  },
  watch: {
    async provincia() {
      if (this.provincia.provincia_id) {
        this.localidades = (
          await getLocalidades(this.provincia.provincia_id)
        ).data.data;
      }
    },
  },
  computed: {
    reglasValidacion() {
      return {
        campoRequerido: [(v) => !!v || "Este campo es requerido"],
        emailRules: [
          (v) => !!v || "Este campo es requerido",
          (v) => /.+@.+\..+/.test(v) || "Email no valido",
        ],
        telefonoRules: [(v) => /^[0-9]{1,20}$/.test(v) || "Teléfono invalido"],
      };
    },
    provincia() {
      return this.negocio.localidad.provincia ?? null;
    },
  },
};
</script>
<style>
.show-btns {
  color: rgba(255, 255, 255, 1) !important;
}

.logo-title {
  margin-top: -5px;
  margin-left: -17px;
}

.card-img:hover {
  opacity: 0.6;
}

.v-file-input__text.v-file-input__text--placeholder {
  height: 150px;
}
</style>
