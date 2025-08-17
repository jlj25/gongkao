const getters = {
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  sidebar: state => state.app.sidebar,
  permission_routers: state => state.permission.routes || [],
  variables: () => ({
    menuText: '#ffffff',
    menuActiveText: '#409EFF',
    subMenuActiveText: '#ffffff',
    menuBg: '#2b2f3a',
    menuHover: '#263445',
    menuActiveBg: '#263445',
    subMenuBg: '#2b2f3a',
    subMenuHover: '#263445',
    sideBarWidth: '210px'
  })
}
export default getters