<template>
  <div>
    <white-space>
      <div slot="desc">基础用法</div>
      <jm-radio-group v-model="radio1">
        <jm-radio value="1">单选框1</jm-radio>
        <jm-radio value="2">单选框2</jm-radio>
      </jm-radio-group>
    </white-space>
  </div>
</template>

<script>
export default {
  data () {
    return {
      radio1: '1'
    }
  }
}
</script>
