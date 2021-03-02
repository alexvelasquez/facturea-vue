<template>
  <v-app id="app" :class="loggedIn ? 'app-logued' : 'app-not-logued'">
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
  data:function(){
    return {
      connection: null
    }
  },

  created:function(){
    console.log("Starting connection to WebSocket Server")
   
    this.connection = new WebSocket(`wss://localhost:8000/api/doc`);

    this.connection.onopen = function(event) {
      console.log(event)
      console.log("Successfully connected to the echo websocket server...")
    }
  }
};
</script>
<style media="screen">
  .app-logued{
    background-color: #eceff1 !important;
    border-color: #eceff1 !important;
  }
  .app-not-logued{
    background-color: #385F73 !important;
  }

</style>
