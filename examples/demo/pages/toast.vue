<template>
  <div class="page-toast">
    <demo-block title="基本用法">
      <wd-button @click="handleToast1">toast</wd-button>
      <wd-button @click="handleToast9">长文案</wd-button>
    </demo-block>
    <demo-block title="类型toast">
      <wd-button @click="handleToast2">成功toast</wd-button>
      <wd-button @click="handleToast3">错误toast</wd-button>
      <wd-button @click="handleToast4">警告toast</wd-button>
      <wd-button @click="handleToast11">常规toast</wd-button>
    </demo-block>
    <demo-block title="提示位置">
      <wd-button @click="handleToast5">顶部toast</wd-button>
      <wd-button @click="handleToast6">底部toast</wd-button>
    </demo-block>
    <demo-block title="onClose 关闭回调">
      <wd-button @click="handleToast10">onClose 回调</wd-button>
    </demo-block>
    <demo-block title="loading">
      <wd-button @click="handleToast7">Loading加载</wd-button>
      <wd-button @click="handleToast8">Ring类型loading</wd-button>
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
        msg: '提示信息',
        onClose: () => {
          console.log(1)
        }
      })
    },
    handleToast2 () {
      this.$toast.success('操作成功')
    },
    handleToast3 () {
      this.$toast.error('错误提示')
    },
    handleToast4 () {
      this.$toast.warning('警告信息')
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
        loadingType: 'ring',
        loadingColor: '#ffffff'
      })
      setTimeout(() => {
        this.$toast.close()
      }, 3000)
    },
    handleToast9 () {
      this.$toast('这是一段很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长的文案')
    },
    handleToast10 () {
      this.$toast({
      msg: 'onClose 关闭回调',
      onClose: () => {
        this.$toast('已关闭')
      }
    })
    },
    handleToast11 () {
      this.$toast.info('常规提示常规提示')
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
