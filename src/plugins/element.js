import Vue from 'vue'

import {Button,Form,Input,FormItem,message,Container,Header,Aside,Main,Menu,Submenu,MenuItem,Breadcrumb,BreadcrumbItem,Card,Row,Col,Table,TableColumn,Switch,Tooltip,Pagination,Tag,Dialog,MessageBox,Tree} from 'element-ui'
// 导入弹框组件,需要挂载到全局
// $message 是自定义属性
Vue.prototype.$message = message
Vue.prototype.$confirm = MessageBox.confirm



Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Button)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)

Vue.use(MenuItem)
Vue.use(Card)
Vue.use(Row)
Vue.use(Col)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Switch)
Vue.use(Tooltip)
Vue.use(Pagination)
Vue.use(Tag)
Vue.use(Dialog)
Vue.use(Tree)