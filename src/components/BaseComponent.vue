<style l>

.v-expansion-panel-content__wrap {
    padding: 0px !important;
}

.v-expansion-panel-header__icon {
    margin-bottom: 15px !important;
}

</style>

<template>

<div>
    <!-- user login  -->
    <div v-if="logginIn">
        <!-- sidebar -->
        <v-navigation-drawer color="#385F73" v-model="drawer" absolute temporary dark>
            <v-list-item>
                <v-list-item-content>
                    <v-list-item-title justify="center">Facturea</v-list-item-title>
                </v-list-item-content>
            </v-list-item>

            <v-divider></v-divider>
            <v-list dense>
                <v-list-item v-for="item in options" :key="item.title" link :href="item.link">
                    <v-list-item-icon>
                        <v-icon>{{item.icon}}</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title> {{ item.title }}</v-list-item-title>
                    </v-list-item-content>

                </v-list-item>
                <v-list-item>
                    <v-expansion-panels flat dark>
                        <v-expansion-panel v-for="(item,i) in optionsColapse" :key="i">

                            <v-expansion-panel-header color="#385F73" class="px-0">
                                <p class=" v-list-item__title">
                                    <v-icon class="pr-8">groups</v-icon>{{item.title}} </p>
                            </v-expansion-panel-header>

                            <v-expansion-panel-content color="#385F73">
                                <v-list class="mx-0" dense>
                                    <v-list-item v-for="value in item.options" :key="value.title" link :href="value.link">
                                        <v-list-item-icon>
                                            <v-icon>{{value.icon}}</v-icon>
                                        </v-list-item-icon>
                                        <v-list-item-content>
                                            <v-list-item-title> {{ value.title }}</v-list-item-title>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-list>
                            </v-expansion-panel-content>

                        </v-expansion-panel>
                    </v-expansion-panels>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>

        <!-- header -->
        <v-app-bar app color="#385F73">
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <v-spacer></v-spacer>
            <div class="text-caption white--text">Alex Velasquez</div>
            <v-menu transition="slide-x-reverse-transition">
                <template v-slot:activator="{ on, attrs }">
                    <v-btn v-bind="attrs" v-on="on" icon>
                        <v-icon class="white--text">mdi-dots-vertical</v-icon>
                    </v-btn>
                </template>
                <v-list>
                    <v-list-item v-for="(item,index) in optionsUser" :key="index" link>
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
                        title: 'FACTURACIÓN',
                        link: '/facturacion',
                        icon: 'book_online'
                    },

                ],
                optionsColapse: [{
                    title: 'MI ORGANIZACIÓN',
                    options: [{
                        title: 'CLIENTES',
                        link: '/clientes',
                        icon: 'people'
                    }, {
                        title: 'PRODUCTOS Y SERVICIOS',
                        link: '/productos',
                        icon: 'shopping_bag'
                    }, {
                        title: 'PEDIDOS',
                        link: '/pedidos',
                        icon: 'pending_actions'
                    }, {
                        title: 'EMPRESA',
                        link: '/empresa',
                        icon: 'store'
                    }, ]
                }],
                optionsUser: [{
                    title: 'Mi Perfil',
                    icon: 'person'
                }, {
                    title: 'Cambiar Contraseña',
                    icon: 'vpn_key'
                }, {
                    title: 'Salir',
                    icon: 'login'
                }, ]

            }
        },
        computed: {
            logginIn() {
                return this.$store.getters.loggedIn
            }
        }
}

</script>
<style>

</style>
