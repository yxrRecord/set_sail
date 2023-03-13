<template>
  <Overlay
    id="login-dialog"
    v-model="showOverlay"
    :showModal="true"
    closeOnClickModal
  >
    <div class="login-container" :class="loginModel">
      <div class="login-left"></div>
      <div class="login-right">
        <h1 class="login-title">
          {{ loginTitle[loginModel || "login"] }}
          <Popover :placement="placementValue" trigger="hover">
            <template v-slot:reference>
              <span class="reference iconfont yxryiwen"></span>
            </template>
            <template v-slot:content>
              <ul class="login-explain">
                <li
                  class="login-explain-text"
                  v-for="item in loginExplain[loginModel || 'login']"
                  :key="item"
                >
                  🌍 {{ item }}
                </li>
              </ul>
            </template>
          </Popover>
        </h1>
        <div class="login-form-item username">
          <input type="text" v-model="userInfo.username" required />
          <label for="name">请输入您的账号</label>
          <div class="user-list" v-show="localUserList.length">
            <div
              class="user-item"
              v-for="account in localUserList"
              :key="account.username"
              @click="selectLocalAccount(account)"
            >
              {{ account.username }}
            </div>
          </div>
        </div>
        <div class="login-form-item password">
          <input type="password" v-model="userInfo.password" required />
          <label for="password">请输入您的密码</label>
        </div>

        <div class="login-form-item password" v-if="loginModel === 'retrieve'">
          <input type="password" v-model="userInfo.passwordTwo" required />
          <label>请在次输入密码</label>
        </div>

        <div class="login-form-item email" v-if="loginModel === 'register'">
          <input type="text" v-model="userInfo.email" required />
          <label>请输入您的邮箱</label>
        </div>

        <div class="login-btn-box">
          <div
            class="remember"
            v-if="!['register', 'retrieve'].includes(loginModel)"
          >
            <span>
              <input
                id="rememberCheck"
                type="checkbox"
                name="remember"
                v-model="isRemember"
              />
              <label for="rememberCheck">记住密码</label>
            </span>
            <span @click="transFormModel('retrieve')">忘记密码</span>
          </div>
          <div
            class="login-register"
            v-if="!['register', 'retrieve'].includes(loginModel)"
          >
            <button class="register button" @click="transFormModel('register')">
              Go注册
            </button>
            <button class="login-btn button" @click="login">登录</button>
          </div>

          <div class="login-register" v-if="loginModel === 'register'">
            <button class="register button" @click="register">注册</button>
            <button class="login-btn button" @click="transFormModel('login')">
              Go登录
            </button>
          </div>

          <div class="login-register" v-if="loginModel === 'retrieve'">
            <button class="register button" @click="retrieve">修改密码</button>
            <button class="login-btn button" @click="transFormModel('login')">
              Go登录
            </button>
          </div>

          <div v-show="vaildMsg" class="vaild-result">* {{ vaildMsg }}</div>
        </div>
      </div>
    </div>
  </Overlay>
</template>

<script lang="ts" setup>
import { ref, reactive, computed } from "vue";
import Overlay from "./Overlay.vue";
import { loginApi, registerApi } from "@api/user";
import { useUserStore } from "@store/modules/user";
import { LocalUserType } from "@api/user.type";
import { useAppStore } from "@store/modules/app";
import Popover from "./Popover.vue";
const appStore = useAppStore();
const userStore = useUserStore();

const localUserList = computed(() => {
  return userStore.localUserList || [];
});

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
});

const showOverlay = computed({
  get() {
    return props.modelValue || false;
  },
  set(value) {
    appStore.showLoginDialog = value;
  },
});
const placementValue = computed(() => {
  return loginModel.value === "login" || loginModel.value === ""
    ? "right-start"
    : "left-start";
});

type loginModelType = "login" | "register" | "retrieve" | "";

let loginModel = ref<loginModelType>("");
const loginTitle = reactive({
  login: "登录",
  register: "注册",
  retrieve: "忘记密码",
});

const loginExplain = reactive({
  login: [
    "输入用户名和密码，点击登录即可",
    "用户名为4位以上字母或者数组",
    "密码为4位以上字母或者数组",
  ],
  register: [
    "用户名为4位以上字母或者数组",
    "密码为4位以上字母或者数组",
    "输入可用的邮箱",
  ],
  retrieve: [
    "用户名为4位以上字母或者数组",
    "密码为4位以上字母或者数组",
    "再次输入密码需要和原密码保持一致",
  ],
});

const userInfo = reactive({
  username: "admin",
  password: "",
  passwordTwo: "",
  email: "",
});

const isRemember = ref(false);
let vaildMsg = ref("");
/**
 * 登录
 */
const login = () => {
  loginModel.value = "login";
  let { username, password } = userInfo;
  loginApi({
    username,
    password,
  }).then((res) => {
    if (res && res.code === 200) {
      console.log(res.data, "登录成功");
      if (isRemember.value === true) {
        // 存用户信息
        let { localUserList } = userStore;
        const loaclUserIndex = localUserList.findIndex(
          (item: LocalUserType) => item.username === username
        );
        if (loaclUserIndex >= 0) {
          localUserList.splice(loaclUserIndex, 1);
        }
        localUserList.unshift({ username, password });
        userStore.localUserList = localUserList;
      }
      userStore.isLogin = true;
      userStore.setUserInfo(res.data);
      showOverlay.value = false;
    }
  });
};

/**
 * 选择本地账号
 */

const selectLocalAccount = (accoun: LocalUserType) => {
  userInfo.username = accoun.username;
  userInfo.password = accoun.password;
};

/**
 * 修改密码
 */
const retrieve = () => {
  console.log("retrieve");
};

/**
 * 注册账号
 */
const register = () => {
  let { username, password, email } = userInfo;
  hasVaild();
  if (vaildMsg.value) return;
  registerApi({
    username,
    password,
    email,
  }).then((res) => {
    if (res && res.code === 200) {
      console.log("注册成功");
      transFormModel("login");
    } else {
      vaildMsg.value = res ? res.message || "" : "";
    }
  });
};

/**
 * 验证表单
 */
const hasVaild = () => {
  const loginReg = /^[a-zA-Z0-9]{4}/;
  const passwordReg = /^[a-zA-Z0-9]{4}/;
  const emailReg = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
  if (!loginReg.test(userInfo.username)) {
    vaildMsg.value = "用户名格式错误";
  } else if (!passwordReg.test(userInfo.password)) {
    vaildMsg.value = "密码格式错误";
  } else if (
    userInfo.password !== userInfo.passwordTwo &&
    loginModel.value === "retrieve"
  ) {
    vaildMsg.value = "两次密码不一致";
  } else if (
    !emailReg.test(userInfo.email) &&
    loginModel.value === "register"
  ) {
    vaildMsg.value = "邮箱格式错误";
  } else {
    vaildMsg.value = "";
  }
};

/**
 * 转换模式
 */
const transFormModel = (model: loginModelType) => {
  loginModel.value = model;
  vaildMsg.value = "";
};
</script>

<style lang="scss" type="text/scss" scoped>
.login-container {
  background: #fff;
  height: 400px;
  width: 600px;
  border-radius: 5px;
  overflow: hidden;
  display: flex;
  transition: all 3s;
  position: relative;
  flex-direction: row;

  .login-left {
    position: absolute;
    left: 0;
    right: 0;
    width: 55%;
    height: 100%;
    background-image: url("@assets/images/banner1.jpg");
    background-size: cover;
    clip-path: polygon(0px 0px, 0% 100%, 50% 100%, 100% 0px);
  }

  .login-right {
    height: 100%;
    padding: 20px;
    padding-right: 50px;
    position: absolute;
    right: 0;
    width: 45%;
    padding-right: 50px;
    padding-left: 0;

    .login-title {
      color: $primary-color;
      font-size: 20px;
      letter-spacing: 2px;
      text-align: center;
      margin-bottom: 80px;
      margin-top: 20px;
    }
  }

  // 表单
  .login-form-item {
    margin-bottom: 30px;
    position: relative;
    input {
      background: none;
      outline: none;
      border: none;
      font-size: 14px;
      border-bottom: 1px solid $primary-color;
      line-height: 30px;
      height: 30px;
      width: 100%;
      &::placeholder {
        color: #bbb;
      }
      &:focus,
      &:valid {
        & ~ label {
          top: -20px;
          left: 0;
          font-size: 12px;
          line-height: normal;
        }
      }
    }
    label {
      position: absolute;
      top: 0;
      left: 0;
      color: $primary-color;
      line-height: 30px;
      transition: all 0.3s;
      pointer-events: none;
    }
  }
  .username {
    position: relative;
  }

  .user-list {
    position: absolute;
    width: 100%;
    padding: 0 10px;
    max-height: 0;
    background: #fff;
    border: 1px solid #e5e5e5;
    border-top: 0;
    overflow-y: scroll;
    z-index: 2;
    transition: all 0.3s;
    visibility: hidden;
    .user-item {
      padding: 10px 0;
      border-bottom: 1px solid #e5e5e5;
      cursor: pointer;
      &:hover {
        color: $primary-color;
      }
      &:last-of-type {
        border-bottom: none;
      }
    }
  }

  .username input:focus {
    & ~ .user-list {
      visibility: visible;
      max-height: 200px;
    }
  }

  // 按钮
  .login-btn-box {
    .login-register,
    .remember {
      @include flex(space-between, center);
    }
    .remember {
      margin-bottom: 20px;
      span {
        color: $color-gray3;
        cursor: pointer;
        &:hover {
          color: $primary-color;
        }
      }

      label {
        cursor: pointer;
        vertical-align: top;
      }

      #rememberCheck {
        width: 14px;
        height: 14px;
        margin-right: 6px;
        cursor: pointer;
        outline: none;
        &:checked {
          background-color: $primary-color;
          color: #fff;
          & ~ label {
            color: $primary-color;
          }
        }
      }
    }
    .button {
      flex: 1;
      text-align: center;
      border: none;
      padding: 4px 10px;
      border-radius: 5px;
      letter-spacing: 2px;
      font-size: 14px;
      cursor: pointer;
      &:last-child {
        margin-left: 20px;
      }
    }
    .login-btn {
      background-color: $primary-color;
      color: #fff;
    }
    .register {
      border: 1px solid #e5e5e5;
      background-color: #fff;
      transition: all 0.1s;
      &:hover {
        border-color: $primary-color;
        color: $primary-color;
      }
    }

    .vaild-result {
      color: red;
      margin-top: 12px;
      font-size: 12px;
    }
  }
}

@keyframes bgAnm {
  0% {
    clip-path: polygon(0px 0px, 0% 100%, 50% 100%, 100% 0px);
    width: 55%;
  }
  50% {
    clip-path: polygon(0px 0px, 0% 100%, 100% 100%, 100% 0%);
    width: 100%;
  }
  100% {
    clip-path: polygon(0px 0px, 50% 100%, 100% 100%, 100% 0%);
    width: 55%;
    left: 45%;
  }
}

@keyframes loginBgAnm {
  0% {
    clip-path: polygon(0px 0px, 50% 100%, 100% 100%, 100% 0%);
    width: 55%;
    left: 45%;
  }
  50% {
    clip-path: polygon(0px 0px, 0% 100%, 100% 100%, 100% 0%);
    width: 100%;
  }
  100% {
    clip-path: polygon(0px 0px, 0% 100%, 50% 100%, 100% 0px);
    width: 55%;
    left: 0%;
  }
}

@keyframes formAnm {
  0% {
    right: 0;
  }
  100% {
    right: 55%;
  }
}

@keyframes loginFormAnm {
  0% {
    right: 55%;
  }
  100% {
    right: 0;
  }
}

.login {
  flex-direction: row;
  .login-left {
    animation: loginBgAnm 1s ease forwards;
  }
  .login-right {
    animation: loginFormAnm 1s ease forwards;
    padding-right: 50px;
    padding-left: 0;
  }
}

.register,
.retrieve {
  flex-direction: row-reverse;
  .login-left {
    animation: bgAnm 1s ease forwards;
  }
  .login-right {
    animation: formAnm 1s ease forwards;
    padding-left: 50px;
    padding-right: 0;
  }
}
</style>

<style lang="scss" type="text/scss">
.login-explain {
  .login-explain-text {
    margin-bottom: 12px;
    font-size: 12px;
    color: $color-gray3;
    &:last-of-type {
      margin: 0;
    }
  }
}
</style>
