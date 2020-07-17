<template>
  <div>
    <demo-block title="基本用法">
      <wd-checkbox v-model="value1">京麦</wd-checkbox>
    </demo-block>
    <demo-block title="修改形状: square">
      <wd-checkbox v-model="value2" shape="square">京麦</wd-checkbox>
    </demo-block>
    <demo-block title="修改形状: button">
      <wd-checkbox v-model="value3" shape="button">京麦</wd-checkbox>
    </demo-block>
    <demo-block title="修改选中颜色">
      <wd-checkbox v-model="value4" checked-color="#34d19d">京麦</wd-checkbox>
    </demo-block>
    <demo-block title="禁用状态">
      <wd-checkbox-group v-model="value8" disabled style="margin-bottom: 10px;">
        <wd-checkbox value="jingmai">京麦</wd-checkbox>
        <wd-checkbox value="shop" :disabled="false">商家后台</wd-checkbox>
      </wd-checkbox-group>
      <wd-checkbox-group v-model="value9" disabled shape="square" style="margin-bottom: 10px;">
        <wd-checkbox value="jingmai">京麦</wd-checkbox>
        <wd-checkbox value="shop">商家后台</wd-checkbox>
      </wd-checkbox-group>
      <wd-checkbox-group v-model="value10" disabled shape="button">
        <wd-checkbox value="jingmai">京麦</wd-checkbox>
        <wd-checkbox value="shop">商家后台</wd-checkbox>
      </wd-checkbox-group>
    </demo-block>
    <demo-block :title="'修改 true-value 和 false-value ' + value5">
      <wd-checkbox v-model="value5" true-value="京麦" false-value="商家后台">复选框</wd-checkbox>
    </demo-block>
    <demo-block title="同行展示">
      <wd-checkbox-group v-model="value7" inline>
        <wd-checkbox value="jingmai">京麦</wd-checkbox>
        <wd-checkbox value="shop">商家后台</wd-checkbox>
      </wd-checkbox-group>
    </demo-block>
    <demo-block title="复选框组">
      <wd-checkbox-group v-model="value13">
        <wd-checkbox value="jingmai">京麦</wd-checkbox>
        <wd-checkbox value="shop">商家后台</wd-checkbox>
      </wd-checkbox-group>
    </demo-block>
    <demo-block title="表单模式---复选框组" transparent>
      <wd-checkbox-group v-model="value6" cell>
        <wd-checkbox value="jingmai">京麦</wd-checkbox>
        <wd-checkbox value="shop">商家后台</wd-checkbox>
      </wd-checkbox-group>
    </demo-block>
    <demo-block title="表单模式---复选按钮组" transparent>
      <wd-checkbox-group v-model="value12" shape="button" cell>
        <wd-checkbox value="1" disabled>选项一</wd-checkbox>
        <wd-checkbox value="2">选项二</wd-checkbox>
        <wd-checkbox value="3">选项三</wd-checkbox>
        <wd-checkbox value="4">选项四</wd-checkbox>
        <wd-checkbox value="5">选项五</wd-checkbox>
        <wd-checkbox value="6">选项六</wd-checkbox>
        <wd-checkbox value="7">选项七</wd-checkbox>
      </wd-checkbox-group>
    </demo-block>
    <demo-block title="设置最小选中数量和最大选中数量" transparent>
      <wd-checkbox-group v-model="value11" :min="1" :max="3" cell>
        <wd-checkbox value="jd">京东</wd-checkbox>
        <wd-checkbox value="jingmai">京麦</wd-checkbox>
        <wd-checkbox value="shop">商家后台</wd-checkbox>
        <wd-checkbox value="market">营销中心</wd-checkbox>
      </wd-checkbox-group>
    </demo-block>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value1: true,
      value2: true,
      value3: true,
      value4: true,
      value5: '京麦',
      value6: ['jingmai'],
      value7: ['jingmai'],
      value8: ['jingmai'],
      value9: ['jingmai'],
      value10: ['jingmai'],
      value11: ['jd'],
      value12: ['1'],
      value13: ['jd']
    }
  }
}
</script>
