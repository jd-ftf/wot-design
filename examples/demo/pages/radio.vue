<template>
  <div>
    <white-space>
      <div slot="desc">基本用法</div>
      <wd-radio-group v-model="radio1">
        <wd-radio value="1">单选框1</wd-radio>
        <wd-radio value="2">单选框2</wd-radio>
      </wd-radio-group>
    </white-space>
    <white-space>
      <div slot="desc">修改形状(在radioGroup上设置) <code>shape</code> 为 <code>'button'</code></div>
      <wd-radio-group v-model="radio2" shape="button">
        <wd-radio value="1">京麦</wd-radio>
        <wd-radio value="2">商家后台</wd-radio>
      </wd-radio-group>
    </white-space>
    <white-space>
      <div slot="desc">修改选中颜色 <code>checked-color</code></div>
      <wd-radio-group v-model="radio3" checked-color="#f00">
        <wd-radio value="1">京麦</wd-radio>
        <wd-radio value="2">商家后台</wd-radio>
      </wd-radio-group>
    </white-space>
    <white-space>
      <div slot="desc">禁用 <code>disabled</code></div>
      <wd-radio-group v-model="radio4" disabled>
        <wd-radio value="1">京麦</wd-radio>
        <wd-radio value="2">商家后台</wd-radio>
      </wd-radio-group>
      <wd-radio-group v-model="radio5" shape="button" disabled>
        <wd-radio value="1">京麦</wd-radio>
        <wd-radio value="2">商家后台</wd-radio>
      </wd-radio-group>
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
      radio5: '1'
    }
  }
}
</script>
