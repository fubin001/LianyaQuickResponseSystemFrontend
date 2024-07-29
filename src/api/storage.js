import request from '@/utils/request'
import { downloadFile } from '@/api/util'

export function queryStorage(query) {
  return request({
    url: '/storage/query',
    method: 'get',
    params: query
  })
}

export function removeStorage(id) {
  return request({
    url: '/storage/remove/' + id,
    method: 'post'
  })
}

export function addStorage(addForm) {
  return request({
    url: '/storage/add/',
    method: 'post',
    data: addForm
  })
}

export function modifyStorage(modForm) {
  return request({
    url: '/storage/modify/',
    method: 'post',
    data: modForm
  })
}

export function operateStorage(operateForm) {
  return request({
    url: '/storageDetail/operateStorage/',
    method: 'post',
    data: operateForm
  })
}
export function exportStorage(param) {
  return downloadFile('/storage/export', param, '库存数据.xlsx')
}

export function queryStorageDetail(query) {
  return request({
    url: '/storageDetail/query',
    method: 'get',
    params: query
  })
}

export function exportStorageDetail(param) {
  return downloadFile('/storageDetail/export', param, '库存明细.xlsx')
}

export function getRecordTypeList() {
  return request({
    url: '/storageDetail/recordType',
    method: 'get'
  })
}

export function refreshStorage() {
  return request({
    url: '/toolkit/refreshStorage',
    method: 'get'
  })
}


