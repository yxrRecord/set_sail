// 验证数据提示语
export const validateMessage = {
  required: "必填项不能为空",
  number: "请输入整数或2位小数的数字",
  integer: "只能输入整数",
  faxNum: "请输入正确的传真号格式",
  phoneAndMobile: "请输入正确的电话号码格式",
  scoreCheck: "只能输入不大于100的数字",
  email: "请输入正确的邮箱格式",
  positiveInteger: "只能输入正整数",
  phoneNumber: "只能输入数字",
  cardNumber: "请输入正确的身份证号码格式",
  password: "请输入8-20位密码，字母/数字/字符至少2种",
};

// 验证方法
export const validateMethods = {
  required: (value: any) => {
    if (!value) return false;
    const length = Array.isArray(value)
      ? value.length
      : String(value).trim().length;
    return length > 0;
  },
  number: (value: any) => {
    if (value) {
      const reg = /^\d+(\.\d{0,2})?$/;
      return value > 0
        ? reg.test(String(value / 1))
        : reg.test(String(value / -1));
    }
    return true;
  },
  integer: (value: any) => {
    if (value) {
      const reg = /^[1-9]+\d*?$/; //
      return value > 0
        ? reg.test(String(value / 1))
        : reg.test(String(value / -1));
    }
    return true;
  },
  faxNum: (value: any) => {
    if (value) {
      const reg = /^(\d{3,4}-)?\d{7,8}$/;
      return reg.test(value);
    }
    return true;
  },
  phoneAndMobile: (value: any) => {
    if (value) {
      const regMobileAndPhone =
        /^(\d{7,8}|(0\d{2,3}-\d{7,8}))|(1[3456789]\d{9})$/;
      return regMobileAndPhone.test(value);
    }
    return true;
  },
  email: (value: any) => {
    if (value) {
      const reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      return reg.test(value);
    }
    return true;
  },
  positiveInteger: (value: any) => {
    if (value) {
      const reg = /^[0-9]*[1-9][0-9]*$/;
      return reg.test(value);
    }
    return true;
  },
  phoneNumber: (value: any) => {
    if (value) {
      const reg = /^[0-9\d-]+$/;
      return reg.test(value);
    }
    return true;
  },
  cardNumber: (value: any) => {
    if (value) {
      const reg =
        /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
      return reg.test(value);
    }
    return true;
  },
  password: (value: any) => {
    if (value) {
      const reg = /(?!\d+$)(?!^[a-zA-Z]+$)(?!^[_#@]+$).{8,20}/;
      return reg.test(value);
    }
    return true;
  },
};
