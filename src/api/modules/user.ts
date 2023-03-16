import { request } from "../index";
import { ResType } from "../axios.type";
import { UserInfoType } from "./user.type";
interface UserLoginType {
  username: string;
  password: string;
  email?: string;
}

export const getUserListApi = () => {
  return request({
    url: "/user/getUserList",
  });
};

export const loginApi = (
  data: UserLoginType
): Promise<ResType<UserInfoType> | null> => {
  return request({
    url: "/user/login",
    data,
  });
};

export const registerApi = (
  data: UserLoginType
): Promise<ResType<UserInfoType> | null> => {
  return request({
    url: "/user/registeUser",
    data,
  });
};

export const logoutApi = (): Promise<ResType<void> | null> => {
  return request({
    url: "/user/logout",
  });
};
