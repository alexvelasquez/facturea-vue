<template>

<div>
    <v-row no-gutters>
        <p class="text-lg-h6 font-weight-bold blue-grey--text text--lighten-2">Empresa</p>
    </v-row>
    <v-card>
        <v-container>
            <v-card-text class="text-subtitle-1">
                Datos Adicionales</v-card-text>
            <v-col cols="12">
                <v-row>
                    <v-col cols="12" md="4">
                        <v-text-field v-model="negocio.razon_social" label="Razón social" outlined placeholder="0" dense></v-text-field>
                    </v-col>
                    <v-col cols="12" md="2">
                        <v-text-field v-model="negocio.telefono" label="Teléfono" outlined placeholder="0" dense></v-text-field>
                    </v-col>
                    <v-col cols="12" md="5">
                        <v-text-field v-model="negocio.email" label="Email" outlined placeholder="0" dense></v-text-field>
                    </v-col>
                </v-row>
                <v-row>

                    <v-col cols="12" md="3">
                        <v-autocomplete v-model="negocio.condicion_iva.condicion_iva_id" :items="condicionesIva" item-value="condicion_iva_id" item-text="descripcion" label="Condición ante al IVA" placeholder="Seleccione una opción" outlined persistent-hint dense color="#385F73">
                        </v-autocomplete>
                    </v-col>
                    <v-col cols="12" md="2">
                        <v-text-field v-model="negocio.cuit_cuil" label="CUIT/CUIL" outlined placeholder="0" dense></v-text-field>
                    </v-col>
                    <v-col cols="12" md="2">
                        <v-menu ref="menu" v-model="menu" :close-on-content-click="false" :return-value.sync="date" transition="scale-transition" offset-y min-width="290px">
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field v-model="negocio.inicio_actividad" label="Inicio Actividades" placeholder="dd/mm/yyyy" prepend-icon="event" readonly v-bind="attrs" v-on="on" dense outlined clearable></v-text-field>
                            </template>
                            <v-date-picker v-model="negocio.inicio_actividad" no-title scrollable>
                                <v-spacer></v-spacer>
                                <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                                <v-btn text color="primary" @click="$refs.menu.save(date)">OK</v-btn>
                            </v-date-picker>
                        </v-menu>
                    </v-col>
                    <v-col cols="12" md="2">
                        <v-text-field v-model="negocio.iibb" label="IIBB" outlined placeholder="0" dense></v-text-field>
                    </v-col>
                    <v-col cols="12" md="2">
                        <v-text-field v-model="negocio.punto_vta" label="Punto de Venta" outlined placeholder="0" type="number" dense></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" md="3">
                        <v-autocomplete v-model="negocio.localidad.provincia.provincia_id" :items="provincias" label="Provincia" item-value="provincia_id" item-text="descripcion" placeholder="Seleccione una opción" autocomplete="new-password" outlined persistent-hint dense color="#385F73">
                        </v-autocomplete>
                    </v-col>
                    <v-col cols="12" md="3">
                        <v-autocomplete v-model="negocio.localidad.localidad_id" :items="localidades" label="Localidad" item-value="localidad_id" item-text="descripcion" placeholder="Seleccione una opción" outlined persistent-hint dense color="#385F73" :disabled="negocio.localidad.provincia.provincia_id == null">
                        </v-autocomplete>
                    </v-col>
                    <v-col cols="12" md="1">
                        <v-text-field v-model="negocio.codigo_postal" label="C. Postal" outlined placeholder="0" dense></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4">
                        <v-text-field v-model="negocio.direccion" label="Dirección fiscal" outlined placeholder="0" dense></v-text-field>
                    </v-col>

                </v-row>
                <v-row>
                    <v-col cols="12" md="12" align="center">
                      <v-col cols="12" md="6" align="center">
                        <v-file-input v-if="!editable" @change="onFileChange" accept="image/png, image/jpeg" placeholder="Cargue el logo de la empresa" prepend-icon="mdi-camera" label="Logo" :error-messages="errorImagen" outlined persistent-hint hint="Tamaño máximo recomendable 220x220px"
                        dense></v-file-input>
                        <div v-else>
                            <v-alert outlined color="grey">
                                <div class="subtitle-1" align="center">LOGO</div>
                                <div>
                                    <v-hover v-slot:default="{ hover }">
                                        <v-card :key="refreshImg" :max-width="imagen.width" :width="imagen.width" :elevation="hover ? 12 : 2" class="card-img" :class="{ 'on-hover': hover }">
                                            <v-img :key="refreshImg" :src="imagen.url">
                                                <div align="end">
                                                    <v-btn @click="editable=false" circle :color="hover ? 'black' : 'transparent'" title="eliminar" icon>
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
                </v-row>
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
                refreshImg: 0,
                condicionesIva: [],
                provincias: [],
                localidades: [],
                valor: 'valorr',
                date: new Date().toISOString().substr(0, 10),

                razonSocialRules: [
                    v => !!v || 'Razon Social es requerida'
                ],
                telefonoRules: [
                    v => /^[0-9]{1,20}$/.test(v) || 'Teléfono invalido'
                ],
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
                            if (this.provinciaNegocio) {
                                axios.get(`datosGeograficos/localidades/${this.provinciaNegocio}`)
                                    .then(response => {
                                        this.localidades = response.data.data;
                                    })
                            }
                        }))
                        .catch(error => {
                            console.log(error)
                        })
                },
                cargarDatosLogo() {
                    if (this.negocio.logo) {
                        this.imagen = new Image();
                        this.imagen.src = this.urlImage(this.negocio.logo);
                        this.imagen.url = this.urlImage(this.negocio.logo);
                        this.refreshImg = new Date().getTime();
                        this.editable = true;
                    }
                },
                onFileChange(e) {
                    if (e) {
                        console.log(e);
                        this.negocio.logo = e;
                        var reader = new FileReader();
                        reader.readAsDataURL(e);
                        reader.onload = (e) => {
                            let img = new Image();
                            img.onload = () => {
                                if (img.width > 220 && img.height > 220) {
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
                            this.negocio.logo = img.src;
                        }
                    } else {
                        this.errorImagen = null
                        this.negocio.logo = null
                        this.editable = false;
                    }
                },

                modificar() {
                    axios.put(`negocio/editar/${this.negocio.negocio_id}`, this.negocio)
                        .then(response => {
                            this.$store.dispatch('changeUserNegocio', response.data.data)
                            this.notificacion('Datos guardados correctamente','success')
                        })
                },
        },
        watch: {
            provinciaNegocio() {
                if (this.provinciaNegocio) {
                    axios.get(`datosGeograficos/localidades/${this.provinciaNegocio}`)
                        .then(response => {
                            this.localidades = response.data.data;
                        })
                }
            }
        },
        computed: {
            negocio() {
                    return this.$store.getters.negocioUser
                },
                provinciaNegocio() {
                    return this.$store.getters.negocioUser.localidad.provincia.provincia_id
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

</style>
