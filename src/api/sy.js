import request from '@/utils/request'
import { downloadFile } from '@/api/util'

export function addStoreCityRelations(data) {
  return request({
    url: '/storeCityRelations/add',
    method: 'post',
    data: data
  })
}
export function getStoreCityRelationsList(data) {
  return request({
    url: '/storeCityRelations/getList',
    method: 'post',
    data: data
  })
}

export function updStoreCityRelations(data) {
  return request({
    url: '/storeCityRelations/updStoreCityRelations',
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

export function deleteStoreCityRelations(id) {
  return request({
    url: '/storeCityRelations/remove/' + id,
    method: 'delete'
  })
}

export function updStoreCity(query) {
  return request({
    url: '/storeCityRelations/updStoreCity',
    method: 'get',
    params: query
  })
}

export function getWeatherStoreCityList(data){
  return request({
    url: '/storeCityRelations/getWeatherStoreCityList',
    method: 'post',
    data: data
  })
}