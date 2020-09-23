<template>
  <div>
    <demo-block title="基本用法" transparent>
      <wd-drop-menu>
        <wd-drop-menu-item v-model="value1" :options="option1"></wd-drop-menu-item>
        <wd-drop-menu-item v-model="value2" :options="option2"></wd-drop-menu-item>
      </wd-drop-menu>
    </demo-block>
    <demo-block title="自定义菜单内容" transparent>
      <wd-drop-menu>
        <wd-drop-menu-item v-model="value3" :options="option1" />
        <wd-drop-menu-item title="筛选" ref="dropMenuItem">
          <div>
            <wd-cell title="标题文字" value="内容" />
            <wd-cell title="标题文字" label="描述信息" value="内容" />
            <wd-button block size="large" suck @click="confirm">主要按钮</wd-button>
          </div>
        </wd-drop-menu-item>
      </wd-drop-menu>
    </demo-block>
    <demo-block title="自定义菜单选项" transparent>
      <div style="display: flex; background: #fff; text-align: center;">
        <wd-drop-menu style="flex: 1;">
          <wd-drop-menu-item v-model="value4" :options="option1" />
        </wd-drop-menu>
        <div style="flex: 1;">
          <wd-sort-button v-model="value5" title="上架时间" />
        </div>
      </div>
    </demo-block>
    <demo-block title="向上弹出" transparent>
      <wd-drop-menu direction="up">
        <wd-drop-menu-item v-model="value6" :options="option1" />
        <wd-drop-menu-item v-model="value7" :options="option2" />
      </wd-drop-menu>
    </demo-block>
    <demo-block title="禁用" transparent>
      <wd-drop-menu>
        <wd-drop-menu-item v-model="value8" disabled :options="option1" />
        <wd-drop-menu-item v-model="value9" :options="option2" />
      </wd-drop-menu>
    </demo-block>
  </div>
</template>

<script>
export default {
  data () {
    return {
      show: false,
      value1: 1,
      value2: 0,
      value3: 0,
      value4: 0,
      value5: 0,
      value6: 0,
      value7: 0,
      value8: 0,
      value9: 0,
      option1: [
        { label: '全部商品', value: 0 },
        { label: '新款商品', value: 1, tip: '这是补充信息' },
        { label: '这是比较长的筛选条件这是比较长的筛选条件', value: 2 }
      ],
      option2: [
        { label: '综合', value: 0 },
        { label: '销量', value: 1 },
        { label: '上架时间', value: 2 }
      ],
      option3: '我是第一个选项'
    }
  },
  methods: {
    confirm () {
      this.$refs.dropMenuItem.close()
    },
    click () {
      this.value1 = '0'
    }
  }
}
</script>
