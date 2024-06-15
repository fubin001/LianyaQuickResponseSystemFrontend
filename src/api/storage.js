import request from '@/utils/request'
import { downloadFile } from '@/api/util'

export function queryStorage(query) {
  return request({
    url: '/storage/query',
    method: 'get',
    params: query
  })
}

export function exportStorage(param) {
  return downloadFile('/storage/export', param, '库存数据.xlsx')
}
