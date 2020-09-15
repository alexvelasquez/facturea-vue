import axios from 'axios'
export default{
    state: {
        loading: false,
        notificacion:{}
    },
    getters: {
        loading(state){
            return state.loading
        },
        notificacion(state){
            return state.notificacion
        }
    },
    mutations: {
        setLoading(state,loading){
            state.loading = loading
        },
        setNotificacion(state,notificacion){
            state.notificacion = notificacion
        }
    },
    actions: {
        loading:(({commit},valor)=>{
            commit('setLoading',valor)
        }),
        notificacion:(({commit},params)=>{
            commit('setNotificacion',params)
        }),
    }
}