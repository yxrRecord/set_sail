const state = {
  appInfo: {
    appName: "尹旭冉-扬帆起航-未来可期",
    appIcon: "icon-oabangong-copy"
  },
  windowScrollTop: 0
}
const mutations = {
  SET_APP_INFO(state, data) {
    state.appInfo = data
  },
  SET_WINDOW_SCROLL_TOP(state, number) {
    state.windowScrollTop = number
  }
}
const actions = {
  // 设置 app 信息
  setUserName({ commit }, data) {
    commit('SET_APP_INFO', data)
  },
  setWindowScrollTop({ commit }, number) {
    commit('SET_WINDOW_SCROLL_TOP', number)
  }
}
export default {
  state,
  mutations,
  actions
}
