import request from '@/utils/request'
import { downloadFile } from '@/api/util'

export function queryColor(query) {
  return request({
    url: '/color/query',
    method: 'get',
    params: query
  })
}

export function exportColor(param) {
  return downloadFile('/color/export', param, '颜色数据.xlsx')
}
