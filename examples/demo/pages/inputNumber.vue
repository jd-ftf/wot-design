<template>
  <div class="page-input-number">
    <demo-block title="基本用法">
      <wd-input-number v-model="value1"/>
    </demo-block>
    <demo-block title="设置步长">
      <wd-input-number v-model="value2" :step="2" />
    </demo-block>
    <demo-block title="设置最小最大值">
      <wd-input-number v-model="value3" :min="3" :max="10" />
    </demo-block>
    <demo-block title="禁用">
      <wd-input-number v-model="value4" disabled />
    </demo-block>
    <demo-block title="无输入框">
      <div class="flex">
        <div>数量：{{ value5 }}</div>
        <wd-input-number class="input-number-inline" v-model="value5" without-input />
      </div>
    </demo-block>
    <demo-block title="设置精度">
      <wd-input-number v-model="value6" :precision="2" :step="0.1" />
    </demo-block>
    <demo-block title="输入严格为步数的倍数">
      <wd-input-number v-model="value7" step-strictly :step="2" />
    </demo-block>
    <demo-block title="修改输入框宽度">
      <wd-input-number v-model="value8" input-width="70px" />
    </demo-block>
    <demo-block title="允许空值，并设置 placeholder">
      <wd-input-number v-model="value9" allow-null placeholder="不限" input-width="70px" />
    </demo-block>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value1: 1,
      value2: 1,
      value3: 4,
      value4: 2,
      value5: 1,
      value6: '1.205',
      value7: 1,
      value8: 1,
      value9: ''
    }
  }
}
</script>

<style lang="scss">
.page-input-number {
  .flex {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
