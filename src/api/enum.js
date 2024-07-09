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

