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
  // {
  //   path: '/redirect',
  //   component: Layout,
  //   hidden: true,
  //   children: [
  //     {
  //       path: '/redirect/:path(.*)',
  //       component: () => import('@/views/redirect/index')
  //     }
  //   ]
  // },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  // {
  //   path: '/register',
  //   component: () => import('@/views/register/index'),
  //   hidden: true
  // },
  // {
  //   path: '/auth-redirect',
  //   component: () => import('@/views/login/auth-redirect'),
  //   hidden: true
  // },
  // {
  //   path: '/404',
  //   component: () => import('@/views/error-page/404'),
  //   hidden: true
  // },
  // {
  //   path: '/401',
  //   component: () => import('@/views/error-page/401'),
  //   hidden: true
  // },
  // // {
  // //   path: '/',
  // //   component: Layout,
  // //   redirect: '/dashboard',
  // //   children: [
  // //     {
  // //       path: 'dashboard',
  // //       component: () => import('@/views/dashboard/index'),
  // //       name: 'Dashboard',
  // //       meta: { title: 'Dashboard', icon: 'dashboard', affix: true }
  // //     }
  // //   ]
  // // },
  // {
  //   path: '/profile',
  //   component: Layout,
  //   redirect: '/profile/index',
  //   hidden: true,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/profile/index'),
  //       name: 'Profile',
  //       meta: { title: 'Profile', icon: 'user', noCache: true }
  //     }
  //   ]
  // },
  // {
  //   path: '/',
  //   component: Layout,
  //   name: '销售管理',
  //   noCache: true,
  //   redirect: '/skuProduct/info',
  //   meta: {
  //     title: '销售管理',
  //     icon: 'edit'
  //   },
  //   children: [
  //     {
  //       path: '/product/brand',
  //       component: () => import('@/views/product/brand'),
  //       name: '品牌信息',
  //       noCache: true,
  //       meta: { title: '品牌信息', icon: 'edit' }
  //     },
  //     // {
  //     //   path: '/product/info',
  //     //   component: () => import('@/views/product/product'),
  //     //   name: '商品信息',
  //     //   meta: { title: '商品信息', icon: 'edit' }
  //     // },
  //     {
  //       path: '/skuProduct/info',
  //       component: () => import('@/views/product/saleProduct'),
  //       name: '销售商品',
  //       noCache: true,
  //       meta: { title: '销售商品', icon: 'edit' }
  //     },
  //     {
  //       path: '/skuProduct/feedback',
  //       component: () => import('@/views/product/feedback'),
  //       name: '生产订单',
  //       noCache: true,
  //       meta: { title: '生产订单', icon: 'edit' }
  //     },
  //     // {
  //     //   path: '/data/componentOrder',
  //     //   component: () => import('@/views/order/componentOrder'),
  //     //   name: '生产订单',
  //     //   meta: { title: '生产订单', icon: 'edit' }
  //     // },
  //     {
  //       path: '/product/saleProductPanel',
  //       component: () => import('@/views/product/saleProductPanel'),
  //       name: '销售面板',
  //       noCache: true,
  //       hidden: true,
  //       meta: { title: '销售面板', icon: 'edit' }
  //     }
  //   ]
  // },
  // {
  //   path: '/data',
  //   component: Layout,
  //   name: '数据管理',
  //   redirect: '/data/buyOrder',
  //   meta: {
  //     title: '数据管理',
  //     icon: 'edit'
  //   },
  //   children: [
  //     {
  //       path: '/data/buyOrder',
  //       component: () => import('@/views/order/buyOrder'),
  //       name: '采购数据',
  //       meta: { title: '采购数据', icon: 'edit' }
  //     },
  //     {
  //       path: '/data/saleOrder',
  //       component: () => import('@/views/order/saleOrder'),
  //       name: '销售数据',
  //       meta: { title: '销售数据', icon: 'edit' }
  //     },
  //     {
  //       path: '/data/materialOrder',
  //       component: () => import('@/views/order/materialOrder'),
  //       name: '备料数据',
  //       meta: { title: '备料数据', icon: 'edit' }
  //     },
  //     {
  //       path: '/data/bom',
  //       component: () => import('@/views/bom/data'),
  //       name: 'BOM数据',
  //       meta: { title: 'BOM数据', icon: 'edit' }
  //     },
  //     {
  //       path: '/data/storage',
  //       component: () => import('@/views/storage/overview'),
  //       name: '库存数据',
  //       meta: { title: '库存数据', icon: 'edit' }
  //     },
  //     {
  //       path: '/data/storageDetail',
  //       component: () => import('@/views/storage/detail'),
  //       name: '库存明细',
  //       meta: { title: '库存明细', icon: 'edit' }
  //     },
  //     {
  //       path: '/data/color',
  //       component: () => import('@/views/color/index'),
  //       name: '颜色数据',
  //       meta: { title: '颜色数据', icon: 'edit' }
  //     }
  //   ]
  // },
  // {
  //   path: '/user',
  //   component: Layout,
  //   redirect: '/user/info',
  //   meta: {
  //     title: '用户管理',
  //     icon: 'user',
  //     role:['admin']
  //   },
  //   children: [
  //     {
  //       path: '/user/info',
  //       component: () => import('@/views/user/user'),
  //       name: '用户信息',
  //       meta: { title: '用户信息', icon: 'user'}
  //     }, {
  //       path: '/user/role',
  //       component: () => import('@/views/user/role'),
  //       name: '角色信息',
  //       meta: { title: '角色信息', icon: 'edit' }
  //     },
  //     {
  //       path: '/user/userRole',
  //       component: () => import('@/views/user/userRole'),
  //       name: '用户与角色权限',
  //       meta: { title: '用户与角色权限', icon: 'edit' }
  //     }
  //   ]
  // },
  // {
  //   path: '/sy',
  //   component: Layout,
  //   redirect:'sy/info',
  //   meta: {
  //     title: '实验',
  //     icon: 'sy'
  //   },
  //   children: [
  //     {
  //       path: '/sy/info',
  //       component: () => import('@/views/user/sy'),
  //       name: '实验',
  //       meta: { title: '实验', icon: 'sy', affix: true ,}
  //     }
  //   ]
  // }
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
        name: 'brand',
        noCache: true,
        meta: { title: '品牌信息', icon: 'edit', roles:['admin','sale']}
      },
      // {
      //   path: '/product/info',
      //   component: () => import('@/views/product/product'),
      //   name: '商品信息',
      //   meta: { title: '商品信息', icon: 'edit' }
      // },
      {
        path: '/skuProduct/info',
        component: () => import('@/views/product/saleProduct'),
        name: 'saleProduct',
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
      // {
      //   path: '/data/componentOrder',
      //   component: () => import('@/views/order/componentOrder'),
      //   name: '生产订单',
      //   meta: { title: '生产订单', icon: 'edit' }
      // },
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
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  // {
  //   path: '/login',
  //   component: () => import('@/views/login/index'),
  //   hidden: true
  // },
  // {
  //   path: '/register',
  //   component: () => import('@/views/register/index'),
  //   hidden: true
  // },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true,
  },
  {
    path: '/',
    component: Layout,
    redirect: '/other/401',
    hidden: true,
    children: [
      {
        path: '/other/404',
        component: () => import('@/views/error-page/404'),
        name: '404',
        noCache: true,
        meta: { title: '404', icon: 'edit', roles:['admin','sale']}
      },
      {
        path: '/other/401',
        component: () => import('@/views/error-page/401'),
        name: '401',
        noCache: true,
        meta: { title: '401', icon: 'edit', roles:['admin','sale']}
      },
    ],
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true,
  },
  // {
  //   path: '/',
  //   component: Layout,
  //   redirect: '/dashboard',
  //   children: [
  //     {
  //       path: 'dashboard',
  //       component: () => import('@/views/dashboard/index'),
  //       name: 'Dashboard',
  //       meta: { title: 'Dashboard', icon: 'dashboard', affix: true }
  //     }
  //   ]
  // },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: { title: 'Profile', icon: 'user', noCache: true }
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
        name: '采购数据',
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
        meta: { title: '角色信息', icon: 'edit' , roles:['admin']}
      },
      {
        path: '/user/userRole',
        component: () => import('@/views/user/userRole'),
        name: '用户与角色权限',
        meta: { title: '用户与角色权限', icon: 'edit', roles:['admin'] }
      },
      {
        path: '/user/userApplyFor',
        component: () => import('@/views/user/userApplyFor'),
        name: '用户申请',
        meta: { title: '用户申请', icon: 'edit', roles:['admin'] }
      }
    ]
  },
  {
    path: '/sy',
    component: Layout,
    redirect:'sy/info',
    meta: {
      title: '实验',
      icon: 'sy'
    },
    children: [
      {
        path: '/sy/info',
        component: () => import('@/views/user/sy'),
        name: '实验',
        meta: { title: '实验', icon: 'sy', affix: true ,}
      }
    ]
  },
  // {
  //   path: '/permission',
  //   component: Layout,
  //   redirect: '/permission/page',
  //   alwaysShow: true, // will always show the root menu
  //   name: 'Permission',
  //   meta: {
  //     title: 'Permission',
  //     icon: 'lock',
  //     roles: ['admin',] // you can set roles in root nav
  //   },
  //   children: [
  //     {
  //       path: 'page',
  //       component: () => import('@/views/permission/page'),
  //       name: 'PagePermission',
  //       meta: {
  //         title: 'Page Permission',
  //         roles: ['admin'] // or you can only set roles in sub nav
  //       }
  //     },
  //     {
  //       path: 'directive',
  //       component: () => import('@/views/permission/directive'),
  //       name: 'DirectivePermission',
  //       meta: {
  //         title: 'Directive Permission'
  //         // if do not set roles, means: this page does not require permission
  //       }
  //     },
  //     {
  //       path: 'role',
  //       component: () => import('@/views/permission/role'),
  //       name: 'RolePermission',
  //       meta: {
  //         title: 'Role Permission',
  //         roles: ['admin']
  //       }
  //     }
  //   ]
  // },

  // {
  //   path: '/icon',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/icons/index'),
  //       name: 'Icons',
  //       meta: { title: 'Icons', icon: 'icon', noCache: true }
  //     }
  //   ]
  // },

  // /** when your routing map is too long, you can split it into small modules **/
  // componentsRouter,
  // chartsRouter,
  // nestedRouter,
  // tableRouter,

  // {
  //   path: '/example',
  //   component: Layout,
  //   redirect: '/example/list',
  //   name: 'Example',
  //   meta: {
  //     title: 'Example',
  //     icon: 'el-icon-s-help'
  //   },
  //   children: [
  //     {
  //       path: 'create',
  //       component: () => import('@/views/example/create'),
  //       name: 'CreateArticle',
  //       meta: { title: 'Create Article', icon: 'edit' }
  //     },
  //     {
  //       path: 'edit/:id(\\d+)',
  //       component: () => import('@/views/example/edit'),
  //       name: 'EditArticle',
  //       meta: { title: 'Edit Article', noCache: true, activeMenu: '/example/list' },
  //       hidden: true
  //     },
  //     {
  //       path: 'list',
  //       component: () => import('@/views/example/list'),
  //       name: 'ArticleList',
  //       meta: { title: 'Article List', icon: 'list' }
  //     }
  //   ]
  // },

  // {
  //   path: '/tab',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/tab/index'),
  //       name: 'Tab',
  //       meta: { title: 'Tab', icon: 'tab' }
  //     }
  //   ]
  // },

  // {
  //   path: '/error',
  //   component: Layout,
  //   redirect: 'noRedirect',
  //   name: 'ErrorPages',
  //   meta: {
  //     title: 'Error Pages',
  //     icon: '404'
  //   },
  //   children: [
  //     {
  //       path: '401',
  //       component: () => import('@/views/error-page/401'),
  //       name: 'Page401',
  //       meta: { title: '401', noCache: true }
  //     },
  //     {
  //       path: '404',
  //       component: () => import('@/views/error-page/404'),
  //       name: 'Page404',
  //       meta: { title: '404', noCache: true }
  //     }
  //   ]
  // },

  // {
  //   path: '/error-log',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'log',
  //       component: () => import('@/views/error-log/index'),
  //       name: 'ErrorLog',
  //       meta: { title: 'Error Log', icon: 'bug' }
  //     }
  //   ]
  // },

  // {
  //   path: '/excel',
  //   component: Layout,
  //   redirect: '/excel/export-excel',
  //   name: 'Excel',
  //   meta: {
  //     title: 'Excel',
  //     icon: 'excel'
  //   },
  //   children: [
  //     {
  //       path: 'export-excel',
  //       component: () => import('@/views/excel/export-excel'),
  //       name: 'ExportExcel',
  //       meta: { title: 'Export Excel' }
  //     },
  //     {
  //       path: 'export-selected-excel',
  //       component: () => import('@/views/excel/select-excel'),
  //       name: 'SelectExcel',
  //       meta: { title: 'Export Selected' }
  //     },
  //     {
  //       path: 'export-merge-header',
  //       component: () => import('@/views/excel/merge-header'),
  //       name: 'MergeHeader',
  //       meta: { title: 'Merge Header' }
  //     },
  //     {
  //       path: 'upload-excel',
  //       component: () => import('@/views/excel/upload-excel'),
  //       name: 'UploadExcel',
  //       meta: { title: 'Upload Excel' }
  //     }
  //   ]
  // },

  // // {
  // //   path: '/zip',
  // //   component: Layout,
  // //   redirect: '/zip/download',
  // //   alwaysShow: true,
  // //   name: 'Zip',
  // //   meta: { title: 'Zip', icon: 'zip' },
  // //   children: [
  // //     {
  // //       path: 'download',
  // //       component: () => import('@/views/zip/index'),
  // //       name: 'ExportZip',
  // //       meta: { title: 'Export Zip' }
  // //     }
  // //   ]
  // // },

  // {
  //   path: '/pdf',
  //   component: Layout,
  //   redirect: '/pdf/index',
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/pdf/index'),
  //       name: 'PDF',
  //       meta: { title: 'PDF', icon: 'pdf' }
  //     }
  //   ]
  // },
  // {
  //   path: '/pdf/download',
  //   component: () => import('@/views/pdf/download'),
  //   hidden: true
  // },

  // {
  //   path: '/theme',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/theme/index'),
  //       name: 'Theme',
  //       meta: { title: 'Theme', icon: 'theme' }
  //     }
  //   ]
  // },

  // {
  //   path: '/clipboard',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/clipboard/index'),
  //       name: 'ClipboardDemo',
  //       meta: { title: 'Clipboard', icon: 'clipboard' }
  //     }
  //   ]
  // },

  // {
  //   path: 'external-link',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'https://github.com/PanJiaChen/vue-element-admin',
  //       meta: { title: 'External Link', icon: 'link' }
  //     }
  //   ]
  // },

  // 404 page must be placed at the end !!!
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
