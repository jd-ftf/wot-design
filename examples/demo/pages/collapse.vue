<template>
  <div>
    <demo-block title="基本用法" transparent>
      <wd-collapse v-model="value1">
        <wd-collapse-item title="标签1" name="item1">这是一条简单的示例文字。</wd-collapse-item>
        <wd-collapse-item title="标签2" name="item2">这是一条简单的示例文字。</wd-collapse-item>
        <wd-collapse-item title="标签3" name="item3">这是一条简单的示例文字。</wd-collapse-item>
      </wd-collapse>
    </demo-block>
    <demo-block title="手风琴" transparent>
      <wd-collapse v-model="value2" accordion>
        <wd-collapse-item title="标签1" name="item1">这是一条简单的示例文字。</wd-collapse-item>
        <wd-collapse-item title="标签2" name="item2">这是一条简单的示例文字。</wd-collapse-item>
        <wd-collapse-item title="标签3" name="item3">这是一条简单的示例文字。</wd-collapse-item>
      </wd-collapse>
    </demo-block>
    <demo-block title="禁用某一项" transparent>
      <wd-collapse v-model="value3">
        <wd-collapse-item title="标签1" name="item1">这是一条简单的示例文字。</wd-collapse-item>
        <wd-collapse-item title="标签2" name="item2" disabled>这是一条简单的示例文字。</wd-collapse-item>
        <wd-collapse-item title="标签3" name="item3">这是一条简单的示例文字。</wd-collapse-item>
      </wd-collapse>
    </demo-block>
    <demo-block title="查看更多" transparent>
      <wd-collapse
        viewmore
        v-model="value4"
      >这是一条简单的示例文字。这是一条简单的示例文字。这是一条简单的示例文字。这是一条简单的示例文字。这是一条简单的示例文字。这是一条简单的示例文字。这是一条简单的示例文字。这是一条简单的示例文字。</wd-collapse>
    </demo-block>
    <demo-block title="查看更多自定义展开样式" transparent>
      <wd-collapse viewmore v-model="value5">
        这是一条简单的示例文字。这是一条简单的示例文字。这是一条简单的示例文字。这是一条简单的示例文字。这是一条简单的示例文字。这是一条简单的示例文字。这是一条简单的示例文字。这是一条简单的示例文字。
        <div slot="more" style="color: red;">自定义{{ value5 ? '折叠' : '展开' }}</div>
      </wd-collapse>
    </demo-block>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value1: ['item1'],
      value2: 'item1',
      value3: ['item1'],
      value4: false,
      value5: false
    }
  }
}
</script>
