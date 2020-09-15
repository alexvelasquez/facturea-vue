<template>

    <div>
        <v-row no-gutters>
            <v-col cols="12"><p class="text-lg-h6 font-weight-bold blue-grey--text text--lighten-2">Pedidos</p></v-col>
        </v-row>
        <card-header :cards="cards"></card-header>
    <v-card>
        <v-card-title>
        <v-col cols="6" sm="4">
            <v-row >
            <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Buscar Pedido"
                single-line
                hide-details
            ></v-text-field>
            </v-row>
        </v-col>
        <v-spacer></v-spacer>
        

        </v-card-title>
        <v-data-table
        :headers="headers"
        :items="desserts"
        :search="search"
        >
        <template v-slot:item.actions="{ item }">
            <v-icon
              medium
              color="#385F73"
              class="mr-2"
              @click="editItem(item)"
              v-bind="item"
            >
            check
          </v-icon>
            <v-icon
              medium
              color="#385F73"
              class="mr-2"
              @click="editItem(item)"
              v-bind="item"
            >
            remove_red_eye
          </v-icon>
          <v-icon
              medium
              color="#385F73"
              class="mr-2"
              @click="editItem(item)"
              v-bind="item"
          >
              mdi-pencil
          </v-icon>
          <v-icon
              medium
              color="#385F73"
              @click="deleteItem(item)"
          >
              mdi-close
          </v-icon>
        </template>
        </v-data-table>
        <v-row>
          <v-col cols="12" sm="12" md="12" align="end">
              <v-btn
              href="/pedidos/nuevo"
              outlined
              color="#385F73"
              dark
              class="mb-2 mr-md-2"
              v-bind="attrs"
              v-on="on"
            >Nuevo Pedido</v-btn>
          </v-col>
        </v-row>
    </v-card>
    </div>
</template>
<script>
import CardHeader from '@/components/card/CardHeaderComponent.vue'
export default {
    components:{CardHeader},
    data: () => ({
               cards:[{
                        title:'PEDIDOS PENDIENTES',
                    },
                    {
                        title:'PEDIDOS REALIZADOS',
                    },
                    {
                        title:'PEDIDOS PEDIDOS SIN COMPROBANTE',
                    }],
             dialog:false,
            search: '',
            headers: [
                {
                    text: 'Dessert (100g serving)',
                    align: 'start',
                    sortable: false,
                    value: 'name',
                },
                { text: 'Calories', value: 'calories' },
                { text: 'Fat (g)', value: 'fat' },
                { text: 'Carbs (g)', value: 'carbs' },
                { text: 'Protein (g)', value: 'protein' },
                { text: 'Iron (%)', value: 'iron' },
                { text: 'Actions', value: 'actions',  align: 'center', sortable: false },
                ],
            desserts: [
            {
                name: 'Frozen Yogurt',
                calories: 159,
                fat: 6.0,
                carbs: 24,
                protein: 4.0,
                iron: '1%',
            },
            {
                name: 'Ice cream sandwich',
                calories: 237,
                fat: 9.0,
                carbs: 37,
                protein: 4.3,
                iron: '1%',
            },
            {
                name: 'Eclair',
                calories: 262,
                fat: 16.0,
                carbs: 23,
                protein: 6.0,
                iron: '7%',
            },
            {
                name: 'Cupcake',
                calories: 305,
                fat: 3.7,
                carbs: 67,
                protein: 4.3,
                iron: '8%',
            },
            {
                name: 'Gingerbread',
                calories: 356,
                fat: 16.0,
                carbs: 49,
                protein: 3.9,
                iron: '16%',
            },
            {
                name: 'Jelly bean',
                calories: 375,
                fat: 0.0,
                carbs: 94,
                protein: 0.0,
                iron: '0%',
            },
            {
                name: 'Lollipop',
                calories: 392,
                fat: 0.2,
                carbs: 98,
                protein: 0,
                iron: '2%',
            },
            {
                name: 'Honeycomb',
                calories: 408,
                fat: 3.2,
                carbs: 87,
                protein: 6.5,
                iron: '45%',
            },
            {
                name: 'Donut',
                calories: 452,
                fat: 25.0,
                carbs: 51,
                protein: 4.9,
                iron: '22%',
            },
            {
                name: 'KitKat',
                calories: 518,
                fat: 26.0,
                carbs: 65,
                protein: 7,
                iron: '6%',
            },
            ],
            editedIndex: -1,
            editedItem: {
                name: '',
                calories: 0,
                fat: 0,
                carbs: 0,
                protein: 0,
            },
            defaultItem: {
                name: '',
                calories: 0,
                fat: 0,
                carbs: 0,
                protein: 0,
            },
            model: null,
            allow:false,
            states: [
            'Alabama', 'Alaska', 'American Samoa', 'Arizona',
            'Arkansas', 'California', 'Colorado', 'Connecticut',
            'Delaware', 'District of Columbia', 'Federated States of Micronesia',
            'Florida', 'Georgia', 'Guam', 'Hawaii', 'Idaho',
            'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
            'Louisiana', 'Maine', 'Marshall Islands', 'Maryland',
            'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
            'Missouri', 'Montana', 'Nebraska', 'Nevada',
            'New Hampshire', 'New Jersey', 'New Mexico', 'New York',
            'North Carolina', 'North Dakota', 'Northern Mariana Islands', 'Ohio',
            'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico',
            'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee',
            'Texas', 'Utah', 'Vermont', 'Virgin Island', 'Virginia',
            'Washington', 'West Virginia', 'Wisconsin', 'Wyoming',
            ],
            tab:null
        
    }),
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Nuevo Producto' : 'Editar Producto'
      },
    },
    watch: {
      dialog (val) {
        val || this.close()
      },
    },

}
</script>