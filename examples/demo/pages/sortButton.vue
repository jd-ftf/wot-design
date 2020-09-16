<template>
  <div>
    <demo-block title="基本用法">
      <wd-sort-button v-model="value1" title="价格"/>
    </demo-block>
    <demo-block title="设置 allow-reset 允许重置按钮">
      <wd-sort-button v-model="value2" title="价格" allow-reset />
    </demo-block>
    <demo-block title="设置 desc-first 优先切换为降序">
      <wd-sort-button v-model="value3" title="价格" desc-first />
    </demo-block>
  </div>
</template>
<script>
export default {
  data () {
    return {
      value1: 0,
      value2: 0,
      value3: 0
    }
  }
}
</script>
