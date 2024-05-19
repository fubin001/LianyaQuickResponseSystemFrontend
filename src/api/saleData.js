import request from '@/utils/request'

export function querySaleDataBySalePlanById(id) {
  return request({
    url: '/saleData/getSalePlanSaleData?salePlanId=' + id,
    method: 'get'
  })
}

export function querySkuProductSaleDate(skuId) {
  return request({
    url: '/skuData/getSkuProductSaleData?skuId=' + skuId,
    method: 'get'
  })
}

export function querySaleDataBy(salePlanId, oldSalePlanId) {
  return request({
    url: '/saleData/getSalePlanSaleData',
    method: 'get',
    params: {
      salePlanId: salePlanId,
      oldSalePlanId: oldSalePlanId
    }
  })
}

export function syncCalculateBySalePlanById(id) {
  return request({
    url: '/saleData/syncCalculate/' + id,
    method: 'post'
  })
}

export function queryCandidateSalePlan(skuId) {
  return request({
    url: '/saleData/queryCandidateSalePlan?skuId=' + skuId,
    method: 'get'
  })
}

export function batchUpdateSaleData(data) {
  return request({
    url: '/saleData/batchUpdateSaleData',
    method: 'post',
    data: data
  })
}
