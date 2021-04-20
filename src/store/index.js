import Vue from 'vue'
import Vuex from 'vuex'

import User from './modules/user';
import Config from './modules/config';
import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {

  },
  plugins: [createPersistedState()],
  modules: {
    user:User,
    config:Config
  }
})
