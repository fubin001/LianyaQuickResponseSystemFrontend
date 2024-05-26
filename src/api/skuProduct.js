import request from '@/utils/request'
import { downloadFile } from '@/api/util'

export function querySkuProduct(param) {
  return request({
    url: '/skuProduct/query',
    method: 'get',
    params: param
  })
}

export function exportSkuProduct(param) {
  downloadFile('/skuProduct/export', param, '商品数据详情.xlsx')
}
