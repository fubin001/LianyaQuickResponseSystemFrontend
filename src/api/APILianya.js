import request from '@/utils/request'
import { downloadFile } from '@/api/util'

export function apiMProduct(data){
  return request({
    url: '/apiLianyaAll/apiMProduct',
    method: 'post',
    data: data
  })
}