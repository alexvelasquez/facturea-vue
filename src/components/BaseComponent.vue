<style>

.v-list-group.v-list-group--active.v-list-group--sub-group.primary--text {
    color: white !important;
}

.organizacion .v-list-group__header.v-list-item.v-list-item--link.theme--dark {
    margin-left: -7px;
}

.organizacion-text {
    margin-left: 15px;
}

</style>

<template>

<div>
    <!-- user login  -->
    <div v-if="logginIn">
        <!-- sidebar -->
        <v-navigation-drawer color="#385F73" v-model="drawer" fixed temporary dark>
          <sidebar></sidebar>
        </v-navigation-drawer>

        <!-- header -->
        <v-app-bar app color="#385F73">
            <v-app-bar-nav-icon color="white" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <v-spacer></v-spacer>
            <div class="text-caption white--text">{{userName.toUpperCase() }}</div>
            <v-menu transition="slide-x-reverse-transition">
                <template v-slot:activator="{ on, attrs }">
                    <v-btn v-bind="attrs" v-on="on" icon>
                        <v-icon class="white--text">mdi-dots-vertical</v-icon>
                    </v-btn>
                </template>
                <v-list>
                    <v-list-item @click="dialogPerfil=true">
                        <v-icon class="pr-4">person</v-icon>
                        <v-list-item-title class="text-caption">Mi Perfil</v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="dialogContraseña=true">
                        <v-icon class="pr-4">lock_open</v-icon>
                        <v-list-item-title class="text-caption">Cambiar Contraseña</v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="redirect('/logout')">
                        <v-icon class="pr-4">exit_to_app</v-icon>
                        <v-list-item-title class="text-caption">Salir</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
        </v-app-bar>

        <!-- container  -->
        <v-main class=" app-auth blue-grey lighten-5">
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
    <!-- Modal Perfil -->
    <modal-perfil :dialog="dialogPerfil" @cerrar-dialog="dialogPerfil=false"></modal-perfil>

    <!-- Modal cambio contraseña -->
    <modal-clave :dialog="dialogContraseña" @cerrar-dialog="dialogContraseña=false"></modal-clave>
    <!-- footer -->
    <v-footer app>
        <v-col class="text-center text-sm-body-2" cols="12">
            2020 - <strong>Facturea</strong>
        </v-col>
    </v-footer>
</div>

</template>

<script>

import logo from '@/assets/images/logo.png'
import ModalPerfil from '@/components/usuario/ModalPerfil.vue'
import ModalClave from '@/components/usuario/ModalCambioClave.vue'
import Sidebar from '@/components/modulos/Sidebar.vue'
export default {
  components:{
    ModalPerfil,
    ModalClave,
    Sidebar
  },
    data() {
            return {
                logo: logo,
                drawer: null,
                dialogPerfil: false,
                dialogContraseña: false,
            }
        },
        computed: {
            logginIn() {
                    return this.$store.getters.loggedIn
                },
                userName() {
                    return this.$store.getters.user.name + ' ' + this.$store.getters.user.lastname;
                }
        }
}

</script>
