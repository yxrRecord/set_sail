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
        <h1 class="login-title">{{ loginTitle[loginModel] }}</h1>
        <div class="login-form-item username">
          <input type="text" v-model="info.username" required />
          <label for="name">请输入账号</label>
          <div class="user-list" v-show="localUserList.length">
            <div class="user-item" v-for="item in localUserList" :key="item">
              {{ item }}
            </div>
          </div>
        </div>
        <div class="login-form-item password">
          <input type="text" v-model="info.password" required />
          <label for="password">请输入密码</label>
        </div>

        <div class="login-form-item password" v-if="loginModel === 'retrieve'">
          <input type="text" v-model="info.passwordTwo" required />
          <label for="password">请在次输入密码</label>
        </div>

        <div class="login-btn-box">
          <div class="remember" v-if="loginModel === 'login'">
            <span>记住密码</span>
            <span @click="transFormModel('retrieve')">忘记密码</span>
          </div>
          <div class="login-register" v-if="loginModel === 'login'">
            <button class="register button" @click="transFormModel('register')">
              注册
            </button>
            <button class="login-btn button" @click="login">登录</button>
          </div>

          <div class="login-register" v-if="loginModel === 'register'">
            <button class="register button" @click="register">注册</button>
            <button class="login-btn button" @click="transFormModel('login')">
              登录
            </button>
          </div>

          <div class="login-register" v-if="loginModel === 'retrieve'">
            <button class="register button" @click="retrieve">修改密码</button>
            <button class="login-btn button" @click="transFormModel('login')">
              登录
            </button>
          </div>
        </div>
      </div>
    </div>
  </Overlay>
</template>

<script lang="ts" setup>
import {
  onMounted,
  ref,
  reactive,
  defineProps,
  computed,
  defineEmits,
} from "vue";
import Overlay from "./Overlay.vue";
import { loginApi } from "@api/modules/user";
import { useUserStore } from "@store/modules/user";
const userStore = useUserStore();
const localUserList = reactive([]);

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits(["update:modelValue"]);
const showOverlay = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emits("update:modelValue", value);
  },
});

type loginModelType = "login" | "register" | "retrieve";

let loginModel = ref<loginModelType>("login");
const loginTitle = reactive({
  login: "登录",
  register: "注册",
  retrieve: "忘记密码",
});

const info = reactive({
  username: "admin",
  password: "",
  passwordTwo: "",
});

/**
 * 登录
 */
const login = () => {
  loginModel.value = "login";
  let { username, password } = info;
  loginApi({
    username,
    password,
  }).then((res: any) => {
    if (res.code === 200) {
      if (res.code === 200) {
        console.log(res.data, "登录成功");
        // Utils.onMessage('登录成功')
        // 存用户信息
        userStore.localUserList = [{ username, password }];
        userStore.setUserInfo(res.data);
        showOverlay.value = false;
      }
    }
  });
};

/**
 * 转换模式
 */
const transFormModel = (model: loginModelType) => {
  loginModel.value = model;
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

  .login-left {
    position: absolute;
    left: 0;
    right: 0;
    width: 55%;
    height: 100%;
    background-image: url("@assets/images/banner1.jpg");
    background-size: cover;
  }

  .login-right {
    height: 100%;
    padding: 20px;
    padding-right: 50px;
    position: absolute;
    right: 0;
    width: 45%;

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
      &:focus {
        & ~ label {
          top: -20px;
          left: 0;
        }
      }
      &:valid {
        & ~ label {
          top: -20px;
          left: 0;
        }
      }
    }
    label {
      position: absolute;
      top: 0;
      left: 0;
      color: $primary-color;
      transition: all 0.3s;
      pointer-events: none;
    }
  }

  .user-list {
    display: none;
    padding: 0 10px;
    transition: all 0.3s;
    height: 100px;
    background: #fff;
    border: 1px solid #e5e5e5;
    overflow-y: scroll;
    .user-item {
      padding: 10px 0;
      border-bottom: 1px solid #e5e5e5;
      &:last-of-type {
        border-bottom: none;
      }
    }
  }
  .username input:focus {
    & ~ .user-list {
      display: block;
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
