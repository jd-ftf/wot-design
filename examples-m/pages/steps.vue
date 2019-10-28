<template>
  <div>
    <white-space title="基本用法">
      <jm-steps :active="0">
        <jm-step />
        <jm-step />
        <jm-step />
      </jm-steps>
    </white-space>
    <white-space title="水平居中">
      <jm-steps :active="1" align-center>
        <jm-step />
        <jm-step />
        <jm-step />
      </jm-steps>
    </white-space>
    <white-space title="标题和描述信息">
      <jm-steps :active="value1" align-center>
        <jm-step title="步骤1" description="注册1个账号" />
        <jm-step title="步骤2" description="登录账号并绑定手机" />
        <jm-step title="步骤3" description="完善个人信息" />
      </jm-steps>
      <div style="margin-top: 15px; text-align: center;">
        <jm-button @click="nextStep" type="primary" size="small">下一步</jm-button>
      </div>
    </white-space>
    <white-space title="修改图标">
      <jm-steps :active="1" align-center>
        <jm-step icon="jm-icon-invite" />
        <jm-step icon="jm-icon-link" />
        <jm-step icon="jm-icon-clock" />
      </jm-steps>
    </white-space>
    <white-space title="竖向步骤条">
      <jm-steps :active="1" vertical>
        <jm-step description="注册1个账号" />
        <jm-step description="登录账号并绑定手机" />
        <jm-step description="完善个人信息" />
      </jm-steps>
    </white-space>
    <white-space title="点状步骤和垂直方向">
      <jm-steps :active="1" vertical dot>
        <jm-step description="注册1个账号" />
        <jm-step description="登录账号并绑定手机" />
        <jm-step description="完善个人信息" />
      </jm-steps>
    </white-space>
    <white-space title="修改状态">
      <jm-steps :active="1" align-center>
        <jm-step title="绑定手机" status="error" />
        <jm-step title="重新绑定手机" />
        <jm-step title="步骤3" />
      </jm-steps>
    </white-space>
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
