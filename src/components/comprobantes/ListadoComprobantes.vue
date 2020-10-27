<style >

.periodo {
    background-color: #E0E0E0;
}

</style>

<template>

<div>
    <v-row no-gutters>
        <v-col cols="12">
            <p class="text-lg-h6 font-weight-bold blue-grey--text text--lighten-2">Comprobantes</p>
        </v-col>
    </v-row>
    <v-card>
        <v-card-title class="text-center periodo">
            <v-row>
                <v-col cols="12" md="7" offset-md="4">
                    <v-row>
                        <v-col cols="12" md="4">
                            <v-menu ref="fDesde" v-model="menuDate.fechaDesde" :close-on-content-click="false" :return-value.sync="fechaDesde" transition="scale-transition" offset-y min-width="290px">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-text-field v-model="fechaDesde" label="Fecha Desde" prepend-icon="event" readonly v-bind="attrs" v-on="on" dense outlined></v-text-field>
                                </template>
                                <v-date-picker v-model="fechaDesde" no-title scrollable :max="date">
                                    <v-spacer></v-spacer>
                                    <v-btn text color="primary" @click="menuDate.fechaDesde = false">Cancel</v-btn>
                                    <v-btn text color="primary" @click="$refs.fDesde.save(fechaDesde)">OK</v-btn>
                                </v-date-picker>
                            </v-menu>
                        </v-col>
                        <v-col cols="12" md="4">
                            <v-menu ref="fHasta" v-model="menuDate.fechaHasta" :close-on-content-click="false" :return-value.sync="fechaHasta" transition="scale-transition" offset-y min-width="290px">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-text-field v-model="fechaHasta" label="Fecha Hasta" prepend-icon="event" readonly v-bind="attrs" v-on="on" dense outlined></v-text-field>
                                </template>
                                <v-date-picker v-model="fechaHasta" :max="date" no-title scrollable>
                                    <v-spacer></v-spacer>
                                    <v-btn text color="primary" @click="menuDate.fechaHasta = false">Cancel</v-btn>
                                    <v-btn text color="primary" @click="$refs.fHasta.save(fechaHasta)">OK</v-btn>
                                </v-date-picker>
                            </v-menu>
                        </v-col>
                        <v-col cols="12" md="4">
                            <v-btn block outlined color="#385F73" @click="cargarComprobantes">
                                <v-icon left>
                                    search
                                </v-icon>buscar</v-btn>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
            <v-spacer></v-spacer>
        </v-card-title>
        <v-data-table :headers="headers" :items="comprobantes" :search="search" :single-expand="singleExpand" :expanded.sync="expanded" item-key="preventa_id" show-expand>
            <template v-slot:[`item.fecha`]="{ item }">
                <span>{{item.fecha|formatDate}}</span>
            </template>
            <template v-slot:[`item.numero`]="{ item }">
                <span>{{zfill(item.numero,8)}}</span>
            </template>
            <template v-slot:[`item.punto_venta`]="{ item }">
                <span>{{zfill(item.punto_venta,5)}}</span>
            </template>
            <template v-slot:expanded-item="{ headers, item }">
                <td :colspan="headers.length">
                    <v-row>
                        <v-col cols="12">
                            <v-btn class="ma-2" outlined color="#385F73">DESCARGAR</v-btn>
                            <v-btn class="ma-2" outlined color="#385F73">CREAR RECIBO</v-btn>
                            <v-btn class="ma-2" outlined color="#385F73">CREAR NOTA DEBITO A</v-btn>
                            <v-btn class="ma-2" outlined color="#385F73">CREAR NOTA CREDITO A</v-btn>
                        </v-col>
                    </v-row>
                </td>
            </template>
        </v-data-table>
    </v-card>
</div>

</template>

<script>

export default {

    data() {
        return {
            date: moment().format('YYYY-MM-DD'),
            menuDate: {
                fechaHasta: false,
                fechaDesde: false,
            },
            fechaHasta:  moment().format('YYYY-MM-DD'),
            fechaDesde: moment().subtract(30,'d').format('YYYY-MM-DD'),
            menu: false,
            modal: false,
            menu2: false,
            expanded: [],
            singleExpand: false,
            dialog: false,
            search: '',
            files: [],
            headers: [{
                text: 'Fecha de Emision',
                align: 'start',
                sortable: false,
                value: 'fecha',
            }, {
                text: 'Cliente',
                value: 'cliente',
                align: 'center',
            }, {
                text: 'Tipo de Comprobante',
                value: 'tipo_comprobante',
                align: 'center',
            }, {
                text: 'Punto de venta',
                value: 'punto_venta',
                align: 'center',
            }, {
                text: 'Número de Comprobante',
                value: 'numero',
                align: 'center',
            }, {
                text: 'Condición de venta',
                value: 'condicion_vta'
            }, {
                text: '',
                value: 'data-table-expand'
            }, ],
            model: null,
            allow: false,
            tab: null,
            comprobantes: [],
        }
    },
    mounted() {
        this.cargarComprobantes()
    },
    methods: {
        cargarComprobantes() {
                axios.get(`comprobantes/negocio/${this.negocio.negocio_id}`, {
                        params: {
                            fechaDesde: this.fechaDesde,
                            fechaHasta: this.fechaHasta
                        }
                    })
                    .then((response) => {
                        this.comprobantes = response.data.data;
                    })
            },

    },

}

</script>
