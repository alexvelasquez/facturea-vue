<template>
  <div>
    <v-row no-gutters>
      <v-col cols="12">
        <p class="text-lg-h6 font-weight-bold blue-grey--text text--lighten-2">
          Categorias
        </p>
      </v-col>
    </v-row>
    <v-card>
      <v-card-title>
        <v-col cols="6" sm="4">
          <v-row>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Buscar Categoria"
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
        item-key="categoria_id"
        :items="categorias"
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
                @click="modalCategoria(item)"
              >
                mdi-pencil
              </v-icon>
            </template>
            <span>Editar</span>
          </v-tooltip>
          <!-- <v-tooltip top>
                    <template v-slot:activator="{ on, attrs }">
                        <v-icon medium color="#385F73" class="mr-2" v-bind="attrs" v-on="on" @click="eliminarCategoria(item)">
                            mdi-close
                        </v-icon>
                    </template>
                    <span>Eliminar</span>
                </v-tooltip> -->
        </template>
      </v-data-table>
      <v-row id="actions-productos">
        <v-col cols="12" sm="12" md="12" align="end">
          <modal-aumento :categorias="categorias"></modal-aumento>
          <v-btn
            outlined
            color="#385F73"
            @click="$router.push('/productos')"
            dark
            class="mb-2 mr-md-2"
            >IR A PRODUCTOS
          </v-btn>
          <modal-categoria
            :editable="editable"
            :dialog="dialog"
            :categoria="itemCategoria"
            @cerrar-dialog="close"
            @agregar-categoria="agregarCategoria($event)"
            @editar-categoria="editarCategoria($event)"
          >
          </modal-categoria>
          <v-btn
            outlined
            color="#385F73"
            dark
            class="mb-2 mr-md-2"
            @click="
              descargar(
                `categorias/exportar/${negocio.negocio_id}`,
                'listado_categorias.pdf'
              )
            "
            v-if="categorias.length > 0"
            >EXPORTAR
          </v-btn>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
import ModalCategoria from "@/components/productos/categorias/ModalCategoriaComponent";
import ModalAumento from "@/components/productos/ModalAumento";
import { categorias} from "@/services/categorias"
export default {
  components: {
    ModalCategoria,
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
        text: "Actions",
        value: "actions",
        align: "center",
        sortable: false,
      },
    ],
    categorias: [],

    search: "",
    indexEditable: -1,
    seleccionados: [],
    itemCategoria: {},
    defaultCategoria: {},
    options: [
      {
        text: "Productos Y Servicios",
        disabled: false,
        href: "/productos",
      },
      {
        text: "Categorias",
        disabled: true,
        href: "",
      },
    ],
  }),

  async mounted() {
    this.categorias = (await categorias()).data.data;
  },
  methods: {

    agregarCategoria(item) {
      this.categorias.push(item);
      this.notificacion("Categoria agregada correctamente", "success");   
    },

    editarCategoria(item) {
      this.dialog = false;
      Object.assign(this.categorias[this.indexEditable], item);
      this.notificacion("Categoria modificada correctamente", "success");
      this.close()
    },
  
    modalCategoria(item) {
      this.indexEditable = this.categorias.indexOf(item);
      this.itemCategoria = Object.assign({}, item);
      this.dialog = true;
    },

    close() {
      this.dialog = false;
      this.indexEditable = -1;
      this.$nextTick(() => {
        this.itemCategoria = Object.assign({}, this.defaultCategoria);
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
