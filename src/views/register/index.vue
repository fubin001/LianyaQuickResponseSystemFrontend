<template>
  <div class="login-container">
    <el-row :gutter="0">
      <el-col :xs="3" :sm="3" :md="3" :lg="3" :xl="3"><br></el-col>
      <el-col
        :xs="7"
        :sm="7"
        :md="7"
        :lg="7"
        :xl="7"
      ><div>
         <el-image :src="require('@/assets/login/logo2.png')" /><el-image :src="require('@/assets/login/logo1.png')" />
       </div>
        <div style="margin: 2rem 0 2.2rem 0;">
          <el-image :src="require('@/assets/login/group.png')" />
        </div>
        <div>
          <span style="font-size: 1.5rem; color: #999999">欢迎</span>
          <span style="font-size: 1.6rem; color: #2055d5">登录</span>
        </div>
        <div style="margin: 0.8rem 0 1.4rem 0">
          <span style="font-size: 1.3rem">销售预测后台管理系统</span>
        </div>
        <div>
          <el-form
            ref="loginForm"
            :model="loginForm"
            :rules="loginRules"
            class="login-form"
            autocomplete="on"
            label-position="left"
          >
            <el-form-item prop="username">

              <el-input
                ref="username"
                v-model="loginForm.userNo"
                placeholder="请输入账号"
                prefix-icon="iconfont icon-geren"
                name="userNo"
                type="text"
                tabindex="1"
                autocomplete="on"
              />
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                :key="passwordType"
                ref="password"
                v-model="loginForm.password"
                :type="passwordType"
                placeholder="请输入密码"
                prefix-icon="iconfont icon-mima"
                name="password"
                tabindex="2"
                autocomplete="on"
                @keyup.native="checkCapslock"
                @blur="capsTooltip = false"
                @keyup.enter.native="handleLogin"
              />
              <span class="show-pwd" @click="showPwd">
                <svg-icon
                  :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
                />
              </span>
            </el-form-item>
          </el-form>
        </div>

        <div>
          <el-button
            :loading="loading"
            type="primary"
            style="width: 60%; margin-bottom: 30px"
            @click.native.prevent="handleLogin"
          >登录</el-button>
        </div>
        <div>
          <span>请使用手机号</span>
          <span style="color: #2b80cc" @click="goLogin">注册</span>
        </div>
      </el-col>
      <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2"><div><br></div></el-col>
      <el-col
        :xs="11"
        :sm="11"
        :md="11"
        :lg="11"
        :xl="11"
      ><div>
        <el-image :src="require('@/assets/login/zhutu.png')" /></div></el-col>
    </el-row>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'

export default {
  name: 'Register',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('Please enter the correct user name'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 5) {
        callback(new Error('The password can not be less than 6 digits'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        // username: 'admin',
        // password: '111111'
      },
      loginRules: {
        userNo: [
          { required: true, trigger: 'blur', validator: validateUsername }
        ],
        password: [
          { required: true, trigger: 'blur', validator: validatePassword }
        ]
      },
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {}
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  created() {
    // window.addEventListener('storage', this.afterQRScan)
  },
  mounted() {
    if (this.loginForm.username === '') {
      this.$refs.username.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    }
  },
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  methods: {
    checkCapslock(e) {
      const { key } = e
      this.capsTooltip = key && key.length === 1 && key >= 'A' && key <= 'Z'
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true
          console.log(this.$store)
          this.$store
            .dispatch('user/login', this.loginForm)
            .then(() => {
              this.$router.push({
                path: this.redirect || '/',
                query: this.otherQuery
              })
              this.loading = false
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    // color: $cursor;
  }
}

.header-icon{
  margin-right: 4px;
  width: 20px;
  height: 20px;
}

/* reset element-ui css */
.login-container {
  .el-form-item {
    width: 60%;
    background-color: #fff;
  }
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    padding-left: 10%;
    // color: #fff;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  background-color: #081b3a;
  height: 100%;
  color: #fff;
}

.el-col {
  border-radius: 4px;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>
