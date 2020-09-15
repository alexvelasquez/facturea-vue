<template>
    <v-dialog  v-model="dialogMarca" :max-width="'500px'" persistent>
        <template v-slot:activator="{ on, attrs }">
        <v-btn
            outlined
            color="#385F73"
            dark
            @click="$refs.form.reset()"
            class="mb-2 mr-md-2"
            v-bind="attrs"
            v-on="on"
        >Nueva Marca</v-btn>
        </template>
        <v-card >

        <v-tabs
            v-model="tab"
            background-color="transparent"
            color="#385F73"
            grow
        >
            <v-tab @click="tabImpor=false">{{editable ? 'MODIFICAR MARCA' : 'NUEVA MARCA'}}</v-tab>
            <v-tab v-if="!editable" @click="tabImpor=true">IMPORTAR MARCAS</v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
            <v-tab-item>
            <v-card flat>
                <v-form
                    ref="form"
                >
                <v-card-text>
                    <v-container>
                    <v-row>
                        <v-col cols="12" sm="12" md="12" class="pt-md-0">
                            <v-row>
                                <v-col cols="12" sm="12" md="12" >
                                <v-text-field
                                    v-model="itemMarca.descripcion"
                                    label="Nombre"
                                    color="#385F73"
                                    placeholder="nombre de la marca"
                                    :rules="obligatorio"
                                    outlined
                                    dense>
                                </v-text-field>
                                </v-col>
                            </v-row>
                        </v-col>
                    </v-row>
                    </v-container>
                </v-card-text>
                </v-form>
                <v-card-actions class="pt-md-0">
                    <v-spacer></v-spacer>
                    <v-btn color="#385F73" text @click="cerrarDialog">Cancelar</v-btn>
                    <v-btn v-if="!editable" color="#385F73" text @click="agregarMarca">AGREGAR</v-btn>
                    <v-btn v-else color="#385F73" text @click="editarMarca">MODIFICAR</v-btn>
                </v-card-actions>
            </v-card>
            </v-tab-item>
            <v-tab-item>
            <v-card flat>
                <v-card-text>
                    <v-container>
                    <v-row>
                        <v-col cols="12" sm="12" md="12">
                        <v-file-input
                            v-model="files"
                            label="Archivo marca"
                            placeholder="subir archivo"
                            multiple
                            prepend-icon="mdi-paperclip"
                        >
                            <template v-slot:selection="{ text }">
                            <v-chip
                                small
                                label
                                color="#385F73"
                            >
                                {{ text }}
                            </v-chip>
                            </template>
                        </v-file-input>
                        </v-col>
                        <v-row>
                            <v-col cols="12" sm="12" md="12" justify="end" align="center" class="py-md-0">
                                <p class="text-button">¿ No sabes como crear el archivo ?</p>
                            </v-col>
                            <v-col cols="12" sm="6" md="6" justify="center" align="center"  class="pt-md-0">
                                 <v-btn outlined color="#385F73" class="mr-md-3" dark>Descargar modelo XSLX</v-btn>
                            </v-col>
                            <v-col cols="12" sm="6" md="6" justify="center" align="center" class="pt-md-0">
                                <v-btn outlined color="#385F73" dark>Descargar ejemplo</v-btn>
                            </v-col>
                        </v-row>
                    </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                        <v-btn color="#385F73" text @click="cerrarDialog">Cancelar</v-btn>
                </v-card-actions>
            </v-card>
            </v-tab-item>
        </v-tabs-items>
        </v-card>
    </v-dialog>
</template>
<script>
export default {
   props: {
        marca: {
            type: Object,
            default:{},
        },

        dialog: {
            type: Boolean
        },
        editable:{
            type: Boolean
        },
    },

    data() {
        return {
          /** NUEVO PRODUCTO */
            marcas:[],
            files:[],
            model: null,
            allow:false,
            tab:null,
            activar:true,
            dialogMarca:this.dialog,
            tabImpor:false,
            obligatorio: [
                v => !!v || 'Este campo es requerido'
            ],
        }
    },
    methods: {
        agregarMarca()
        {
            if(this.$refs.form.validate()){
                this.dialogMarca = false;
                this.$emit('agregar-marca',this.itemMarca)
            }
        },
        editarMarca()
        {
            if(this.$refs.form.validate()){
                this.dialogMarca = false;
                this.$emit('editar-marca',this.itemMarca);
            }
        },
        refreshDialog(){
            /** se hace esto debido a que la props dialog no puede set modificada */
            this.dialogMarca = false;
            this.$refs.form.reset()
        },
        cerrarDialog()
        {
            this.refreshDialog();
            this.$emit('cerrar-dialog');
        }
    },
    watch: {
        dialog()
        {
            this.dialogMarca = this.dialog;
        },
    },
    computed:{
        itemMarca()
        {
            return this.marca;
        },
    },
}
</script>
