import request from '@/utils/request'
import { downloadFile } from '@/api/util'

export function queryFeedbackOrder(query) {
  return request({
    url: '/feedback/query',
    method: 'get',
    params: query
  })
}

export function confirmFeedback(id) {
  return request({
    url: '/feedback/confirm/' + id,
    method: 'POST'
  })
}

export function exportFeedbackOrder(param) {
  downloadFile('/feedback/export', param, '反馈订单详情.xlsx')
}
