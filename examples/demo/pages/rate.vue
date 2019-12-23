<template>
  <div>
    <white-space>
      <div slot="desc">基本用法</div>
      <jm-rate v-model="rate1" />
    </white-space>
    <white-space>
      <div slot="desc">只读状态 <code>readonly</code></div>
      <jm-rate v-model="rate2" readonly />
    </white-space>
    <white-space>
      <div slot="desc">禁用状态 <code>disabled</code></div>
      <jm-rate v-model="rate3" disabled />
    </white-space>
    <white-space>
      <div slot="desc">修改选中颜色 <code>active-color</code></div>
      <jm-rate v-model="rate4" active-color="#FFAE16" />
    </white-space>
    <white-space>
      <div slot="desc">修改icon和选中颜色 <code>active-icon</code>、<code>active-color</code></div>
      <jm-rate v-model="rate5" icon="jm-icon-good" active-icon="jm-icon-good" active-color="#0083ff" />
    </white-space>
  </div>
</template>

<script>
export default {
  data () {
    return {
      rate1: 5,
      rate2: 3,
      rate3: 2,
      rate4: 3.5,
      rate5: 1
    }
  }
}
</script>
