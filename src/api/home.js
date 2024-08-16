import request from '@/utils/request'
import { downloadFile } from '@/api/util'

export function feedbackOrder() {
  return request({
    url: '/home/feedbackOrder',
    method: 'get',
  })
}
/**
 * 
 * @returns 生产订单周数据
 */
export function getFeedbackOrderWeek() {
  return request({
    url: '/home/getFeedbackOrderWeek',
    method: 'get',
  })
}


export function getSaleOrder() {
  return request({
    url: '/home/getSaleOrder',
    method: 'get',
  })
}


//

export function getBuyOrder() {
  return request({
    url: '/home/getBuyOrder',
    method: 'get',
  })
}

// export function queryFeedbackOrder(query) {
//   return request({
//     url: '/feedback/query',
//     method: 'get',
//     params: query
//   })
// }

// export function addProduceOrder(data) {
//   return request({
//     url: '/feedback/addProduceOrder',
//     method: 'post',
//     data: data
//   })
// }

