import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

export function queryUser(params) {
  return request({
    url: '/user/query',
    method: 'get',
    params: params
  })
}

export function createOrUpdate(data) {
  return request({
    url: '/user/saveOrUpdate',
    method: 'post',
    data: data
  })
}

export function deleteUserById(id) {
  return request({
    url: '/user/delete/' + id,
    method: 'delete'
  })
}

// 获取角色信息
export function getRoleBrand(data) {
  return request({
    url: '/newRole/getRoleBrand',
    method: 'post',
    data: data
  })
}
//注册申请
export function userApplyOfr(data) {
  return request({
    url: '/newUser/userApplyFor',
    method: 'post',
    data: data
  })
}
//查询注册申请
export function getUserApplyOfrList(data) {
  return request({
    url: '/newUser/getUserApplyForList',
    method: 'post',
    data: data
  })
}

//修改注册申请
export function updUserApplyFor(data) {
  return request({
    url: '/newUser/updUserApplyFor',
    method: 'post',
    data: data
  })
}
//取下指定用户的申请
export function delUserApplyFor(data) {
  return request({
    url: '/newUser/delUserApplyFor',
    method: 'post',
    data: data
  })
}

//删除指定注册用户的申请权限
export function delUserApplyForRole(data) {
  return request({
    url: '/newUser/delUserApplyForRole',
    method: 'post',
    data: data
  })
}
//确定注册用户通过
export function newUserBecome(data) {
  return request({
    url: '/newUser/newUserBecome',
    method: 'post',
    data: data
  })
}

//查询用户
export function getNewUsersList(data) {
  return request({
    url: '/newUser/getNewUsersList',
    method: 'post',
    data: data
  })
}

//获取指定用户没有的角色
export function getRoleNotUserNoList(data) {
  return request({
    url: '/newUser/getRoleNotUserNoList',
    method: 'post',
    data: data
  })
}

//删除指定用户与角色的绑定
export function delUserRoleRelations(data) {
  return request({
    url: '/newUser/delUserRoleRelations',
    method: 'post',
    data: data
  })
}


//用户新增角色
export function addUserRoleRelations(data) {
  return request({
    url: '/newUser/addUserRoleRelations',
    method: 'post',
    data: data
  })
}