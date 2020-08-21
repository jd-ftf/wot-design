<template>
  <div>
    <demo-block title="基本用法">
      <wd-radio-group v-model="value1">
        <wd-radio value="1">单选框1</wd-radio>
        <wd-radio value="2">单选框2</wd-radio>
      </wd-radio-group>
    </demo-block>
    <demo-block title="修改形状">
      <wd-radio-group v-model="value2" shape="button">
        <wd-radio value="1" max-width="30px">京麦</wd-radio>
        <wd-radio value="2">商家后台</wd-radio>
      </wd-radio-group>
    </demo-block>
    <demo-block title="表单---单选组" transparent>
      <wd-radio-group v-model="value3" cell size="large">
        <wd-radio value="1">京麦</wd-radio>
        <wd-radio value="2">商家后台</wd-radio>
      </wd-radio-group>
    </demo-block>
    <demo-block title="表单--单选按钮组" transparent>
      <wd-radio-group v-model="value4" cell shape="button">
        <wd-radio value="1">选项一</wd-radio>
        <wd-radio value="2">选项二</wd-radio>
        <wd-radio value="3">选项三</wd-radio>
        <wd-radio value="4">选项四</wd-radio>
        <wd-radio value="5">选项五</wd-radio>
        <wd-radio value="6">选项六</wd-radio>
        <wd-radio value="7">选项七</wd-radio>
      </wd-radio-group>
    </demo-block>
    <demo-block title="同行展示">
      <wd-radio-group v-model="value6" inline>
        <wd-radio value="1">单选框1</wd-radio>
        <wd-radio value="2">单选框2</wd-radio>
      </wd-radio-group>
    </demo-block>
    <demo-block title="修改选中颜色">
      <wd-radio-group v-model="value7" checked-color="#fa4350">
        <wd-radio value="1">京麦</wd-radio>
        <wd-radio value="2">商家后台</wd-radio>
      </wd-radio-group>
    </demo-block>
    <demo-block title="禁用">
      <wd-radio-group v-model="value8" disabled style="margin-bottom: 10px;">
        <wd-radio value="1">京麦</wd-radio>
        <wd-radio value="2">商家后台</wd-radio>
      </wd-radio-group>
      <wd-radio-group v-model="value9" shape="button" disabled>
        <wd-radio value="1">京麦</wd-radio>
        <wd-radio value="2">商家后台</wd-radio>
      </wd-radio-group>
    </demo-block>
    <demo-block title="大尺寸">
      <wd-radio-group v-model="value5" size="large">
        <wd-radio value="1">单选框1</wd-radio>
        <wd-radio value="2">单选框2</wd-radio>
      </wd-radio-group>
      <wd-radio-group v-model="value11" size="large" inline class="group">
        <wd-radio value="1">单选框1</wd-radio>
        <wd-radio value="2">单选框2</wd-radio>
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
      value6: '1',
      value7: '1',
      value8: '1',
      value9: '1',
      value10: '1',
      value11: '1'
    }
  }
}
</script>
<style scoped>
.group {
  margin-top: 10px;
  padding: 10px 0;
  border-top: 1px solid rgba(0, 0, 0, 0.04);
}
</style>
