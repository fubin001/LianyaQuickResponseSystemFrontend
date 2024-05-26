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

export function refreshAllRelatedData() {
  return request({
    url: '/toolkit/refreshAll',
    method: 'get'
  })
}

export function refreshRelatedData(skuId) {
  return request({
    url: '/toolkit/refreshData',
    method: 'get',
    params: {
      skuId: skuId
    }
  })
}
