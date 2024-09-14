import request from '@/utils/request'
import { downloadFile } from '@/api/util'

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

export function exportSkuProduct(param) {
  downloadFile('/saleOrder/export', param, '销售数据详情.xlsx')
}
