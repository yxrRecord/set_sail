import { defineStore } from "pinia";
import { localPrefix } from "@config";

interface UserInfoType {
  token?: string
  [key: string]: unknown
}
export interface localUserType {
  username: string
  password: string
}
interface UserType {
  userInfo: UserInfoType
  isLogin: boolean
  localUserList: localUserType[]
}

export const useUserStore = defineStore(`${localPrefix}user`, {
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
    updateLocalUserList(data: localUserType[]) {
      this.localUserList = data;
    },
  },
});
