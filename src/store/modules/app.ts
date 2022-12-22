import { defineStore } from "pinia";
import { localPrefix } from "@config";

interface AppType {
  token?: string
  [key: string]: unknown
}
interface AppInfoType {
  prefix: string
  appInfo: AppType
  windowScrollTop: number
  showBanner: boolean
  showLoginDialog: boolean
}

export const useAppStore = defineStore(`${localPrefix}app`, {
  persist: true,
  state(): AppInfoType {
    return {
      prefix: "set_sail_",
      appInfo: {
        appName: "XXX-扬帆起航-未来可期",
        appIcon: "icon-oabangong-copy",
      },
      windowScrollTop: 0,
      showBanner: true,
      showLoginDialog: false
    };
  },
  actions: {
    setShowBanner(value: boolean) {
      this.showBanner = value;
    },
  },
});
