<template>
  <div>
    <demo-block title="基本用法" transparent>
      <wd-search v-model="search1" @search="handleSearch" @cancel="handleCancel" @clear="handleClear" />
    </demo-block>
    <demo-block title="白色输入框" transparent>
      <wd-search v-model="search2" light />
    </demo-block>
    <demo-block title="搜索占位符居左" transparent>
      <wd-search v-model="search3" placeholder-left />
    </demo-block>
    <demo-block title="禁用且隐藏取消按钮" transparent>
      <wd-search v-model="search4" hide-cancel disabled />
    </demo-block>
    <demo-block title="自定义" transparent>
      <wd-search v-model="search5" placeholder="请输入订单号/订单名称" cancel-txt="搜索" />
    </demo-block>
  </div>
</template>

<script>
export default {
  data () {
    return {
      search1: '',
      search2: '',
      search3: '',
      search4: '',
      search5: '',
      search6: ''
    }
  },
  methods: {
    handleSearch (val) {
      this.$toast(`搜索：${val}`)
    },
    handleCancel () {
      this.$toast('点击了取消按钮')
    },
    handleClear () {
      this.$toast('点击了清除按钮')
    }
  }
}
</script>
