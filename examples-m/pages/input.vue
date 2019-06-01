<template>
  <div>
    <white-space>
      <div slot="desc">基础用法</div>
      <jm-input v-model="input1" placeholder="请输入用户名" />
    </white-space>
    <white-space>
      <div slot="desc">禁用状态</div>
      <jm-input v-model="input2" disabled />
    </white-space>
    <white-space>
      <div slot="desc">只读状态</div>
      <jm-input v-model="input3" readonly />
    </white-space>
    <white-space>
      <div slot="desc">清空按钮</div>
      <jm-input v-model="input4" clearable />
    </white-space>
  </div>
</template>

<script>
export default {
  data () {
    return {
      input1: '',
      input2: '这是禁用状态',
      input3: '这是只读状态',
      input4: '支持清空'
    }
  }
}
</script>
