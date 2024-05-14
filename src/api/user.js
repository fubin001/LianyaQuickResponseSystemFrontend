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
