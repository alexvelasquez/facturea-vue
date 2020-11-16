import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import axios from 'axios'
import moment from 'moment';
import VModal from 'vue-js-modal'
import VueSweetalert2 from 'vue-sweetalert2';
import Globals from '@/mixins/globals'
moment.locale('es')
window.axios = axios;
window.moment = moment;
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
axios.defaults.baseURL = process.env.VUE_APP_API;


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
      return error;
  }

);

Vue.mixin(Globals),
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
