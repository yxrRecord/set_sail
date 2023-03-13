import { AxiosRequestConfig } from "axios";
export interface IAxios extends AxiosRequestConfig {
  methods?: string;
}
export interface ResType<T> {
  code: number;
  message: string;
  data: T;
}
