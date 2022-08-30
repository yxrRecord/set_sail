import { request } from '../index'

const url = {
  userListUrl: "/user/getUserList",
};

export const getUserList = () => {
  return request({
    url: url.userListUrl
  })
}