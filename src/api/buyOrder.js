import request from '@/utils/request'

export function queryBuyOrder(param) {
  return request({
    url: '/buyOrder/query',
    method: 'get',
    params: param
  })
}
