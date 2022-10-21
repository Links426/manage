import axios from 'axios'

const request = axios.create({
    baseURL:'http://127.0.0.1:8888/api',
    timeout:5000
})


export default request 