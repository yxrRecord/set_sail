<template>
    <div class="common-header-wrapper">
        <div class="common-header">
            <div class="left-wrapper">
                <span :class='["logoIcon iconfont",appInfo.appIcon]'></span>
                <span class="header-logo-title">{{appInfo.appName}}</span>
            </div>
            <div class="right-wrapper">
                <div class="common-header-menu">
                    <span v-for="(item , index) in headMenuList" :key="index"
                          :class='["iconBtn",{"active":index===headMenuIndex}]' @click="runClick(item.eName,index)">
                        <i :class="item.icon"></i>
                        <span class="iconTitle">{{item.text}}</span>
                    </span>
                </div>
                <div class="common-header-user">
                    
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    // import commonMenu from './commonMenu.vue'
    export default {
        name: 'commonHeader',
        components: {
            // commonMenu,
        },
        data() {
            const that = this
            return {
                // imgSrc: require('../../../static/img/defaultAvatar2.png'),
                form: {
                    newPassword: '',
                    oldPassword: '',
                    confirm: '',
                    id: '',
                },
                isSimple: false,
                tipPassword: false,
                // passWordTest: /^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%.-=+(!,。?？*^&*]+$)[a-zA-Z\d!@#$%.-=+(!,。?？*^&*]+$/,
                // passWordTest: /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[~!@bai#$%^&*])[\da-zA-Z~!@#$%^&*]{8,16}$/,
                // passWordTest: /^(?![0-9]+$)(?![a-zA-Z]+$)(?!([^(0-9a-zA-Z)]|[])+$)([^(0-9a-zA-Z)]|[]|[a-zA-Z]|[0-9]){8,}$/,
                passWordTest: /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)])+$).{8,}$/,
                
                rules: {
                    newPassword: {
                        // required: true,
                        customHandle() {
                            console.log(that.form.newPassword, that.passWordTest.test(that.form.newPassword), 'that.form.newPassword.length ')
                            if (!that.form.newPassword) {
                                return {
                                    result: false,
                                    msg: '必填项不能为空'
                                }
                            } else if (that.form.newPassword.length < 8) {
                                return {
                                    result: false,
                                    msg: '密码不能少于8位'
                                }
                            } else if (!that.passWordTest.test(that.form.newPassword)) {
                                return {
                                    result: false,
                                    msg: '密码必须包含字母、数字、符号两种以上'
                                }
                            } else {
                                return {
                                    result: true,
                                    msg: ''
                                }
                            }
                        }
                    },
                    oldPassword: {
                        required: true,
                    },
                    confirm: {
                        customHandle() {
                            if (!that.form.confirm) {
                                return {
                                    result: false,
                                    msg: '必填项不能为空'
                                }
                            } else if (that.form.newPassword !== that.form.confirm) {
                                return {
                                    result: false,
                                    msg: '两次输入的密码不一致'
                                }
                            } else {
                                return {
                                    result: true,
                                    msg: ''
                                }
                            }
                        }
                    },
                },
                formControl: {
                    visible: false
                },
            }
        },
        watch: {
            'formControl.visible'() {
                this.form = {
                    newPassword: '',
                    oldPassword: '',
                    confirm: '',
                    id: '',
                }
            },
        },
        computed: {
            nickName() {
                if (localStorage[this.$store.state.sysPrefix + "nickName"]) {

                    return localStorage[this.$store.state.sysPrefix + "nickName"]
                } else {
                    return this.$store.state.loginName
                }
                // else {
                //     return this.$store.getters.userInfo.loginName
                // }
                // return this.$store.state.loginName || this.$store.getters.userInfo.loginName
            },
            dropData() {
                // {icon: "icon iconfont icon-phone", text: "联系方式", event: "contact"},
                let arr = [
                    {icon: "el-icon-refresh", text: "清除缓存", event: "refreshLocal"},
                    {icon: "icon iconfont icon-baoming", text: "修改密码", event: "edit"},
                    {icon: "icon iconfont icon-homeclose", text: "退出账号", event: "logOut"},
                ]
                if (this.userInfo.roleViewModelList[0].code == '2') {
                    arr.unshift({icon: "icon iconfont icon-phone", text: "联系方式", event: "contact"})
                }
                return arr
            },
            appInfo() {
                return this.$store.getters.appInfo;
            },
            headMenuIndex() {
                return this.$store.state.headerMenuIndex;
            },
            headMenuList() {
                return [
                    {eName: "toggleMenu", text: "菜单", icon: "iconfont icon-mulu"},
                    {eName: "goHome", text: "首页", icon: "iconfont icon-zhuye"}
                ];
            },
            userInfo() {
                return this.$store.getters.userInfo;
            },
            contact() {
                const str = `如果报名有疑问，请联系全国组织干部学院报名中心。<br/>
                电话：010-58589040<span style="margin-left: 10px;">58589037</span><br/>
                传真：010-58589041`
                this.$alert(str, '注意事项', {
                    confirmButtonText: '确定',
                    callback: action => {
                        // fn()
                    },
                    dangerouslyUseHTMLString: true
                });
            }
        },
        mounted() {
            this.changeRules()
            console.log(!window.location.host.includes('200.1.87.206'))
            this.checkPassWord()
        },
        watch: {},
        methods: {
            //用户头像
            imgUrl(info) {
                return this.$baseUrl + 'attachment/previewMongoDB?id=' + info.photoId
            },
            checkPassWord() {
                //校验是否为初始密码
                if (!window.location.host.includes('200.1.87.206')) {
                    this.$ajaxPost({
                        url: this.$baseUrl + 'user/checkUserIsDefaultPwd?',
                        data: {loginName: this.userInfo.loginName}
                    }, false, res => {
                        this.$store.state.simplePassWord = res.data
                        if (!this.$store.state.simplePassWord)
                            return
                        this.isSimple = true
                        this.tipPassword = res.data ? res.data : false
                        /* this.$alert('当前账号密码过于简单请更改密码', '注意', {
                            confirmButtonText: '确定',
                            callback: action => {
                                for (let key in this.form) {
                                    this.form[key] = '';
                                }
                                this.form.id = this.userInfo.id;
                                this.form.userName = this.userInfo.loginName;
                                this.formControl.visible = true
                            }
                        }); */
                    })
                }
            },
            resetPassword() {
                this.tipPassword = false
                for (let key in this.form) {
                    this.form[key] = '';
                }
                this.form.id = this.userInfo.id;
                this.form.userName = this.userInfo.loginName;
                this.formControl.visible = true
            },
            changeRules() {
                return false
                if (this.$dataFields.showPassRules) {
                    this.rules.newPassword.passWord = true
                } else {
                    this.rules.newPassword.passWord = false
                }
            },
            //page栏事件点击
            runClick(clickEvent, index) {
                this.$store.commit("updateHeaderMenuIndex", index);
                this[clickEvent]();
            },
            //菜单图标
            shrinkMenu() {
                this.$store.commit('toggleShrinkMenu');
            },
            //打开关闭菜单
            toggleMenu() {
                this.$store.commit("toggleOpenMenu");
            },
            //返回主页
            goHome() {
                this.$store.commit("updateOpenMenu", false);
                if (sessionStorage[this.$store.state.sysPrefix + 'useHome'])
                    this.$router.push({name: sessionStorage[this.$store.state.sysPrefix + 'useHome']});
                else
                    this.$router.push({name: 'Home'})
            },
            //头部菜单点击
            dropClick(e) {
                // console.log(e, 'eeee')
                // return false
                this[e]();
            },
            //登出
            logOut() {
                const sysPrefix = this.$store.state.sysPrefix;
                // this.$showConfirm('确定退出当前账户？', () => {
                //     sessionStorage.clear();
                //     for (var key in localStorage) {
                //         if (key.includes('menu_record')) {
                //             continue
                //         }
                //         switch (key) {
                //             case sysPrefix + "userPass":
                //             case sysPrefix + "userName":
                //             case sysPrefix + "userID":
                //                 break;
                //             default:
                //                 localStorage.removeItem(key);
                //         }
                //     }
                //     if (window.timer)//->清除全局定时器
                //         window.clearInterval(timer);
                //     this.$router.push({name: "AccessLogin"});
                // })
                this.$showConfirm('确定退出当前账户？', () => {
                    let ajaxOptions = {
                        url: this.$baseUrl + "user/loginOut"
                    };
                    this.$ajaxPost(ajaxOptions, true, (res) => {
                        if (res.code === 200) {
                            this.$message.success('登出成功！');
                            sessionStorage.clear();
                            if (localStorage[this.$store.state.sysPrefix + "isContactInfo"] !== undefined)
                                localStorage.removeItem(this.$store.state.sysPrefix + 'isContactInfo');
                            if (localStorage[this.$store.state.sysPrefix + "userMenu"] !== undefined)
                                localStorage.removeItem(this.$store.state.sysPrefix + 'userMenu');
                            if (window.timer)//->清除全局定时器
                                window.clearInterval(timer);
                            this.$router.push({name: "AccessLogin"});
                        } else {
                            this.$router.push({name: "AccessLogin"});
                        }
                    });
                })
            },
            //清除本地缓存
            refreshLocal() {
                this.$store.state.refreshLocal.forEach((item) => {
                    let refreshKey = this.$store.state.sysPrefix + item;
                    if (localStorage[refreshKey] !== undefined)
                        localStorage.removeItem(refreshKey);
                });
                this.$router.go(0);
            },
            /* 修改密码*/
            edit() {
                for (let key in this.form) {
                    this.form[key] = '';
                }
                this.form.id = this.userInfo.id;
                this.form.userName = this.userInfo.loginName;
                this.formControl.visible = true;
            },
            beforeSave() {
                if (this.form.newPassword !== this.form.confirm) {
                    this.$message.warning('两次密码不一致！');
                    return false
                } else {
                    return true
                }
            },
            save() {
                if (this.$validate.validRules(this.rules, this.form)) {
                    let ajaxOption = {
                        url: this.$baseUrl + "user/modifyUserPassword",
                        data: this.form
                    };
                    this.$ajaxPost(ajaxOption, true, (res) => {
                        if (res.code === 200) {
                            //密码更改成功代表当前账号的密码不再为初始密码
                            this.$store.state.simplePassWord = false
                            this.$showMsg('success', '保存成功');
                            // this.syncCadre()
                            this.formControl.visible = false;
                            this.isSimple = false
                        } else {
                            this.$showMsg('error', res.message);
                        }
                    })
                }
            },

            syncCadre() {
                // let validForm = this.$validate.validRules(this.rules, this.form)
                // this.form.birthdate = new Date(this.form.birthdate).getTime()
                // this.form.joiningPartyTime = this.form.joiningPartyTime ? new Date(this.form.joiningPartyTime).getTime() : ''
                // this.form.joinPositionTime = new Date(this.form.joinPositionTime).getTime()
                // if (validForm) {
                    let ajaxOption = {
                        url: this.$baseUrl + 'cadre/synCadreInfo',
                        data: this.form
                    }
                    this.$ajaxPost(ajaxOption, true, res => {
                        if (res.code === 200) {
                            // this.$showMsg("success", "同步成功")
                            // history.go(-1)
                        } else {
                            this.$showMsg("error", res.message)
                        }
                    })
                // }
            }
        }
    }
</script>
<style type="text/scss" lang="scss">
    $height: 40px;
    .common-header-wrapper {
        .common-header {
            display: flex;
            height: $height;
            line-height: $height;
            background: #fff;
            /*box-shadow: 0 0 15px #ccc;*/
            box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);

            .left-wrapper {
                display: flex;
                align-items: center;
                color: #fff;
                padding: 0 10px;
                /*background-color: #1680e5;*/
                background-color: $color-primary;

                .logoIcon {
                    font-size: 1.5em;
                    padding-right: 5px;
                }

                .header-logo-title {
                    font-size: 1.3em;
                }
            }

            .right-wrapper {
                flex: 1;
                color: #fff;
                padding: 0 10px;
                font-size: 1.3em;
                background-color: $color-primary;
                display: flex;
                align-items: center;

                .common-header-menu {
                    flex: 1;

                    .iconBtn {
                        height: $height;
                        cursor: pointer;
                        margin: 0 10px;
                        display: inline-block;

                        &.active {
                            border-bottom: 3px solid #fff
                        }
                    }
                }

                .common-header-user {
                    // display: flex;
                    // align-items: center;
                    .userDrop {
                        display: flex;
                        align-items: center;
                        .abbreviation {
                            background-color: #fff;
                            border-radius: 50%;
                            text-align: center;
                            line-height: 25px;
                            color: #489CF5;
                            font-size: 12px;
                            display: inline-block;
                            // margin: 0 15px;
                            width: 25px;
                            height: 25px;
                            overflow: hidden;
                        }
                        .userImg {
                            width: 25px;
                            height: 25px;
                            border-radius: 50%;
                        }
                    }

                    .userName {
                        display: inline-block;
                    }
                }
            }
        }
    }
</style>
