import request from './index'
export const login = (username,password) => request ({
    method:'POST',
    url:'/private/v1/login',
    data:{username,password}
    
})