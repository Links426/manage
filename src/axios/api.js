import request from './index'
export const login = (username,password) => request ({
    method:'POST',
    url:'login',
    data:{username,password}
    
})
export const menus = () => request({
    method:'GET',
    url:'menus'
})
export const users = (param) => request({
    method:'GET',
    url:'users',
    data:param
})