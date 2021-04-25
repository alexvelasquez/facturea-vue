import axios from 'axios';
import { getField, updateField } from 'vuex-map-fields';
export default{
    namespaced: true,
    state: {
        token:null,
        data:null
    },
    getters: {
      getField
    },
    mutations: {
      updateField,
      setNegocio(state,value) {
        state.data.negocio = value;
      }
    },


}
