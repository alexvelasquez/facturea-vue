<template>

    <div>
        <v-row no-gutters>
            <v-col cols="12"><p class="text-lg-h6 font-weight-bold blue-grey--text text--lighten-2">Nuevo Pedido</p></v-col>
        </v-row>
        <div>
    <v-breadcrumbs  :items="options" large></v-breadcrumbs>
    <div class="d-flex">
    <v-expansion-panels
      v-model="panel"
      multiple
    >
      <v-expansion-panel>
        <v-expansion-panel-header>AGREGAR PEDIDO</v-expansion-panel-header>
        <v-expansion-panel-content>
        <v-row>
          <v-col cols="12" sm="6" md="6" class="px-5 pl-md-10">
            <v-row>
              <v-col cols="12" sm="12" md="12" >
                  <v-autocomplete
                      v-model="model"
                      :items="states"
                      label="Buscar cliente"
                      persistent-hint
                  >
                  </v-autocomplete>
              </v-col>
              <v-col cols="12" sm="12" md="12">
              <v-card
                  class="mx-auto"
                  tile
                >
                  <v-list-item two-line>
                    <v-list-item-content >
                      <v-list-item-title>RAZÓN SOCIAL</v-list-item-title>
                      <v-list-item-subtitle>Alex Velasquez</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>

                  <v-list-item two-line>
                    <v-list-item-content>
                      <v-list-item-title>CUIL/CUIL</v-list-item-title>
                      <v-list-item-subtitle>23-93987901-3</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>

                  <v-list-item class="pb-4" two-line>
                    <v-list-item-content>
                      <v-list-item-title>TELÉFONO Y DIRECCIÓN</v-list-item-title>
                      <v-list-item-subtitle>
                      (0221) 1567286782 - Calle 167 e/ 525 y 526
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-card>
              </v-col>
            </v-row>

          </v-col>
          <v-col cols="12" sm="6" md="6" class="px-5 pr-md-10">
            <v-card
              class="mx-auto"
              tile
            >
              <v-list-item two-line>
                <v-list-item-content >
                  <v-list-item-title>PRODUCTO</v-list-item-title>
                  <v-autocomplete
                      v-model="model"
                      :items="states"
                      label="Buscar"
                      persistent-hint
                      :hint="'Precio: $159 - Disponibles: 167'"
                  >
                  </v-autocomplete>
                </v-list-item-content>
              </v-list-item>
              <v-list-item two-line>
                <v-list-item-content >
                  <v-list-item-subtitle>CANTIDAD - IVA APLICADO</v-list-item-subtitle>
                  <v-row>
                      <v-col cols="12" sm="6" md="6">
                          <v-text-field
                            type="number"
                              v-model="firstname"
                              label="Ingrese una cantidad"
                              required
                          ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                      <v-select
                        :items="ivas"
                        label="IVA (%)"
                      ></v-select>
                      </v-col>
                  </v-row>
                </v-list-item-content>
              </v-list-item>
              <v-list-item two-line>
                <v-list-item-content >
                    <v-btn block color="#385F73" dark>Agregar</v-btn>
                </v-list-item-content>
              </v-list-item>
            </v-card>
          </v-col>
        </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    </div>
    </div>
      <v-list two-line subheader>
        <v-subheader >LISTA PEDIDOS</v-subheader>

        <v-list-item
          v-for="item in items"
          :key="item.title"
          @click=""
        >
            <v-btn icon>
              <v-icon color="grey lighten-1">check</v-icon>
            </v-btn>

          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
            <v-list-item-subtitle v-text="item.subtitle"></v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-action>
            <v-btn icon>
              <v-icon color="grey lighten-1">mdi-information</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>

        <v-divider></v-divider>
        
        <v-list-item justify="end"
          align="end"
          v-for="item in items2"
          :key="item.title"
          @click=""
        >

          <v-list-item-content >
            <v-list-item-title class="pr-5" v-text="'TOTAL'"></v-list-item-title>
            <v-list-item-title v-text="'1.9283,00 $'"></v-list-item-title>
          </v-list-item-content>


        </v-list-item>
      </v-list>

    </div>
</template>
<script>
export default {
    data: () => ({
      panel:[0],
      ivas: ['Foo', 'Bar', 'Fizz', 'Buzz'],
      items: [
        { icon: 'check', iconClass: 'grey lighten-1 white--text', title: 'Photos', subtitle: 'Jan 9, 2014' },
        { icon: 'check', iconClass: 'grey lighten-1 white--text', title: 'Recipes', subtitle: 'Jan 17, 2014' },
        { icon: 'check', iconClass: 'grey lighten-1 white--text', title: 'Work', subtitle: 'Jan 28, 2014' },
      ],
      items2: [
        { icon: 'assignment', iconClass: 'blue white--text', title: 'Vacation itinerary', subtitle: 'Jan 20, 2014' },
      ],
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
      options:[
        {
          text: 'Pedidos',
          disabled: false,
          href: '/pedidos',
        },
        {
          text: 'Nuevo Pedido',
          disabled: true,
          href: '',
        },
      ]
}),
}
</script>