import Vue from 'vue'
import {Button,Form,Input,FormItem,message} from 'element-ui'
// 导入弹框组件,需要挂载到全局
// $message 是自定义属性
Vue.prototype.$message = message



Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Button)