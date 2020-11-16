<template>
  <div>
      <login-component></login-component>
  </div>
</template>

<script>
import LoginComponent from '@/components/auth/LoginComponent.vue'
export default {
    components:{LoginComponent},
    mounted(){
      console.log(axios.defaults.baseURL)
    }
}
</script>
