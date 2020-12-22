const getters = {
  appInfo: state => state.app.appInfo,
  windowScrollTop: state => state.app.windowScrollTop,
  // showBanner: state => {
  //   if (sessionStorage.getItem(`${state.app.prefix}showBanner`)) {
  //     return sessionStorage.getItem(`${state.app.prefix}showBanner`)
  //   } else return state.app.showBanner
  // },
  showBanner: state => state.app.showBanner,
  
  // showNavBar: state => {
  //   if (sessionStorage.getItem(`${state.app.prefix}showNavBar`)) {
  //     return sessionStorage.getItem(`${state.app.prefix}showNavBar`)
  //   } else return state.app.showNavBar
  // },
  showNavBar: state => state.app.showNavBar,
}
export default getters