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
