/**
 * 放置自己项目被使用的工具函数
 */

import config from "@config";
import router from "@router";

const localObj = {}; //保存localstorage对象

import { validateMessage, validateMethods } from "./validateData";
import moment from "moment";

export interface ToolsInterface {
  validRules(rules: any, form: any): void;
  checkRules(options: any): void;
  validRule(rules: boolean, val: any): void;
}

class Tools implements ToolsInterface {
  //保存时初始化验证数据
  validRules = (rules: any, form: any) => {
    for (const key in rules) {
      if (Array.isArray(rules[key])) {
        //=>数组格式
        const rulesData = rules[key];
        rulesData.forEach((itemRule: any) => {
          for (const itemKey in itemRule) {
            if (
              !itemRule[itemKey].valid ||
              itemRule[itemKey].valid == undefined
            ) {
              itemRule[itemKey]["valid"] = true;
              itemRule[itemKey]["msg"] = "";
            } else {
              itemRule[itemKey].valid = true;
            }
          }
        });
      } else {
        //=>对象格式
        if (key.substring(key.length - 1) === "_") {
          //->子集需要验证
          const ruleChild = rules[key];
          for (const childKey in ruleChild) {
            if (
              !ruleChild[childKey].valid ||
              ruleChild[childKey].valid == undefined
            ) {
              ruleChild[childKey]["valid"] = true;
              ruleChild[childKey]["msg"] = "";
            } else {
              ruleChild[childKey]["valid"] = true;
            }
          }
        } else {
          //->直接验证
          if (!rules[key].valid || rules[key].valid == undefined) {
            rules[key]["valid"] = true;
            rules[key]["msg"] = "";
          } else rules[key].valid = true;
        }
      }
    }
    let rulesResult = true;
    for (var ruleName in rules) {
      let isRuleValid = true;
      if (Array.isArray(rules[ruleName])) {
        //=>数组格式
        const rulesData = rules[ruleName];
        rulesData.forEach((itemRule: any, index: number) => {
          for (const needRuleName in itemRule) {
            const checkRuleOptions = {
              parentName: ruleName,
              ruleName: needRuleName,
              rule: itemRule[needRuleName],
              form: form,
              arrayIndex: index,
            };
            if (ruleName.substring(ruleName.length - 1) === "_")
              checkRuleOptions.parentName = ruleName.substring(
                0,
                ruleName.length - 1
              );
            if (this.checkRules(checkRuleOptions) === false)
              isRuleValid = false;
          }
        });
        rulesResult = isRuleValid && rulesResult;
      } else {
        //=>对象格式
        const checkRuleOptions = {
          ruleName: ruleName,
          rule: rules[ruleName],
          form: form,
          parentName: "",
        };
        if (ruleName.substring(ruleName.length - 1) === "_") {
          const ruleChild = rules[ruleName];
          for (const needRuleName in ruleChild) {
            checkRuleOptions.parentName = ruleName.substring(
              0,
              ruleName.length - 1
            );
            checkRuleOptions.ruleName = needRuleName;
            checkRuleOptions.rule = ruleChild[needRuleName];
            rulesResult = this.checkRules(checkRuleOptions) && rulesResult;
          }
        } else {
          rulesResult = this.checkRules(checkRuleOptions) && rulesResult;
        }
      }
    }
    return rulesResult;
  };
  //保存时验证详细数据
  checkRules = (options: any) => {
    const parentName = options.parentName; //->在form保存数据中的父级key
    const arrayIndex = options.arrayIndex; //->在form保存数据中的父级是数组的当前下标
    const ruleName = options.ruleName; //->需要验证的数据key
    const rule = options.rule; //->验证类型
    const form = options.form; //->form保存数据
    let ruleResult = true; //->验证通过与否

    for (const ruleKey in rule) {
      if (!rule[ruleKey]) {
        return (ruleResult = true);
      }
      if (rule.customHandle) {
        const obj = rule.customHandle(form);
        rule.valid = obj.result;
        ruleResult = obj.result;
        rule.msg = obj.msg;
        break;
      }
      if (typeof validateMethods[ruleKey] === "function") {
        let param = rule[ruleKey];
        let result = null;
        if (ruleKey == "equalTo") param = form[rule[ruleKey]];
        if (parentName) {
          if (arrayIndex !== undefined) {
            //standardNam
            result = validateMethods[ruleKey](
              form[parentName][arrayIndex][ruleName],
              param
            );
          } else {
            result = validateMethods[ruleKey](
              form[parentName][ruleName],
              param
            );
          }
        } else {
          result = validateMethods[ruleKey](form[ruleName], param);
        }
        /*控制台输出提示开始*/
        let showText = ruleName + " " + ruleKey + " result";
        if (parentName) showText = parentName + " " + showText;
        console.log(showText, result);
        /*控制台输出提示结束*/
        if (!result) {
          rule.valid = false;
          ruleResult = false;
          rule.msg = validateMessage[ruleKey].replace("{0}", rule[ruleKey]);
          break;
        }
      }
    }
    return ruleResult;
  };
  //值切换时验证初始化数据
  validRule = (rule: any, val: any) => {
    if (!rule.valid) {
      rule["valid"] = true;
      rule["msg"] = "";
    } else rule.valid = true;
    let rulesResult = true;
    rulesResult = this.checkRule(rule, val) && rulesResult;
    return rulesResult;
  };
  //值切换时验证详细数据
  checkRule = (rule: any, val: any) => {
    let ruleResult = true;
    for (const ruleKey in rule) {
      if (!rule[ruleKey]) {
        return (ruleResult = true);
      }
      if (rule.customHandle) {
        const obj = rule.customHandle();
        rule.valid = obj.result;
        ruleResult = obj.result;
        rule.msg = obj.msg;
        break;
      }
      if (typeof validateMethods[ruleKey] === "function") {
        const param = rule[ruleKey];

        const result = validateMethods[ruleKey](val, param);
        if (!result) {
          rule.valid = false;
          ruleResult = false;
          rule.msg = validateMessage[ruleKey].replace("{0}", rule[ruleKey]);
          break;
        }
      }
    }
    return ruleResult;
  };
  /**
   * 深拷贝
   * @param sourceData 源数据
   */
  deepCopy = <T extends unknown>(sourceData: T): T => {
    let obj: T = {} as T;
    if (Array.isArray(sourceData)) {
      return sourceData.map((item) => this.deepCopy(item)) as T;
    } else if (this.getType(sourceData) === "object") {
      for (const key in sourceData) {
        if (typeof sourceData[key] === "object" && sourceData[key] !== null) {
          obj[key] = this.deepCopy(sourceData[key]);
        } else {
          obj[key] = sourceData[key];
        }
      }
    } else {
      obj = sourceData;
    }
    return obj;
  };
  /**
   * 返回数据类型
   * @param sourceData 源数据
   */
  getType = <T>(sourceData: T): string => {
    //toString会返回对应不同的标签的构造函数
    const toString = Object.prototype.toString;
    const map: any = {
      "[object Boolean]": "boolean",
      "[object Number]": "number",
      "[object String]": "string",
      "[object Function]": "function",
      "[object Array]": "array",
      "[object Date]": "date",
      "[object RegExp]": "regExp",
      "[object Undefined]": "undefined",
      "[object Null]": "null",
      "[object Object]": "object",
      "[object Blob]": "blob",
    };
    return map[toString.call(sourceData)];
  };
  /**
   * 根据key数组去重
   * @param arr 原数组
   * @param key 比较的key，如果不传代表所有字段比较
   * @returns {*}
   */
  duplicationByArray = (arr: any[], key?: string): any[] => {
    let newArr: any[] = [],
      obj = {};
    if (key) {
      newArr = arr.reduce((preVal: object[], curVal: any) => {
        obj[curVal[key]]
          ? ""
          : (obj[curVal[key]] = true && preVal.push(curVal));
        return preVal;
      }, []);
    } else {
      newArr = arr.filter((val: any) => {
        return obj.hasOwnProperty(typeof val + JSON.stringify(val))
          ? false
          : (obj[typeof val + JSON.stringify(val)] = true);
      });
    }
    return newArr;
  };
  /**
   * 函数字符串转换成函数
   * @param key   函数字符串key
   * @param value 函数字符串value
   */
  funReviver = (key: string, value: string) => {
    if (
      key == "customHandle" &&
      "string" == typeof value &&
      value.indexOf("function") == 0
    ) {
      return Function("return " + value)();
    }
    return value;
  };
  /**
   * 日期格式化
   * @param date 日期数据
   * @param formatter 转换格式
   */
  formatDate = <T>(date: T, formatter = "YYYY-MM-DD"): string => {
    return moment(date).format(formatter);
  };

  /**
   * 生成uid
   */
  generateUuid = (): string => {
    const str: string = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        const r = (Math.random() * 16) | 0;
        const v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
    return str;
  };
  /**
   * 生成 rules
   * @param rules      验证信息对象
   * @param fields     信息集字段
   * @param callback   自定义方法
   */
  createRules = (rules: any, fields: any = [], callback?: Function) => {
    if (rules) {
      fields.forEach((item: any) => {
        if (callback) callback(item);
        if (
          item.frontendValidators &&
          item.display == "1" &&
          this.getType(item.frontendValidators) === "string"
        ) {
          item.frontendValidators = JSON.parse(
            item.frontendValidators,
            this.funReviver
          );
          rules[item.name] = item.frontendValidators;
        }
      });
    }
  };
  /**
   * 对象之间的差异化取值
   * @param options         需要对比的值
   * @param diffOptions     与之对比的值
   * @param result          返回的值
   */
  diffObject = <T extends unknown>(options: T, diffOptions: T): T => {
    const result: T = {} as T;
    for (const key in options) {
      if (diffOptions[key] !== options[key]) result[key] = diffOptions[key];
    }
    return result;
  };
  /**
   * localStorage设置有效期
   * @param name localStorage设置名称
   * @param data 数据对象
   * @param keyName 特定的单独存储为一个对象
   */
  setLocal = (name: string, data: any, keyName?: string): void => {
    const l = localStorage.getItem(`${keyName ? keyName : config.localPrefix}`);
    if (l && !keyName) {
      const local = JSON.parse(l);
      for (const key in local) {
        localObj[key] = local[key];
      }
    }
    if (!keyName) {
      if (localObj[name] && data) {
        for (const key in data) {
          localObj[name][key] = data[key];
        }
      } else {
        localObj[name] = data;
      }
    }
    localStorage.setItem(
      `${keyName ? keyName : config.localPrefix}`,
      JSON.stringify(keyName ? data : localObj)
    );
  };
  /**
   * 获取localStorage对象并转成对应的类型
   * @param name localStorage设置名称
   * @param keyName 特定的单独存储为一个对象
   */
  getLocal = <T>(name: string, keyName?: string): T => {
    const l = localStorage.getItem(`${keyName ? keyName : config.localPrefix}`);
    const local = JSON.parse(l !== null && l ? l : "{}") as unknown as T;
    return keyName ? local : local[name] ? local[name] : {};
  };
  /**
   * 跳转到新窗口
   * @param url 跳转路由name
   * @param params  跳转路由参数
   * @param callback 回调方法
   */
  openWin = (url: string, params?: any, callback?: Function) => {
    // 先打开一个不被拦截的新窗口
    const newWindow = window.open();
    const { href } = router.resolve({
      name: url,
      query: params,
    });
    if (newWindow) newWindow.location.href = href;
    window.addEventListener(
      "message",
      (event) => {
        if (
          event.data.status === 200 &&
          event.origin === "http://" + window.location.host
        ) {
          if (callback) callback(event);
        }
      },
      false
    );
  };

  setTextAnimate = (dom: HTMLElement, time = 0.5) => {
    if (!dom) return;
    const content = dom.textContent?.split("");
    dom.textContent = "";
    content?.forEach((item, index) => {
      const span = document.createElement("span");
      span.textContent = item;
      span.classList.add("animation-text");
      span.style.display = "inline-block";
      span.style.opacity = "0";
      span.style.animation = `landIn .5s ease-out ${index * time}s both`;
      // span.style.animationDelay = `${index * time}s`
      dom.append(span);
    });
  };
  // 从中间开始
  setTextAnimateTwo = (dom: HTMLElement, time = 0.5) => {
    if (!dom) return;
    const content = dom.textContent?.split("");
    dom.textContent = "";
    let middle = 1;
    if (content) {
      middle = content.filter((e) => e != " ").length / 2;
    }
    content?.forEach((item, index) => {
      const span = document.createElement("span");
      span.textContent = item;
      span.classList.add("animation-text-two");
      span.style.animationDelay = `${time + Math.abs(index - middle) * 0.1}s`;
      dom.append(span);
    });
  };
}
export default new Tools();
