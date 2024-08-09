import request from '@/utils/request'

export function querySaleOrder(param) {
  return request({
    url: '/saleOrder/query',
    method: 'get',
    params: param
  })
}

export function apiSaleOrderDate(data) {
  return request({
    url: '/saleOrder/apiSaleOrderDate',
    method: 'post',
    data: data
  })
}
