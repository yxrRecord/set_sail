<template>
  <Overlay
    id="login-dialog"
    v-model="showOverlay"
    :showModal="true"
    closeOnClickModal
  >
    <div class="login-container">
      <div class="login-left">
        <img :src="loginBg" alt="login-bg" />
      </div>
      <div class="login-right">
        <div class="login-form-item username">
          <label for="name">账号：</label>
          <input type="text" v-model="info.name" placeholder="请输入账号" />
        </div>
        <div class="login-form-item password">
          <label for="password">密码：</label>
          <input type="text" v-model="info.password" placeholder="请输入密码" />
        </div>
        <div class="login-btn-box">
          <button class="regest button">注册</button>
          <button class="login-bnt button" @click="login">登录</button>
        </div>
      </div>
    </div>
  </Overlay>
</template>

<script lang="ts" setup>
import { onMounted, reactive, defineProps, computed, defineEmits } from "vue";
import Overlay from "./Overlay.vue";
import loginBg from "@assets/images/banner1.jpg";
import { loginApi } from "@api/modules/user";

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

const info = reactive({
  name: "admin",
  password: "",
});
/**
 * 登录
 */
const login = () => {
  console.log("login", info);
  loginApi(info).then((res: any) => {
    if (res.code === 200) {
      console.log(res.data, "登录成功");
      showOverlay.value = false;
    }
  });
};
</script>

<style lang="scss" type="text/scss" scoped>
.login-container {
  background: #fff;
  height: 300px;
  border-radius: 5px;
  overflow: hidden;
  display: flex;

  .login-left {
    width: 45%;
    height: 100%;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .login-right {
    width: 55%;
    height: 100%;
    padding: 20px;
  }

  // 表单
  .login-form-item {
    margin-bottom: 16px;

    input {
      background: none;
      outline: none;
      border: none;
      font-size: 14px;

      &::placeholder {
        color: #bbb;
      }
    }
  }

  // 按钮
  .login-btn-box {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .button {
      flex: 1;
      text-align: center;
      border: none;

      &:last-child {
        margin-left: 20px;
      }
    }
  }
}
</style>
