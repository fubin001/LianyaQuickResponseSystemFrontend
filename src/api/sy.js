import request from '@/utils/request'
import { downloadFile } from '@/api/util'

export function weather(query) {
  return request({
    url: '/weather/forecast',
    method: 'get',
    params: query
  })
}
