<template>
  <div>
    <demo-block title="基本用法">
      <wd-input v-model="value1" placeholder="请输入用户名" />
    </demo-block>
    <demo-block title="禁用状态">
      <wd-input v-model="value2" disabled />
    </demo-block>
    <demo-block title="只读状态">
      <wd-input v-model="value3" readonly />
    </demo-block>
    <demo-block title="错误状态">
      <wd-input v-model="value4" placeholder="请输入用户名" error />
    </demo-block>
    <demo-block title="清空按钮">
      <wd-input v-model="value5" clearable />
    </demo-block>
    <demo-block title="密码框">
      <wd-input v-model="value6" clearable show-password />
    </demo-block>
    <demo-block title="设置前后Icon">
      <wd-input v-model="value7" prefix-icon="wd-icon-dong" suffix-icon="wd-icon-list" />
    </demo-block>
    <demo-block title="字数限制">
      <wd-input v-model="value8" maxlength="20" show-word-limit />
    </demo-block>
    <demo-block title="取消底部边框，自定义使用">
      <wd-input v-model="value9" no-border placeholder="请输入价格" style="display: inline-block; width: 70px; vertical-align: middle;" />
      <span style="display: inline-block; vertical-align: middle; font-size: 14px;">元</span>
    </demo-block>
    <demo-block title="textarea" transparent>
      <wd-input type="textarea" v-model="value10" placeholder="请填写评价..." />
    </demo-block>
    <demo-block title="textarea 清空按钮 和 字数限制" transparent>
      <wd-input
        type="textarea"
        v-model="value11"
        rows="6"
        maxlength="120"
        clearable
        show-word-limit
      />
    </demo-block>
    <demo-block title="自适应高度">
      <wd-input v-model="value12" autosize clearable />
    </demo-block>
    <demo-block title="cell类型" transparent>
      <wd-cell-group border>
        <wd-input v-model="value13" placeholder="请输入..." label="基本用法" />
        <wd-input v-model="value14" placeholder="请输入..." label="禁用" disabled />
        <wd-input v-model="value15" placeholder="请输入..." label="清除、密码" show-password clearable />
        <wd-input v-model="value16" placeholder="请输入..." label="错误状态" error />
        <wd-input v-model="value17" placeholder="请输入..." label="必填" required />
        <wd-input
          v-model="value17"
          placeholder="请输入..."
          label="图标"
          prefix-icon="wd-icon-dong"
          suffix-icon="wd-icon-list"
        />
        <wd-input v-model="value18" placeholder="请输入..." label="自定义插槽">
          <wd-button slot="suffix" type="primary" size="small" class="custom-button">获取验证码</wd-button>
        </wd-input>
        <wd-input v-model="value19" placeholder="请输入..." label="大尺寸" size="large" />
      </wd-cell-group>
    </demo-block>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value1: '',
      value2: '这是禁用状态',
      value3: '这是只读状态',
      value4: '123456',
      value5: '支持清空',
      value6: 'password',
      value7: '',
      value8: '1234',
      value9: '',
      value10: '',
      value11: '支持清空和字数限制的文本域',
      value12: '输入文字后，输入框高度跟随字数多少变化',
      value13: '',
      value14: '该输入框禁用',
      value15: '12345678',
      value16: '',
      value17: '',
      value18: '',
      value19: '',
      value20: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.custom-button {
  position: relative;
  top: 50%;
  transform: translate(0, -50%);
  white-space: nowrap;
  vertical-align: middle;
}
</style>
