import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
 roles: ['admin','editor']    control the page roles (you can set multiple roles)
 title: 'title'               the name show in sidebar and breadcrumb (recommend set)
 icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
 noCache: true                if set true, the page will no be cached(default is false)
 affix: true                  if set true, the tag will affix in the tags-view
 breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
 activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
 }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: '/404',
        component: () => import('@/views/error-page/404'),
        name: '404',
        noCache: true,
        hidden: true,
        meta: { title: '404', icon: 'edit' }
      },
      {
        path: '/home',
        component: () => import('@/views/home/index'),
        name: '系统首页',
        // hidden: true , //不展示
        noCache: true,
        meta: { title: '系统首页', icon: 'tree' }
      },
      {
        path: '/401',
        component: () => import('@/views/error-page/401'),
        name: '401',
        noCache: true,
        hidden: true,
        meta: { title: '401', icon: 'edit' }
      }
    ]
  }

]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */

export const asyncRoutes = [
  {
    path: '/skuProduct',
    component: Layout,
    name: 'SkuProduct',
    noCache: true,
    redirect: '/skuProduct/info',
    meta: {
      title: '销售管理',
      icon: 'edit'
    },
    children: [
      {
        path: '/product/brand',
        component: () => import('@/views/product/brand'),
        name: 'Brand',
        noCache: true,
        meta: { title: '品牌信息', icon: 'edit' }
      },
      {
        path: '/skuProduct/info',
        component: () => import('@/views/product/saleProduct'),
        name: 'SaleProduct',
        noCache: true,
        meta: { title: '销售商品', icon: 'edit' }
      },
      {
        path: '/skuProduct/feedback',
        component: () => import('@/views/product/feedback'),
        name: 'Feedback',
        noCache: true,
        meta: { title: '生产订单', icon: 'edit' }
      },
      {
        path: '/product/saleProductPanel',
        component: () => import('@/views/product/saleProductPanel'),
        name: 'SaleProductPanel',
        noCache: true,
        hidden: true,
        meta: { title: '销售面板', icon: 'edit' }
      }
    ]
  },

  {
    path: '/data',
    component: Layout,
    name: 'Data',
    redirect: '/data/buyOrder',
    meta: {
      title: '数据管理',
      icon: 'el-icon-s-grid'
    },
    children: [
      {
        path: '/data/buyOrder',
        component: () => import('@/views/order/buyOrder'),
        name: 'BuyOrder',
        meta: { title: '采购数据', icon: 'el-icon-s-grid' }
      },
      {
        path: '/data/saleOrder',
        component: () => import('@/views/order/saleOrder'),
        name: 'SaleOrder',
        meta: { title: '销售数据', icon: 'el-icon-s-grid' }
      },
      {
        path: '/data/materialOrder',
        component: () => import('@/views/order/materialOrder'),
        name: 'MaterialOrder',
        meta: { title: '备料数据', icon: 'el-icon-s-grid' }
      },
      {
        path: '/data/bom',
        component: () => import('@/views/bom/data'),
        name: 'Bom',
        meta: { title: 'BOM数据', icon: 'el-icon-s-grid' }
      },
      {
        path: '/data/storage',
        component: () => import('@/views/storage/overview'),
        name: 'Storage',
        meta: { title: '库存数据', icon: 'el-icon-s-grid' }
      },
      {
        path: '/data/storageDetail',
        component: () => import('@/views/storage/detail'),
        name: 'StorageDetail',
        meta: { title: '库存明细', icon: 'el-icon-s-grid' }
      },
      {
        path: '/data/color',
        component: () => import('@/views/color/index'),
        name: 'Color',
        meta: { title: '颜色数据', icon: 'el-icon-s-grid' }
      },
      {
        path: '/store/index',
        component: () => import('@/views/store/index'),
        name: 'StoreIndex',
        meta: { title: '商铺数据', icon: 'el-icon-s-grid' }
      },
      {
        path: '/weather/index',
        component: () => import('@/views/weather/index'),
        name: 'WeatherIndex',
        meta: { title: '城市天气', icon: 'el-icon-s-grid' }
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    redirect: '/user/info',
    meta: {
      title: '用户管理',
      icon: 'user',
      roles: ['admin']
    },
    children: [
      {
        path: '/user/role',
        component: () => import('@/views/user/role'),
        name: 'Role',
        meta: { title: '角色权限', icon: 'user' }
      },
      {
        path: '/user/userRole',
        component: () => import('@/views/user/userRole'),
        name: 'UserRole',
        meta: { title: '用户角色', icon: 'user' }
      },
      {
        path: '/user/userApplyFor',
        component: () => import('@/views/user/userApplyFor'),
        name: 'UserApplyFor',
        meta: { title: '用户申请', icon: 'user' }
      }
    ]
  },

  {
    path: '/system',
    component: Layout,
    redirect: '/system/index',
    meta: {
      title: '系统管理',
      icon: 'password'
    },
    children: [
      {
        path: '/system/index',
        component: () => import('@/views/system/index'),
        name: 'SystemIndex',
        meta: { title: '系统', icon: 'password' }
      }
    ]
  },
  {
    path: '/sy',
    component: Layout,
    redirect: 'sy/info',
    hidden: true, // 不展示
    meta: {
      title: '接口test(不建议给此权限)',
      icon: 'sy'
    },
    children: [
      {
        path: '/sy/info',
        component: () => import('@/views/user/sy'),
        name: '实验',
        meta: { title: '实验', icon: 'sy' }
      },

      {
        path: '/sy/info1',
        component: () => import('@/views/user/sy1'),
        name: '实验1',
        meta: { title: '实验', icon: 'sy' }
      },
      {
        path: '/sy/info2',
        component: () => import('@/views/user/sy2'),
        name: '实验2',
        meta: { title: '实验', icon: 'sy' }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
