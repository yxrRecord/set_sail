import { app } from './type';
const getters = {
  appInfo: state => state.app.appInfo,
  windowScrollTop: state => state.app.windowScrollTop,
  // showBanner: state => {
  //   if (sessionStorage.getItem(`${state.app.prefix}showBanner`)) {
  //     return sessionStorage.getItem(`${state.app.prefix}showBanner`)
  //   } else return state.app.showBanner
  // },
  showBanner: state => state.app.showBanner,
  
  // showNavBar: state => { 采用这种方式，computed 计算属性无法实施更新
  //   if (sessionStorage.getItem(`${state.app.prefix}showNavBar`)) {
  //     return sessionStorage.getItem(`${state.app.prefix}showNavBar`)
  //   } else return state.app.showNavBar
  // },
  showNavBar: state => state.app.showNavBar,
}

export default getters