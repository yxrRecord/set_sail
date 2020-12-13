import $ from 'jquery'
import qs from 'qs'
import store from '../store'
import CryptoJS from 'crypto-js'

let util = {}
util.install = function (Vue) {
    //提示信息
    Vue.prototype.$showMsg = (type, message) => {
        Vue.prototype.$message({
            type: type,
            message: message
        })
    }

    //提示弹窗
    Vue.prototype.$showConfirm = (hintText, callback, cancel, flag = true) => {
        if (flag)
            Vue.prototype.$confirm(hintText, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                callback()
            }).catch(() => {
                if (cancel) {
                    cancel()
                }
                Vue.prototype.$showMsg('info', '取消操作!')
            })
        else
            callback()
    }

    //请求方式
    Vue.prototype.$ajaxPost = (requestOptions, showLoading, callback) => {
        
        let ajaxOptions = {
            method: 'post', //请求方式
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            },
            responseType: 'json', //'arraybuffer',//default//blob
            isNeedLogin: true
        }
        let requestUrl = requestOptions.url
        if (requestUrl.substring(requestUrl.length - 1) === "?") { //请求参数是需要序列化的
            requestOptions.url = requestUrl.substring(0, requestUrl.length - 1)
            if (requestOptions.data.refresh)
                delete requestOptions.data.refresh
            requestOptions.data = qs.stringify(requestOptions.data)
        }
        for (var key in requestOptions) {
            ajaxOptions[key] = requestOptions[key]
        }
        ajaxOptions.url = Vue.prototype.$baseUrl + ajaxOptions.url
        if (ajaxOptions.method === 'get' && Object.keys(ajaxOptions.data).length > 0) {
            ajaxOptions.url += "?"
            ajaxOptions.url += ajaxOptions.data
            ajaxOptions.data = {}
            delete ajaxOptions.headers
            delete ajaxOptions.responseType
        }
        console.log("请求开始++++++++++" + ajaxOptions.url)
        console.log('ajaxOptions+++++')
        console.log(ajaxOptions)
        if (showLoading) {
            store.commit("updatePageLoading", ++store.state.pageLoading)
        }
        Vue.prototype.$http(ajaxOptions).then((response)=> {
            console.log("请求返回++++++++++" + ajaxOptions.url)
            console.log('response++++')
            console.log(response)
            if (showLoading)
                store.commit("updatePageLoading", --store.state.pageLoading)
            if (callback)
                callback(response.data)
        }).catch((error)=> {
            console.log('error+++++')
            console.log(error)
            if (showLoading)
                store.commit("updatePageLoading", --store.state.pageLoading)
            return false
        })
    }

    //获取错误数
    Vue.prototype.$loadStatis = (callback) => {
        let ajaxOptions = {
            url: "sys/check/result/statistics",
            data: {
                conditionTypeId: ''
            }
        }
        Vue.prototype.$ajaxPost(ajaxOptions, true, (res) => {
            if (res.code === 200) {
                callback(res.data.wrongNum)
            } else {
                this.$showMsg("error", res.message)
            }
        })
    }

    Vue.prototype.$getUserMenu = async (current) => {
      console.log(current, 'currentcurrentcurrent')
      // 获取缓存的菜单
      let menu = await store.dispatch('menu/getMenu')
      console.log(menu, 'menu/getMenu')
      // 取出name
      let names = Vue.prototype.$arrayRepact(menu.map(item => item.name))
      // 判断是否含有菜单
      if (names.includes(current.name)) {
        let index = menu.findIndex(item => item.name === current.name)
        menu[index].count++
      } else {
        current.count = 1
        menu.push(current)
      }
      // 根据count排序
      menu = menu.sort((item1, item2) => {
        return item2.count - item1.count
      })
      // 更新数据
      console.log(menu, 'menu/getMenu22222')

      store.dispatch('menu/setMenu', menu)
    }

    // 数组对象外数组去重
    Vue.prototype.$arrayRepact = function (arr) {
      return Array.from(new Set(arr))
    }

    //表单验证
    Vue.prototype.$validate = new function () {
        let that = this
        //验证返回信息
        this.validateMessage = {
            required: '必填项不能为空',
            number: '请输入整数或2位小数的数字',
            integer: '只能输入整数',
            float: '请输入整数或者2位小数的数字',
            minlength: '请至少输入{0}位数据',
            maxlength: '最多只能输入{0}位数据',
            max: '请输入小于等于{0}的数值',
            min: '请输入大于等于{0}的数值',
            faxNum: '请输入正确的传真号格式',
            phoneVal: '请输入正确的座机号格式',
            mobileVal: '请输入正确的手机号格式',
            phoneAndMobile: '请输入正确的电话号码格式',
            identityNumber: '请输入正确的身份证号码格式',
            identityNums: '身份证号长度错误',
            identityPattern: '身份证号格式错误',
            identityAddress: '身份证号地址编码错误',
            identityDate: '身份证号出生日期错误',
            identityCheck: '身份证号校验位错误',
            departCode: '不符合编码规范',
            passWord: '请输入6-12位包含大小写字母和数字',
            cardNumber: '请输入正确的身份证号码格式',
            email: '请输入正确的邮箱格式'
        }
        //验证类型规则
        this.methods = {
            required: (value) => {
                if (Vue.prototype.$getType(value) === 'number')
                    return true
                if (value)
                    if (value === 0 || value === false)
                        return true
                if (!value)
                    return false
                let length = Array.prototype.isPrototypeOf(value) ? value.length : value.length || value > 0
                return length > 0
            },
            passWord: (value) => {
                if (value === "" || value === null)
                    return true
                // const reg = /^[a-zA-Z0-9]{6,12}$/
                const reg = /(?=.*[0-9])(?=.*[a-zA-Z]).{6,12}/
                const result = reg.test(value)
                return result
            },
            number: (value) => {
                if (value === "" || value === null)
                    return true
                const reg = /^\d+(\.\d{0,2})?$/
                const result = value > 0 ? reg.test(value / 1) : reg.test(value / -1)
                return result
            },
            integer: (value) => {
                if (value === "" || value === null)
                    return true
                const reg = /^[1-9]+\d*?$/ //
                const result = value > 0 ? reg.test(value / 1) : reg.test(value / -1)
                return result
            },
            float: (value, param) => {
                if (value === "" || value === null)
                    return true
                value = Number(value)
                const reg = /^\d+(\.\d{0,2})?$/
                const result = reg.test(value / 1)
                return result
            },
            minlength: (value, param) => {
                let length = Array.prototype.isPrototypeOf(value) ? value.length : value.trim().length
                return length >= param
            },
            maxlength: (value, param) => {
                let length = Array.prototype.isPrototypeOf(value) ? value.length : value.trim().length
                return length <= param
            },
            max: (value, param) => {
                return param >= value
            },
            min: (value, param) => {
                return param <= value
            },
            faxNum: (value) => {
                if (value === "" || value === null)
                    return true
                const reg = /^(\d{3,4}-)?\d{7,8}$/
                const result = reg.test(value)
                return result
            },
            phoneVal: (value) => {
                if (value === "" || value === null)
                    return true
                const reg = /^0\d{2,3}-\d{7,8}$/
                const result = reg.test(value)
                return result
            },
            mobileVal: (value) => {
                if (value === "" || value === null)
                    return true
                const reg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/
                const result = reg.test(value)
                return result
            },
            email: (value) => {
              if (value === "" || value === null)
                  return true
              const reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
              const result = reg.test(value)
              return result
            },
            phoneAndMobile: (value) => {
                if (value === "" || value === null)
                    return true
                const regMobile = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/
                const regPhone = /^\d{7,8}$/ ///^0\d{2,3}-\d{7,8}$/
                const result = regMobile.test(value) ? regMobile.test(value) : regPhone.test(value)
                return result
            },
            departCode: (value) => {
                if (value === "" || value === null)
                    return true
                // |(\d{3}\.\d{3})|(\d{3}\.\d{3}\.\d{3})
                // const reg = /\d{3}[\.]?\d{3}[\.]?\d{3}/ //
                const reg = /^\d{3}$/
                let result = true
                let arr = value.split('.')
                console.log(arr)
                arr.forEach(item => {
                    console.log(item.length)
                    if (item.length != 3) {
                        result = false
                        return false
                    } else {
                        let result2 = reg.test(item)
                        console.log(result)
                        if (!result2) {
                            result = false
                        }
                    }
                })
                return result
            },
            identityNumber: (value) => {
                if (value === "" || value === null)
                    return true
                const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
                const result = reg.test(value)
                console.log(result)
                return result
            },
            identityNums: (value) => {
                if (value === "" || value === null)
                    return true
                if ((value.length < 18 && value.length > 15) || value.length < 15 || value.length > 18) {
                    return false
                } else {
                    return true
                }
            },
            identityPattern: (value) => {
                if (value === "" || value === null)
                    return true
                if (value.indexOf("000000000000000000") != -1 && value.length === 18) {
                    return true
                } else {
                    if (value.indexOf("111111111") != -1) {
                        return false
                    } else {
                        if (!value || !/(^\d{15}$)|(^\d{17}(\d|X)$)/) {
                            return false
                        } else {
                            return true
                        }
                    }

                }
            },
            identityAddress: (value) => {
                if (value === "" || value === null)
                    return true
                let city = {
                    11: "北京",
                    12: "天津",
                    13: "河北",
                    14: "山西",
                    15: "内蒙古",
                    21: "辽宁",
                    22: "吉林",
                    23: "黑龙江 ",
                    31: "上海",
                    32: "江苏",
                    33: "浙江",
                    34: "安徽",
                    35: "福建",
                    36: "江西",
                    37: "山东",
                    41: "河南",
                    42: "湖北 ",
                    43: "湖南",
                    44: "广东",
                    45: "广西",
                    46: "海南",
                    50: "重庆",
                    51: "四川",
                    52: "贵州",
                    53: "云南",
                    54: "西藏 ",
                    61: "陕西",
                    62: "甘肃",
                    63: "青海",
                    64: "宁夏",
                    65: "新疆",
                    71: "台湾",
                    81: "香港",
                    82: "澳门",
                    91: "国外 "
                }
                if (!city[value.substr(0, 2)]) {
                    return false
                } else {
                    return true
                }
            },
            identityDate: (value) => {
                if (value === "" || value === null)
                    return true
                if (value.length == 18) {
                    let month = value.substring(10, 12)
                    if (month > 12 || month == 0) {
                        return false
                    } else {
                        return true
                    }
                    let day = value.substring(12, 14)
                    if (month > 31) {
                        return false
                    } else {
                        return true
                    }
                    let age = new Date().getFullYear() - value.substring(6, 10)
                    if (age < 0) {
                        return false
                    } else {
                        return true
                    }
                } else {
                    let month = value.substring(10, 12)
                    if (month > 12 || month == 0) {
                        return false
                    } else {
                        return true
                    }
                    let day = value.substring(12, 14)
                    if (month > 31) {
                        return false
                    } else {
                        return true
                    }
                    // if(value.length>18){
                    //     return false
                    // } else {
                    //     return true
                    // }
                }
            },
            identityCheck: (value) => {
                if (value === "" || value === null)
                    return true
                //∑(ai×Wi)(mod 11)
                //加权因子
                let factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
                //校验位
                let parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2]
                let sum = 0
                let ai = 0
                let wi = 0
                let idCardLast = value.substring(17)
                for (let i = 0; i < 17; i++) {
                    ai = value[i]
                    wi = factor[i]
                    sum += ai * wi
                }
                let last = parity[sum % 11]
                if (last == 2) {
                    if (idCardLast == "X" || idCardLast == "x") {
                        return false
                    } else {
                        return true
                    }
                } else {
                    if (parity[sum % 11] != value[17]) {
                        return false
                    } else {
                        return true
                    }
                }
            },
            cardNumber: (value) => {
                if (value === undefined || value === null || value === '')
                    return true
                const reg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/
                const result = reg.test(value)
                return result
            },
            existData: (val, callback) => {
            }
        }
        //保存时初始化验证数据
        this.validRules = (rules, form) => {
            for (var key in rules) {
                if (!rules[key].valid || rules[key].valid == undefined) {
                    Vue.set(rules[key], 'valid', true)
                    Vue.set(rules[key], 'msg', '')
                } else
                    rules[key].valid = true
            }
            let rulesResult = true
            for (var ruleName in rules) {
                var checkRuleOptions = {
                    ruleName: ruleName,
                    rule: rules[ruleName],
                    form: form
                }
                rulesResult = that.checkRules(checkRuleOptions) && rulesResult
            }
            return rulesResult
        }
        //保存时验证详细数据
        this.checkRules = (options) => {
            let parentName = options.parentName //->在form保存数据中的父级key
            let arrayIndex = options.arrayIndex //->在form保存数据中的父级是数组的当前下标
            let ruleName = options.ruleName //->需要验证的数据key
            let rule = options.rule //->验证类型
            let form = options.form //->form保存数据
            let ruleResult = true //->验证通过与否
            for (var ruleKey in rule) {
                if (!rule[ruleKey]) {
                    return (ruleResult = true)
                }
                if (rule.customHandle) {
                    const obj = rule.customHandle()
                    rule.valid = obj.result
                    ruleResult = obj.result
                    rule.msg = obj.msg
                    break
                }
                if (typeof that.methods[ruleKey] === 'function') {
                    let param = rule[ruleKey]
                    let result = null
                    if (parentName) {
                        if (arrayIndex !== undefined) { //standardNam
                            result = that.methods[ruleKey](form[parentName][arrayIndex][ruleName], param)
                        } else {
                            result = that.methods[ruleKey](form[parentName][ruleName], param)
                        }
                    } else {
                        result = that.methods[ruleKey](form[ruleName], param)
                    }
                    /*控制台输出提示开始*/
                    let showText = ruleName + ' ' + ruleKey + ' result'
                    if (parentName)
                        showText = parentName + ' ' + showText
                    console.log(showText, result)
                    /*控制台输出提示结束*/
                    if (!result) {
                        rule.valid = false
                        ruleResult = false
                        rule.msg = that.validateMessage[ruleKey].replace(
                            '{0}',
                            rule[ruleKey] && rule[ruleKey] != 0 ? rule[ruleKey] : 4
                        )
                        break
                    }
                }
            }
            return ruleResult
        }
        //值切换时验证初始化数据
        this.validRule = (rule, val) => {
            if (!rule.valid || rule.valid == undefined) {
                Vue.set(rule, 'valid', true)
                Vue.set(rule, 'msg', '')
            } else
                rule.valid = true
            let rulesResult = true
            rulesResult = that.checkRule(rule, val) && rulesResult
            return rulesResult
        }
        //值切换时验证详细数据
        this.checkRule = (rule, val) => {
            let ruleResult = true
            for (var ruleKey in rule) {
                if (!rule[ruleKey]) {
                    return (ruleResult = true)
                }
                if (typeof that.methods[ruleKey] === 'function') {
                    let param = rule[ruleKey]

                    let result = that.methods[ruleKey](val, param)
                    if (!result) {
                        rule.valid = false
                        ruleResult = false
                        rule.msg = that.validateMessage[ruleKey].replace(
                            '{0}',
                            // rule[ruleKey]
                            rule[ruleKey] && rule[ruleKey] != 0 ? rule[ruleKey] : 4
                        )
                        break
                    }
                }
            }
            return ruleResult
        }
    }()
    Vue.prototype.$setCookie = (name, value) => {
        //此 cookie 将被保存 30 天
        const Days = 30
        const exp = new Date()
        exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000)
        document.cookie = name + "=" + escape(value) + "expires=" + exp.toGMTString()
    }
    //获取页面相对高度
    Vue.prototype.$getHeight = (event, offset, rate) => {
        if (!offset)
            offset = 0
        if (!rate)
            rate = 0.5
        let windowHeight = $(window).height()
        let offsetTop = $(event)[0].getBoundingClientRect().top
        let result = (windowHeight - offsetTop - offset) * rate
        let maxHeight = windowHeight - offsetTop - offset
        return {
            height: result,
            maxHeight: maxHeight
        }
    }

    //导出表格/表单
    Vue.prototype.$downLoad = (options, encode) => {
        let ajaxOptions = {
            data: {},
            url: "export/gbhmc/generateAndExport", //花名册
        }
        ajaxOptions = Vue.prototype.$mergeObj(ajaxOptions, options)
        for (let key in ajaxOptions.data) {
            ajaxOptions.url += `${key}=${ajaxOptions.data[key]}&`
        }
        ajaxOptions.url = ajaxOptions.url.substring(0, ajaxOptions.url.length - 1)
        if (encode)
            ajaxOptions.url = encodeURI(ajaxOptions.url)
        console.log(ajaxOptions.url)
        // window.location.href = ajaxOptions.url
        window.open(ajaxOptions.url, '_blank')
    }
    //获取当前年份的前几年
    Vue.prototype.$getCurrentYear = function (yearNum) {
        let dropData = []
        for (var i = 0; i < yearNum; i++) {
            dropData.push({
                name: new Date().getFullYear() - i,
                id: new Date().getFullYear() - i
            })
        }
        return dropData
    }
    //导出表格POST方式
    Vue.prototype.$exportExcel = (options, type) => {
        let fileName = ""
        let ajaxOptions = {
            responseType: 'blob',
            data: {},
        }
        if (options.fileName)
            fileName = options.fileName
        delete options.fileName
        ajaxOptions = Object.assign(ajaxOptions, options)
        Vue.prototype.$ajaxPost(ajaxOptions, true, (data) => {
            let blob = null
            switch (type) {
                case "doc":
                    blob = new Blob([data], {
                        type: "application/vnd.ms-wordcharset=utf-8"
                    })
                    break
                case "pdf":
                    blob = new Blob([data], {
                        type: 'application/pdf'
                    })
                    break
                case "zip":
                    blob = new Blob([data], {
                        type: 'application/zip'
                    })
                    break
                case "xls":
                    blob = new Blob([data], {
                        type: 'application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                    })
                    break
                default:
                    break
            }
            if (window.navigator.msSaveOrOpenBlob) {
                navigator.msSaveBlob(blob)
            } else {
                let elink = document.createElement('a')
                elink.download = fileName
                elink.style.display = 'none'
                elink.href = URL.createObjectURL(blob)
                document.body.appendChild(elink)
                elink.click()
                document.body.removeChild(elink)
            }
        })
    }

    //导出表格
    Vue.prototype.$exportFile = (options, callback) => {
        let url = options.url
        let params = options.data
        let downForm = document.createElement('form') //创建一个form表单
        downForm.id = 'downForm' //该表单的id为downForm
        downForm.name = 'downForm' //该表单的name属性为downForm
        downForm.className = 'x-hidden' //该表单为隐藏的
        downForm.action = url //表单的提交地址
        downForm.method = 'post' //表单的提交方法
        for (let key in params) {
            let input = document.createElement('input') //创建一个input节点
            input.type = 'hidden' //隐藏域
            input.name = key //需要传递给后台的参数名
            input.value = params[key] //参数值
            downForm.appendChild(input) //将input节点追加到form表单里面
        }
        document.body.appendChild(downForm)
        $('#downForm').submit() //调用form表单的submit方法，提交表单，从而开始下载文件
        document.body.removeChild(downForm)
        if (callback)
            callback()
    }

    //深度拷贝
    Vue.prototype.$deepClone = (options) => {
        let dataType = Vue.prototype.$getType(options)
        let result = dataType === "array" ? [] : {}
        return $.extend(true, result, options)
    }

    //合并对象
    Vue.prototype.$mergeObj = (data, mergeData, deep) => {
        if (deep === undefined)
            deep = true
        return $.extend(deep, data, mergeData)
    }

    //对象之间的差异化取值
    Vue.prototype.$diffObject = (options, diffOptions) => {
        let result = {}
        for (var key in options) {
            if (diffOptions[key] !== options[key])
                result[key] = diffOptions[key]
        }
        return result
    }
    //获取数据类型
    Vue.prototype.$getType = (obj) => {
        //tostring会返回对应不同的标签的构造函数
        var toString = Object.prototype.toString
        var map = {
            '[object Boolean]': 'boolean',
            '[object Number]': 'number',
            '[object String]': 'string',
            '[object Function]': 'function',
            '[object Array]': 'array',
            '[object Date]': 'date',
            '[object RegExp]': 'regExp',
            '[object Undefined]': 'undefined',
            '[object Null]': 'null',
            '[object Object]': 'object'
        }
        if (obj instanceof Element) {
            return 'element'
        }
        return map[toString.call(obj)]
    }
    //获取时间名称
    Vue.prototype.$getTimeName = () => {
        let hour = Vue.prototype.$moment().hours()
        if (hour < 6) {
            return "凌晨好！"
        } else if (hour < 9) {
            return "早上好！"
        } else if (hour < 12) {
            return "上午好！"
        } else if (hour < 14) {
            return "中午好！"
        } else if (hour < 17) {
            return "下午好！"
        } else if (hour < 19) {
            return "傍晚好！"
        } else if (hour < 22) {
            return "晚上好！"
        } else {
            return "晚上好！"
        }
    }
    Vue.prototype.$countFormat = (data) => {
        let res = data + ''
        if (res) {
            let result = parseFloat(res).toLocaleString()
            return result
        } else {
            return res
        }
    }
    Vue.prototype.$recursive = (obj, field) => {
        var arr = []
        if (typeof obj === 'object') {
            for (var key in obj) {
                if (obj[field] === obj[key]) {
                    arr.push(obj[field])
                }
                var item = obj[key]
                if (typeof item === 'object') {
                    Vue.prototype.$recursive(item, field)
                }
            }
        }
        return arr
    }
    Vue.prototype.$getNextMonth = (date) => {
        let arr = date.split('-')
        let year = arr[0] //获取当前日期的年份
        let month = arr[1] //获取当前日期的月份
        let day = arr[2] //获取当前日期的日
        let days = new Date(year, month, 0)
        days = days.getDate() //获取当前日期中的月的天数
        let year2 = year
        let month2 = parseInt(month) + 1
        if (month2 == 13) {
            year2 = parseInt(year2) + 1
            month2 = 1
        }
        let day2 = day
        let days2 = new Date(year2, month2, 0)
        days2 = days2.getDate()
        if (day2 > days2) {
            day2 = days2
        }
        if (month2 < 10) {
            month2 = '0' + month2
        }
        let t2 = year2 + '-' + month2 + '-' + day2
        return t2
    }
    Vue.prototype.$StringTrim = function (testStr) {

        testStr = testStr.replace(/\s+/g, "")
        testStr = testStr.replace(/<\/?.+?>/g, "")
        testStr = testStr.replace(/[\r\n]/g, "")
        // testStr = testStr.replace(/^\s*/g,"")
        // testStr = testStr.replace(/\s*$/g,"")
        testStr = testStr.replace(/(^\s*)|(\s*$)/g, "")
        testStr = testStr.replace(/\s/g, '')
        return testStr
    }
    Vue.prototype.$fmtDate = (value) => {
        if (!value) {
            return '-'
        }
        let date = new Date(value)
        let y = date.getFullYear()
        let m = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
        let d = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
        return y + '.' + m + '.' + d
    }
    Vue.prototype.$computeHeight = (el, offsetBottom = 0, time = 0) => {
        setTimeout(() => {
            var elTop = el.getBoundingClientRect().top
            el.style.height = `calc(100vh - ${offsetBottom}px - ${elTop}px)`
            // $(el).height(`calc(100vh - ${offsetBottom}px - ${elTop}px)`)
        }, time)
    }
    Vue.prototype.getFileType = (fileName) => {
        let fileType = fileName ? fileName.substr(fileName.lastIndexOf('.') + 1) : ""
        switch (fileType) {
            case 'docx':
            case 'doc':
                return 'icon-DOC'
                break
            case 'pdf':
                return 'icon-PDF'
                break
            case 'txt':
                return 'icon-TXT'
                break
            case 'png':
            case 'jpeg':
            case 'jpg':
            case 'bmp':
            case 'gif':
                return 'icon-PNG'
                break
            case 'xls':
            case 'xlsx':
                return 'icon-xls1'
                break
            default:
                return 'icon-wenjian1'
                break
        }
    }

    Vue.prototype.$encryptByDES = (message, key=store.state.openValue) => {
      let keyHex = CryptoJS.enc.Utf8.parse(key)
      let encrypted = CryptoJS.TripleDES.encrypt(message, keyHex, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
      })
      return encrypted.toString()
    }

    //DES 解密
    Vue.prototype.$decryptByDES = (ciphertext, key=store.state.openValue) => {
      let keyHex = CryptoJS.enc.Utf8.parse(key)
      // direct decrypt ciphertext
      let decrypted = CryptoJS.TripleDES.decrypt({
          ciphertext: CryptoJS.enc.Base64.parse(ciphertext)
      }, keyHex, {
          mode: CryptoJS.mode.ECB,
          padding: CryptoJS.pad.Pkcs7
      })
      return decrypted.toString(CryptoJS.enc.Utf8)
    }

    //表格列相同数据合并
    Vue.prototype.$mergeTableByColData = (tableData, key, childKey) => {
      let spanArr = [],
          concatOne = 0
      tableData.forEach((item, index) => {
        if (index === 0) {
            spanArr.push(1)
        } else {
            if (childKey) {
                if (item[childKey][key] === tableData[index - 1][childKey][key]) { //第一列需合并相同内容的判断条件
                    spanArr[concatOne] += 1
                    spanArr.push(0)
                } else {
                    spanArr.push(1)
                    concatOne = index
                }
            } else {
                if (item[key] === tableData[index - 1][key]) { //第一列需合并相同内容的判断条件
                    spanArr[concatOne] += 1
                    spanArr.push(0)
                } else {
                    spanArr.push(1)
                    concatOne = index
                }
            }
        }
    })
    // console.log(spanArr, 'spanArrspanArrspanArr')
    return spanArr
  }

  Vue.prototype.$textAnimate = (dom, time=0.5) => {
    if (!dom) {
        return
    }
    let content = dom.textContent.split('')
    dom.textContent = ""
    content.forEach((item, index) => {
        let span = document.createElement('span')
        span.textContent = item
        span.classList.add('animation-text')
        span.style.display = 'inline-block'
        span.style.opacity = '0'
        span.style.animation = `landIn .5s ease-out ${index * time}s both`
        // span.style.animationDelay = `${index * time}s`
        dom.append(span)
    })
  }
  // 从中间开始
  Vue.prototype.$textAnimateTwo = (dom, time=0.5) => {
    if (!dom) {
        return
    }
    let content = dom.textContent.split('')
    dom.textContent = ""
    let middle = content.filter(e => e != " ").length / 2
    content.forEach((item, index) => {
        let span = document.createElement('span')
        span.textContent = item
        span.classList.add('animation-text-two')
        span.style.animationDelay = `${time + Math.abs(index - middle) * 0.1}s`
        dom.append(span)
    })
  }
}
export default util
