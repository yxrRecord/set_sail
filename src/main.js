import Vue from 'vue'
import App from './App.vue'

import axios from 'axios'
Vue.prototype.$http = axios

// 引入方法
import utils from './utils/index'
Vue.use(utils)

// 引入vuex
import store from './store'

import moment from 'moment'
Vue.prototype.$moment = moment
moment.locale('zh-cn')

// 引入ui 组件库
import ElementUI from 'element-ui'
import './assets/theme/elementUI.scss'
Vue.use(ElementUI, { size: 'mini' })

// 引入 语言
import i18n from './lang'

Vue.config.productionTip = false

const commonComponents = require.context('./components/common', false, /\.vue$/)
const customComponents = require.context('./components/custom', false, /\.vue$/)
const requireAll = components => components.keys().forEach(fileName => {
    // 组件实例
    let reqCom = components(fileName)
    // 截取路径作为组件名
    let reqComName = fileName.split('.')[1]
    reqComName = reqComName.split('/')[1]
    // 组件挂载
    Vue.component(reqComName, reqCom.default || reqCom)
})

requireAll(commonComponents)
requireAll(customComponents)

// 引入路由
import router from './router'

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount("#app")