<template>
  <div>
    <cuenta-corriente :clienteId="cliente" @changeCompras="isCuentaCorriente=false"></cuenta-corriente>
  </div>
</template>
<script>
import CuentaCorriente from '@/components/clientes/cuentaCorriente/CuentaCorriente'
export default {
  components:{
    CuentaCorriente
  },
  computed:{
    cliente(){
      return this.$route.params.cliente ?? null;
    }
  }
}
</script>
