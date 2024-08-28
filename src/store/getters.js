const getters = {
  sidebar: state => state.app.sidebar,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  introduction: state => state.user.introduction,
  roles: state => state.user.roles,
  routes: state => state.permission.routes, //
  menus: state => state.permission.menus, //
  permission_routes: state => state.permission.routes,
  errorLogs: state => state.errorLog.logs,
  currentPath: state => state.user.currentPath
}
export default getters
