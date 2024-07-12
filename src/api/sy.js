import request from '@/utils/request'
import { downloadFile } from '@/api/util'

export function weather(data) {
  return request({
    url: '/weather/getWeatherForecast',
    method: 'post',
    data: data
  })
}
export function getAllByCityVoList(query) {
  return request({
    url: '/city/getAllByCityVoList',
    method: 'get',
    params: query
  })
}
