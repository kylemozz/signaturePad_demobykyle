<template>
  <div class="container">
    <h1>System Demo</h1>
    <a-form-model
      class="login-form"
      layout="horizontal"
      :rules="rules"
      :model="ruleForm"
      ref="ruleForm"
    >
      <a-form-model-item prop="username">
        <a-input
          placeholder="手机号/身份证"
          class="input"
          v-model="ruleForm.username"
        >
          <a-icon class="icon" slot="prefix" type="user" />
        </a-input>
      </a-form-model-item>
      <a-form-model-item prop="pwd">
        <a-input-password
          placeholder="密码"
          class="input"
          v-model="ruleForm.pwd"
        >
          <a-icon class="icon" slot="prefix" type="lock" />
        </a-input-password>
      </a-form-model-item>
      <a-form-model-item>
        <a-button
          class="login-btn"
          type="primary"
          @click="submitForm('ruleForm')"
        >
          登录
        </a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
export default {
  data () {
    // 自定义验证规则
    // const UserNameValidator = (rule, value, callback) => {
    //   // 若长度不为11位也不为18位则提示错误
    //   if (value.length !== 11 && value.length !== 18) {
    //     callback(new Error('用户名必须是手机号或者身份证'))
    //   } else {
    //     callback()
    //   }
    // }
    return {
      ruleForm: {
        username: '',
        pwd: ''
      },
      rules: {
        // 注意验证规则名称需与属性名一致
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' }
          // { validator: UserNameValidator } // 自定义验证器 限制为11位(手机号) 或者 18位(身份证号) 这里为前端验证跳转方便先注释了
        ],
        pwd: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 6, max: 10, message: '密码长度需在5至10位', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 登录验证 使用token (只能使用前端验证) 用户名密码正确则生成token并保存(存到localstorage,然后再保存到vuex) 然后进行跳转
          // 使用路由守卫每次判断是否存在正确的token 否则则跳转至登录界面
          if (this.ruleForm.username === 'admin' && this.ruleForm.pwd === '123456') {
            // alert('提交登录成功!')
            this.$router.push('/signature') // 路由跳转
          }
        } else {
          alert('用户名或密码不符合要求!')
          return false
        }
      })
    }
  },
  components: {}
}
</script>

<style scoped>
.container {
  text-align: center;
  margin: 120px 0;
  font-size: 20px;
}
.container > h1 {
  font-weight: bold;
}
.login-form {
  height: 455px;
  width: 390px;
  margin: 0 auto;
  background-color: #fff;
  padding: 48px 30px;
  box-shadow: 0 0 30px 0 rgba(0, 0, 0, 0.1);
  border-radius: 6px;
}
.input {
  width: 280px;
  color: rgba(0, 0, 0, 0.65);
  padding: 5px 3px;
}
.icon {
  font-size: 20px;
  margin-left: -5px;
}
.login-btn {
  width: 280px;
  height: 40px;
  font-size: 16px;
  background-color: #37539e;
  border-color: #37539e;
}
</style>
