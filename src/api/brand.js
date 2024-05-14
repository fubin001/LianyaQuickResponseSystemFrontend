import request from '@/utils/request'

export function query(params) {
  return request({
    url: '/brand/query',
    method: 'get',
    params: params
  })
}
