<template>
  <div style="margin: 20px 0">
    <jm-datetime-picker v-model="value1" label="日期选择" />
  </div>
</template>

<script>
export default {
  data () {
    return {
      value1: new Date()
    }
  }
}
</script>
