



<script>

import {
    Line
}
from 'vue-chartjs'
export default {
    props: {
        dataMontos: {
            type: Object,
        },
    },
    extends: Line,
    // props:{
    //   totales{
    //     type:Object,
    //     default:[]
    //   },
    //   pagados{
    //     type:Object,
    //     default:[]
    //   },
    //   pendientes{
    //     type:Object,
    //     default:[]
    //   },
    // }
    mounted() {

        this.renderChart({
          labels : [
              "Enero",
              "Febrero",
              "Marzo",
              "Abril",
              "Mayo",
              "Junio",
              "Julio",
              "Agosto",
              "Septiembre",
              "Octubre",
              "Noviembre",
              "Diciembre"
          ],
            datasets: [{
                label: "Pagadas",
                data: this.dataMontos[this.estadoPagado.toString()],
                backgroundColor: "transparent",
                borderColor: "rgba(1, 116, 188, 0.50)",
                pointBackgroundColor: "rgba(171, 71, 188, 1)"
            },{
                label: "Pendientes Pago",
                data: this.dataMontos[this.estadoPendientePago.toString()],
                backgroundColor: "transparent",
                borderColor: "rgba(1, 116, 188, 0.50)",
                pointBackgroundColor: "rgba(171, 71, 188, 1)"
            },{
                label: "Totales",
                data: this.dataMontos['total'],
                backgroundColor: "transparent",
                borderColor: "rgba(1, 116, 188, 0.50)",
                pointBackgroundColor: "rgba(171, 71, 188, 1)"
            }]
        }, {
            responsive: true,
            maintainAspectRatio: false,
            title: {
                display: true,
                text: "Ventas"
            }
        });
    },
}

</script>
