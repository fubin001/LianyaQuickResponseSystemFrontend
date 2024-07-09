import request from '@/utils/request'

// 角色关联页面权限
export function addNewPermissionRole(data) {
  return request({
    url: '/newPermissions/addNewPermissionRole',
    method: 'post',
    data: data
  })
}
// 删除指定角色绑定的页面权限
export function delNewPermissionRole(data) {
  return request({
    url: '/newPermissions/delNewPermissionRole',
    method: 'post',
    data: data
  })
}

//查询页面权限
export function getNewPermissionList(data) {
  return request({
    url: '/newPermissions/getNewPermissionList',
    method: 'post',
    data: data
  })
}
//指定角色查询没有拥有的权限
export function getNewPermissionNotRoleIDList(data) {
  return request({
    url: '/newPermissions/getNewPermissionNotRoleIDList',
    method: 'post',
    data: data
  })
}


/**
 * 角色新增页面权限
 */
export function addPermissionManu(data) {
  return request({
    url: '/newPermissions/addPermissionManu',
    method: 'post',
    data: data
  })
}

/**查询指定角色ID，所拥有的权限 */
export function getRoleIDPermission(data) {
  return request({
    url: '/newPermissions/getRoleIDPermission',
    method: 'post',
    data: data
  })
}

