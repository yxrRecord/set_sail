import { GetterTree, MutationTree, ActionTree } from 'vuex'
import { RootState } from "../index.d"
interface AppInfoType {
  appName: string
  appIcon: string
}
interface StateType {
  prefix: string
  appInfo: AppInfoType 
  windowScrollTop: number
  showBanner: boolean
}

const state: StateType = {
  prefix: 'set_sail_',
  appInfo: {
    appName: "XXX-扬帆起航-未来可期",
    appIcon: "icon-oabangong-copy"
  },
  windowScrollTop: 0,
  showBanner: true,
}

// getters
// const getters: GetterTree<StateType, RootState> = {
//   accountId(state) {
//     return state.userInfo.id
//   }
// }

const mutations:  MutationTree<StateType> = {
  SET_APP_INFO(state: StateType, data: AppInfoType) {
    state.appInfo = data
  },
  SET_SHOW_BANNER(state: StateType, value: boolean) {
    state.showBanner = value
  },
}

const actions: ActionTree<StateType, RootState> = {
  // 设置 app 信息
  setUserName({ commit }, data) {
    commit('SET_APP_INFO', data)
  },
  setShowBanner({ commit, state }, value) {
    sessionStorage.setItem(`${state.prefix}showBanner`, value)
    commit("SET_SHOW_BANNER", value)
  },
}
export default {
  namespace: true, // 用于在全局引用此文件里的方法时标识这一个的文件名，解决命名冲突
  state,
  mutations,
  actions
}
