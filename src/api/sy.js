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



/**
 * 墨迹天气城市
 */
export function getAllByCityVoList(query) {
  return request({
    url: '/city/getAllByCityVoList',
    method: 'get',
    params: query
  })
}
/**
 * 使用的城市 
 */
export function getAllCityDataVoList(query) {
  return request({
    url: '/city/getAllCityDataVoList',
    method: 'get',
    params: query
  })
}

/**查询使用的城市天气 */

export function getCityDataWeather(data) {
  return request({
    url: '/weather/getList',
    method: 'post',
    data: data
  })
}
/**
 * 更新使用的城市天气
 */
export function updWeatherCityData(data) {
  return request({
    url: '/city/updWeatherCityData',
    method: 'post',
    data: data
  })
}


export function deleteStoreCityRelations(id) {
  return request({
    url: '/storeCityRelations/remove/' + id,
    method: 'delete'
  })
}
/**更新所有商铺信息 */
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



/**
 * 新增使用城市
 */

export function addCityData(data){
  return request({
    url: '/city/addCityData',
    method: 'post',
    data: data
  })
}


export function apiStore(data){
  return request({
    url: '/storeCityRelations/apiStore',
    method: 'post',
    data: data
  })
}

export function apiSaleOrder(data){
  return request({
    url: '/saleOrder/apiSaleOrder',
    method: 'post',
    data: data
  })
}

export function refreshVRetail(data){
  return request({
    url: '/toolkit/refreshVRetail',
    method: 'post',
    data: data
  })
}



export function apiSaleOrder(data){
  return request({
    url: '/saleOrder/apiVRetailBILLDATE',
    method: 'post',
    data: data
  })
}
