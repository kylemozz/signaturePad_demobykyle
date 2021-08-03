import Vue from 'vue'
import App from './App.vue' // 引入主组件
import router from './router' // 引入路由
import store from './store' // 引入store
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

//  Ant Design Vue相关文件 组件采用按需引入的方式
import {
  Button,
  FormModel,
  Input,
  Icon,
  Menu,
  Select,
  Divider,
  InputNumber
} from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
// 颜色选择器
import vcolorpicker from 'vcolorpicker'

Vue.config.productionTip = false

// 注册Ant组件
Vue.use(Button)
Vue.use(FormModel)
Vue.use(Input)
Vue.use(Icon)
Vue.use(Menu)
Vue.use(Select)
Vue.use(Divider)
Vue.use(InputNumber)
Vue.use(vcolorpicker)

// 注册Element ui
Vue.use(ElementUI)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
