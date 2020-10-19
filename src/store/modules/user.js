import axios from 'axios';
export default{
    state: {
        token:localStorage.getItem('access_token') || null,
        user:JSON.parse(localStorage.getItem('user_token')) || null,
    },
    getters: {
        loggedIn(state){
            return state.user !== null;
        },
        token(state){
            return state.token;
        },
        user(state){
            return state.user;
        },
        responsableInscripto(state){
          return state.user.negocio.condicion_iva ? state.user.negocio.condicion_iva.afip_id == 1 : false;
        },
        getNegocioRazonSocial(state){
          return state.user.negocio.razon_social ?? null;
        },
        getNegocioEmail(state){
          return state.user.negocio.email ?? null;
        },
        getNegocioProvincia(state){
          return state.user.negocio.localidad.provincia ? state.user.negocio.localidad.provincia.provincia_id : null;
        },
        getNegocioLocalidad(state){
          return state.user.negocio.localidad ? state.user.negocio.localidad.localidad_id : null;
        },
        getNegocioDireccion(state){
          return state.user.negocio.direccion ?? null;
        },
        getNegocioTelefono(state){
          return state.user.negocio.telefono ?? null;
        },
        getNegocioCuitCuil(state){
          return state.user.negocio.cuit_cuil ?? null;
        },
        getNegocioCondicionIva(state){
          return state.user.negocio.condicion_iva ? state.user.negocio.condicion_iva.condicion_iva_id : null;
        },
        getNegocioInicioActividad(state){
          return state.user.negocio.inicio_actividad ?  moment(state.user.negocio.inicio_actividad).format('YYYY-MM-DD') : null;
        },
        getNegocioLogo(state){
          return state.user.negocio.logo ?? null;
        },
        getNegocioPuntoVenta(state){
          return state.user.negocio.punto_vta ?? null;
        },
        getNegocioIibb(state){
          return state.user.negocio.iibb ?? null;
        },
        facturaElectronicaRegistrada(state){
          return state.user.factura_electronica ?? null;
        },
        negocioUser(state){
          return state.user.negocio;
        },

    },
    mutations: {
        setToken(state,token){
            state.token = token
        },
        setUser(state,user){
            state.user = user
        },
        setUserNegocio(state,negocio){
            state.user.negocio = negocio
            localStorage.setItem('user_token',JSON.stringify(state.user))
        },
        setNegocioRazonSocial(state,value){
          return state.user.negocio.razon_social=value;
        },
        setNegocioEmail(state,value){
          return state.user.negocio.email=value;
        },
        setNegocioProvincia(state,value){
          return state.user.negocio.localidad.provincia = value;
        },
        setNegocioLocalidad(state,value){
          return state.user.negocio.localidad = value;
        },
        setNegocioDireccion(state,value){
          return state.user.negocio.direccion=value;
        },
        setNegocioTelefono(state,value){
          return state.user.negocio.telefono=value;
        },
        setNegocioCuitCuil(state,value){
          return state.user.negocio.cuit_cuil=value;
        },
        setNegocioCondicionIva(state,value){
          return state.user.negocio.condicionIva = value;
        },
        setNegocioInicioActividad(state,value){
          return state.user.negocio.inicio_actividad=value;
        },
        setNegocioLogo(state,value){
          return state.user.negocio.logo=value;
        },
        setNegocioIbb(state,value){
          return state.user.negocio.iibb=value;
        },
        setNegocioPuntoVenta(state,value){
          return state.user.negocio.punto_vta=value;
        },
    },
    actions: {
        changeUserNegocio:({commit},negocio)=>{
            commit('setUserNegocio',negocio);
        },

        login:({commit},params)=>{
            return new Promise((resolve,reject) => {
                axios.post(`login_check`,params)
                .then(response=>{
                    const token = response.data.token;
                    commit('setToken',token);
                    axios.get(`currentUser`)
                    .then(response=>{
                        commit('setNotificacion',{activo:true,texto:'Obteniendo datos del usuario',tipo:'success'})
                        /** config item token */
                        localStorage.setItem('access_token',token)
                        /** config del usuario */
                        const user = response.data.user;
                        /** verifico la condicion y localidad del usuario*/
                        if(user.negocio.inicio_actividad){
                          user.negocio.inicio_actividad = moment().format('YYYY-MM-DD');
                        }
                        if(!user.negocio.condicion_iva && !user.negocio.localidad) {
                            user.negocio.condicion_iva = {}
                            user.negocio.localidad = {
                              provincia : {}
                            }
                        }
                        commit('setNotificacion',{activo:true,texto:`BIENVENIDO ${user.name.toUpperCase()}`,tipo:'success'})
                        localStorage.setItem('user_token',JSON.stringify(user))
                        commit('setUser',user);
                        resolve(true);
                    })
                    .catch(error=>{
                        commit('setToken',null);
                    })
                })
                .catch(error => {
                    reject(error);
                })
            });
        },
        logout:({commit})=>{
            return new Promise((resolve,reject) => {
                localStorage.removeItem('access_token')
                localStorage.removeItem('user_token')

                commit('setToken',null);
                commit('setUser',null);
                resolve(true)
            });
            }
        },

}
