import { MutationTree, ActionTree } from 'vuex'

const state = {
    userInfo: {}
}

const mutations = {
    SET_USER_INFO(state, value) {
        state.userInfo = value;
    },
    GET_USER_INFO(state) {
        return state.userInfo
    }
}

export default {
    namespace: true, // 用于在全局引用此文件里的方法时标识这一个的文件名，解决命名冲突
    state
}
