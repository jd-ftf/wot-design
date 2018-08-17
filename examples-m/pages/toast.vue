<template>
  <div>
    <white-space>
      <jm-button @click="handleToast1">纯文字toast</jm-button>
    </white-space>
    <white-space>
      <jm-button @click="handleToast2">成功toast</jm-button>
    </white-space>
    <white-space>
      <jm-button @click="handleToast3">错误toast</jm-button>
    </white-space>
    <white-space>
      <jm-button @click="handleToast4">警告toast</jm-button>
    </white-space>
    <white-space>
      <jm-button @click="handleToast5">顶部toast</jm-button>
    </white-space>
    <white-space>
      <jm-button @click="handleToast6">底部toast</jm-button>
    </white-space>
    <white-space>
      有时候，我们不想要一次性弹出多个弹窗，我们可以使用单例模式，让页面只能同时出现一个弹窗，将 single
      设置为 true，同时不要在这个页面上出现 single 非 true 的弹窗实例
    </white-space>
    <white-space>
      你可以反复点击下面这个按钮进行尝试
    </white-space>
    <white-space>
      <jm-button @click="handleToast7">同时只展示一个toast</jm-button>
    </white-space>
    <white-space>
      如果你使用的是单页面路由，在toast没关闭之前跳转页面，那toast是会依旧存在的，因为toast不是挂载在路由
      切换的dom节点上，而是挂载在body上的
    </white-space>
    <white-space>
      Toast实例具有close()方法，可以手动关闭弹窗，不过你需要用一个变量保存调用toast返回的实例
    </white-space>
    <white-space>
      <jm-button @click="handleToast8">手动关闭“警告Toast”</jm-button>
    </white-space>
  </div>
</template>

<script>
export default {
  data () {
    return {
      warnToast: ''
    }
  },
  methods: {
    handleToast1 () {
      this.$toast({
        msg: '提示信息'
      })
    },
    handleToast2 () {
      this.$toast({
        msg: '操作成功',
        iconName: 'check'
      })
    },
    handleToast3 () {
      this.$toast({
        msg: '手机验证码输入错误，请重新输入',
        iconName: 'forbid'
      })
    },
    handleToast4 () {
      this.warnToast = this.$toast({
        msg: '提示信息',
        iconName: 'caveat'
      })
    },
    handleToast5 () {
      this.$toast({
        msg: '顶部信息',
        position: 'top'
      })
    },
    handleToast6 () {
      this.$toast({
        msg: '底部信息',
        position: 'bottom'
      })
    },
    handleToast7 () {
      this.$toast({
        msg: '只同时展示一个toast',
        single: true
      })
    },
    handleToast8 () {
      this.warnToast.close()
    }
  }
}
</script>
