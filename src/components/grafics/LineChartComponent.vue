<script>
import {Line} from 'vue-chartjs'
export default {
    extends: Line,
    mounted() {
        this.renderChart(
        {
            labels: [
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
            datasets: [
            {
                label: "Data 1",
                data: [2, 10, 5, 9, 0, 6, 20],
                backgroundColor: "transparent",
                borderColor: "rgba(1, 116, 188, 0.50)",
                pointBackgroundColor: "rgba(171, 71, 188, 1)"
            }
            ]
        },
        {
            responsive: true,
            maintainAspectRatio: false,
            title: {
            display: true,
            text: "My Data"
            }
        }
        );
    }
}
</script>