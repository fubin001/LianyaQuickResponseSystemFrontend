<template>
  <div class="login-container">
    <el-row :gutter="0">
      <el-col :xs="3" :sm="3" :md="3" :lg="3" :xl="3"><br></el-col>
      <el-col :xs="7" :sm="7" :md="7" :lg="7" :xl="7">
        <div>
          <el-image :src="require('@/assets/login/logo2.png')" /><el-image :src="require('@/assets/login/logo1.png')" />
        </div>
        <div style="margin: 2rem 0 2.2rem 0;">
          <el-image :src="require('@/assets/login/group.png')" />
        </div>
        <div>
          <span style="font-size: 1.5rem; color: #999999">欢迎</span>
          <span style="font-size: 1.6rem; color: #2055d5">登录999</span>
        </div>
        <div style="margin: 0.8rem 0 1.4rem 0">
          <span style="font-size: 1.3rem">销售预测后台管理系统</span>
        </div>
        <div>
          <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" autocomplete="on"
            label-position="left">
            <el-form-item prop="username">
              <el-input ref="username" v-model="loginForm.userNo" placeholder="请输入账号" prefix-icon="iconfont icon-geren"
                name="userNo" type="text" tabindex="1" autocomplete="on" />
            </el-form-item>
            <el-form-item prop="password">
              <el-input :key="passwordType" ref="password" v-model="loginForm.password" :type="passwordType"
                placeholder="请输入密码" prefix-icon="iconfont icon-mima1" name="password" tabindex="2" autocomplete="on"
                @keyup.native="checkCapslock" @blur="capsTooltip = false" @keyup.enter.native="handleLogin" />
              <span class="show-pwd" @click="showPwd">
                <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
              </span>
            </el-form-item>
            <el-form-item prop="password">
              <el-input :key="passwordType" ref="password" v-model="loginForm.confirmPassword" :type="passwordType"
                placeholder="请确认密码" prefix-icon="iconfont icon-mima1" name="password" tabindex="2" autocomplete="on"
                @keyup.native="checkCapslock" @blur="capsTooltip = false" @keyup.enter.native="handleLogin" />
              <span class="show-pwd" @click="showPwd">
                <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
              </span>
            </el-form-item>
            <el-form-item prop="password">
              <el-input :key="passwordType" ref="password" v-model="loginForm.password" :type="passwordType"
                placeholder="请输入品牌" prefix-icon="iconfont icon-pinpaisheji" tabindex="2" autocomplete="on" />
            </el-form-item>
          </el-form>
        </div>

        <div>
          <el-button :loading="loading" type="primary" style="width: 60%; margin-bottom: 30px"
            @click.native.prevent="handleRegister">注册</el-button>
        </div>
        <div>
          <span>请使用账号密码</span>
          <span style="color: #2b80cc" @click="$router.push({ path: '/loginr' })">登录</span>
        </div>
      </el-col>
      <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2">
        <div><br></div>
      </el-col>
      <el-col :xs="11" :sm="11" :md="11" :lg="11" :xl="11">
        <div>
          <el-image :src="require('@/assets/login/zhutu.png')" />
        </div>
      </el-col>
    </el-row>

    <!-- 注册弹窗 -->
    <el-dialog :title="titleMap[dialogStatus]" :visible.sync="dialogFormVisible" width="500px">
      <el-form ref="dataForm" :model="temp" label-position="left" label-width="70px"
        style="width: 300px; margin-left: 50px">
        <el-form-item label="员工工号" prop="userNo">
          <el-input v-if="dialogStatus === 'create'" v-model="temp.userNo" style="width: 300px" />
          <el-input v-else v-model="temp.userNo" style="width: 300px" disabled />
        </el-form-item>
        <el-form-item label="员工姓名" prop="username">
          <el-input v-model="temp.username" style="width: 300px" />
        </el-form-item>

        <el-form-item v-if="dialogStatus === 'create'" label="登陆密码">
          <el-input v-model="temp.password" show-password style="width: 300px" />
        </el-form-item>

        <el-form-item label="负责品牌">
          <el-select v-model="temp.brandIds" class="filter-item" multiple clearable filterable placeholder="请选择"
            style="width: 300px">
            <el-option v-for="item in brands" :key="item.name" :label="item.name" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="管理权限">
          <el-select v-model="temp.roleIds" class="filter-item" multiple clearable filterable placeholder="请选择"
            style="width: 300px">
            <el-option v-for="item in roles" :key="item.name" :label="item.name" :value="item.value" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false"> 取消 </el-button>
        <el-button type="primary" @click="on_userApplyOfr(dialogStatus, temp)">
          确定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'
import { createOrUpdate, deleteUserById, queryUser } from "@/api/user";

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
      otherQuery: {},
      dialogFormVisible:false,//注册弹窗口
      temp: {},
    }
  },
  watch: {
    $route: {
      handler: function (route) {
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
    //注册申请
    on_userApplyOfr(status, data) {
      if (status === "create") {
        data.id = null;
      }
      userApplyOfr(data).then((res) => {
        if (res.data) {
          this.$message.success("操作成功");
          this.getList(this.page);
        }
        this.dialogFormVisible = false;
      });
    },
    handleRegister() {
      // 注册接口
    },
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

.header-icon {
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
    height: 40px;
    width: 90%;
    padding-left: 10%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 5px 5px 15px 15px;
      color: $light_gray;
      height: 40px;
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
