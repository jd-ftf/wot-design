<template>
  <div>
    <white-space>
      <template #desc>
        <div>基本用法</div>
      </template>
      <jm-input-number v-model="value1" />
    </white-space>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value1: 0
    }
  }
}
</script>
