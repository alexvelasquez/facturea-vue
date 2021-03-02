import axios from 'axios';
export default{
    state: {
        token:localStorage.getItem('access_token') || null,
        user:JSON.parse(localStorage.getItem('user')) || {},
        negocio:JSON.parse(localStorage.getItem('negocio')) || {
                                                                  condicion_iva:{ afip_id:null,
                                                                                  condicion_iva_id:null},
                                                                  localidad:{provincia:{provincia_id:null},
                                                                             localidad_id:null},
                                                                },
    },
    getters: {
        loggedIn(state){
            return Object.keys(state.user).length > 0;
        },
        token(state){
            return state.token;
        },
        user(state){
            return state.user;
        },
        negocio(state){
          return state.negocio;
        },
        responsableInscripto(state){
          return  state.negocio.condicion_iva.afip_id ? state.negocio.condicion_iva.afip_id == 1 : null;
        },
        getNegocioRazonSocial(state){
            return state.negocio.razon_social;

        },
        getNegocioEmail(state){
            return state.negocio.email;
        },
        getNegocioProvincia(state){
            return state.negocio.localidad.provincia.provincia_id;
        },
        getNegocioLocalidad(state){
            return state.negocio.localidad.localidad_id;
        },
        getNegocioDireccion(state){
            return state.negocio.direccion
        },
        getNegocioTelefono(state){
          return state.negocio.telefono
        },
        getNegocioCuitCuil(state){
          return state.negocio.cuit_cuil
        },
        getNegocioCondicionIva(state){
          return   state.negocio.condicion_iva.condicion_iva_id
        },
        getNegocioInicioActividad(state){
          return state.negocio.inicio_actividad;
        },
        getNegocioLogo(state){
          return state.negocio.logo;
        },
        getNegocioPuntoVenta(state){
          return state.negocio.punto_vta;
        },
        getNegocioIibb(state){
          return state.negocio.iibb;
        },
        getNegocioNombreFantasia(state){
          return state.negocio.nombre_fantasia;
        },
        getUserNombre(state){
          return state.user.name;
        },
        getUserApellido(state){
          return state.user.lastname;
        },
        getUserUsername(state){
          return state.user.username;
        },
        getUserEmail(state){
          return state.user.email;
        },
        getUserRol(state){
          return state.user.roles ? state.user.roles[0] : null;
        },
        facturaElectronicaHabilitada(state){
          return state.negocio.factura_electronica == 'S';
        },
        pedidoProductosHabilitado(state){
          return state.negocio.pedido == 'S';
        },

    },
    mutations: {
        setToken(state,token){
            state.token = token
        },
        setUser(state,user){
            state.user = user
        },
        setNegocio(state,negocio){
            localStorage.setItem('negocio',JSON.stringify(state.negocio))
            state.negocio = negocio
        },
        setNegocioRazonSocial(state, value){
            state.negocio.razon_social = value;
        },
        setNegocioEmail(state,value){
           state.negocio.email=value;
        },
        setNegocioProvincia(state,value){
            state.negocio.localidad.provincia.provincia_id = value;
        },
        setNegocioLocalidad(state,value){
          state.negocio.localidad.localidad_id = value;
        },
        setNegocioDireccion(state,value){
          state.negocio.direccion=value;
        },
        setNegocioTelefono(state,value){
          state.negocio.telefono=value;
        },
        setNegocioCuitCuil(state,value){
          state.negocio.cuit_cuil=value;
        },
        setNegocioCondicionIva(state,value){
          state.negocio.condicion_iva.condicion_iva_id = value;
        },
        setNegocioInicioActividad(state,value){
          state.negocio.inicio_actividad=value;
        },
        setNegocioLogo(state,value){
          state.negocio.logo=value;
        },
        setNegocioIibb(state,value){
          state.negocio.iibb=value;
        },
        setNegocioNombreFantasia(state,value){
          state.negocio.nombre_fantasia=value;
        },
        setNegocioPuntoVenta(state,value){
          state.negocio.punto_vta=value;
        },
        setUserNombre(state,value){
          state.user.name = value;
        },
        setUserApellido(state,value){
          state.user.lastname = value;
        },
        setUserUsername(state,value){
          state.user.username = value;
        },
        setUserEmail(state,value){
          state.user.email = value;
        },
    },
    actions: {
        changeUserNegocio:({commit},negocio)=>{
            commit('setNegocio',negocio);
        },
        logout:({commit})=>{
            return new Promise((resolve,reject) => {
                localStorage.removeItem('access_token')
                localStorage.removeItem('user')
                localStorage.removeItem('negocio')
                commit('setToken',null);
                commit('setUser',{});
                commit('setNegocio',{});
                resolve(true)
            });
        }
    },

}
