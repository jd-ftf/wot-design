<template>
  <div class="page-input-number">
    <white-space>
      <div slot="desc">基本用法</div>
      <jm-input-number v-model="value1" />
    </white-space>
    <white-space>
      <div slot="desc">设置步长<code>step</code></div>
      <jm-input-number v-model="value2" :step="2" />
    </white-space>
    <white-space>
      <div slot="desc">限制最小最大值<code>min</code>、<code>max</code></div>
      <jm-input-number v-model="value3" :min="3" :max="10" />
    </white-space>
    <white-space>
      <div slot="desc">禁用<code>disabled</code></div>
      <jm-input-number v-model="value4" disabled />
    </white-space>
    <white-space>
      <div slot="desc">无输入框<code>without-input</code></div>
      <div class="flex">
        <div>数量：{{ value5 }}</div>
        <jm-input-number class="input-number-inline" v-model="value5" without-input />
      </div>
    </white-space>
    <white-space>
      <div slot="desc">设置精度<code>precision</code></div>
      <jm-input-number v-model="value6" :precision="2" :step="0.1" />
    </white-space>
    <white-space>
      <div slot="desc">输入严格为步数的倍数<code>step-strictly</code></div>
      <jm-input-number v-model="value7" step-strictly :step="2" />
    </white-space>
    <white-space>
      <div slot="desc">修改输入框宽度<code>input-width</code></div>
      <jm-input-number v-model="value8" input-width="70px" />
    </white-space>
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
      value8: 1
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
