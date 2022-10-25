import Vue from 'vue'
import App from './App.vue'

import './mock/mockServe'


// 把api.js里所有函数导入到api中
import * as api from './axios/api.js'

// 导入字体图标
import './assets/fonts/iconfont.css'


import './plugins/element.js'
import router from './router'
import store from './store'




// 设置跟路径url地址







// 导入全局样式表
import './assets/css/global.css'


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  beforeCreate(){
    // 把刚才导入到api放到vue实例上
    Vue.prototype.$api = api
  },
  router,
  store,
}).$mount('#app')
