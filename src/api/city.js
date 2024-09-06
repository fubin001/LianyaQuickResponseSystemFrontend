import request from '@/utils/request'

export function weather15DaySY(data) {
  return request({
    url: '/city/weather15DaySY',
    method: 'post',
    data: data
  })
}
