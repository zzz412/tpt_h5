import Vue from 'vue'
import Vuex from 'vuex'
import {
  CHANGE_USERINFO
} from './types';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 用户信息
    userInfo: {}
  },
  mutations: {
    // 更改用户信息
    [CHANGE_USERINFO](state, info) {
      state.userInfo = {
        ...state.userInfo,
        ...info
      };
    }
  },
  actions: {},
  modules: {}
})