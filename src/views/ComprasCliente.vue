<template>
  <div>
    <listado-compras  :clienteId="cliente"></listado-compras>
  </div>
</template>
<script>
import ListadoCompras from '@/components/clientes/cuentaCorriente/ListadoCompras'
export default {
  components:{
    ListadoCompras
  },

  computed:{
    cliente(){
      return this.$route.params.cliente ?? null;
    }
  }
}
</script>
