import { defineStore } from "pinia";
import { localPrefix } from "@config";
import { UserType, UserInfoType, LocalUserType } from "@api/user.type";
export const useUserStore = defineStore(`${localPrefix}user`, {
  // 是否持久化
  persist: true,
  state(): UserType {
    return {
      userInfo: {},
      isLogin: false,
      localUserList: [],
    };
  },
  actions: {
    setUserInfo(data: UserInfoType) {
      this.userInfo = data;
    },
    updateLocalUserList(data: LocalUserType[]) {
      this.localUserList = data;
    },
    loginOut() {
      this.userInfo = {};
      this.isLogin = false;
    },
  },
});
