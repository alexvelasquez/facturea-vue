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
              descargar(`marcas/exportar/${negocio.negocio_id}`, 'listado_marcas.pdf')
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
import { marcas,nuevaMarca,editarMarca } from "@/services/marcas"
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

  async mounted() {
    this.marcas = (await marcas()).data.data;
  },
  methods: {
    async agregarMarca(item) {
      const response = (await nuevaMarca(item));
      if(result.status === 201){
          this.marcas.push(response.data.data);
          this.notificacion("Marca agregada correctamente", "success");        
      }
      else{
        this.notificacionError();
      }
    },

    async editarMarca(item) {
      let response = await this.sweetalert(
        `warning`,
        `¿Estas seguro que deseas modificar esta marca?`
      );
      if (response.value) {
        response = await editarMarca(item.marca_id, item);
        if (response.status === 200) {
          Object.assign(this.marcas[this.indexEditable], response.data.data);
          this.notificacion("Marca modificada correctamente", "success");
          this.close();
        }
        else{
          this.notificacionError();
        }
      }
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
