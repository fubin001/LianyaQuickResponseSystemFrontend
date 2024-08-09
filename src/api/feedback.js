/*
 * @Descripttion:
 * @version:
 * @Author: yangyang.liu
 * @Date: 2024-06-20 12:32:43
 * @LastEditors: yangyang.liu
 * @LastEditTime: 2024-06-25 11:35:06
 */
import request from '@/utils/request'
import { downloadFile } from '@/api/util'

export function queryFeedbackOrder(query) {
  return request({
    url: '/feedback/query',
    method: 'get',
    params: query
  })
}

export function getFeedbackOrder(feedbackOrderId) {
  return request({
    url: '/feedback/getFeedbackOrder',
    method: 'get',
    params: {
      feedbackOrderId: feedbackOrderId
    }
  })
}

export function getProduceTree(produceOrderId) {
  return request({
    url: '/feedback/getProduceTree',
    method: 'get',
    params: {
      produceOrderId: produceOrderId
    }
  })
}

export function confirmFeedback(id) {
  return request({
    url: '/feedback/confirm/' + id,
    method: 'POST'
  })
}

export function forwardProduceState(nodeId) {
  return request({
    url: '/feedback/forwardProduceState/' + nodeId,
    method: 'POST'
  })
}

export function executeFeedback(id) {
  return request({
    url: '/feedback/executeFeedback?feedbackOrderId=' + id,
    method: 'POST'
  })
}

export function exportFeedbackOrder(param) {
  return downloadFile('/feedback/export', param, '反馈订单详情.xlsx')
}

export function addFeedbackOrder(order) {
  return request({
    url: '/feedback/generateFeedbackOrder',
    method: 'post',
    data: order
  })
}

export function addProduceOrder(order) {
  return request({
    url: '/feedback/addProduceOrder',
    method: 'post',
    data: order
  })
}



export function cancelFeedbackOrder(order) {
  return request({
    url: '/feedback/cancel/' + order,
    method: 'post',
  })
}


export function accomplishFeedbackOrder(order) {
  return request({
    url: '/feedback/accomplish/' + order,
    method: 'post',
  })
}