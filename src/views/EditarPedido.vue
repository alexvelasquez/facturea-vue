<template>
  <div>
    <editar-pedido :pedidoId="pedido"></editar-pedido>
  </div>
</template>
<script>
import EditarPedido from '@/components/pedido/PedidoComponent'
export default {
  components:{
    EditarPedido
  },

  computed:{
    pedido(){
      return this.$route.params.pedido;
    }
  }
}
</script>
