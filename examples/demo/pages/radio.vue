<template>
  <div>
    <white-space>
      <div slot="desc">基本用法</div>
      <wd-radio-group v-model="value1">
        <wd-radio value="1">单选框1</wd-radio>
        <wd-radio value="2">单选框2</wd-radio>
      </wd-radio-group>
    </white-space>
    <white-space>
      <div slot="desc">同行展示</div>
      <wd-radio-group v-model="value2" inline>
        <wd-radio value="1">单选框1</wd-radio>
        <wd-radio value="2">单选框2</wd-radio>
      </wd-radio-group>
    </white-space>
    <white-space>
      <div slot="desc">修改形状(在radioGroup上设置) <code>shape</code> 为 <code>'button'</code></div>
      <wd-radio-group v-model="value3" shape="button">
        <wd-radio value="1">京麦</wd-radio>
        <wd-radio value="2">商家后台</wd-radio>
      </wd-radio-group>
    </white-space>
    <white-space>
      <div slot="desc">修改选中颜色 <code>checked-color</code></div>
      <wd-radio-group v-model="value4" checked-color="#f00">
        <wd-radio value="1">京麦</wd-radio>
        <wd-radio value="2">商家后台</wd-radio>
      </wd-radio-group>
    </white-space>
    <white-space>
      <div slot="desc">禁用 <code>disabled</code></div>
      <wd-radio-group v-model="value5" disabled>
        <wd-radio value="1">京麦</wd-radio>
        <wd-radio value="2">商家后台</wd-radio>
      </wd-radio-group>
      <wd-radio-group v-model="value6" shape="button" disabled>
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
      value1: '1',
      value2: '1',
      value3: '1',
      value4: '1',
      value5: '1',
      value6: '1'
    }
  }
}
</script>
