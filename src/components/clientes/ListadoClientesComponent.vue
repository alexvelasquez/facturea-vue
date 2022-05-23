<template>
  <div>
    <v-row no-gutters>
      <v-col cols="12">
        <p class="text-lg-h6 font-weight-bold blue-grey--text text--lighten-2">
          Clientes
        </p>
      </v-col>
    </v-row>
    <v-card>
      <v-card-title
        ><v-col cols="6" sm="4"
          ><v-row>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Buscar Cliente"
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
        item-key="cliente_id"
        :items="clientes"
        :search="search"
        show-select
      >
        <template v-slot:[`item.direccion`]="{ item }">
          <span> {{ item.direccion }}</span>
        </template>
        <template v-slot:[`item.localidad`]="{ item }">
          <span>
            {{ item.localidad.provincia.descripcion | upper }} /
            {{ item.localidad.descripcion | upper }}
          </span>
        </template>
        <template v-slot:[`item.precio_compra`]="{ item }">
          <span>{{ item | precioNeto }}</span>
        </template>
        <template v-slot:[`item.email`]="{ item }">
          <span>{{ item.email ? item.email : "--" }}</span>
        </template>
        <template v-slot:[`item.telefono`]="{ item }">
          <span>{{ item.telefono ? item.telefono : "--" }}</span>
        </template>
        <template v-slot:[`item.f_modificacion`]="{ item }">
          <span>{{ item.f_modificacion | formatDate }}</span>
        </template>
        <template v-slot:[`item.monto_debido`]="{ item }">
          <span>
            {{ item.monto_debido | formatPrecio }}
          </span>
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
                @click="
                  redirect(`/clientes/cuentacorriente/${item.cliente_id}`)
                "
              >
                style
              </v-icon>
            </template>
            <span>Cuenta Corriente</span>
          </v-tooltip>
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
                @click="eliminarCliente(item)"
              >
                mdi-close
              </v-icon>
            </template>
            <span>Eliminar</span>
          </v-tooltip>
        </template>
      </v-data-table>
      <v-row id="actions-clientes">
        <v-col cols="12" sm="12" md="12" align="end">
          <!-- <v-btn outlined color="#385F73" dark class="mb-2 mr-md-2">EXPORTAR XLS
                </v-btn> -->
          <v-btn
            v-if="seleccionados.length > 0"
            @click="eliminarSeleccionados"
            outlined
            color="#385F73"
            dark
            class="mb-2 mr-md-2"
            >ELIMINAR SELECCIONADOS
          </v-btn>
          <modal-cliente
            :editable="editable"
            :dialog="dialog"
            :provincias="provincias"
            :condicionesIva="condicionesIva"
            :tiposDocumentos="tiposDocumentos"
            :cliente="itemCliente"
            @cerrar-dialog="close"
            @agregar-cliente="agregarCliente($event)"
            @editar-cliente="editarCliente($event)"
          >
          </modal-cliente>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
import ModalCliente from "@/components/clientes/ModalClienteComponent";
import {
  clientes,
  eliminarCliente,
  eliminarClientes,
} from "@/services/clientes";
import { getTiposDocumentos, getCondicionesIva } from "@/services/afip.js";
import { getProvincias } from "@/services/datosGeograficos.js";
export default {
  components: {
    ModalCliente,
  },
  data: () => ({
    dialog: false,
    cabeceras: [
      {
        text: "Razon Social",
        align: "center",
        sortable: true,
        value: "razon_social",
      },
      {
        text: "Email",
        align: "center",
        value: "email",
      },
      {
        text: "Dirección",
        value: "direccion",
        align: "center",
        sortable: true,
      },
      {
        text: "Provincia/Localidad",
        value: "localidad",
        align: "center",
        sortable: true,
      },
      {
        text: "Teléfono",
        value: "telefono",
        align: "center",
        sortable: true,
      },
      {
        text: "Condición IVA",
        value: "condicion_iva.descripcion",
        sortable: true,
      },
      {
        text: "Deuda",
        value: "monto_debido",
        sortable: true,
      },
      {
        text: "Acciones",
        value: "actions",
        align: "center",
        sortable: false,
      },
    ],
    provincias: [],
    condicionesIva: [],
    tiposDocumentos: [],
    search: "",
    seleccionados: [],
    clientes: [],
    indexEditable: -1,
    itemCliente: {
      condicion_iva: {
        condicion_iva_id: null,
      },
      tipo_documento: {
        tipo_documento_id: null,
      },
      localidad: {
        localidad_id: null,
        provincia: {
          provincia_id: null,
        },
      },
    },
    defaultCliente: {
      condicion_iva: {
        condicion_iva_id: null,
      },
      tipo_documento: {
        tipo_documento_id: null,
      },
      localidad: {
        localidad_id: null,
        provincia: {
          provincia_id: null,
        },
      },
    },
  }),

  async mounted() {
    try {
      this.provincias = (await getProvincias()).data.data;
      this.condicionesIva = (await getCondicionesIva()).data.data;
      this.tiposDocumentos = (await getTiposDocumentos()).data.data;
      this.clientes = (await clientes()).data.data;
    } catch (e) {
      this.notificacionError();
    }
  },
  methods: {
    modalProducto(item) {
      this.indexEditable = this.clientes.indexOf(item);
      this.itemCliente = Object.assign({}, item);
      this.dialog = true;
    },

    async agregarCliente(item) {
      this.clientes.push(item);
      this.notificacion("Cliente agregado correctamente", "success");
      this.close();
    },

    editarCliente(item) {
      Object.assign(this.clientes[this.indexEditable], item); //actualizo cliente
      this.notificacion("Cliente modificado correctamente", "success");
      this.close();
    },

    async eliminarCliente(item) {
      let response = await this.sweetalert(
        `warning`,
        `¿Estas seguro que deseas eliminar este cliente?`
      );
      if (response.value) {
        response = await eliminarCliente(item.cliente_id, item);
        if (response.status === 200) {
          const index = this.clientes.indexOf(item);
          this.clientes.splice(index, 1);
          this.notificacion("Eliminado correctamente", "success");
          this.close();
        }
        else{
          this.notificacionError();
        }
      }
    },

    async eliminarSeleccionados() {
      let response = await this.sweetalert(
        `warning`,
        `¿Estas seguro que deseas eliminar los clientes seleccionados?`
      );
      if (response.value) {
        response = await eliminarClientes(this.seleccionados);
        if (response.status === 200) {
          this.seleccionados.forEach((element) =>
            this.clientes.splice(this.clientes.indexOf(element), 1)
          );
          this.notificacion("Eliminados correctamente", "success");
        } else {
          this.notificacionError();
        }
      }
    },

    close() {
      this.dialog = false;
      this.indexEditable = -1;
      this.$nextTick(() => {
        this.itemCliente = Object.assign({}, this.defaultCliente);
      });
    },
  },

  computed: {
    editable() {
      return this.indexEditable > -1 ? true : false;
    },
    clienteCondicionIva() {
      return this.itemCliente;
    },
  },
};
</script>
