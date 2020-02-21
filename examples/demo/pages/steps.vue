<template>
  <div>
    <demo-block title="基本用法">
      <wd-steps :active="0">
        <wd-step />
        <wd-step />
        <wd-step />
      </wd-steps>
    </demo-block>
    <demo-block title="水平居中">
      <wd-steps :active="1" align-center>
        <wd-step />
        <wd-step />
        <wd-step />
      </wd-steps>
    </demo-block>
    <demo-block title="标题和描述信息">
      <wd-steps :active="value1" align-center>
        <wd-step title="步骤1" description="注册1个账号" />
        <wd-step title="步骤2" description="登录账号并绑定手机" />
        <wd-step title="步骤3" description="完善个人信息" />
      </wd-steps>
      <div style="margin-top: 15px; text-align: center;">
        <wd-button @click="nextStep" type="primary" size="small">下一步</wd-button>
      </div>
    </demo-block>
    <demo-block title="修改图标">
      <wd-steps :active="1" align-center>
        <wd-step icon="wd-icon-invite" />
        <wd-step icon="wd-icon-link" />
        <wd-step icon="wd-icon-clock" />
      </wd-steps>
    </demo-block>
    <demo-block title="竖向步骤条">
      <wd-steps :active="1" vertical>
        <wd-step description="注册1个账号" />
        <wd-step description="登录账号并绑定手机" />
        <wd-step description="完善个人信息" />
      </wd-steps>
    </demo-block>
    <demo-block title="点状步骤和垂直方向">
      <wd-steps :active="1" vertical dot>
        <wd-step description="注册1个账号" />
        <wd-step description="登录账号并绑定手机" />
        <wd-step description="完善个人信息" />
      </wd-steps>
    </demo-block>
    <demo-block title="修改状态">
      <wd-steps :active="1" align-center>
        <wd-step title="绑定手机" status="error" />
        <wd-step title="重新绑定手机" />
        <wd-step title="步骤3" />
      </wd-steps>
    </demo-block>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value1: 0
    }
  },
  methods: {
    nextStep () {
      this.value1 < 3 && this.value1++
    }
  }
}
</script>
