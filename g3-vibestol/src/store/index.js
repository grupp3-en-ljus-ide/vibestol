import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    activeColor: "",
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  },
  getters: {
    activeColor: state => state.activeColor,
  }
})
