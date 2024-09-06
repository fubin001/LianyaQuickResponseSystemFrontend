import request from '@/utils/request'

export function syncBuyOrder(data) {
  return request({
    url: '/sync/syncBuyOrder',
    method: 'post',
    data: data
  })
}

