<template>
    <div>
      <v-row no-gutters>
          <v-col cols="12"><p class="text-lg-h6 font-weight-bold blue-grey--text text--lighten-2">Categorias</p></v-col>
      </v-row>
    <v-card>

        <v-card-title>
        <v-col cols="6" sm="4">
            <v-row >
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
        v-model="selected"
        :headers="cabeceras"
        item-key="name"
        :items="categorias"
        :search="search"
        show-select
        >
        <template v-slot:[`item.actions`]="{item}">
          <v-icon
              medium
              color="#385F73"
              class="mr-2"
              @click="modalProducto(item)"
              v-bind="item"
          >
          monetization_on
          </v-icon>
          <v-icon
              medium
              color="#385F73"
              class="mr-2"
              @click="modalProducto(item)"
              v-bind="item"
          >
              mdi-pencil
          </v-icon>
          <v-icon
              medium
              color="#385F73"
              @click="eliminarProducto(item)"
          >
              mdi-close
          </v-icon>
        </template>
        </v-data-table>
        <v-row id="actions-productos">
          <v-col cols="12" sm="12" md="12" align="end">
            <v-btn
            outlined
            color="#385F73"
            dark
            class="mb-2 mr-md-2"
            >EXPORTAR XLS
            </v-btn>
            <v-btn
            outlined
            color="#385F73"
            dark
            class="mb-2 mr-md-2"
            >ELIMINAR SELECCIONADOS
            </v-btn>
            <v-btn
            outlined
            color="#385F73"
            @click="$router.push('/productos')"
            dark
            class="mb-2 mr-md-2"
            >PRODUCTOS
            </v-btn>
            <modal-categoria
            :editable="editable"
            :dialog="dialog"
            :categoria="itemCategoria"
            @cerrar-dialog="close"
            @agregar-categoria="agregarCategoria($event)"
            @editar-categoria="editarCategoria($event)">
            </modal-categoria>
          </v-col>
        </v-row>
    </v-card>
    </div>
</template>

<script>
  import ModalCategoria from '@/components/productos/dataCategorias/ModalCategoriaComponent'
  export default {
    components:{ModalCategoria},
    data: () => ({
      dialog: false,
      cabeceras: [
        { text: 'Código', align: 'center', sortable: true, value: 'categoria_id'},
        { text: 'Descripción', value: 'descripcion' },
        { text: 'Actions', value: 'actions', align:'center', sortable: false },
      ],
      categorias:[],

      search:'',
      indexEditable:-1,
      selected:[],
      itemCategoria: {},
      defaultCategoria: {},
      options:[
        {
          text: 'Productos Y Servicios',
          disabled: false,
          href: '/productos',
        },
        {
          text: 'Categorias',
          disabled: true,
          href: '',
        },
      ]
    }),


    mounted () {
      this.cargarCategorias();
    },
    methods: {
      cargarCategorias () {
        axios.get(`categorias/negocio/${this.$store.getters.negocioUser.negocio_id}`)
        .then(response => {
                this.categorias = response.data.data;
            })
        .catch(error=>{
            console.log(error)
        })
      },

      agregarCategoria(item){
          const negocioUser = this.$store.getters.negocioUser.negocio_id;
          axios.post(`categorias/negocio/${negocioUser}/nuevo`,item)
          .then(response=>{
            this.categorias.push(response.data.data);
            this.notificacion('Categoria agregada correctamente','success')
          })
      },

      editarCategoria(item){
        this.$swal({
            title: "¿Estas seguro que deseas modificarla?",
            showCancelButton: true,
            }).then((result) => {
                if(result.value)
                {
                  this.dialog = false
                  axios.put(`categorias/editar/${item.categoria_id}`,item)
                  .then(response=>{
                    Object.assign(this.categorias[this.indexEditable], response.data.data)
                    this.notificacion('Categoria modificado correctamente','success');
                    this.close();
                  })
                }
            })
      },

      modalProducto (item) {
        this.indexEditable = this.categorias.indexOf(item);
        this.itemCategoria = Object.assign({}, item)
        this.dialog = true
      },


      close () {
        this.dialog = false;
          this.indexEditable = -1;
        this.$nextTick(() => {
            this.itemCategoria = Object.assign({}, this.defaultCategoria);
        })
      },

    },

    computed:{
      editable(){
        return this.indexEditable > -1 ? true : false;
      },
    }
  }
</script>
