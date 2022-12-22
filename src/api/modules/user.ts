import { request } from "../index";
interface userInfoType {
  username: string;
  password: string;
  email?: string;
}

export const getUserListApi = () => {
  return request({
    url: "/user/getUserList",
  });
};

export const loginApi = (data: userInfoType) => {
  return request({
    url: "/user/login",
    data,
  });
};

export const registerApi = (data: userInfoType) => {
  return request({
    url: "/user/registeUser",
    data,
  });
};
