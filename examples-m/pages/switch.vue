<template>
  <div>
    <white-space>
      <div slot="desc">基本用法</div>
      <jm-switch v-model="value1" />
    </white-space>
    <white-space>
      <div slot="desc">修改值 <code>active-value</code>、<code>inactive-value</code></div>
      <p>{{ value2 }}</p>
      <jm-switch v-model="value2" active-value="京麦" inactive-value="商家后台" />
    </white-space>
    <white-space>
      <div slot="desc">自定义颜色 <code>active-color</code>、<code>inactive-color</code></div>
      <jm-switch v-model="value3" active-color="#13ce66" inactive-color="#f00" />
    </white-space>
    <white-space>
      <div slot="desc">修改大小 <code>size</code></div>
      <jm-switch v-model="value4" size="20px" />
    </white-space>
    <white-space>
      <div slot="desc">禁用 <code>disabled</code></div>
      <jm-switch v-model="value5" disabled />
    </white-space>
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
      value5: true
    }
  }
}
</script>
