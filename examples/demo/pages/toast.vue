<template>
  <div class="page-toast">
    <demo-block title="基本用法">
      <wd-button type="primary" @click="handleToast1">toast</wd-button>
    </demo-block>
    <demo-block title="类型toast">
      <wd-button type="primary" @click="handleToast2">成功toast</wd-button>
      <wd-button type="primary" @click="handleToast3">错误toast</wd-button>
      <wd-button type="primary" @click="handleToast4">警告toast</wd-button>
    </demo-block>
    <demo-block title="提示位置">
      <wd-button type="primary" @click="handleToast5">顶部toast</wd-button>
      <wd-button type="primary" @click="handleToast6">底部toast</wd-button>
    </demo-block>
    <demo-block title="loading">
      <wd-button type="primary" @click="handleToast7">Loading加载</wd-button>
       <wd-button type="primary" @click="handleToast8">Spinner类型loading</wd-button>
    </demo-block>
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
      this.$toast.success('操作成功')
    },
    handleToast3 () {
      this.$toast.error('手机验证码输入错误，请重新输入')
    },
    handleToast4 () {
      this.$toast.warning('提示信息')
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
      this.$toast.loading('3s后调用close关闭')
      setTimeout(() => {
        this.$toast.close()
      }, 3000)
    },
    handleToast8 () {
      this.$toast.loading({
        msg: '3s后调用close关闭',
        loadingType: 'spinner'
      })
      setTimeout(() => {
        this.$toast.close()
      }, 3000)
    }
  }
}
</script>

<style lang="scss">
.page-toast {
  .wd-button {
    margin: 0 10px 10px 0;
  }
}
</style>
