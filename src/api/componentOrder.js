import request from '@/utils/request'
import { downloadFile } from '@/api/util'

export function queryComponentOrder(query) {
  return request({
    url: '/componentOrder/query',
    method: 'get',
    params: query
  })
}

export function exportComponentOrder(param) {
  return downloadFile('/componentOrder/export', param, '颜色数据.xlsx')
}
