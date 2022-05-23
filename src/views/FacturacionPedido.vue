<template>
  <div>
    <facturacion-component :pedidoId="pedido"></facturacion-component>
  </div>
</template>
<script>
import FacturacionComponent from '@/components/factura/FacturacionComponent'
export default {
  components:{
    FacturacionComponent
  },
  computed:{
    pedido(){
      return this.$route.params.pedido ?? null;
    }
  }
}
</script>
