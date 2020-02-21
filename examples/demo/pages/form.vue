<template>
  <div>
    <demo-block title="Form 表单组件组合使用" transparent>
      <wd-cell-group>
        <wd-input label="用户名" v-model="username" placeholder="请输入用户名" clearable :error="usernameError" />
        <wd-input label="密码" v-model="password" placeholder="请输入密码" show-password clearable :error="passwordError" />
        <wd-cell title="性别">
          <wd-radio-group v-model="gender" inline>
            <wd-radio :value="1">男</wd-radio>
            <wd-radio :value="2">女</wd-radio>
          </wd-radio-group>
        </wd-cell>
        <wd-cell title="是否订阅">
          <wd-switch v-model="subscribe" size="20px" style="display: block;" />
        </wd-cell>
        <wd-picker :columns="typeList" v-model="userType" label="注册类型" align-right :error="userTypeError" />
        <wd-datetime-picker v-model="birthday" label="生日" align-right :error="birthdayError" />
      </wd-cell-group>
      <div style="padding: 15px">
        <wd-button type="primary" block size="large" @click="handleClick">提交</wd-button>
      </div>
    </demo-block>
    <demo-block title="表单数据" transparent>
      <div class="display-item">
        用户名: {{ username }}
      </div>
      <div class="display-item">
        密码: {{ password }}
      </div>
      <div class="display-item">
        性别: {{ gender }}
      </div>
      <div class="display-item">
        注册类型: {{ userType }}
      </div>
      <div class="display-item">
        生日: {{ birthday }}
      </div>
    </demo-block>
  </div>
</template>

<script>
export default {
  data () {
    return {
      username: '',
      usernameError: false,
      password: '',
      passwordError: false,
      gender: 1,
      subscribe: true,
      typeList: [
        {
          label: '类型1',
          value: 1
        }, {
          label: '类型2',
          value: 2
        }, {
          label: '类型3',
          value: 3
        }
      ],
      userType: '',
      userTypeError: false,
      birthday: '',
      birthdayError: false
    }
  },
  watch: {
    username () {
      this.usernameError = false
    },
    password () {
      this.passwordError = false
    },
    userType () {
      this.userTypeError = false
    },
    birthday () {
      this.birthdayError = false
    }
  },
  methods: {
    handleClick () {
      const { username, password, userType, birthday } = this

      if (!username || !password || !userType || !birthday) {
        this.usernameError = !username
        this.passwordError = !password
        this.userTypeError = !userType
        this.birthdayError = !birthday
        
        this.$toast.error('有未填的选项')
        return
      }

      this.$messageBox.alert('提交成功', '提交提示')
    }
  }
}
</script>

<style lang="scss" scoped>
.display-item {
  padding: 0 15px;
  margin-bottom: 10px;
  color: #999;
}
</style>