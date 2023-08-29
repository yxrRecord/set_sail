export interface UserInfoType {
  token?: string;
  [key: string]: unknown;
}
export interface LocalUserType {
  username: string;
  password: string;
}
export interface UserType {
  token: string;
  userInfo: UserInfoType;
  isLogin: boolean;
  localUserList: LocalUserType[];
}
