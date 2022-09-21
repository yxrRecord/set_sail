import { request } from '../index'

const url = {
  userListUrl: "/user/getUserList",
  loginUrl: "/user/login"
};

export const getUserListApi = () => {
  return request({
    url: url.userListUrl
  })
}

export const loginApi = (data: any) => {
  return request({
    url: url.loginUrl,
    data
  })
}
