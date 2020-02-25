## Form 表单组合

本章节主要讲如何将多个 form 表单组件进行组合，形成一个完整的表单页面。

常见的 form 表单为`单元格`形式的展示，即左侧为表单的标题描述，右侧为表单的输入。

其中，`Input 输入框`、`Picker 选择器`和 `DatetimePicker 日期时间选择器`具有`单元格`的展示形式，而 `Checkbox 复选框`、`Radio 单选框`、`InputNumber 计数器`和 `Switch 开关`需要使用 `Cell 单元格`进行包裹使用。

以下表单页面示例使用了 Button、Cell、CellGroup、DatetimePicker、Input、Picker、Radio、RadioGroup、Switch、Toast、MessageBox：

```html
<template>
  <div>
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
        <!-- 设置为block展示，避免空格导致单元格高度被空格撑开 -->
        <wd-switch v-model="subscribe" size="20px" style="display: block;" />
      </wd-cell>
      <wd-picker :columns="typeList" v-model="userType" label="注册类型" align-right :error="userTypeError" />
      <wd-datetime-picker v-model="birthday" label="生日" align-right :error="birthdayError" />
    </wd-cell-group>
    <div style="padding: 15px">
      <wd-button type="primary" block size="large" @click="handleClick">提交</wd-button>
    </div>
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
```

> 在 `CellGroup 组件` 中，每个 Cell 组件都有0.5像素的下边框，最后1个 Cell 组件会自动判断并去掉下边框，只有支持 Cell 类型的组件才支持这种判断。
