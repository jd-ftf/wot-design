<template>
  <div class="page-center">
    <div>
      <button type="button" @click="handleToast1">纯文字toast</button>
    </div>
    <div>
      <button type="button" @click="handleToast2">成功toast</button>
    </div>
    <div>
      <button type="button" @click="handleToast3">错误toast</button>
    </div>
    <div>
      <button type="button" @click="handleToast4">警告toast</button>
    </div>
    <div>
      <button type="button" @click="handleToast5">顶部toast</button>
    </div>
    <div>
      <button type="button" @click="handleToast6">底部toast</button>
    </div>
    <div>
      <button type="button" @click="handleToast7">只同时展示一个toast</button>
    </div>
  </div>
</template>

<script>
export default {
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
      this.$toast({
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
    }
  }
}
</script>
