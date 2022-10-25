import axios from 'axios'

const request = axios.create({
    baseURL:'http://127.0.0.1:8888/api/private/v1',
    timeout:5000
})

// 需要使用请求拦截器 提供token令牌,来获取其他的api接口
request.interceptors.request.use(config => {
    // console.log(config);
    // 把token令牌加入authorization
    config.headers.Authorization = window.sessionStorage.getItem('token')
    return config
})



export default request 