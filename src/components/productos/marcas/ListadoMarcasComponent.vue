<template>
  <div>
    <v-row no-gutters>
      <v-col cols="12">
        <p class="text-lg-h6 font-weight-bold blue-grey--text text--lighten-2">Marcas</p>
      </v-col>
    </v-row>
    <v-card>
      <v-card-title>
        <v-col cols="6" sm="4">
          <v-row>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Buscar Marcas"
              single-line
              hide-details
            ></v-text-field>
          </v-row>
        </v-col>
        <v-spacer></v-spacer>
      </v-card-title>
      <v-data-table
        v-model="seleccionados"
        :headers="cabeceras"
        item-key="marca_id"
        :items="marcas"
        :search="search"
        show-select
      >
        <template v-slot:[`item.actions`]="{ item }">
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                medium
                color="#385F73"
                class="mr-2"
                v-bind="attrs"
                v-on="on"
                @click="modalMarca(item)"
              >
                mdi-pencil
              </v-icon>
            </template>
            <span>Editar</span>
          </v-tooltip>
          <!-- <v-tooltip top >
                    <template v-slot:activator="{ on, attrs }">
                        <v-icon medium color="#385F73" class="mr-2" v-bind="attrs" v-on="on" @click="eliminarMarca(item)">
                            mdi-close
                        </v-icon>
                    </template>
                    <span>Eliminar</span>
                </v-tooltip> -->
        </template>
      </v-data-table>
      <v-row id="actions-productos">
        <v-col cols="12" sm="12" md="12" align="end">
          <v-btn
            outlined
            v-if="seleccionados.length > 0"
            @click="eliminarSeleccionados"
            color="#385F73"
            dark
            class="mb-2 mr-md-2"
            >ELIMINAR SELECCIONADOS
          </v-btn>
          <modal-aumento :marcas="marcas"></modal-aumento>

          <v-btn
            outlined
            @click="$router.push('/productos')"
            color="#385F73"
            dark
            class="mb-2 mr-md-2"
            >IR A PRODUCTOS
          </v-btn>
          <modal-marca
            :editable="editable"
            :dialog="dialog"
            :marca="itemMarca"
            @cerrar-dialog="close"
            @agregar-marca="agregarMarca($event)"
            @editar-marca="editarMarca($event)"
          >
          </modal-marca>
          <v-btn
            outlined
            v-if="marcas.length > 0"
            color="#385F73"
            dark
            class="mb-2 mr-md-2"
            @click="
              exportar(`marcas/exportar/${negocio.negocio_id}`, 'listado_marcas.pdf')
            "
            >EXPORTAR</v-btn
          >
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
import ModalMarca from "@/components/productos/marcas/ModalMarcaComponent";
import ModalAumento from "@/components/productos/ModalAumento";
export default {
  components: {
    ModalMarca,
    ModalAumento,
  },
  data: () => ({
    dialog: false,
    cabeceras: [
      {
        text: "Código",
        align: "center",
        sortable: true,
        value: "codigo",
      },
      {
        text: "Descripción",
        value: "descripcion",
      },
      {
        text: "Acciones",
        value: "actions",
        align: "center",
        sortable: false,
      },
    ],
    marcas: [],

    search: "",
    indexEditable: -1,
    seleccionados: [],
    itemMarca: {},
    defaultMarca: {},
    options: [
      {
        text: "Productos Y Servicios",
        disabled: false,
        href: "/productos",
      },
      {
        text: "Marcas",
        disabled: true,
        href: "",
      },
    ],
  }),

  mounted() {
    this.cargarMarcas();
  },
  methods: {
    cargarMarcas() {
      axios
        .get(`marcas/negocio/${this.negocio.negocio_id}`)
        .then((response) => {
          this.marcas = response.data.data;
        })
        .catch((error) => {
          this.notificacion("Ha ocurrido al recuperar las marcas", "error");
        });
    },

    agregarMarca(item) {
      axios
        .post(`marcas/nuevo`, item)
        .then((response) => {
          this.marcas.push(response.data.data);
          this.notificacion("Marca agregada correctamente", "success");
        })
        .catch((error) => {
          this.notificacion("Ha ocurrido al agregar la marca", "error");
        });
    },

    editarMarca(item) {
      this.$swal({
        title: "¿Estas seguro que deseas modificarla?",
        showCancelButton: true,
      }).then((result) => {
        if (result.value) {
          this.dialog = false;
          axios
            .put(`marcas/editar/${item.marca_id}`, item)
            .then((response) => {
              Object.assign(this.marcas[this.indexEditable], response.data.data);
              this.notificacion("Marca modificada correctamente", "success");
              this.close();
            })
            .catch((error) => {
              this.notificacion("Ha ocurrido al modificar la marca", "error");
            });
        }
      });
    },
    eliminarMarca(item) {
      this.$swal({
        icon: "question",
        title: "¿Estas seguro que deseas eliminar esta marca?",
        showCancelButton: true,
      }).then((result) => {
        if (result.value) {
          axios
            .put(`marcas/eliminar/${item.marca_id}`)
            .then((response) => {
              const index = this.marcas.indexOf(item);
              this.marcas.splice(index, 1);
              this.notificacion("Eliminado correctamente", "success");
            })
            .catch((error) => {
              this.notificacion("Ha ocurrido un error al eliminar la marca", "error");
            });
        }
      });
    },
    eliminarSeleccionados() {
      this.$swal({
        icon: "question",
        title: "¿Estas seguro que deseas eliminar las marcas seleccionadas?",
        showCancelButton: true,
      }).then((result) => {
        if (result.value) {
          axios
            .put(`marcas/eliminarMarcas`, {
              marcas: JSON.stringify(this.seleccionados),
            })
            .then((response) => {
              this.seleccionados.forEach((element) =>
                this.marcas.splice(this.marcas.indexOf(element), 1)
              );
              this.notificacion("Eliminados correctamente", "success");
            })
            .catch((error) => {
              this.notificacion("Ha ocurrido un error", "error");
            });
        }
      });
    },
    modalMarca(item) {
      this.indexEditable = this.marcas.indexOf(item);
      this.itemMarca = Object.assign({}, item);
      this.dialog = true;
    },

    close() {
      this.dialog = false;
      this.indexEditable = -1;
      this.$nextTick(() => {
        this.itemMarca = Object.assign({}, this.defaultMarca);
      });
    },
  },

  computed: {
    editable() {
      return this.indexEditable > -1 ? true : false;
    },
  },
};
</script>
