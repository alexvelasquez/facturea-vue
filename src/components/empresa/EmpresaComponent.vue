provincia<template>

<div>
    <v-row no-gutters>
        <p class="text-lg-h6 font-weight-bold blue-grey--text text--lighten-2">Configuración</p>
    </v-row>
    <v-card>
        <v-container>
            <p class="text-subtitle-1 font-weight-bold blue-grey--text text--lighten-2">Datos Negocio</p>
            <v-form ref="form">
                <v-row>
                <v-col cols="12" md="8">
                    <v-row style="margin-bottom:-30px">
                        <v-col cols="12" md="6">
                            <v-text-field v-model="razonSocial" :rules="reglasValidacion.campoRequerido" label="Razón social(*)" outlined placeholder="Ingrese una razon social" dense></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-text-field v-model="email" :rules="reglasValidacion.campoRequerido" label="Email(*)" outlined placeholder="Ingrese un email" dense></v-text-field>
                        </v-col>

                    </v-row>
                    <v-row style="margin-bottom:-30px">
                        <v-col cols="12" md="6">
                            <v-autocomplete v-model="provincia" :items="provincias" :rules="reglasValidacion.campoRequerido" label="Provincia(*)" item-value="provincia_id" item-text="descripcion" placeholder="Seleccione una opción" autocomplete="new-password" outlined persistent-hint dense color="#385F73">
                            </v-autocomplete>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-autocomplete v-model="localidad" :items="localidades" :rules="reglasValidacion.campoRequerido" label="Localidad(*)" item-value="localidad_id" autocomplete="new-password" item-text="descripcion" placeholder="Seleccione una opción" outlined persistent-hint dense color="#385F73" :disabled="provincia == null">
                            </v-autocomplete>
                        </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12" md="6">
                          <v-text-field v-model="direccion" :rules="reglasValidacion.campoRequerido" label="Dirección fiscal(*)" outlined placeholder="Ingrese una dirección" dense></v-text-field>
                      </v-col>
                      <v-col cols="12" md="3">
                          <v-text-field v-model="telefono" :rules="reglasValidacion.campoRequerido" label="Teléfono(*)" outlined placeholder="Ingrese un teléfono" dense></v-text-field>
                      </v-col>
                      <v-col cols="12" md="3">
                          <v-text-field v-model="cuitCuil" :rules="reglasValidacion.campoRequerido" label="CUIT/CUIL(*)" outlined placeholder="Ingrese CUIT/CUIL" dense></v-text-field>
                      </v-col>
                    </v-row>
                    <p v-if="facturaElectronicaHabilitada" class="text-subtitle-1 font-weight-bold blue-grey--text text--lighten-2">Datos Facturación</p>
                    <v-row v-if="facturaElectronicaHabilitada" style="margin-bottom:-30px">
                        <v-col cols="12" md="6">
                          <v-text-field v-model="nombreFantasia" :rules="reglasValidacion.campoRequerido" label="Nombre de fantasia(*)" outlined placeholder="Ingrese un nombre" dense></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6">
                          <v-select v-model="condicionIva" :items="condicionesIva" item-value="condicion_iva_id" item-text="descripcion" :rules="reglasValidacion.campoRequerido" label="Condición ante al IVA(*)" placeholder="Seleccione una opción" outlined persistent-hint dense color="#385F73"></v-select>
                        </v-col>
                    </v-row>
                    <v-row v-if="facturaElectronicaHabilitada" style="margin-bottom:-30px">
                      <v-col cols="12" md="4">
                          <v-text-field v-model="iibb" :rules="reglasValidacion.campoRequerido" label="IIBB(*)" outlined placeholder="0" dense></v-text-field>
                      </v-col>
                      <v-col cols="12" md="4">
                          <!-- <v-menu ref="menu" v-model="menu" :close-on-content-click="false" :return-value.sync="date" transition="scale-transition" offset-y min-width="290px">
                              <template v-slot:activator="{ on, attrs }">
                                  <v-text-field v-model="inicioActividad" :rules="reglasValidacion.campoRequerido" label="Inic. Actividades(*)" placeholder="YYYY-MM-DD"  prepend-icon="event" readonly v-bind="attrs" v-on="on" dense outlined clearable></v-text-field>
                              </template>
                              <v-date-picker v-model="inicioActividad" no-title scrollable>
                                  <v-spacer></v-spacer>
                                  <v-btn text color="primary" @click="menu = false">Cancelar</v-btn>
                                  <v-btn text color="primary" @click="$refs.menu.save(date)">Aceptar</v-btn>
                              </v-date-picker>
                          </v-menu> -->
                          <v-menu v-model="menu" :close-on-content-click="false" transition="scale-transition">
                              <template v-slot:activator="{ on, attrs }">
                                  <v-text-field v-model="formatInicioActividad" :rules="reglasValidacion.campoRequerido" label="Inic. Actividades(*)" placeholder="YYYY-MM-DD"  persistent-hint prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on" dense outlined clearable></v-text-field>
                              </template>
                              <v-date-picker v-model="inicioActividad" no-title @input="menu = false"></v-date-picker>
                          </v-menu>
                      </v-col>
                      <v-col cols="12" md="4">
                          <v-text-field v-model="puntoVenta" :rules="reglasValidacion.campoRequerido" label="Punto de Venta(*)" outlined placeholder="0" type="number" dense></v-text-field>
                      </v-col>
                    </v-row>
                    </v-col>
                    <v-col cols="12" md="4" align="center">
                      <v-col cols="12" md="12" align="center">
                        <v-file-input v-if="!editable" @change="onFileChange" accept="image/png, image/jpeg" placeholder="Click aquí para agregar logo" prepend-icon="mdi-camera" label="Logo" :error-messages="errorImagen" outlined persistent-hint hint="Tamaño máximo recomendable 120x60px"
                        dense></v-file-input>
                        <div v-else>
                          <div class="subtitle-1" align="left">Logo Empresa</div>
                            <v-alert outlined color="grey">
                                <div>
                                    <v-hover v-slot:default="{ hover }">
                                        <v-card  :max-width="imagen.width" :width="imagen.width" :elevation="hover ? 12 : 2" class="card-img" :class="{ 'on-hover': hover }">
                                            <v-img :src="logo">
                                                <div align="end">
                                                    <v-btn @click="eliminarLogo" circle :color="hover ? 'black' : 'transparent'" title="eliminar" icon>
                                                        <v-icon circle medium :color="hover ? 'black' : 'transparent'">
                                                            close
                                                        </v-icon>
                                                    </v-btn>
                                                </div>
                                            </v-img>
                                        </v-card>
                                    </v-hover>
                                </div>
                            </v-alert>
                        </div>
                      </v-col >
                    </v-col>
                    <v-col cols="12">
                      <span class="caption">(*) campos obligatorios</span>
                    </v-col>
                    </v-row>
                </v-form>
                <v-row>
                    <v-col cols="12" sm="12" md="12" align="end">
                        <v-btn outlined color="#385F73" dark class="mb-2 mr-md-2" @click="modificar">GUARDAR CAMBIOS</v-btn>
                    </v-col>
                </v-row>
            </v-col>

        </v-container>
    </v-card>
</div>

</template>

<script>

export default {
    data() {
            return {
                valid: false,
                empresa: null,
                url: null,
                imagen: {},
                menu: false,
                editable: false,
                url: '',
                errorImagen: null,
                condicionesIva: [],
                provincias: [],
                localidades: [],
                valor: 'valorr',
                date: moment().format('YYYY-MM-DD')
            }
        },
        mounted() {
            this.cargarDatosEmpresa();
            this.cargarDatosLogo();
            this.$forceUpdate();
        },
        methods: {
            cargarDatosEmpresa() {
                    axios.all([axios.get(`datosGeograficos/provincias`),
                            axios.get(`afip/condicionesIva`),
                        ])
                        .then(axios.spread((provincias, condicionesIva) => {
                            this.provincias = provincias.data.data;
                            this.condicionesIva = condicionesIva.data.data;
                            if (this.provincia) {
                                axios.get(`datosGeograficos/localidades/${this.provincia}`)
                                    .then(response => {
                                        this.localidades = response.data.data;
                                    })
                            }
                        }))
                        .catch(error => {

                        })
                },
                cargarDatosLogo() {
                    if (this.logo) {
                        this.imagen = new Image();
                        this.imagen.src = this.logo
                        this.imagen.url = this.logo
                        this.editable = true;
                    }
                },
                onFileChange(e) {
                    if (e) {
                        this.logo = e;
                        var reader = new FileReader();
                        reader.readAsDataURL(e);
                        reader.onload = (e) => {
                            let img = new Image();
                            img.onload = () => {
                                if (img.width > 120 && img.height > 60) {
                                    this.errorImagen = 'La imagen supera el tamaño recomendado'
                                } else {
                                    this.errorImagen = null;
                                    this.imagen.width = img.width;
                                    this.imagen.height = img.height;
                                    this.imagen.url = e.target.result;
                                    this.editable = true;
                                }
                            }
                            img.src = e.target.result
                            this.logo = img.src;
                        }
                    } else {
                        this.errorImagen = null
                        this.logo = null
                        this.editable = false;
                    }
                },

                modificar() {
                  if(this.$refs.form.validate()){
                    axios.put(`negocio/editar/${this.negocio.negocio_id}`, this.negocio)
                        .then(response => {
                            /** Guardo el usuario en el localStorage */
                            this.$store.dispatch('changeUserNegocio', response.data.data)
                            this.notificacion('MODIFICADO CORRECTAMENTE','success')
                            this.redirect('/home')
                        })
                  }
                },
                eliminarLogo(){
                  this.editable = false;
                  this.logo = '';
                }
        },
        watch: {
            provincia() {
                if (this.provincia) {
                    axios.get(`datosGeograficos/localidades/${this.provincia}`)
                        .then(response => {
                            this.localidades = response.data.data;
                        })
                }
            }
        },
        computed: {
            reglasValidacion() {
                return {
                    campoRequerido: [
                        v => !!v || 'Este campo es requerido',
                    ],
                    emailRules: [
                            v => !!v || 'Este campo es requerido',
                            v => /.+@.+\..+/.test(v) || 'Email no valido',
                          ],
                    telefonoRules: [
                        v => /^[0-9]{1,20}$/.test(v) || 'Teléfono invalido'
                    ],
                }
            },
            razonSocial:{
                get(){
                  return this.$store.getters.getNegocioRazonSocial
                },
                set(value){
                  this.$store.commit('setNegocioRazonSocial',value)
                }
            },
            nombreFantasia:{
                get(){
                  return this.$store.getters.getNegocioNombreFantasia
                },
                set(value){
                  this.$store.commit('setNegocioNombreFantasia',value)
                }
            },
            email:{
              get(){
                return this.$store.getters.getNegocioEmail
              },
              set(value){
                this.$store.commit('setNegocioEmail',value)
              }
            },
            provincia:{
              get(){
                return this.$store.getters.getNegocioProvincia
              },
              set(value){
                this.$store.commit('setNegocioProvincia',value)
              }
            },
            localidad:{
              get(){
                return this.$store.getters.getNegocioLocalidad
              },
              set(value){
                this.$store.commit('setNegocioLocalidad',value)
              }
            },
            direccion:{
              get(){
                return this.$store.getters.getNegocioDireccion
              },
              set(value){
                this.$store.commit('setNegocioDireccion',value)
              }
            },
            telefono:{
              get(){
                return this.$store.getters.getNegocioTelefono
              },
              set(value){
                this.$store.commit('setNegocioTelefono',value)
              }
            },
            cuitCuil:{
              get(){
                return this.$store.getters.getNegocioCuitCuil
              },
              set(value){
                this.$store.commit('setNegocioCuitCuil',value)
              }
            },
            condicionIva:{
              get(){
                return this.$store.getters.getNegocioCondicionIva
              },
              set(value){
                this.$store.commit('setNegocioCondicionIva',value)
              }
            },
            puntoVenta:{
              get(){
                return this.$store.getters.getNegocioPuntoVenta;
              },
              set(value){
                this.$store.commit('setNegocioPuntoVenta',value)
              }
            },
            logo:{
              get(){
                return this.$store.getters.getNegocioLogo;
              },
              set(value){
                this.$store.commit('setNegocioLogo',value)
              }
            },
            iibb:{
                get(){
                  return this.$store.getters.getNegocioIibb
                },
                set(value){
                  this.$store.commit('setNegocioIibb',value)
                }
            },
            inicioActividad:{
              get(){
                return moment(this.$store.getters.getNegocioInicioActividad).format('YYYY-MM-DD')
              },
              set(value){
                this.$store.commit('setNegocioInicioActividad',value)
              }
            },

            formatInicioActividad(){
              return moment(this.inicioActividad).format('DD/MM/YYYY');
            }

        }
}

</script>
<style>

.show-btns {
    color: rgba(255, 255, 255, 1) !important;
}

.logo-title {
    margin-top: -5px;
    margin-left: -17px
}

.card-img:hover {
    opacity: 0.6;
}

.v-file-input__text.v-file-input__text--placeholder{
  height: 150px;
}

</style>
