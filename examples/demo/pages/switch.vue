<template>
  <div>
    <demo-block title="基本用法">
      <wd-switch v-model="value1" />
    </demo-block>
    <demo-block title="修改值 active-value、inactive-value">
      <p>{{ value2 }}</p>
      <wd-switch v-model="value2" active-value="京麦" inactive-value="商家后台" />
    </demo-block>
    <demo-block title="自定义颜色">
      <wd-switch v-model="value3" active-color="#13ce66" inactive-color="#f00" />
    </demo-block>
    <demo-block title="修改大小">
      <wd-switch v-model="value4" size="20px" />
    </demo-block>
    <demo-block title="选中禁用">
      <wd-switch v-model="value5" disabled />
    </demo-block>
    <demo-block title="非选中禁用">
      <wd-switch v-model="value6" disabled />
    </demo-block>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value1: true,
      value2: '京麦',
      value3: true,
      value4: false,
      value5: true,
      value6: false
    }
  }
}
</script>
