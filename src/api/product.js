import request from '@/utils/request'

export function queryProduct(params) {
  return request({
    url: '/product/query',
    method: 'get',
    params: params
  })
}

export function saveOrUpdateProduct(data) {
  return request({
    url: '/product/saveOrUpdate',
    method: 'post',
    data: data
  })
}

export function deleteProductById(id) {
  return request({
    url: '/product/delete/' + id,
    method: 'delete'
  })
}
