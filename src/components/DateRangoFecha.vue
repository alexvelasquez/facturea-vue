

<template>

<div>
    <v-bottom-navigation v-model="bottomNav" color="black" class="justify-center">
        <v-btn @click="buscarMontos('hoy')">
            <span>Hoy</span>
        </v-btn>

        <v-btn @click="buscarMontos('ayer')">
            <span>Ayer</span>
        </v-btn>

        <v-btn @click="buscarMontos('mes')">
            <span>Últimos 30 días</span>
        </v-btn>
    </v-bottom-navigation>
    <v-row justify='center'>
        <v-col cols="6" md="2">
            <v-menu v-model="menu1" :close-on-content-click="false" transition="scale-transition" offset-y max-width="290px" min-width="290px">
                <template v-slot:activator="{ on, attrs }">
                    <v-text-field v-model="fechaDesde" label="Fecha Desde"  persistent-hint prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"></v-text-field>
                </template>
                <v-date-picker v-model="dateDesde" no-title @input="menu1 = false"></v-date-picker>
            </v-menu>
        </v-col>
        <v-col cols="6" md="2">
          <v-menu v-model="menu2" :close-on-content-click="false" transition="scale-transition" offset-y max-width="290px" min-width="290px">
              <template v-slot:activator="{ on, attrs }">
                  <v-text-field v-model="fechaHasta" label="Fecha Hasta"  persistent-hint prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"></v-text-field>
              </template>
              <v-date-picker v-model="dateHasta" no-title @input="menu2 = false"></v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="6" md="4" class="mt-3" v-if="error">
          <p class="red--text" style="font-size: 12px;"><strong>Fecha Desde </strong>no puede ser mayor que la <strong>Fecha Hasta</strong></p>
        </v-col>
    </v-row>
</div>

</template>

<script>

export default {
    data: vm => ({
        bottomNav: 2,
        dateDesde: moment().subtract(30,'d').format('YYYY-MM-DD'),
        dateHasta: moment().format('YYYY-MM-DD'),
        menu1: false,
        menu2: false,
        error:false
    }),

    methods: {
            buscarMontos(tipo) {
                this.dateHasta = moment().format('YYYY-MM-DD');
                switch (tipo) {
                    case 'hoy':
                        this.dateDesde = moment().format('YYYY-MM-DD');
                        this.$emit('buscar', {
                            fechaDesde: this.dateDesde,
                            fechaHasta: this.dateHasta
                        });
                        break;
                    case 'ayer':
                        this.dateDesde = moment().subtract(1, 'd').format('YYYY-MM-DD');
                        this.$emit('buscar', {
                            fechaDesde: this.dateDesde,
                            fechaHasta: this.dateHasta
                        });
                        break;
                    case 'mes':
                        this.dateDesde = moment().subtract(30, 'd').format('YYYY-MM-DD');
                        this.$emit('buscar', {
                            fechaDesde: this.dateDesde,
                            fechaHasta: this.dateHasta
                        });
                        break;
                    default:

                }
            }
    },
    watch:{
      dateDesde(){
        if(this.dateDesde <= this.dateHasta){
          this.error = false;
          this.$emit('buscar', {
              fechaDesde: this.dateDesde,
              fechaHasta: this.dateHasta
          });
        }
        else{
          this.error = true;
        }
      },
      dateHasta(){
        if(this.dateDesde <= this.dateHasta){
          this.error = false;
          this.$emit('buscar', {
              fechaDesde: this.dateDesde,
              fechaHasta: this.dateHasta
          });
        }
        else{
          this.error = true;
        }
      },
    },
    computed: {
        fechaDesde:{
              get(){
                return moment(this.dateDesde).format('DD/MM/YYYY');
              },
              set(value){
                this.dateDesde = value
              }
        },
        fechaHasta:{
              get(){
                return moment(this.dateHasta).format('DD/MM/YYYY');
              },
              set(value){
                this.dateHasta = value
              }
        },
    }
}

</script>
