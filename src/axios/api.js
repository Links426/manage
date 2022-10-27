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
export const list = () => request({
    method:'GET',
    url:'rights/list',
})
export const users = () => request({
    method:'GET',
    url:'users',
})
export const roles = () => request({
    method:'GET',
    url:'roles',
})
export const addRoles = (roleName,roleDesc) => request({
    method:'POST',
    url:'roles',
    data:{roleName,roleDesc}  
})
export const checkRoles = (id) => request({
    method:'GET',
    url:'roles' +'/'+ id,
    data:{id}
})
export const publishRoles = (id,roleName,roleDesc) => request({
    method:'PUT',
    url:'roles' +'/'+ id,
    data:{id,roleName,roleDesc}
})
export const delRoles = (id) => request({
    method:'delete',
    url:'roles' +'/'+ id,
    data:{id}
})
export const delRights = (id,rightId) => request({
    method:'delete',
    url:'roles' +'/'+ id + '/rights' + '/' +rightId,
    data:{id,rightId}
})
export const getRolesTree = () => request({
    method:'GET',
    url:'rights/tree',
})
export const rolesRight = (roleId,resId) => request({
    method:'POST',
    url:'roles/'+roleId+'/rights',
    data:{rids:resId}
})
