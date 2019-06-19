<template>
  <div>
    <white-space>
      <div slot="desc">基础用法</div>
      <jm-input v-model="input1" placeholder="请输入用户名" />
    </white-space>
    <white-space>
      <div slot="desc">禁用状态 <code>disabled</code></div>
      <jm-input v-model="input2" disabled />
    </white-space>
    <white-space>
      <div slot="desc">只读状态 <code>readonly</code></div>
      <jm-input v-model="input3" readonly />
    </white-space>
    <white-space>
      <div slot="desc">清空按钮 <code>clearable</code></div>
      <jm-input v-model="input4" clearable />
    </white-space>
    <white-space>
      <div slot="desc">密码框 <code>show-password</code></div>
      <jm-input v-model="input5" clearable show-password />
    </white-space>
    <white-space>
      <div slot="desc">设置前后Icon <code>prefix-icon</code> 、 <code>suffix-icon</code> 或者设置 <code>prefix/suffix</code> 的slot</div>
      <jm-input v-model="input6" prefix-icon="jm-icon-person" suffix-icon="jm-icon-tickets" />
    </white-space>
    <white-space>
      <div slot="desc">字数限制 <code>show-word-limit</code></div>
      <jm-input v-model="input7" maxlength="20" show-word-limit />
    </white-space>
    <white-space :hor="0">
      <div slot="desc">textarea</div>
      <jm-input type="textarea" maxlength="10" ref="textarea" v-model="input8" />
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
      input4: '支持清空',
      input5: '1234',
      input6: '',
      input7: '',
      input8: '这是文本域'
    }
  }
}
</script>
