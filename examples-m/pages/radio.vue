<template>
  <div>
    <white-space>
      <div slot="desc">基础用法</div>
      <jm-radio-group v-model="radio1">
        <jm-radio value="1">单选框1</jm-radio>
        <jm-radio value="2">单选框2</jm-radio>
      </jm-radio-group>
    </white-space>
    <white-space>
      <div slot="desc">修改形状(在radioGroup上设置) <code>shape</code> 为 <code>'dot'</code></div>
      <jm-radio-group v-model="radio2" shape="dot">
        <jm-radio value="1">京麦</jm-radio>
        <jm-radio value="2">商家后台</jm-radio>
      </jm-radio-group>
    </white-space>
    <white-space>
      <div slot="desc">修改形状(在radioGroup上设置) <code>shape</code> 为 <code>'square'</code></div>
      <jm-radio-group v-model="radio3" shape="button">
        <jm-radio value="1">京麦</jm-radio>
        <jm-radio value="2">商家后台</jm-radio>
      </jm-radio-group>
    </white-space>
    <white-space>
      <div slot="desc">修改单个形状(在radio上设置) <code>shape</code> 为 <code>'square'</code></div>
      <jm-radio-group v-model="radio4">
        <jm-radio value="1" shape="dot">京麦</jm-radio>
        <jm-radio value="2">商家后台</jm-radio>
      </jm-radio-group>
    </white-space>
    <white-space>
      <div slot="desc">修改选中颜色 <code>checked-color</code></div>
      <jm-radio-group v-model="radio5" checked-color="#f00">
        <jm-radio value="1">京麦</jm-radio>
        <jm-radio value="2">商家后台</jm-radio>
      </jm-radio-group>
    </white-space>
    <white-space>
      <div slot="desc">禁用 <code>disabled</code></div>
      <jm-radio-group v-model="radio6" disabled>
        <jm-radio value="1">京麦</jm-radio>
        <jm-radio value="2">商家后台</jm-radio>
      </jm-radio-group>
      <jm-radio-group v-model="radio7" shape="dot" disabled>
        <jm-radio value="1">京麦</jm-radio>
        <jm-radio value="2">商家后台</jm-radio>
      </jm-radio-group>
      <jm-radio-group v-model="radio8" shape="button" disabled>
        <jm-radio value="1">京麦</jm-radio>
        <jm-radio value="2">商家后台</jm-radio>
      </jm-radio-group>
    </white-space>
  </div>
</template>

<script>
export default {
  data () {
    return {
      radio1: '1',
      radio2: '1',
      radio3: '1',
      radio4: '1',
      radio5: '1',
      radio6: '1',
      radio7: '1',
      radio8: '1'
    }
  }
}
</script>
