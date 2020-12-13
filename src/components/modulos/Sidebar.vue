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
            <v-list-group :value="false" prepend-icon="vpn_lock" sub-group class="organizacion" v-if="rol=='ROLE_USER'">
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
export default {
  data(){
    return {
      drawerSidebar:null,
      logo: logo,
      options:[],
      optionsUserColapse:[]

    }
  },
  mounted() {
      if(this.rol === 'ROLE_ADMIN'){
        this.options = [{
                title: 'USUARIOS',
                link: '/comprobantes',
                icon: 'groups'
            }, {
                title: 'NOTIFICACIONES',
                link: '/notificaciones',
                icon: 'add_alert'
            }]
      }
      else{
        this.options = [{
                title: 'INICIO',
                link: '/',
                icon: 'home'
            }, {
                title: 'COMPROBANTES',
                link: '/comprobantes',
                icon: 'wysiwyg'
            }, {
                title: 'GENERAR COMPROBANTE',
                link: '/facturacion',
                icon: 'book_online'
            },
        ]
        this.optionsUserColapse= [{
            title: 'CLIENTES',
            link: '/clientes',
            icon: 'groups'
        }, {
            title: 'PRODUCTOS Y SERVICIOS',
            link: '/productos',
            icon: 'fastfood'
        }]
        if (this.pedidoProductosHabilitado) {
            this.optionsUserColapse.push({
                title: 'PEDIDOS',
                link: '/pedidos',
                icon: 'moped'
            })
        }
        this.optionsUserColapse.push( {
            title: 'CONFIGURACIÓN',
            link: '/configuracion',
            icon: 'miscellaneous_services'
        })
      }
  },
  computed:{
    rol(){
      return this.$store.getters.getUserRol
    }
  }

}
</script>
