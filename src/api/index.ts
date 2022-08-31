import axios from 'axios';
import { baseURL } from '@config';
import { IAxios } from "./axios.type"
// 创建实例
const instance = axios.create({
  baseURL: baseURL,
  timeout: 100000,
  headers: {'X-Custom-Header': 'foobar'}
});

// 设置请求超时
// 通过axios.defaults.timeout设置默认的请求超时时间。例如超过了10s，就会告知用户当前请求超时，请刷新等。
axios.defaults.timeout = 10000;
// post请求头的设置
// post请求的时候，我们需要加上一个请求头，所以可以在这里进行一个默认的设置，即设置post的请求头为application/x-www-form-urlencoded;charset=UTF-8
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

// 请求拦截器
instance.interceptors.request.use(config => {
  return config;
})

// 响应拦截器
instance.interceptors.response.use(response => {
  return response.data;
})

export const request = (params: IAxios) => {
  let data = params.data;
  let methods = params.methods || 'post';
  let url = params.url || '';
  if (methods === 'post') {
    return instance[methods](url, data)
  } else {
    return instance[methods](url, {
      params: data
    })
  }
  
}

export default instance;