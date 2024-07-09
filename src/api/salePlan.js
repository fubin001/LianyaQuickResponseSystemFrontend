import request from '@/utils/request'

export function querySalePlan(params) {
  return request({
    url: '/salePlan/query',
    method: 'get',
    params: params
  })
}

export function saveOrUpdateSalePlan(data) {
  return request({
    url: '/salePlan/saveOrUpdate',
    method: 'post',
    data: data
  })
}

export function deleteSalePlanById(id) {
  return request({
    url: '/salePlan/delete/' + id,
    method: 'delete'
  })
}
