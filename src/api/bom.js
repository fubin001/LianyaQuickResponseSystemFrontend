import request from '@/utils/request'
import { downloadFile } from '@/api/util'

export function queryBom(query) {
  return request({
    url: '/bom/query',
    method: 'get',
    params: query
  })
}

export function getBom(skuId) {
  return request({
    url: '/bom/getBom',
    method: 'get',
    params: {
      skuId: skuId
    }
  })
}

export function getBomTreeNodeListByRootTrs(skuId, rtsNo) {
  return request({
    url: '/bom/getBomTreeNodeListByRootTrs',
    method: 'get',
    params: {
      skuId: skuId,
      rtsNo: rtsNo
    }
  })
}

export function exportBom(param) {
  return downloadFile('/feedback/export', param, 'Bom.xlsx')
}

export function queryBomTree(skuId) {
  return request({
    url: '/bom/queryBomTree',
    method: 'get',
    params: {
      skuId: skuId
    }
  })
}

export function queryComponentTypeList() {
  return request({
    url: '/bom/queryComponentTypeList',
    method: 'get'
  })
}

export function generateProduceMaterial(bomSizeInfo) {
  return request({
    url: '/bom/generateProduceMaterial',
    method: 'post',
    data: bomSizeInfo
  })
}

export function getTrsNoEnumList() {
  return request({
    url: '/bom/getTrsNoEnumList',
    method: 'get'
  })
}

export function getTrsNoEnumListByComponentType(componentType) {
  return request({
    url: '/bom/getTrsNoEnumListByComponentType',
    method: 'get',
    params: {
      componentType: componentType
    }
  })
}

export function removeBomById(id) {
  return request({
    url: '/bom/remove/' + id,
    method: 'delete'
  })
}

export function addBom(form) {
  return request({
    url: '/bom/add/',
    data: form,
    method: 'post'
  })
}

export function modifyBom(form) {
  return request({
    url: '/bom/mod/',
    data: form,
    method: 'post'
  })
}
