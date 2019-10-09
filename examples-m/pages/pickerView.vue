<template>
  <div>
    <space title="基本用法">
      <jm-picker-view :columns="columns1" @change="onChange" />
    </space>
    <space title="设置默认选中项">
      <jm-picker-view :columns="columns1" :default-index="3" />
    </space>
    <space title="展示工具栏">
      <jm-picker-view :columns="columns1" show-toolbar @cancel="onCancel" @confirm="onConfirm" />
    </space>
    <space title="禁用">
      <jm-picker-view :columns="columns2" />
    </space>
  </div>
</template>

<script>
export default {
  data () {
    return {
      columns1: ['选项1', '选项2', '选项3', '选项4', '选项5', '选项6', '选项7'],
      columns2: [
        {
          text: '选项1'
        }, {
          text: '选项2'
        }, {
          text: '选项3',
          disabled: true
        }, {
          text: '选项4'
        }, {
          text: '选项5'
        }, {
          text: '选项6'
        }, {
          text: '选项7'
        }
      ]
    }
  },
  methods: {
    onChange (picker, value, index) {
      this.$toast(`当前选中项: ${value}, 下标: ${index}`)
    },
    onCancel () {
      this.$toast('点击了取消')
    },
    onConfirm (picker, value, index) {
      this.$toast(`点击了完成，当前选中项: ${value}, 下标: ${index}`)
    }
  }
}
</script>
