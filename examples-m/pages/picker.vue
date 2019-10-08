<template>
  <div>
    <space title="基本用法">
      <jm-picker :columns="columns" :default-index="2" />
    </space>
  </div>
</template>

<script>
export default {
  data () {
    return {
      columns: ['选项1', '选项2', '选项3', '选项4', '选项5']
    }
  }
}
</script>
