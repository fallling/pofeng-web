<template>
  <div>
    <div id="login-container">
      <div style="text-align: center; width: 100%">
        <img :width="100" alt="logo" src="@/assets/logo.png">
      </div>
      <div>
        <h2 style="margin: auto">破风</h2>
        <p>俱怀逸兴壮思飞,欲上青天览日月</p>
      </div>
      <a-form
        :model="formState"
        name="normal_login"
        class="login-form"
        labelAlign="right"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
      >
        <a-form-item
          name="username"
          :rules="[{ required: true, message: '请输入您的用户名!' }]"
        >
          <a-input v-model:value="formState.username">
            <template #prefix>
              <UserOutlined/>
            </template>
          </a-input>
        </a-form-item>

        <a-form-item
          name="password"
          :rules="[{ required: true, message: '请输入您的密码!' }]"
        >
          <a-input-password v-model:value="formState.password">
            <template #prefix>
              <LockOutlined/>
            </template>
          </a-input-password>
        </a-form-item>

        <div class="login-form-wrap">
          <a-form-item name="remember" no-style>
            <a-checkbox v-model:checked="formState.remember">记住我</a-checkbox>
          </a-form-item>
        </div>

        <a-form-item>
          <a-button
            type="primary"
            html-type="submit"
            class="login-form-button">
            登录
          </a-button>
          <a class="login-form-forgot" href="">忘记密码</a>
          <a class="login-form-register" href="">注册</a>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, ref } from 'vue'
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'
import axios from 'axios'

interface FormState {
  username: string;
  password: string;
  remember: boolean;
}

export default defineComponent({
  name: 'PofengLogin',
  components: {
    UserOutlined,
    LockOutlined
  },
  setup () {
    const data = ref('')
    const formState = reactive<FormState>({
      username: 'lengzq',
      password: 'abc123',
      remember: true
    })
    const onFinish = () => {
      console.log('onLogin')
      axios({
        method: 'post',
        url: 'login',
        data: formState,
        transformRequest: [function (data) {
          let ret = ''
          for (const it in data) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
          }
          return ret
        }],
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(function (response) {
          console.log(response)
        })
        .catch(function (error) {
          console.log(error)
        })
    }
    const onFinishFailed = (errorInfo: never) => {
      console.log('Failed:', errorInfo)
    }
    const disabled = computed(() => {
      return !(formState.username && formState.password)
    })

    const loginLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 }
    }
    return {
      formState,
      onFinish,
      onFinishFailed,
      disabled,
      loginLayout,
      data
    }
  }
})
</script>

<style>
#login-container {
  position: absolute;
  width: 350px;
  margin: auto;
  text-align: center;
  padding: 25px 51px;
  border-radius: 50px;
  top: 36%;
  left: 50%;
  transform: translateX(-50%) translateY(-36%);
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
#login-container .login-form {
  max-width: 300px;
  width: 248px;
}
#login-container .login-form >>> .ant-form-item {
  margin-bottom: 12px;
}
#login-container .login-form-wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
#login-container .login-form-button {
  width: 100%;
}
#login-container .login-form-forgot {
  margin: 12px 0;
  float: left;
}
#login-container .login-form-register {
  margin: 12px 0;
  float: right;
}
</style>
