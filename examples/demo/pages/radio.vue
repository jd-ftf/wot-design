<template>
  <div>
    <demo-block title="基本用法">
      <wd-radio-group v-model="value1">
        <wd-radio value="1">单选框1</wd-radio>
        <wd-radio value="2">单选框2</wd-radio>
      </wd-radio-group>
    </demo-block>
    <demo-block title="同行展示">
      <wd-radio-group v-model="value2" inline>
        <wd-radio value="1">单选框1</wd-radio>
        <wd-radio value="2">单选框2</wd-radio>
      </wd-radio-group>
    </demo-block>
    <demo-block title="修改形状">
      <wd-radio-group v-model="value3" shape="button">
        <wd-radio value="1">京麦</wd-radio>
        <wd-radio value="2">商家后台</wd-radio>
      </wd-radio-group>
    </demo-block>
    <demo-block title="修改选中颜色">
      <wd-radio-group v-model="value4" checked-color="#f00">
        <wd-radio value="1">京麦</wd-radio>
        <wd-radio value="2">商家后台</wd-radio>
      </wd-radio-group>
    </demo-block>
    <demo-block title="禁用">
      <wd-radio-group v-model="value5" disabled style="margin-bottom: 10px;">
        <wd-radio value="1">京麦</wd-radio>
        <wd-radio value="2">商家后台</wd-radio>
      </wd-radio-group>
      <wd-radio-group v-model="value6" shape="button" disabled>
        <wd-radio value="1">京麦</wd-radio>
        <wd-radio value="2">商家后台</wd-radio>
      </wd-radio-group>
    </demo-block>
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
