import { app } from './type';
const getters = {
  appInfo: (state: any) => state.app.appInfo,
  windowScrollTop: (state: any) => state.app.windowScrollTop,
  showBanner: (state: any) => state.app.showBanner,
  showNavBar: (state: any) => state.app.showNavBar,
}

export default getters