import request from '@/utils/request'
export function query(params) {
  return request({
    url: '/skuTrs/query',
    method: 'get',
    params: params
  })
}
export function refresh(data) {
  return request({
    url: '/skuTrs/refresh',
    method: 'post',
    data: data
  })
}
