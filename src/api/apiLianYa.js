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
export function lianYaBuy(data) {
  return request({
    url: '/apiLianYaAll/lianYaBuy',
    method: 'post',
    data: data
  })
}

export function M_PRODUCT_ALIAS(data) {
  return request({
    url: '/apiLianYaAll/M_PRODUCT_ALIAS',
    method: 'post',
    data: data
  })
}
