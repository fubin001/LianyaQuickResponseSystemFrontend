import request from '@/utils/request'
import { downloadFile } from '@/api/util'

export function queryBom(query) {
  return request({
    url: '/bom/query',
    method: 'get',
    params: query
  })
}

export function exportBom(param) {
  return downloadFile('/feedback/export', param, 'Bom.xlsx')
}
