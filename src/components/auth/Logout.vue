<template>
</template>
<script>
export default {
    created(){
        this.$store.dispatch('logout')
        .then(sucess=>{
            this.$router.push("/login")
        })
        
    }
}
</script>