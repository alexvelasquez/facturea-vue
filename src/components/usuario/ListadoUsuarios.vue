

<template>

<div>
    <v-row no-gutters>
        <v-col cols="12">
            <p class="text-lg-h6 font-weight-bold blue-grey--text text--lighten-2">Usuarios</p>
        </v-col>
    </v-row>
    <v-card>
        <v-card-title>
            <v-col cols="6" sm="4">
                <v-row>
                    <v-text-field v-model="search" append-icon="mdi-magnify" label="Buscar Usuario" single-line hide-details></v-text-field>
                </v-row>
            </v-col>
            <v-spacer></v-spacer>
        </v-card-title>
        <v-data-table v-model="seleccionados" :headers="cabeceras" item-key="id" :items="usuarios" :search="search" show-select>
            <template v-slot:[`item.apyn`]="{ item }">
                <span>{{item.lastname | upper}}  {{item.name| upper}}</span>
            </template>
            <template v-slot:[`item.createdAt`]="{ item }">
                <span>{{item.createdAt |formatDateTime}}</span>
            </template>
            <template v-slot:[`item.actions`]="{item}">
                <v-btn small :color="!tieneFactura(item) ? 'primary' : 'error'" class="mr-3" dark  @click="accionFactura(item)" rounded>
                  {{!tieneFactura(item) ? 'Activar': 'Desactivar' }} Factura
                </v-btn>

                <v-btn small :color="!tienePedido(item) ? 'primary' : 'error'" dark  @click="accionPedido(item)" rounded>
                  {{!tienePedido(item) ? 'Activar': 'Desactivar' }} Pedido
                </v-btn>

                <!-- <v-tooltip top>
                    <template v-slot:activator="{ on, attrs }">
                        <v-icon medium color="#385F73" class="mr-2" v-bind="attrs" v-on="on">
                            mdi-close
                        </v-icon>
                    </template>
                    <span>Eliminar</span>
                </v-tooltip> -->
            </template>
        </v-data-table>
        <v-row id="actions-clientes">
            <v-col cols="12" sm="12" md="12" align="end">
                <!-- <v-btn outlined color="#385F73" dark class="mb-2 mr-md-2">EXPORTAR XLS
                </v-btn> -->
                <v-btn v-if="seleccionados.length > 0" @click="eliminarSeleccionados" outlined color="#385F73" dark class="mb-2 mr-md-2">ELIMINAR SELECCIONADOS
                </v-btn>
            </v-col>
        </v-row>
    </v-card>

</div>

</template>

<script>

export default {
    components: {

    },
    data: () => ({
        dialog: false,
        cabeceras: [{
            text: 'Apellido y Nombre',
            align: 'center',
            sortable: true,
            value: 'apyn'
        }, {
            text: 'Email',
            align: 'left',
            value: 'email'
        }, {
            text: 'Fecha de alta',
            value: 'createdAt',
            sortable: true
        }, {
            text: 'Factura Electronica',
            value: 'negocio.facturaElectronica',
            align: 'center',
            sortable: true
        }, {
            text: 'Pedidos',
            value: 'negocio.pedido',
            align: 'center',
            sortable: true
        }, {
            text: 'Acciones',
            value: 'actions',
            align: 'center',
            sortable: false
        }, ],
        search: '',
        seleccionados: [],
        usuarios: []

    }),

    mounted() {
      this.listadoUsuarios();
    },
    methods:{
      listadoUsuarios(){
        axios.get('usuario')
            .then(response => {
                this.usuarios = response.data.data;
            })
      },
      accionPedido(item){
        let valor = (item.negocio.pedido_producto == 'S') ? 'N' : 'S';
        axios.put(`/usuario/pedido/${item.id}`,{valor:valor})
        .then(response=>{
          if(response.data.code == 200){
            this.notificacion('Accion realizada correctamente.','success');
            this.listadoUsuarios();
          }
        })
        .catch(response=>{
            this.notificacion('Ha ocurrido un error.','error')
        })
      },
      accionFactura(item){
        let valor = (item.negocio.factura_electronica == 'S') ? 'N' : 'S';
        axios.put(`/usuario/factura/${item.id}`,{valor:valor})
        .then(response=>{
          if(response.data.code == 200){
            this.notificacion('Acción realizada correctamente.','success');
            this.listadoUsuarios();
          }
        })
        .catch(response=>{
            this.notificacion('Ha ocurrido un error.','error')
        })
      },
      tieneFactura(item){
        return item.negocio.facturaElectronica == 'S'
      },
      tienePedido(item){
        return item.negocio.pedido == 'S'
      }
    }


}

</script>
