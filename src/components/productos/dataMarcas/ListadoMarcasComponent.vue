

<template>

<div>
    <v-row no-gutters>
        <v-col cols="12">
            <p class="text-lg-h6 font-weight-bold blue-grey--text text--lighten-2">Marcas</p>
        </v-col>
    </v-row>
    <v-card>

        <v-card-title>
            <v-col cols="6" sm="4">
                <v-row>
                    <v-text-field v-model="search" append-icon="mdi-magnify" label="Buscar Marcas" single-line hide-details></v-text-field>
                </v-row>
            </v-col>
            <v-spacer></v-spacer>


        </v-card-title>
        <v-data-table v-model="selected" :headers="cabeceras" item-key="name" :items="marcas" :search="search" show-select>
            <template v-slot:[`item.actions`]="{item}">
                <v-tooltip top>
                    <template v-slot:activator="{ on, attrs }">
                        <v-icon medium color="#385F73" class="mr-2" v-bind="attrs" v-on="on" @click="modalMarca(item)">
                            mdi-pencil
                        </v-icon>
                    </template>
                    <span>Editar</span>
                </v-tooltip>
                <v-tooltip top >
                    <template v-slot:activator="{ on, attrs }">
                        <v-icon medium color="#385F73" class="mr-2" v-bind="attrs" v-on="on" @click="eliminarMarca(item)">
                            mdi-close
                        </v-icon>
                    </template>
                    <span>Eliminar</span>
                </v-tooltip>
            </template>
        </v-data-table>
        <v-row id="actions-productos">
            <v-col cols="12" sm="12" md="12" align="end">
                <v-btn outlined color="#385F73" dark class="mb-2 mr-md-2">EXPORTAR XLS
                </v-btn>
                <v-btn outlined color="#385F73" dark class="mb-2 mr-md-2">ELIMINAR SELECCIONADOS
                </v-btn>
                <v-btn outlined @click="$router.push('/productos')" color="#385F73" dark class="mb-2 mr-md-2">PRODUCTOS
                </v-btn>
                <modal-marca :editable="editable" :dialog="dialog" :marca="itemMarca" @cerrar-dialog="close" @agregar-marca="agregarMarca($event)" @editar-marca="editarMarca($event)">
                </modal-marca>
            </v-col>
        </v-row>
    </v-card>
</div>

</template>

<script>

import ModalMarca from '@/components/productos/dataMarcas/ModalMarcaComponent'
export default {
    components: {
        ModalMarca
    },
    data: () => ({
        dialog: false,
        cabeceras: [{
            text: 'Código',
            align: 'center',
            sortable: true,
            value: 'marca_id'
        }, {
            text: 'Descripción',
            value: 'descripcion'
        }, {
            text: 'Acciones',
            value: 'actions',
            align: 'center',
            sortable: false
        }, ],
        marcas: [],

        search: '',
        indexEditable: -1,
        selected: [],
        itemMarca: {},
        defaultMarca: {},
        options: [{
            text: 'Productos Y Servicios',
            disabled: false,
            href: '/productos',
        }, {
            text: 'Marcas',
            disabled: true,
            href: '',
        }, ]
    }),


    mounted() {
        this.cargarMarcas();
    },
    methods: {
        cargarMarcas() {
                axios.get(`marcas/negocio/${this.negocio.negocio_id}`)
                    .then(response => {
                        this.marcas = response.data.data;
                    })
                    .catch(error => {
                        this.notificacion('Ha ocurrido al recuperar las marcas','error')
                    })
            },

            agregarMarca(item) {
                axios.post(`marcas/negocio/${this.negocio.negocio_id}/nuevo`, item)
                    .then(response => {
                        this.marcas.push(response.data.data);
                        this.notificacion('Marca agregada correctamente', 'success')
                    })
                    .catch(error => {
                        this.notificacion('Ha ocurrido al agregar la marca','error')
                    })
            },

            editarMarca(item) {
                this.$swal({
                    title: "¿Estas seguro que deseas modificarla?",
                    showCancelButton: true,
                }).then((result) => {
                    if (result.value) {
                        this.dialog = false
                        axios.put(`marcas/editar/${item.marca_id}`, item)
                            .then(response => {
                                Object.assign(this.marcas[this.indexEditable], response.data.data)
                                this.notificacion('Marca modificada correctamente', 'success');
                                this.close();
                            })
                            .catch(error => {
                                this.notificacion('Ha ocurrido al modificar la marca','error')
                            })
                    }
                })
            },

            modalMarca(item) {
                this.indexEditable = this.marcas.indexOf(item);
                this.itemMarca = Object.assign({}, item)
                this.dialog = true
            },


            close() {
                this.dialog = false;
                this.indexEditable = -1;
                this.$nextTick(() => {
                    this.itemMarca = Object.assign({}, this.defaultMarca);
                })
            },

    },

    computed: {
        editable() {
            return this.indexEditable > -1 ? true : false;
        },
    }
}

</script>
