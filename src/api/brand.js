import request from '@/utils/request'

export function query(params) {
  return request({
    url: '/brand/query',
    method: 'get',
    params: params
  })
}
// 品牌查询
export function getBrandList(data) {
  return request({
    url: '/newBrand/getBrandList',
    method: 'post',
    data: data
  })
}
// 角色绑定指定品牌
export function addRoleBrandRelations(data) {
  return request({
    url: '/newBrand/addRoleBrandRelations',
    method: 'post',
    data: data
  })
}

// 角色删除绑定指定的品牌
export function delRoleBrandRelations(data) {
  return request({
    url: '/newBrand/delRoleBrandRelations',
    method: 'post',
    data: data
  })
}
// 查询角色与品牌关联数据
export function getRoleBrandRelations(data) {
  return request({
    url: '/newBrand/getRoleBrandRelations',
    method: 'post',
    data: data
  })
}
// 查询指定角色没有的品牌
export function getBrandRoleNotIDList(data) {
  return request({
    url: '/newBrand/getBrandRoleNotIDList',
    method: 'post',
    data: data
  })
}
