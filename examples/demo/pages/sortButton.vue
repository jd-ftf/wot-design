<template>
  <div>
    <demo-block title="基本用法">
      <wd-sort-button v-model="value1" title="价格"/>
    </demo-block>
    <demo-block title="双箭头状态下通过设置 allow-reset 允许重置按钮">
      <wd-sort-button v-model="value2" title="价格" allow-reset/>
    </demo-block>
  </div>
</template>
<script>
export default {
  data () {
    return {
      value1: 0,
      value2: 0,
      value3: 0,
      value4: 0,
      value5: 0
    }
  }
}
</script>
