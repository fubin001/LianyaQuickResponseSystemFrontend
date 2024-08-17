import request from '@/utils/request'

export function querySaleOrder(param) {
  return request({
    url: '/saleOrder/query',
    method: 'get',
    params: param
  })
}

export function apiVRetailBILLDATE(data) {
  return request({
    url: '/saleOrder/apiVRetailBILLDATE',
    method: 'post',
    data: data
  })
}

export function apiVRetailTest(data) {
  return request({
    url: '/saleOrder/apiVRetailTest',
    method: 'post',
    data: data
  })
}
