import { createStore } from 'vuex'
import helper from './helper'
import task from './modules/task'
import user from './modules/user'

export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    helper,
    task,
    user
  }
})
