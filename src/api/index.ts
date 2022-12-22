import axios from "axios";
import { baseURL } from "@config";
import { IAxios } from "./axios.type";
import { useRouter } from "vue-router";
import { useUserStore } from "@store/modules/user";
import { useAppStore } from "@store/modules/app";
const userInfo = useUserStore()
const appStore = useAppStore()
const router = useRouter();
// 创建实例
const instance = axios.create({
  baseURL: baseURL,
  timeout: 100000,
  headers: { "X-Custom-Header": "foobar" },
});

// 设置请求超时
// 通过axios.defaults.timeout设置默认的请求超时时间。例如超过了10s，就会告知用户当前请求超时，请刷新等。
axios.defaults.timeout = 10000;
// post请求头的设置
// post请求的时候，我们需要加上一个请求头，所以可以在这里进行一个默认的设置，即设置post的请求头为application/x-www-form-urlencoded;charset=UTF-8
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded;charset=UTF-8";

// 请求拦截器
instance.interceptors.request.use((config) => {
  const {
    userInfo: { token = '' }
  } = useUserStore()
  if (token) {
    config.headers.token = token
  }
  return config;
});

interface errorMenu {
  code: number;
  message: string;
}
// 错误提示
const handleErrorCode = ({
  code,
  message = "请求错误，请联系管理员",
}: errorMenu) => {
  if (code && message) {
    switch (code) {
      case 401:
        console.log("没有登录");
        appStore.showLoginDialog = true;
        break;
      case 403:
        console.log(message);
        break;
    }
  }
};

// 响应拦截器
instance.interceptors.response.use((response) => {
  if (response.status === 200) {
    if (response.data.code !== 200) {
      handleErrorCode(response.data || {});
    }
  }
  return response.data;
});

export const request = (params: IAxios) => {
  const data = params.data;
  const methods = params.methods || "post";
  const url = params.url || "";
  if (methods === "post") {
    return instance[methods](url, data);
  } else {
    return instance[methods](url, {
      params: data,
    });
  }
};

export default instance;
