<template>
</template>
<script>
import { mapFields } from 'vuex-map-fields'
export default {
    
    mounted(){
        this.token = null;
        this.data = null;
        this.redirect('login')
    },
    computed:{
        ...mapFields('user',['token','data']),
    }
}
</script>