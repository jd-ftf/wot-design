<template>
  <div>
    <white-space title="基本用法">
      <wd-sort-button v-model="value1" title="价格"/>
    </white-space>

    <white-space title="双箭头状态下通过设置 allow-reset 允许重置按钮">
      <wd-sort-button v-model="value2" title="价格" allow-reset/>
    </white-space>

    <white-space title="通过设置 one-arrow 仅展示单箭头">
      <wd-sort-button v-model="value3" title="价格" one-arrow/>
    </white-space>

    <white-space title="修改选中颜色">
      <wd-sort-button v-model="value4" title="价格" color="#00c740"/>
    </white-space>

    <white-space title="修改文案选中颜色">
      <wd-sort-button
        v-model="value5"
        allow-reset
        title="价格"
        color="#00c740"
        title-color="#ff0000"
      />
    </white-space>
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
