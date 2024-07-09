import request from '@/utils/request'

export function querySaleOrder(param) {
  return request({
    url: '/saleOrder/query',
    method: 'get',
    params: param
  })
}
