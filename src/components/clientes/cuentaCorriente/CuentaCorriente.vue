<style media="screen">

.swal2-input {
    height: 34px !important;
    font-family: 'Roboto' !important;
}

</style>

<template>

<div v-if="infoGeneral">
    <v-row no-gutters>
        <v-col cols="12">
            <p class="text-lg-h6 font-weight-bold blue-grey--text text--lighten-2">Cuenta Corriente</p>
        </v-col>
    </v-row>
    <v-breadcrumbs :items="options" large>
        <template v-slot:item="{ item }">
            <v-breadcrumbs-item style="cursor:pointer" @click="$router.push(item.href)" :disabled="item.disabled">
                {{ item.text}}
            </v-breadcrumbs-item>
        </template>
    </v-breadcrumbs>
    <div>

        <v-row justify="start">
            <v-col cols="12" md="6">
                <v-card color="#385F73" dark>
                    <v-list-item three-line>
                        <v-card-subtitle class="text-center" style="border-right:2px solid">{{infoGeneral.cliente|upper}}</v-card-subtitle>
                        <v-card-subtitle class="text-center" style="border-right:2px solid">DEUDA: {{parseFloat(infoGeneral.deuda)|formatPrecio}}</v-card-subtitle>
                        <v-card-subtitle class="text-center" v-if="infoGeneral.fUltimoMovimiento">ÚLTIMO MOVIMIENTO: {{infoGeneral.fUltimoMovimiento | formatDate}}</v-card-subtitle>
                        <v-card-subtitle class="text-center" v-else>SIN MOVIMIENTOS</v-card-subtitle>

                    </v-list-item>
                </v-card>
            </v-col>
        </v-row>
    </div>
    <v-card>
        <v-card-title>
            <v-row justify="end">
                <v-col cols="12" md="3">
                    <v-text-field v-model="search" append-icon="mdi-magnify" label="Nro de compra" single-line hide-details></v-text-field>
                </v-col>
            </v-row>
        </v-card-title>
        <v-data-table  :headers="cabeceras" item-key="cliente_id" :items="cuentas" :search="search">
            <template v-slot:[`item.direccion`]="{ item }">
                <span>{{item.localidad.descripcion|capitalize}}</span>
            </template>
            <template v-slot:[`item.monto_compra`]="{ item }">
                <span>{{parseFloat(item.monto_compra)|formatPrecio}}</span>
            </template>
            <template v-slot:[`item.monto_debido`]="{ item }">
                <span>{{parseFloat(item.monto_debido)|formatPrecio}}</span>
            </template>
            <template v-slot:[`item.fecha_preventa`]="{ item }">
                <span>{{item.fecha_preventa|formatDate}}</span>
            </template>
            <template v-slot:[`item.f_ultimo_movimiento`]="{ item }">
                <span>{{item.f_ultimo_movimiento|formatDateTime}}</span>
            </template>
            <template v-slot:[`item.estado`]="{ item }">
                <v-chip class="ma-2" :color="item.monto_debido > 0 ? 'primary' :''" small>
                  {{item.monto_debido > 0 ? 'Pendiente de pago' : 'Pagado'}}
                </v-chip>
            </template>
            <template v-slot:[`item.actions`]="{item}">
                <v-tooltip top>
                    <template v-slot:activator="{ on, attrs }">
                        <v-icon medium color="#385F73" class="mr-2" v-bind="attrs" v-on="on" @click="detalleCompra(item.preventa)">
                            event_note
                        </v-icon>
                    </template>
                    <span>Detalle Compra</span>
                </v-tooltip>
            </template>
        </v-data-table>
        <v-row id="actions-clientes">
            <v-col cols="12" sm="12" md="12" align="end">
              <v-btn outlined color="#385F73" dark class="mb-2 mr-md-2" @click="exportarCuentas()">EXPORTAR</v-btn>
                <modal-pago @abonar="abonar($event)" :cliente="clienteId"></modal-pago>
                <movimientos :cliente="infoGeneral.cliente" :clienteId="clienteId"></movimientos>
            </v-col>
        </v-row>

        <detalle-compra :dialog="dialog" :detalle="detalle" @cerrar-detalle="cerrarDetalle"></detalle-compra>
    </v-card>

</div>

</template>

<script>

import DetalleCompra from '@/components/clientes/cuentaCorriente/DetalleCompra'
import Movimientos from '@/components/clientes/cuentaCorriente/Movimientos'
import ModalPago from '@/components/clientes/cuentaCorriente/ModalPago'
export default {
    components: {
        DetalleCompra,
        Movimientos,
        ModalPago
    },
    props: {
        clienteId: {
            type: String
        }
    },
    data: () => ({
        dialog: false,
        cabeceras: [{
            text: '#Compra',
            align: 'center',
            sortable: true,
            value: 'preventa'
        }, {
            text: 'Fecha de Compra',
            align: 'center',
            value: 'fecha_preventa'
        }, {
            text: 'Monto de Compra',
            value: 'monto_compra',
            align: 'left',
            sortable: true
        }, {
            text: 'Monto Debido',
            value: 'monto_debido',
            align: 'left',
            sortable: true
        }, {
            text: 'Estado',
            value: 'estado',
            align: 'center',
        }, {
            text: 'Acciones',
            value: 'actions',
            align: 'left',
            sortable: false
        }, ],
        search: '',
        clientes: [],
        cuentas: [],
        infoGeneral: null,
        detalle:[],
        indexEditable: -1,
        dialogAbono: false,
        abono: null,
    }),


    mounted() {
        this.configuracionCuentaCliente();
    },
    methods: {
        configuracionCuentaCliente() {
                axios.get(`clientes/cuentaCorriente/${this.clienteId}`)
                    .then(response => {
                        this.cuentas = response.data.data.cuentas;
                        this.infoGeneral = response.data.data.total;
                    })
            },
            detalleCompra(preventa) {
              axios.get(`clientes/detalleCompra/${preventa}`)
              .then(result=>{
                this.detalle = result.data.data;
                this.dialog = true;
              })
            },
            exportarCuentas(){
              axios.get(`clientes/exportar/cuentaCorriente/${this.clienteId}`)
              .then(result=>{
                const link = document.createElement('a');
                link.href = result.data.data.file;
                link.setAttribute('download','cuentas_corriente_'+moment().format('DDMMYYYYHHmm')+'.pdf');
                document.body.appendChild(link);
                link.click();
              })
            },
            abonar(pago){
              axios.post(`clientes/abonar/${this.clienteId}`,pago)
              .then(result=>{
                  if(result.data.data.data){
                    this.notificacion(result.data.data.data,'success');
                    this.configuracionCuentaCliente();
                  }
                  else if(result.data.data.file){
                    const link = document.createElement('a');
                    const fecha = moment().format('DDMMYYYY HHmm');
                    link.href = result.data.data.file;
                    link.setAttribute('download','ticket '+fecha+'.pdf');
                    document.body.appendChild(link);
                    link.click();
                  }
              })
              .catch(error=>{
                console.log(error);
                this.notificacion('Ha ocurrido un error','error');
              })
            },
            cerrarDetalle(){
              this.dialog = false;
            }
    },
    computed: {
        options() {
            return [{
                text: 'Clientes',
                disabled: false,
                href: '/clientes',
            }, {
                text: 'Cuenta Corriente',
                disabled: true,
                href: '',
            }, ]
        },
    }

}

</script>
