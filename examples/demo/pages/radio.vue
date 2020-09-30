<template>
  <div>
    <demo-block title="基本用法">
      <wd-radio-group v-model="value1">
        <wd-radio value="1">单选框1</wd-radio>
        <wd-radio value="2">单选框2</wd-radio>
      </wd-radio-group>
    </demo-block>
    <demo-block title="修改形状--button">
      <wd-radio-group v-model="value2" shape="button">
        <wd-radio value="1">京麦</wd-radio>
        <wd-radio value="2">商家后台</wd-radio>
      </wd-radio-group>
    </demo-block>
    <demo-block title="修改形状--dot">
      <wd-radio-group v-model="value3" shape="dot">
        <wd-radio value="1">京麦</wd-radio>
        <wd-radio value="2">商家后台</wd-radio>
      </wd-radio-group>
    </demo-block>
    <demo-block title="表单---单选组" transparent>
      <wd-radio-group v-model="value4" cell size="large">
        <wd-radio value="1">京麦</wd-radio>
        <wd-radio value="2">商家后台</wd-radio>
      </wd-radio-group>
    </demo-block>
    <demo-block title="表单--单选按钮组" transparent>
      <wd-radio-group v-model="value6" cell shape="button">
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
      <wd-radio-group v-model="value7" inline>
        <wd-radio value="1">单选框1</wd-radio>
        <wd-radio value="2">单选框2</wd-radio>
      </wd-radio-group>
      <wd-radio-group v-model="value8" inline shape="dot" class="group">
        <wd-radio value="1">单选框1</wd-radio>
        <wd-radio value="2">单选框2</wd-radio>
      </wd-radio-group>
    </demo-block>
    <demo-block title="修改选中颜色">
      <wd-radio-group v-model="value9" checked-color="#fa4350">
        <wd-radio value="1">京麦</wd-radio>
        <wd-radio value="2">商家后台</wd-radio>
      </wd-radio-group>
    </demo-block>
    <demo-block title="禁用">
      <wd-radio-group v-model="value10" disabled>
        <wd-radio value="1">京麦</wd-radio>
        <wd-radio value="2">商家后台</wd-radio>
      </wd-radio-group>
      <wd-radio-group v-model="value11" shape="dot" disabled class="group">
        <wd-radio value="1">京麦</wd-radio>
        <wd-radio value="2">商家后台</wd-radio>
      </wd-radio-group>
      <wd-radio-group v-model="value12" shape="button" disabled class="group">
        <wd-radio value="1">京麦</wd-radio>
        <wd-radio value="2">商家后台</wd-radio>
      </wd-radio-group>
    </demo-block>
    <demo-block title="大尺寸">
      <wd-radio-group v-model="value13" size="large">
        <wd-radio value="1">单选框1</wd-radio>
        <wd-radio value="2">单选框2</wd-radio>
      </wd-radio-group>
      <wd-radio-group v-model="value14" size="large" shape="dot" class="group">
        <wd-radio value="1">单选框1</wd-radio>
        <wd-radio value="2">单选框2</wd-radio>
      </wd-radio-group>
      <wd-radio-group v-model="value15" size="large" inline class="group">
        <wd-radio value="1">单选框1</wd-radio>
        <wd-radio value="2">单选框2</wd-radio>
      </wd-radio-group>
      <wd-radio-group
        v-model="value16"
        size="large"
        shape="button"
        class="group"
      >
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
      value11: '1',
      value13: '1',
      value14: '1',
      value15: '1',
      value16: '1',
      value17: '1',
      value12: '1'
    }
  }
}
</script>
<style scoped>
.group {
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid rgba(0, 0, 0, 0.04);
}
</style>
