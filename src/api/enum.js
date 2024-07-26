import request from '@/utils/request'

/**
 * 获取角色枚举
 * @returns {*}
 */
export function getRoleEnum() {
  return request({
    url: '/role/enum',
    method: 'get'
  })
}

/**
 * 获取品牌枚举
 * @returns {*}
 */
export function getBrandEnum() {
  return request({
    url: '/brand/enum',
    method: 'get'
  })
}

export function getSkuIdEnumList() {
  return request({
    url: '/skuProduct/getSkuIdList',
    method: 'get'
  })
}

export function getTrsNoEnumList() {
  return request({
    url: '/bom/getTrsNoEnumList',
    method: 'get'
  })
}

export function getBomCreateTypeEnumList() {
  return request({
    url: '/bom/getCreateTypeEnumList',
    method: 'get'
  })
}

export const LayerEnumList = [
  {
    'name': '1',
    'value': 1
  },
  {
    'name': '2',
    'value': 2
  },
  {
    'name': '3',
    'value': 3
  },
  {
    'name': '4',
    'value': 4
  }
]

export const DistinguishSizeEnum = [
  {
    'name': '区分',
    'value': 'Y'
  },
  {
    'name': '不区分',
    'value': ''
  }
]
