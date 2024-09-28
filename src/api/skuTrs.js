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
export function refreshTrsNo(data) {
  return request({
    url: '/skuTrs/refreshTrsNo',
    method: 'post',
    data: data
  })
}

export function getPracticalAddtoQty(data) {
  return request({
    url: '/skuTrs/getPracticalAddtoQty',
    method: 'post',
    data: data
  })
}
