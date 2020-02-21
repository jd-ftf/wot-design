<template>
  <div>
    <demo-block title="基本用法">
      <wd-slider v-model="value1"  />
    </demo-block>
    <demo-block title="双向滑块">
      <wd-slider v-model="value2" />
    </demo-block>
    <demo-block title="设置最大最小值">
      <wd-slider v-model="value3" :min="4" :max="677" />
    </demo-block>
    <demo-block title="设置步长">
      <wd-slider v-model="value4" :step="10" />
    </demo-block>
    <demo-block title="隐藏滑块值">
      <wd-slider v-model="value5" hide-label />
    </demo-block>
    <demo-block title="隐藏最大最小值">
      <wd-slider v-model="value6" hide-min-max />
    </demo-block>
    <demo-block title="禁用">
      <wd-slider v-model="value7" disabled />
    </demo-block>
  </div>
</template>

<script>
export default {
  data () {
    return {
      sliderDisable: false,
      colorValue: 255,
      value1: 30,
      value2: [20, 40],
      value3: 479,
      value4: 40,
      value5: 50,
      value6: 40,
      value7: 70
    }
  }
}
</script>
