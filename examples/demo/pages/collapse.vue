<template>
  <div>
    <space title="基本用法">
      <wd-collapse v-model="value1">
        <wd-collapse-item title="标签1" name="item1">
          这是一条简单的示例文字。
        </wd-collapse-item>
        <wd-collapse-item title="标签2" name="item2">
          这是一条简单的示例文字。
        </wd-collapse-item>
        <wd-collapse-item title="标签3" name="item3">
          这是一条简单的示例文字。
        </wd-collapse-item>
      </wd-collapse>
    </space>
    <space title="手风琴">
      <wd-collapse v-model="value2" accordion>
        <wd-collapse-item title="标签1" name="item1">
          这是一条简单的示例文字。
        </wd-collapse-item>
        <wd-collapse-item title="标签2" name="item2">
          这是一条简单的示例文字。
        </wd-collapse-item>
        <wd-collapse-item title="标签3" name="item3">
          这是一条简单的示例文字。
        </wd-collapse-item>
      </wd-collapse>
    </space>
    <space title="禁用某一项">
      <wd-collapse v-model="value3">
        <wd-collapse-item title="标签1" name="item1">
          这是一条简单的示例文字。
        </wd-collapse-item>
        <wd-collapse-item title="标签2" name="item2" disabled>
          这是一条简单的示例文字。
        </wd-collapse-item>
        <wd-collapse-item title="标签3" name="item3">
          这是一条简单的示例文字。
        </wd-collapse-item>
      </wd-collapse>
    </space>
    <space title="查看更多">
      <wd-collapse viewmore v-model="value4">
        这是一条简单的示例文字。这是一条简单的示例文字。这是一条简单的示例文字。这是一条简单的示例文字。这是一条简单的示例文字。这是一条简单的示例文字。这是一条简单的示例文字。这是一条简单的示例文字。
      </wd-collapse>
    </space>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value1: [ 'item1' ],
      value2: 'item1',
      value3: [ 'item1' ],
      value4: false
    }
  }
}
</script>
