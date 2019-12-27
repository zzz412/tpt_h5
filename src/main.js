import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 导入移动端适配器
import 'amfe-flexible';
// 导入滑动事件
import touch from 'vue2-touch-events';
import 'vant/lib/index.css';


Vue.use(touch);
Vue.config.productionTip = false




new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')