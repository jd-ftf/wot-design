<template>
  <div>
    <demo-block title="alert">
      <wd-button @click="alert">alert</wd-button>
    </demo-block>
    <demo-block title="显示标题">
      <wd-button @click="alert2">alert</wd-button>
    </demo-block>
    <demo-block title="confirm">
      <wd-button @click="confirm">confirm</wd-button>
    </demo-block>
    <demo-block title="prompt">
      <wd-button @click="prompt">prompt</wd-button>
    </demo-block>
    <demo-block title="当文案过长时，弹框的高度不再增加，而是将文案内容设置成滚动">
      <wd-button @click="alert3">alert</wd-button>
    </demo-block>
    <demo-block>
      <div slot="title">使用<code>wd-message-box</code>组件，通过<code>slot</code>插入其他组件内容</div>
      <wd-button @click="custom">custom</wd-button>
      <wd-message-box :show="isShow" show-cancel-button @action="handleAction" title="评分">
        <wd-rate v-model="rate" />
      </wd-message-box>
    </demo-block>
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
    alert2 () {
      this.$messageBox.alert('提示文案', '标题')
    },
    confirm () {
      this.$messageBox.confirm('是否删除', '提示').then(() => {
        this.$toast('删除成功')
      })
    },
    prompt () {
      this.$messageBox.prompt('请输入邮箱', {
        inputPattern: /.+@.+\..+/i,
        inputError: '邮箱格式不正确，请重新输入'
      }).then(({ value }) => {
        this.$toast(`你输入的邮箱是： ${value}`)
      })
    },
    alert3 () {
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
