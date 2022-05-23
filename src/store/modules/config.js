import { getField, updateField } from 'vuex-map-fields';
export default{
    namespaced:true,
    state: {
        loading: false,
        notification:{
            activo:false,
            texto:null,
            tipo:null
        },

    },
    getters: {
        getField
    },
    mutations: {
        updateField
    },
    actions: {
        loading:(({state},valor)=>{
            state.loading = valor;
        }),
        notificar:(({state},params)=>{
            state.notification = {activo:true,texto:params.texto,tipo:params.tipo};
        }),
        cerrarNotificacion:({state})=>{
            state.notification = {activo:false,texto:'',tipo:''};
        }
    }
}
