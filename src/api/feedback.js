import request from '@/utils/request'

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
