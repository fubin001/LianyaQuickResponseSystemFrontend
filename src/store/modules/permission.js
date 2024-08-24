import { asyncRoutes, constantRoutes } from '@/router'

/**
 * Use meta.role to determine if the current user has permission
 * 判断指定的菜单，当前用户是否有访问权限（使用meth.roles进行判断）
 * @param roles 用户权限数组
 * @param route 当前菜单
 */
function hasPermission(roles, route) {
  // 确定 当前菜单是否定义了meta   且 meta是否定义了roles
  if (route.meta && route.meta.roles) {
    // 遍历用户权限数组，，其中是否有一个值在route.meta.roles数组中存在
    return roles.some(role => route.meta.roles.includes(role))
  } else { // 没有定义meta.roles,可以直接访问
    return true
  }
}

/**
 * Use meta.role to determine if the current user has permission
 * 判断指定的菜单，当前用户是否有访问权限(使用path进行判断)
 * @param menus 用户拥有的菜单权限 数组
 * @param route 当前菜单
 */
function menusHasPermission(menus, route) {
  // 判断用户菜单权限是否包含了该菜单
  return menus.includes(route.path)
}
/**
 * Filter asynchronous routing tables by recursion
 * 角色过滤异步路由
 * @param routes asyncRoutes 所有asyncRoutes下的菜单
 * @param roles 用户权限数组
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []
  // 遍历所有菜单
  routes.forEach(route => {
    // ...纯赋值给tmp，防止route被改值
    const tmp = { ...route }
    // 查询用户是否有当前菜单的权限
    if (hasPermission(roles, tmp)) {
      // 判断是否存在子菜单。如果存在则递归，查用户是否拥有该子菜单的权限
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      // 拥有权限 可以访问，合并
      res.push(tmp)
    }
  })

  return res
}

/**
 * 菜单地址过滤异步路由
 * @param routes 菜单集合
 * @param menus 用户权限(菜单值)数组
 */
export function menusFilterAsyncRoutes(routes, menus) {
  const res = []
  // 遍历所有菜单
  routes.forEach(route => {
    // ...纯赋值给tmp，防止route被改值
    const tmp = { ...route }
    // 查询用户是否有当前菜单的权限
    if (menusHasPermission(menus, tmp)) {
      // 判断是否存在子菜单。如果存在则递归，查用户是否拥有该子菜单的权限
      if (tmp.children) {
        tmp.children = menusFilterAsyncRoutes(tmp.children, menus)
      }
      // 拥有权限 可以访问，合并
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }, { roles, menus }) {
    // console.log("96perm",roles,menus);
    return new Promise(resolve => {
      let accessedRoutes
      // debugger
      // 判断是否拥有admin权限。拥有则开放所有菜单
      if (roles.includes('admin')) {
        accessedRoutes = asyncRoutes || []
      } else { // 没有admin则进入判断。看该用户拥有哪些菜单访问权限
        // accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
        accessedRoutes = menusFilterAsyncRoutes(asyncRoutes, menus)
      }
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
