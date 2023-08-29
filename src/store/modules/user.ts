import { defineStore } from "pinia";
import { localPrefix } from "@config";
import { UserType, UserInfoType, LocalUserType } from "@api/user.type";
export const useUserStore = defineStore(`${localPrefix}user`, {
  // 是否持久化
  persist: true,
  state(): UserType {
    return {
      token: "",
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
    updateToken(value: string) {
      this.token = value;
    },
    resetToken() {
      this.token = "";
    },
    loginOut() {
      this.userInfo = {};
      this.resetToken();
      this.isLogin = false;
    },
  },
});
