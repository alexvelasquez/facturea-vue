import Vue from 'vue'
import Vuex from 'vuex'

import User from './modules/user';
import Config from './modules/config';
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user:User,
    config:Config
  }
})
