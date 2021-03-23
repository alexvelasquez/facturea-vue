<script>

import {
    Line
}
from 'vue-chartjs'
export default {
    props: {
        labels:{
          type:Array,
          default:[]
        },
        datasets:{
          type:Array,
          default:[]
        },
    },
    extends: Line,

    mounted() {
        // console.log(this.data.datasets);
        this.renderChart({
          labels : this.labels,
            datasets: [{
                label: 'Monto Cobrado ',
                data:this.datasets,
                backgroundColor: "transparent",
                borderColor: "rgba(1, 116, 188, 0.50)",
                pointBackgroundColor: "rgba(171, 71, 188, 1)"
            }]
        }, {
            responsive: true,
            maintainAspectRatio: false,
            title: {
                display: true,
                text: "GENERADO Y COBRADO"
            }
        });
    },
}

</script>
