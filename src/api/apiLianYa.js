import request from '@/utils/request'

export function apiMProduct(data) {
  return request({
    url: '/apiLianyaAll/apiMProduct',
    method: 'post',
    data: data
  })
}

export function lianYaSale(data) {
  return request({
    url: '/apiLianYaAll/lianYaSale',
    method: 'post',
    data: data
  })
}
