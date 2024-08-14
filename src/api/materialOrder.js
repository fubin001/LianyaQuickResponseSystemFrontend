import request from '@/utils/request'
import { downloadFile } from '@/api/util'

export function queryMaterialOrder(query) {
  return request({
    url: '/materialOrder/query',
    method: 'get',
    params: query
  })
}

export function exportMaterialOrder(param) {
  return downloadFile('/materialOrder/export', param, '备料数据.xlsx')
}
