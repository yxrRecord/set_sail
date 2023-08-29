import { request } from "@api";
import { useUserStore } from "@store/modules/user";
import { refreshTokenApi } from "./modules/user";
export const refreshToken = async () => {
  const { token, updateToken } = useUserStore();
  return await refreshTokenApi();
};
