import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const state = {
    sysPrefix: "cadreMeals_",
    refreshLocal: [], 
    appInfo: {
        appName: "尹旭冉-扬帆起航-未来可期",
        appIcon: "icon-oabangong-copy"
    },
    openMenu: false,
    menuActiveIndex: 0,
    headerMenuIndex: 0,
    pageLoading: false,     //页面loading
    refreshHeight: false,   //刷新高度
    useDim:false,           //遮罩层模糊底层
    userInfo: {},
    menuData: [],
    codeData: {},
    userPage: {},
    userTable: {},
    advancedChange: false,
};
const getters = {
    userInfo(state) {
        if (!state.userInfo || Object.keys(state.userInfo).length === 0)
            state.userInfo = JSON.parse(sessionStorage[state.sysPrefix + "userInfo"]);
        return state.userInfo;
    },
    menuData(state) {
        if (state.menuData.length <= 0) {
            if (localStorage[state.sysPrefix + "userMenu"])
                state.menuData = JSON.parse(localStorage[state.sysPrefix + "userMenu"]);
            else {
                state.menuData = [];
            }
        }
        return state.menuData;
    },
    codeData(state) {
        if (Object.keys(state.codeData).length === 0) {
            if (localStorage[state.sysPrefix + "codeData"]) {
                state.codeData = JSON.parse(localStorage[state.sysPrefix + "codeData"]);
            }
        }
        return state.codeData;
    },
    userPage(state) {
        if (Object.keys(state.userPage).length > 0) {
            return state.userPage;
        } else {
            if (!localStorage[state.sysPrefix + 'page'])
                localStorage.setItem(state.sysPrefix + 'page', JSON.stringify({}));
            return JSON.parse(localStorage[state.sysPrefix + 'page']);
        }
    },
    userTable(state) {
        if (Object.keys(state.userTable).length > 0) {
            return state.userTable;
        } else {
            if (!localStorage[state.sysPrefix + 'table'])
                localStorage.setItem(state.sysPrefix + 'table', JSON.stringify({}));
            return JSON.parse(localStorage[state.sysPrefix + 'table']);
        }
    },
    
};
const mutations = {
    updateAdvancedChange(state, payload) {
        state.advancedChange = payload
    },
    //菜单toggle
    toggleOpenMenu(state) {
        state.openMenu = !state.openMenu;
    },
    //更新菜单开关
    updateOpenMenu(state, payload) {
        state.openMenu = payload;
    },
    //更新菜单所在
    updateMenuActiveIndex(state, payload) {
        state.menuActiveIndex = payload;
    },
    //更新页面头部菜单所在
    updateHeaderMenuIndex(state, payload) {
        state.headerMenuIndex = payload;
    },
    //更新页面头部菜单所在
    setUserInfo(state, payload) {
        sessionStorage.setItem(state.sysPrefix + 'userInfo', JSON.stringify(payload));
        state.userInfo = payload;
    },
    //更新菜单数据
    updateMenuData(state, payload) {
        state.menuData = payload;
    },
    //更新code数据
    updateCodeData(state, payload) {
        state.codeData = payload
    },
    //更新高度刷新
    updateRefreshHeight(state, payload) {
        state.refreshHeight = payload;
    },
    //更新页面loading
    updatePageLoading(state, payload) {
        state.pageLoading = payload;
    },
    //更新页面page
    updateUserPage(state, payload) {
        Vue.prototype.$set(state.userPage, payload[0], payload[1]);
        localStorage.setItem(state.sysPrefix + 'page', JSON.stringify(state.userPage));
    },
    //更新页面table
    updateUserTable(state, payload) {
        Vue.prototype.$set(state.userTable, payload[0], payload[1]);
        localStorage.setItem(state.sysPrefix + 'table', JSON.stringify(state.userTable));
    },
    //更新页面模糊
    updateUseDim(state, payload) {
        state.useDim = payload;
    }
};
export default new Vuex.Store({
    state,
    getters,
    mutations
});
