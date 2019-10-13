<template>
  <div style="margin: 20px 0">
    <jm-picker :columns="columns1" label="单列选项" v-model="value1" />
  </div>
</template>

<script>
export default {
  data () {
    return {
      columns1: ['选项1', '选项2', '选项3', '选项4', '选项5', '选项6', '选项7'],
      value1: '选项1'
    }
  }
}
</script>
