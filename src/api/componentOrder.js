import request from '@/utils/request'
import { downloadFile } from '@/api/util'

export function queryComponentOrder(query) {
  return request({
    url: '/componentOrder/query',
    method: 'get',
    params: query
  })
}

export function exportComponentOrder(param) {
  return downloadFile('/componentOrder/export', param, '颜色数据.xlsx')
}

export function addComponentOrder(order) {
  return request({
    url: '/componentOrder/generateComponentOrder',
    method: 'post',
    data: order
  })
}

// export function a

export function deleteOrder(id) {
  return request({
    url: '/componentOrder/delete/' + id,
    method: 'post'
  })
}

export function confirmOrder(id) {
  return request({
    url: '/componentOrder/confirmOrder/' + id,
    method: 'post'
  })
}
