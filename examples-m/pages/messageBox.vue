<template>
  <div>
    <white-space>
      <div slot="desc">Alert 弹框</div>
      <jm-button type="primary" plain @click="alert">alert</jm-button>
    </white-space>
    <white-space>
      <div slot="desc">Confirm 弹框</div>
      <jm-button type="primary" plain @click="confirm">confirm</jm-button>
    </white-space>
    <white-space>
      <div slot="desc">Prompt 弹框</div>
      <jm-button type="primary" plain @click="prompt">prompt</jm-button>
    </white-space>
    <white-space>
      <div slot="desc">文案过长</div>
      <jm-button type="primary" plain @click="alert2">alert</jm-button>
    </white-space>
    <white-space>
      <div slot="desc">使用其他组件</div>
      <jm-button type="primary" plain @click="custom">custom</jm-button>
      <jm-message-box :show="isShow" show-cancel-button @action="handleAction" title="评分">
        <jm-rate v-model="rate" />
      </jm-message-box>
    </white-space>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isShow: false,
      rate: 0
    }
  },
  methods: {
    alert () {
      this.$messageBox.alert('操作成功')
    },
    confirm () {
      this.$messageBox.confirm('是否删除', '提示').then(() => {
        this.$messageBox.alert('删除成功')
      })
    },
    prompt () {
      this.$messageBox.prompt('请输入邮箱', {
        inputPattern: /.+@.+\..+/i
      }).then(({ value }) => {
        this.$messageBox.alert(`你输入的邮箱是： ${value}`)
      })
    },
    alert2 () {
      this.$messageBox.alert('以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文', '标题')
    },
    custom () {
      this.isShow = true
    },
    handleAction (action) {
      this.isShow = false
      if (action === 'confirm') {
        this.$messageBox.alert(`你的评分为：${this.rate}分`)
      }
    }
  }
}
</script>
