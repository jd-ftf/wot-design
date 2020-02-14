<template>
  <div>
    <space title="基本用法">
      <wd-drop-menu>
        <wd-drop-menu-item value="0" :options="option1"></wd-drop-menu-item>
        <wd-drop-menu-item value="1" :options="option2"></wd-drop-menu-item>
      </wd-drop-menu>
    </space>
    <space title="外部控制">
      <wd-drop-menu>
        <wd-drop-menu-item v-model="value1" :options="option1"></wd-drop-menu-item>
        <wd-drop-menu-item v-model="value2" :options="option2"></wd-drop-menu-item>
      </wd-drop-menu>
      <wd-button
        @click="click"
        type="primary"
        size="small"
        style="margin: 10px;display: block;"
      >选中第一个</wd-button>
    </space>
    <space title="自定义菜单内容">
      <wd-drop-menu>
        <wd-drop-menu-item value="0" :options="option1" />
        <wd-drop-menu-item options="筛选" ref="dropMenu">
          <div slot="custom">
            <wd-cell title="标题文字" value="内容" />
            <wd-cell title="标题文字" label="描述信息" value="内容" />
            <wd-button type="primary" block size="large" suck @click="confirm">主要按钮</wd-button>
          </div>
        </wd-drop-menu-item>
      </wd-drop-menu>
    </space>
    <space title="自定义菜单选项">
      <wd-drop-menu>
        <wd-drop-menu-item value="0" :options="option1" />
        <div slot="menu" style="line-height: 14px;">
          <wd-sort-button v-model="value3" title="价格" />
        </div>
      </wd-drop-menu>
    </space>
    <space title="自定义激活颜色">
      <wd-drop-menu active-color="red">
        <wd-drop-menu-item value="0" :options="option1" />
        <wd-drop-menu-item value="1" :options="option2" />
        <wd-drop-menu-item value="2" :options="option1" />
      </wd-drop-menu>
    </space>
    <space title="向上弹出">
      <wd-drop-menu direction="up">
        <wd-drop-menu-item value="0" :options="option1" />
        <wd-drop-menu-item value="1" :options="option2" />
      </wd-drop-menu>
    </space>
    <space title="禁用">
      <wd-drop-menu direction="up">
        <wd-drop-menu-item value="0" disabled :options="option1" />
        <wd-drop-menu-item value="1" :options="option2" />
      </wd-drop-menu>
    </space>
  </div>
</template>

<script>
export default {
  data () {
    return {
      show: false,
      value1: '2',
      value2: '0',
      value3: 0,
      option1: [
        { text: '全部商品', value: '0' },
        { text: '新款商品', value: '1' },
        { text: '活动商品', value: '2' }
      ],
      option2: [
        { text: '综合', value: '0' },
        { text: '销量', value: '1' },
        { text: '上架时间', value: '2' }
      ],
      option3: '我是第一个选项'
    }
  },
  methods: {
    confirm () {
      this.$refs.dropMenu.close()
    },
    click () {
      this.value1 = '0'
    }
  }
}
</script>
