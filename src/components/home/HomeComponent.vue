

<template>

<div class="home">
    <v-row no-gutters>
        <v-col cols="12">
            <p class="text-lg-h6 font-weight-bold blue-grey--text text--lighten-2">Inicio</p>
        </v-col>
    </v-row>
    <mensajes-component :active="active" :mensaje="mensaje"></mensajes-component>
    <card-header :cards="cards"></card-header>
    <line-chart :dataMontos="ventas.graficos"></line-chart>
</div>

</template>

<script>

import CardHeader from '@/components/card/CardHeaderComponent.vue'
import LineChart from '@/components/grafics/LineChartComponent.vue'
import MensajesComponent from '@/components/MensajesComponent.vue'
import axios from 'axios'
export default {
    name: 'Home',
    components: {
        CardHeader,
        LineChart,
        MensajesComponent
    },
    data() {
        return {
            active: false,
            mensaje: {},
            ventas: {}
        }
    },
    mounted() {
        axios.all([axios.get(`notificaciones`),
                axios.get(`comprobantePreventa/negocio/${this.negocio.negocio_id}/ventas`),
            ])
            .then(axios.spread((mensaje, ventas) => {
                if (mensaje.data.data != null) {
                    this.mensaje = response.data.data;
                    this.active = true;
                }
                this.ventas = ventas.data.data;
                this.calcularTotales();

            }))
            .catch(error => {
                console.log(error);
                this.notificacion('Ha ocurrido un error, intente nuevamente', 'error')
            })
    },
    methods:{
      calcularTotales(){
        this.cards[0]['total'].value=this.ventas.totales['total'];
        this.cards[0][this.estadoPagado].value=this.ventas.totales[this.estadoPagado];
        this.cards[0][this.estadoPendientePago].value = this.ventas.totales[this.estadoPendientePago];
      }
    },
    computed: {
        cards() {
            return [{'total': {
                    title: 'VENTAS TOTALES'

                },
                3: {
                    title: 'VENTAS PAGADAS'
                },
                5: {
                    title: 'VENTAS PENDIENTES DE PAGO'
                }}
            ]
        },
    }
}

</script>
