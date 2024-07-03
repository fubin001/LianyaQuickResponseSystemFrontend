import request from '@/utils/request'

export function getRoutes() {
  return request({
    url: '/vue-element-admin/routes',
    method: 'get'
  })
}

export function getRoles() {
  return request({
    url: '/vue-element-admin/roles',
    method: 'get'
  })
}

// export function addRole(data) {
//   return request({
//     url: '/newRole/add',
//     method: 'post',
//     data
//   })
// }

export function updateRole(id, data) {
  return request({
    url: `/vue-element-admin/role/${id}`,
    method: 'put',
    data
  })
}

export function deleteRole(id) {
  return request({
    url: `/vue-element-admin/role/${id}`,
    method: 'delete'
  })
}
//新增角色
export function addRole(data) {
  return request({
    url: '/newRole/add',
    method: 'post',
    data: data
  })
}
//查询角色
export function getNewRole(data) {
  return request({
    url: '/newRole/getNewRole',
    method: 'post',
    data: data
  })
}
//sy
export function sy(data) {
  return request({
    url: '/newRole/sy',
    method: 'post',
    data: data
  })
}
