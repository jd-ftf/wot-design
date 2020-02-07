<template>
  <div>
    <white-space>
      <div slot="desc">基本用法</div>
      <wd-checkbox v-model="value1">单选框1</wd-checkbox>
    </white-space>
    <white-space>
      <div slot="desc">修改形状 shape 为 'square'</div>
      <wd-checkbox v-model="value2" shape="square">京麦</wd-checkbox>
    </white-space>
    <white-space>
      <div slot="desc">修改形状 shape 为 'button'</div>
      <wd-checkbox v-model="value3" shape="button">京麦</wd-checkbox>
    </white-space>
    <white-space>
      <div slot="desc">修改选中颜色 <code>checked-color</code></div>
      <wd-checkbox v-model="value4" checked-color="#f00">京麦</wd-checkbox>
    </white-space>
    <white-space>
      <div slot="desc">修改 <code>true-value</code> 和 <code>false-value</code> {{ value5 }}</div>
      <wd-checkbox v-model="value5" true-value="京麦" false-value="商家后台">复选框</wd-checkbox>
    </white-space>
    <white-space>
      <div slot="desc">复选框组</div>
      <wd-checkbox-group v-model="value6">
        <wd-checkbox value="jingmai">京麦</wd-checkbox>
        <wd-checkbox value="shop">商家后台</wd-checkbox>
      </wd-checkbox-group>
    </white-space>
    <white-space>
      <div slot="desc">同行展示</div>
      <wd-checkbox-group v-model="value7" inline>
        <wd-checkbox value="jingmai">京麦</wd-checkbox>
        <wd-checkbox value="shop">商家后台</wd-checkbox>
      </wd-checkbox-group>
    </white-space>
    <white-space>
      <div slot="desc">禁用状态</div>
      <wd-checkbox-group v-model="value8" disabled style="margin-bottom: 10px;">
        <wd-checkbox value="jingmai">京麦</wd-checkbox>
        <wd-checkbox value="shop">商家后台</wd-checkbox>
      </wd-checkbox-group>
      <wd-checkbox-group v-model="value9" disabled shape="square" style="margin-bottom: 10px;">
        <wd-checkbox value="jingmai">京麦</wd-checkbox>
        <wd-checkbox value="shop">商家后台</wd-checkbox>
      </wd-checkbox-group>
      <wd-checkbox-group v-model="value10" disabled shape="button">
        <wd-checkbox value="jingmai">京麦</wd-checkbox>
        <wd-checkbox value="shop">商家后台</wd-checkbox>
      </wd-checkbox-group>
    </white-space>
    <white-space>
      <div slot="desc">设置最小选中数量 <code>min</code> 为1 和最大选中数量 <code>max</code> 为3（也可以将其中一项设置为disabled，剩下3项最多选2项）</div>
      <wd-checkbox-group v-model="value11" :min="1" :max="3">
        <wd-checkbox value="jd">京东</wd-checkbox>
        <wd-checkbox value="jingmai">京麦</wd-checkbox>
        <wd-checkbox value="shop">商家后台</wd-checkbox>
        <wd-checkbox value="market">营销中心</wd-checkbox>
      </wd-checkbox-group>
    </white-space>
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
      value11: ['jd']
    }
  }
}
</script>
