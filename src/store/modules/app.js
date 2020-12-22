const state = {
  prefix: 'set_sail_',
  appInfo: {
    appName: "尹旭冉-扬帆起航-未来可期",
    appIcon: "icon-oabangong-copy"
  },
  windowScrollTop: 0,
  showBanner: true,
  showNavBar: false
}
const mutations = {
  SET_APP_INFO(state, data) {
    state.appInfo = data
  },
  SET_WINDOW_SCROLL_TOP(state, number) {
    state.windowScrollTop = number
  },
  SET_SHOW_BANNER(state, value) {
    state.showBanner = value
  },
  SET_SHOW_NAV_BAR(state, value) {
    state.showNavBar = value
  }
}
const actions = {
  // 设置 app 信息
  setUserName({ commit }, data) {
    commit('SET_APP_INFO', data)
  },
  setWindowScrollTop({ commit }, number) {
    commit('SET_WINDOW_SCROLL_TOP', number)
  },
  setShowBanner({ commit, state }, value) {
    sessionStorage.setItem(`${state.prefix}showBanner`, value)
    commit("SET_SHOW_BANNER", value)
  },
  setShowNavBar({ commit, state }, value) {
    sessionStorage.setItem(`${state.prefix}showNavBar`, value)
    commit("SET_SHOW_NAV_BAR", value)
  },
}
export default {
  state,
  mutations,
  actions
}
