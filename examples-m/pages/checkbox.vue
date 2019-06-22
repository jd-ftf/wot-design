<template>
  <div>
    <white-space>
      <div slot="desc">基础用法</div>
      <jm-checkbox v-model="value1">单选框1</jm-checkbox>
    </white-space>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value1: true
    }
  }
}
</script>
