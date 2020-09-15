<template>
  <v-app id="app">
    <loader></loader>
    <base-component>
    </base-component>
    <notificacion></notificacion>
  </v-app>
</template>

<script>
import store from './store'
import axios from 'axios'
import BaseComponent from '@/components/BaseComponent'
import Loader from '@/components/Loader'
import Notificacion from '@/components/Notificacion'
export default {
  name: 'App',
  components:{BaseComponent,Loader,Notificacion},

};
</script>
