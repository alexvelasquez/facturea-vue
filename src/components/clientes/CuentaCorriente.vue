<template>
<div>
    <v-row no-gutters>
        <v-col cols="12">
            <p class="text-lg-h6 font-weight-bold blue-grey--text text--lighten-2">Cuenta Corriente</p>
        </v-col>
    </v-row>
    <div>
        <v-row justify="center">
            <v-col cols="12" md="6">
                <v-card color="#385F73" dark>
                    <v-list-item three-line>
                      <v-card-subtitle class="text-center" style="border-right:2px solid">{{infoGeneral.cliente|upper}}</v-card-subtitle>
                      <v-card-subtitle class="text-center" style="border-right:2px solid">Último movimiento: {{infoGeneral.fUltimoMovimiento | formatDate}}</v-card-subtitle>
                      <v-card-subtitle class="text-center">Deuda del cliente: ${{infoGeneral.deuda}}</v-card-subtitle>
                    </v-list-item>
                </v-card>
            </v-col>
        </v-row>
    </div>
    <v-card>
        <v-card-title>
            <v-col cols="6" sm="4">
                <v-row>
                    <v-text-field v-model="search" append-icon="mdi-magnify" label="Buscar Cliente" single-line hide-details></v-text-field>
                </v-row>
            </v-col>
            <v-spacer></v-spacer>


        </v-card-title>
        <v-data-table v-model="seleccionados" :headers="cabeceras" item-key="cliente_id" :items="cuentas" :search="search" show-select>
            <template v-slot:[`item.direccion`]="{ item }">
                <span>{{item.localidad.descripcion|capitalize}}</span>
            </template>
            <template v-slot:[`item.fecha_preventa`]="{ item }">
                <span>{{item.fecha_preventa|formatDateTime}}</span>
            </template>
            <template v-slot:[`item.f_ultimo_movimiento`]="{ item }">
                <span>{{item.f_ultimo_movimiento|formatDateTime}}</span>
            </template>
            <template v-slot:[`item.actions`]="{item}">
              <v-tooltip top >
                  <template v-slot:activator="{ on, attrs }">
                      <v-icon medium color="#385F73" class="mr-2" v-bind="attrs" v-on="on" @click="eliminarProducto(item)">
                          mdi-close
                      </v-icon>
                  </template>
                  <span>Eliminar</span>
              </v-tooltip>
            </template>
        </v-data-table>
        <v-row id="actions-clientes">
            <v-col cols="12" sm="12" md="12" align="end">
                <v-btn outlined color="#385F73" dark class="mb-2 mr-md-2">EXPORTAR XLS
                </v-btn>
                <v-btn v-if="seleccionados.length > 0" @click="eliminarSeleccionados" outlined color="#385F73" dark class="mb-2 mr-md-2">ELIMINAR SELECCIONADOS
                </v-btn>
            </v-col>
        </v-row>
    </v-card>

</div>

</template>

<script>

import ModalCliente from '@/components/clientes/ModalClienteComponent'
export default {
    components: {
        ModalCliente
    },
    props:{
      clienteId:{
        type:String
      }
    },
    data: () => ({
        dialog: false,
        cabeceras: [{
            text: '#Compra',
            align: 'center',
            sortable: true,
            value: 'cuenta_corriente_id'
        }, {
            text: 'Fecha y Hora',
            value: 'fecha_preventa'
        }, {
            text: 'Monto Debido',
            value: 'monto_debido',
            sortable: true
        }, {
            text: 'Monto Pagado',
            value: 'monto_pagado',
            sortable: true
        }, {
            text: 'Último movimiento',
            value: 'f_ultimo_movimiento',
            sortable: true
        }, {
            text: 'Acciones',
            value: 'actions',
            align: 'center',
            sortable: false
        }, ],
        search: '',
        seleccionados: [],

        clientes: [],
        cuentas:[],
        infoGeneral:{},
        indexEditable: -1,
        itemCliente: {

        },
        defaultCliente: {
        },
    }),


    mounted() {
      this.configuracionCuentaCliente();
    },
    methods: {
      configuracionCuentaCliente(){
        axios.get(`clientes/cuentaCorriente/${this.clienteId}`)
        .then(response=>{
          this.cuentas = response.data.data.cuentas;
          this.infoGeneral = response.data.data.total;
        })
      }
    },

}

</script>
