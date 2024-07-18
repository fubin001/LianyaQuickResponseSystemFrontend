import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
import componentsRouter from './modules/components'
import chartsRouter from './modules/charts'
import tableRouter from './modules/table'
import nestedRouter from './modules/nested'
import store from '@/store'; //
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
        meta: { title: '404', icon: 'edit', roles:['admin','sale']}
      },
      {
        path: '/home',
        component: () => import('@/views/home/index'),
        name: 'home',
        noCache: true,
        meta: { title: 'home', icon: 'edit', roles:['admin','sale'], affix: true ,}
      },
      {
        path: '/401',
        component: () => import('@/views/error-page/401'),
        name: '401',
        noCache: true,
        hidden: true,
        meta: { title: '401', icon: 'edit', roles:['admin','sale']}
      },
    ],
  },
  
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */

export const asyncRoutes = [
  {
    path: '/skuProduct',
    component: Layout,
    name: '销售管理',
    noCache: true,
    redirect: '/skuProduct/info',
    meta: {
      title: '销售管理',
      icon: 'edit',
      roles:['admin','sale','sale_commodity','sale_production','sale','sale_panel']
    },
    children: [
      {
        path: '/product/brand',
        component: () => import('@/views/product/brand'),
        name: '品牌信息',
        noCache: true,
        meta: { title: '品牌信息', icon: 'edit', roles:['admin','sale']}
      },
      {
        path: '/skuProduct/info',
        component: () => import('@/views/product/saleProduct'),
        name: '销售商品',
        noCache: true,
        meta: { title: '销售商品', icon: 'edit', roles:['admin','sale','sale_commodity'] }
      },
      {
        path: '/skuProduct/feedback',
        component: () => import('@/views/product/feedback'),
        name: '生产订单',
        noCache: true,
        meta: { title: '生产订单', icon: 'edit', roles:['admin','sale','sale_production'] }
      },
      {
        path: '/product/saleProductPanel',
        component: () => import('@/views/product/saleProductPanel'),
        name: '销售面板',
        noCache: true,
        hidden: true,
        meta: { title: '销售面板', icon: 'edit' , roles:['admin','sale','sale_panel']}
      }
    ]
  },
  
  {
    path: '/data',
    component: Layout,
    name: '数据管理',
    redirect: '/data/buyOrder',
    meta: {
      title: '数据管理',
      icon: 'edit', roles:['admin','data','data_purchasing','data_sale','data_bom','data_bom','data_stock','data_detail','data_colour']
    },
    children: [
      {
        path: '/data/buyOrder',
        component: () => import('@/views/order/buyOrder'),
        name: 'data_cg',
        meta: { title: '采购数据', icon: 'edit', roles:['admin','data','data_purchasing'] }
      },
      {
        path: '/data/saleOrder',
        component: () => import('@/views/order/saleOrder'),
        name: '销售数据',
        meta: { title: '销售数据', icon: 'edit', roles:['admin','data_sale'] }
      },
      {
        path: '/data/materialOrder',
        component: () => import('@/views/order/materialOrder'),
        name: '备料数据',
        meta: { title: '备料数据', icon: 'edit', roles:['admin','data_mp'] }
      },
      {
        path: '/data/bom',
        component: () => import('@/views/bom/data'),
        name: 'BOM数据',
        meta: { title: 'BOM数据', icon: 'edit', roles:['admin','data','data_bom'] }
      },
      {
        path: '/data/storage',
        component: () => import('@/views/storage/overview'),
        name: '库存数据',
        meta: { title: '库存数据', icon: 'edit', roles:['admin','data','data_stock'] }
      },
      {
        path: '/data/storageDetail',
        component: () => import('@/views/storage/detail'),
        name: '库存明细',
        meta: { title: '库存明细', icon: 'edit', roles:['admin','data','data_detail'] }
      },
      {
        path: '/data/color',
        component: () => import('@/views/color/index'),
        name: '颜色数据',
        meta: { title: '颜色数据', icon: 'edit', roles:['admin','data','data_colour'] }
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
      roles:['admin']
    },
    children: [
      {
        path: '/user/info',
        component: () => import('@/views/user/user'),
        name: '用户信息',
        meta: { title: '用户信息', icon: 'user', roles:['admin']}
      }, {
        path: '/user/role',
        component: () => import('@/views/user/role'),
        name: '角色信息',
        meta: { title: '角色信息', icon: 'tree' , roles:['admin']}
      },
      {
        path: '/user/userRole',
        component: () => import('@/views/user/userRole'),
        name: '用户与角色权限',
        meta: { title: '用户与角色权限', icon: 'peoples', roles:['admin'] }
      },
      {
        path: '/user/userApplyFor',
        component: () => import('@/views/user/userApplyFor'),
        name: '用户申请',
        meta: { title: '用户申请', icon: 'form', roles:['admin'] }
      }
    ]
  },
  {
    path: '/store',
    component: Layout,
    redirect: '/store/index',
    meta: {
      title: '商铺',
      icon: 'shopping',
    },
    children: [
      {
        path: '/store/index',
        component: () => import('@/views/store/index'),
        name: '商铺',
        meta: { title: '商铺', icon: 'shopping', roles:['admin']}
      }
    ]
  },
  {
    path: '/weather',
    component: Layout,
    redirect: '/weather/index',
    meta: {
      title: '城市天气',
      icon: 'international',
    },
    children: [
      {
        path: '/weather/index',
        component: () => import('@/views/weather/index'),
        name: '城市天气',
        meta: { title: '城市天气', icon: 'international', roles:['admin']}
      }
    ]
  },
  {
    path: '/sy',
    component: Layout,
    redirect:'sy/info', 
    hidden: true , //不展示
    meta: {
      title: '实验',
      icon: 'sy'
    },
    children: [
      {
        path: '/sy/info',
        component: () => import('@/views/user/sy'),
        name: '实验',
        meta: { title: '实验', icon: 'sy'}
      },
      
      {
        path: '/sy/info1',
        component: () => import('@/views/user/sy1'),
        name: '实验1',
        meta: { title: '实验', icon: 'sy'}
      },
      {
        path: '/sy/info2',
        component: () => import('@/views/user/sy2'),
        name: '实验2',
        meta: { title: '实验', icon: 'sy'}
      },
    ]
  },

  { path: '*' ,redirect: '/404', hidden: true },
  // /** when your routing map is too long, you can split it into small modules **/
  // componentsRouter,
  // chartsRouter,
  // nestedRouter,
  // tableRouter,
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

// // 导航守卫
// router.beforeEach((to, from, next) => {
//   console.log(819,to.fullPath);
//   // 保存当前路径到 Vuex 中
//   store.commit('SET_CURRENT_PATH', to.fullPath);
//   next();
// });

export default router
