import request from '@/utils/request'

export function querySkuProduct(param) {
  return request({
    url: '/skuProduct/query',
    method: 'get',
    params: param
  })
}
