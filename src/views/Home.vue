<template>
  <div class="home">
    <card-header :cards="cards"></card-header>
    <line-chart></line-chart>
  </div>
</template>

<script>
// @ is an alias to /src
import CardHeader from '@/components/card/CardHeaderComponent.vue'
import LineChart from '@/components/grafics/LineChartComponent.vue'
import axios from 'axios'
export default {
  name: 'Home',
  components:{
    CardHeader,
    LineChart,
  },
  data() {
    return {
      cards:[{
        title:'Cantidad de ventas totales'
      },
      {
        title:'Cantidad de ventas pagadas'
      },
      {
        title:'Cantidad de ventas pendientes'
      }]
    }
  }
}
</script>
