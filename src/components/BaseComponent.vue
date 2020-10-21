<template>

<div>
    <!-- user login  -->
    <div v-if="logginIn">
        <!-- sidebar -->
        <v-navigation-drawer color="#385F73" v-model="drawer" fixed temporary dark>
            <v-list-item>
                <v-list-item-content>
                    <v-list-item-title justify="center">Facturea</v-list-item-title>
                </v-list-item-content>
            </v-list-item>

            <v-divider></v-divider>
            <v-list dense>
                <v-list-item v-for="item in options" :key="item.title" link @click="redirect(item.link)">
                    <v-list-item-icon>
                        <v-icon>{{item.icon}}</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content >
                        <v-list-item-title> {{ item.title }}</v-list-item-title>
                    </v-list-item-content>

                </v-list-item>

                <v-list-group
                      :value="false"
                      prepend-icon="vpn_lock"
                      sub-group
                      class="organizacion"
                    >
                      <template v-slot:activator>
                        <v-list-item-title class="organizacion-text">MI ORGANIZACIÓN</v-list-item-title>
                      </template>
                        <v-list-item
                        class="organizacion" v-for="(item,index) in optionsColapse"
                        :key="item.title" @click="redirect(item.link)">
                        <v-list-item-icon>
                          <v-icon>{{item.icon}}</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>{{item.title}}</v-list-item-title>
                        </v-list-item>
              </v-list-group>
            </v-list>
        </v-navigation-drawer>

        <!-- header -->
        <v-app-bar app color="#385F73">
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <v-spacer></v-spacer>
            <div class="text-caption white--text">{{userName.toUpperCase() }}</div>
            <v-menu transition="slide-x-reverse-transition">
                <template v-slot:activator="{ on, attrs }">
                    <v-btn v-bind="attrs" v-on="on" icon>
                        <v-icon class="white--text">mdi-dots-vertical</v-icon>
                    </v-btn>
                </template>
                <v-list>
                    <v-list-item v-for="(item,index) in optionsUser" :key="index" link  @click="redirect(item.link)">
                        <v-icon class="pr-4">{{item.icon}}</v-icon>
                        <v-list-item-title class="text-caption">{{item.title}}</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
        </v-app-bar>

        <!-- container  -->
        <v-main class="blue-grey lighten-5">
            <v-container fluid class="pa-md-10 ">
                <!-- content routes -->
                <router-view>
                </router-view>
            </v-container>
        </v-main>
    </div>
    <!-- Login -->
    <div v-else>
        <v-main color="#385F73">
            <v-container fluid class="pa-md-10 ">
                <!-- content routes -->
                <router-view>
                </router-view>
            </v-container>
        </v-main>
    </div>
    <!-- footer -->
    <v-footer app>
        <v-col class="text-center text-sm-body-2" cols="12">
            2020 - <strong>Facturea</strong>
        </v-col>
    </v-footer>
</div>

</template>

<script>
export default {
    data() {
            return {
                drawer: null,
                options: [{
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

                ],
                optionsColapse: [{
                        title: 'CLIENTES',
                        link: '/clientes',
                        icon: 'supervised_user_circle'
                    }, {
                        title: 'PRODUCTOS Y SERVICIOS',
                        link: '/productos',
                        icon: 'fastfood'
                    }, {
                        title: 'PEDIDOS',
                        link: '/pedidos',
                        icon: 'moped'
                    }, {
                        title: 'CONFIGURACIÓN',
                        link: '/configuracion',
                        icon: 'miscellaneous_services'
                }],
                optionsUser: [{
                    title: 'Mi Perfil',
                    icon: 'person',
                    link:''
                }, {
                    title: 'Cambiar Contraseña',
                    icon: 'lock_open',
                    link:''
                }, {
                    title: 'Salir',
                    icon: 'exit_to_app',
                    link:'/logout'
                }, ]

            }
        },
        computed: {
            logginIn() {
                return this.$store.getters.loggedIn
            },
            userName() {
              return this.$store.getters.user.name+' '+this.$store.getters.user.lastname;
            }
        }
}

</script>
<style>
.v-list-group.v-list-group--active.v-list-group--sub-group.primary--text{
  color:white !important;
}
.organizacion .v-list-group__header.v-list-item.v-list-item--link.theme--dark{
  margin-left: -7px;
}
.organizacion-text{
  margin-left: 15px;
}
</style>
