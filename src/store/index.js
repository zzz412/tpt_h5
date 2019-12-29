import Vue from 'vue'
import Vuex from 'vuex'
import {
  CHANGE_USERINFO,
  CHANGE_ROUTER
} from './types';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 用户信息
    userInfo: {},
    // 已选择数据
    selectedData: [],
    // 当前加载的页面
    router: 'First',
  },
  mutations: {
    // 更改用户信息
    [CHANGE_USERINFO](state, info) {
      state.userInfo = {
        ...state.userInfo,
        ...info
      };
    },
    // 更改页面
    [CHANGE_ROUTER](state, router) {
      state.router = router;
    },
    changeSelectedData(state, info) {
      state.selectedData = info;
    }
  },
  actions: {},
  modules: {}
})