

<template>

<v-dialog v-model="dialog" max-width="550" persistent>
    <template v-slot:activator="{ on, attrs }">
        <v-btn outlined color="#385F73" dark class="mb-2 mr-md-2" v-bind="attrs" v-on="on" @click="dialog=true">AUMENTO POR MARCA</v-btn>
    </template>
    <v-card>
        <v-tabs v-model="tab" background-color="transparent" color="#385F73" grow>
            <v-tab>APLICAR AUMENTO</v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
            <v-tab-item>
                <v-card flat>
                    <v-alert class="mt-3 mx-5" dense outlined color="#385F73" dismissible>
                      El aumento aplicado, impactará el precio de compra del producto
                    </v-alert>
                    <v-form ref="form">
                        <v-card-text>
                            <v-container>
                                <v-row>
                                    <v-col cols="12" sm="12" md="7">
                                        <v-autocomplete v-model="aumento.marca" :items="marcas" item-value="marca_id" item-text="descripcion" :rules="requerido" label="Descripción" hint="campo obligatorio(*)" placeholder="Buscar marca" outlined persistent-hint dense color="#385F73">
                                        </v-autocomplete>
                                    </v-col>
                                    <v-col cols="12" sm="12" md="5">
                                        <v-text-field  v-model="aumento.incremento" :rules="requerido" label="Aumento(%)" placeholder="0" type="number" hint="campo obligatorio(*)" persistent-hint outlined dense>
                                        </v-text-field>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-card-text>
                    </v-form>
                    <v-card-actions class="pt-md-0">
                        <v-spacer></v-spacer>
                        <v-btn color="#385F73" text @click="cerrarDialog">CANCELAR</v-btn>
                        <v-btn color="#385F73" text @click="aumentar">AUMENTAR</v-btn>
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
        marcas:{
          type:Array,
          default:null
        },
        categorias:{
          type:Array,
          default:null
        }
    },
    data() {
        return {
            tab: null,
            dialog: false,
            aumento: {
                marca: null,
                incremento: null
            },
            requerido: [
                v => !!v || 'Este campo es requerido'
            ],
        }
    },
    methods: {
        aumentar() {
            if (this.$refs.form.validate()) {
              this.$swal({
                  title: "¿Quieres aplicar este aumento a las cuentas de los clientes?",
                  showCancelButton: true,
                  confirmButtonText:'Si, aplicar'
              }).then((result) => {
                  this.dialog = false;
                  this.aumento['cuentaCorriente']= (result.value) ? 1 : 0;
                  axios.put(`marcas/incremento`, this.aumento)
                      .then(response => {
                          if(response.data.code == 200){
                            this.notificacion('Aumento aplicado correctamente','success');
                            this.$refs.form.reset();
                          }
                      })
                      .catch(error => {
                          this.notificacion('Ha ocurrido al modificar la marca','error')
                    })

              })
            }
        },
        cerrarDialog(){
          this.$refs.form.reset();
          this.dialog = false;
        }
    }
}

</script>
<style media="screen">
  .v-alert__content{
    font-size: 13px;
  }
</style>
