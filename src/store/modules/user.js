import axios from 'axios'
export default{
    state: {
        token:localStorage.getItem('access_token') || null,
        user:JSON.parse(localStorage.getItem('user_token')) || null
    },
    getters: {
        loggedIn(state){
            return state.token !== null;
        },
        token(state){
            return state.token;
        },
        user(state){
            return state.user;
        },
        negocioUser(state){

            return state.user.negocio;
        }
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

        }
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
                        /** config item token */
                        localStorage.setItem('access_token',token)
                        /** config del usuario */
                        const user = response.data.user;
                        /** verifico la condicion y localidad del usuario*/
                        if(!user.negocio.condicion_iva && !user.negocio.localidad) {
                            user.negocio.condicion_iva = {}
                            user.negocio.localidad = {
                              provincia : {}
                            }
                        }
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
