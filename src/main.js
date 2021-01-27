import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 注册使用vant组件
import Vant from 'vant'
import 'vant/lib/index.css'
// 加载amfe-flexible REM适配工具
import 'amfe-flexible'
// 导入全局CSS
import './styles/index.css'
// 加载dayjs初始化设置
import './utils/dayjs'

Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
