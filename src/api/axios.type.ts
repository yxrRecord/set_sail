import { AxiosRequestConfig } from "axios";
export interface IAxios extends AxiosRequestConfig {
  isLogin?: boolean;
}
export interface ResType<T> {
  code: number;
  message: string;
  data: T;
}
