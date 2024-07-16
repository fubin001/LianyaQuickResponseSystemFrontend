import request from '@/utils/request'
import { downloadFile } from '@/api/util'

export function getProduceMaterialSize(feedbackOrderId) {
  return request({
    url: '/produceMaterial/sizeInfo',
    method: 'get',
    params: {
      feedbackOrderId: feedbackOrderId
    }
  })
}

export function getProduceMaterialUseBomList(feedbackOrderId) {
  return request({
    url: '/produceMaterial/useBomInfo',
    method: 'get',
    params: {
      feedbackOrderId: feedbackOrderId
    }
  })
}

export function exportProduceMaterialUseBomList(feedbackOrderId) {
  return downloadFile('/produceMaterial/exportFeedbackOrderUseBomInfoExcel/' + feedbackOrderId, {}, '物料详情.xlsx')
}


export function updIDSupplyState(data) {
  return request({
    url: '/produceMaterial/updIDSupplyState',
    method: 'post',
    data: data
  })
}

export function updIDProduceState(data) {
  return request({
    url: '/produceMaterial/updIDProduceState',
    method: 'post',
    data: data
  })
}

export function updFeedbackOrderIDState(data) {
  return request({
    url: '/produceMaterial/updFeedbackOrderIDState',
    method: 'post',
    data: data
  })
}


