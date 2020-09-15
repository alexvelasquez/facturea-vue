import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import axios from 'axios'
import moment from 'moment';
import VModal from 'vue-js-modal'
import VueSweetalert2 from 'vue-sweetalert2';

moment.locale('es')
window.axios = axios;

import 'sweetalert2/dist/sweetalert2.min.css';
import './assets/css/custom.css'
const options = {
  confirmButtonColor: '#385F73',
  cancelButtonColor: '#fffff',
  confirmButtonText: 'Continuar',
  cancelButtonText: 'Cancelar',
};

Vue.use(VueSweetalert2,options);

Vue.use(VModal)
axios.defaults.baseURL = 'http://localhost/api-facturea/public/index.php/api/';

/** capture los request error */
var value = 0

/** intercepto el response para setear el authorization token */
axios.interceptors.request.use(config => {

  config.headers.Authorization = "Bearer "+store.getters.token
  store.dispatch('loading',true)
  return config
});

/** intercepto el request y verifico si expiro el token */
axios.interceptors.response.use(response => {
  store.dispatch('loading',false)
  return response;
},error => {
    store.dispatch('loading',false)
    if(error.response.status == 401 && error.response.data.message === "Expired JWT Token")
    {
        store.dispatch('logout')
        .then(response=>{
          router.push('/logout')
        })
      }
  }
);

Vue.mixin({

  methods: {
    notificacion(texto,tipo){
      store.dispatch('notificacion',{
        activo:true,
        texto:texto,
        tipo:tipo
      })
    },
    ordenar(data){
      return data.sort((a,b) => (a.descripcion > b.descripcion) ? 1 : ((b.descripcion > a.descripcion) ? -1 : 0));
    },
    urlImage(ruta){
      return `http://localhost/api-facturea/public/uploads/${ruta}`
    },
    calcularPrecioNeto(producto){
      return (parseFloat(producto.precio_compra) + (parseFloat(producto.precio_compra) * (parseFloat(producto.aumento)/100))).toFixed(2)
    },
  },
  filters: {
        /**
         * Formatea el numero con la máscara #.## %, por ej 5 --> 5.00 %
         *
         * @param {Number} un numero
         */
        precioNeto: (value) => (parseFloat(value.precio_compra) + (parseFloat(value.precio_compra) * (parseFloat(value.aumento)/100))).toFixed(2) ,
        /**
         * Formatea el precio con la máscara $ #,## , por ej 5 --> $ 5,00
         *
         * @param {Number} un numero
         */
        formatPrecio: (value) => '$'+value.toFixed(2).replace('.', ',') ,

        /**
         * Formatea el number con la máscara  #,## , por ej 5 --> 5,00
         *
         * @param {Number} un numero
         */
        formatNumber: (value) => parseFloat(value).toFixed(2).replace('.', ',') ,

        /**
         * Devuelve una fecha con formato
         *
         * @param {String} dateTime
         */
        formatDateTime: (value) => moment(String(value)).format('DD/MM/YYYY hh:mm'),
        /**
         * Devuelve una fecha con formato
         *
         * @param {String} dateTime
         */
        formatDate: (value) => moment(value).format('DD/MM/YYYY'),

        /**
         * Devuelve un cuit cuil con guiones
         *
         * @param {String} dateTime
         */
        formatCuitCuil: (value) => value.toString().substr(0,2)+'-'+value.toString().substr(-9,8)+'-'+value.toString().substr(-1),

  }

})
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
