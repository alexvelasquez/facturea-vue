<template>
  <div>
    <v-row no-gutters>
      <v-col cols="12">
        <p class="text-lg-h6 font-weight-bold blue-grey--text text--lighten-2">
          Productos Y Servicios
        </p>
      </v-col>
    </v-row>
    <v-card>
      <v-card-title>
        <v-col cols="12" sm="4">
          <v-row>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Buscar Producto"
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
        item-key="producto_id"
        :items="productos"
        :search="search"
        show-select

      >
        <template v-slot:[`item.descripcion`]="{ item }">
          <span>{{ item.descripcion | upper }}</span>
        </template>
        <template v-slot:[`item.precio_compra`]="{ item }">
          <span>{{ item | precioNeto }}</span>
        </template>
        <template v-slot:[`item.f_modificacion`]="{ item }">
          <span>{{ item.f_modificacion | formatDate }}</span>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                medium
                color="#385F73"
                class="mr-2"
                v-bind="attrs"
                v-on="on"
                @click="modalProducto(item)"
              >
                mdi-pencil
              </v-icon>
            </template>
            <span>Editar</span>
          </v-tooltip>
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                medium
                color="#385F73"
                class="mr-2"
                v-bind="attrs"
                v-on="on"
                @click="eliminarProducto(item)"
              >
                mdi-close
              </v-icon>
            </template>
            <span>Eliminar</span>
          </v-tooltip>
        </template>
      </v-data-table>
      <v-row id="actions-productos">
        <v-col cols="12" sm="12" md="12" align="end">
          <v-btn
            outlined
            v-if="productos.length > 0"
            color="#385F73"
            dark
            class="mb-2 mr-md-2"
            @click="
              descargar(`productos/negocio/exportar`, 'listado_productos.xlsx')
            "
            >EXPORTAR XLS
          </v-btn>
          <v-btn
            v-if="seleccionados.length > 0"
            @click="eliminarSeleccionados"
            outlined
            color="#385F73"
            dark
            class="mb-2 mr-md-2"
            >ELIMINAR SELECCIONADOS
          </v-btn>
          <v-btn
            @click="$router.push('/marcas')"
            outlined
            color="#385F73"
            dark
            class="mb-2 mr-md-2"
            >IR A MARCAS
          </v-btn>
          <v-btn
            @click="$router.push('/categorias')"
            outlined
            color="#385F73"
            dark
            class="mb-2 mr-md-2"
            >IR A CATEGORIAS
          </v-btn>
          <modal-producto
            :categorias="categorias"
            :marcas="marcas"
            :editable="editable"
            :dialog="dialog"
            :producto="itemProducto"
            @reload="loadProductos()"
            @cerrar-dialog="close"
            @agregar-producto="agregarProducto($event)"
            @editar-producto="editarProducto($event)"
            @agregar-categoria="agregarCategoria($event)"
            @agregar-marca="agregarMarca($event)"
          >
          </modal-producto>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
import ModalProducto from "@/components/productos/ModalProductoComponent";
import {productos,eliminarProducto,eliminarProductos} from "@/services/producto"
import {marcas} from "@/services/marcas"
import {categorias } from "@/services/categorias"
export default {
  components: {
    ModalProducto,
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
        text: "Stock Disponible",
        align: "center",
        value: "stock",
      },
      {
        text: "Categoria",
        value: "categoria.descripcion",
        sortable: true,
      },
      {
        text: "Marca",
        value: "marca.descripcion",
        sortable: true,
      },
      {
        text: "Precio Venta",
        value: "precio_compra",
        sortable: true,
      },
      {
        text: "Fecha Últ Modificación",
        value: "f_modificacion",
        align: "center",
        sortable: true,
      },
      {
        text: "Acciones",
        value: "actions",
        sortable: false,
      },
    ],
    productos: [],
    categorias: [],
    marcas: [],
    search: "",
    indexEditable: -1,
    seleccionados: [],
    itemProducto: {
      categoria: {
        categoria_id: null,
      },
      marca: {
        marca_id: null,
      },
    },
    defaultProducto: {
      categoria: {
        categoria_id: null,
      },
      marca: {
        marca_id: null,
      },
    },
  }),

  async mounted() {
    this.productos = (await productos()).data.data;
    this.categorias = (await categorias()).data.data;
    this.marcas = (await marcas()).data.data;
    // this.cargarProductosYCategorias();
  },
  methods: {
    modalProducto(item) {
      this.indexEditable = this.productos.indexOf(item);
      this.itemProducto = Object.assign({}, item);
      this.dialog = true;
    },
    agregarProducto(item) {
        this.productos.push(item);
        this.notificacion("Producto agregado.", "success");
        this.close();
    },

    editarProducto(item) {
      Object.assign(this.productos[this.indexEditable], item);
      this.notificacion("Producto modificado.", "success");
      this.close();
    },

    async loadProductos(){
       this.productos = (await productos()).data.data;
    },
    async eliminarProducto(item) {
      let response = await this.sweetalert(
        `warning`,
        `¿Estás seguro que deseas eliminar este producto?`
      );
      if (response.value) {
        response = await eliminarProducto(item.producto_id);
        if (response.status === 200) {
              const index = this.productos.indexOf(item);
              this.productos.splice(index, 1);
              this.notificacion("Producto eliminado.", "success");
        }
        else{
          this.notificacionError();
        }
      }
    },
    async eliminarSeleccionados() {
      let response = await this.sweetalert(
        `warning`,
        `¿Estas seguro que deseas eliminar los productos seleccionados?`
      );
      if (response.value) {
        response = await eliminarProductos(this.seleccionados);
        if (response.status === 200) {
              this.seleccionados.forEach((element) =>
                this.productos.splice(this.productos.indexOf(element), 1)
              );
              this.notificacion("Productos eliminados.", "success");
        }
        else{
          this.notificacionError();
        }
      }
    },

    close() {
      this.dialog = false;
      this.indexEditable = -1;
      this.$nextTick(() => {
        this.itemProducto = Object.assign({}, this.defaultProducto);
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
<style>
.v-data-table-header-mobile__wrapper {
  display: flex;
  margin-left: -21px;
}
</style>
