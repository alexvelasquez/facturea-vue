<template>
      <v-list>
        <v-list-item>
            <v-list-item-content justify="center">
                <v-list-item-title><img :src="logo" style="margin-bottom:-10px"><span style="font-weight: bold;">FACTUREA</span></v-list-item-title>
            </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list dense>
            <v-list-item v-for="item in options" :key="item.title" link @click="redirect(item.link)">
                <v-list-item-icon>
                    <v-icon>{{item.icon}}</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title> {{ item.title }}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-list-group :value="false" prepend-icon="vpn_lock" sub-group class="organizacion" v-if="role=='ROLE_USER'">
                <template v-slot:activator>
                    <v-list-item-title class="organizacion-text">MI ORGANIZACIÓN</v-list-item-title>
                </template>
                <v-list-item class="organizacion" v-for="(item,index) in optionsUserColapse" :key="item.title" @click="redirect(item.link)">
                    <v-list-item-icon>
                        <v-icon>{{item.icon}}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>{{item.title}}</v-list-item-title>
                </v-list-item>
            </v-list-group>
        </v-list>
      </v-list>
</template>

<script>
import logo from '@/assets/images/logo.png'
import { negocio } from "@/services/negocio";
export default {
  data(){
    return {
      drawerSidebar:null,
      logo: logo,
      options:[],
      optionsUserColapse:[]

    }
  },
  async mounted() {
      this.negocio = (await negocio()).data.data;
      if(this.role === 'ROLE_ADMIN'){
        this.options = [{
                title: 'USUARIOS',
                link: '/comprobantes',
                icon: 'groups'
            }]
      }
      else{
        this.options = [{
                title: 'INICIO',
                link: '/',
                icon: 'home'
            }, {
                title: 'FACTURAS EMITIDAS',
                link: '/comprobantes',
                icon: 'wysiwyg'
            }, {
                title: 'NUEVO COMPROBANTE',
                link: '/facturacion',
                icon: 'book_online'
            },
        ]
        this.optionsUserColapse= [
        {
            title: 'CONFIGURACIÓN',
            link: '/configuracion',
            icon: 'miscellaneous_services'
        },
        {
            title: 'CLIENTES',
            link: '/clientes',
            icon: 'groups'
        }, {
            title: 'PRODUCTOS Y SERVICIOS',
            link: '/productos',
            icon: 'fastfood'
        }]
        if (this.negocio.pedido === 'S') {
            this.optionsUserColapse.push({
                title: 'PEDIDOS',
                link: '/pedidos',
                icon: 'moped'
            })
        }
      }
  },
  watch:{
    negocio(){
        if(this.negocio.pedido === 'S'){
            let tienePedido = (this.optionsUserColapse.filter(p=>p.title === 'PEDIDOS')).length;
            if(!tienePedido){
                this.optionsUserColapse.push({
                    title: 'PEDIDOS',
                    link: '/pedidos',
                    icon: 'moped'
                })
            }
        }
        else{
            let optionsUser = this.optionsUserColapse.filter(p=>p.title != 'PEDIDOS');
            this.optionsUserColapse = optionsUser;
        }
    }
  }

}
</script>
