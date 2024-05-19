import request from '@/utils/request'

export function queryFeedbackOrder(query) {
  return request({
    url: '/feedback/query',
    method: 'get',
    params: query
  })
}
