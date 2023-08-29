import axios from "axios";
import { baseURL } from "@config";
import { IAxios } from "./axios.type";
import { useRouter } from "vue-router";
import { useUserStore } from "@store/modules/user";
import { useAppStore } from "@store/modules/app";
import { refreshToken } from "./refreshToken";
const userInfo = useUserStore();
const appStore = useAppStore();
const router = useRouter();
// 创建实例
const instance = axios.create({
  baseURL: baseURL,
  timeout: 10000,
  headers: { "X-Custom-Header": "foobar" },
});
const CancelToken = axios.CancelToken;
const source = CancelToken.source();
// 设置请求超时
// 通过axios.defaults.timeout设置默认的请求超时时间。例如超过了10s，就会告知用户当前请求超时，请刷新等。
axios.defaults.timeout = 10000;
// post请求头的设置
// post请求的时候，我们需要加上一个请求头，所以可以在这里进行一个默认的设置，即设置post的请求头为application/x-www-form-urlencoded;charset=UTF-8
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded;charset=UTF-8";

// 请求拦截器
instance.interceptors.request.use((config: IAxios) => {
  const { token } = useUserStore();
  if (token) {
    config.headers.token = token;
  }
  console.log(config, "config6666");

  if (config.isLogin) {
    appStore.showLoginDialog = true;
    const errorMsg = { message: "cancelCache" + Math.random(), data: [] };
    config.cancelToken = source.token;
    // 这一行的作用是每次传递的errorMsg都是不一样的，如果没有这一行，那么，即使source.cancel(errorMsg)中有传递不同的参数，接收的时候也是一样的
    source.token.reason = errorMsg;
    // cancel函数可以不用传参，也可以传入取消后执行的操作，取消后可提示用户需要登录
    source.cancel(errorMsg.message);
    console.log("取消请求");
    return false;
  }
  return config;
});

interface errorMenu {
  code: number;
  message: string;
}
const refresh = async (response: IAxios) => {
  const res = await refreshToken();
  if (res.code === 200) {
    const { updateToken } = useUserStore();
    updateToken(res.data);
    console.log(response, "response");

    if (response) {
      instance.request(response);
    }
  }
  console.log(res, "resresresres2");
};
// 错误提示
const handleErrorCode = (
  { code, message = "请求错误，请联系管理员" }: errorMenu,
  response: IAxios
) => {
  console.log(response);
  if (code && message) {
    switch (code) {
      case 401:
        // appStore.showLoginDialog = true;
        refresh(response);
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
      handleErrorCode(response.data || {}, response);
    }
  }
  return response.data;
});

export const request = (params: IAxios) => {
  const data = params.data || {};
  const method = params.method || "post";
  const url = params.url || "";
  if (method === "post") {
    return instance[method](url, {
      ...data,
      isLofin: params.isLogin,
    });
  } else {
    return instance[method](url, {
      params: data,
    });
  }
};

export default instance;
