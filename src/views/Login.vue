<template>
  <div>
      <login-component></login-component>
  </div>
</template>

<script>
import LoginComponent from '@/components/auth/LoginComponent.vue'
export default {
    components:{LoginComponent}
}
</script>
<style>
#app{
    background-color: #385F73;
}
</style>