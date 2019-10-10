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
    <space title="加载中">
      <jm-picker-view :columns="columns1" loading />
    </space>
    <space title="多列">
      <jm-picker-view :columns="columns3" />
    </space>
    <space title="多列联动">
      <jm-picker-view :columns="columns4" @change="onChangeDistrict" />
    </space>
  </div>
</template>

<script>
const district = {
  '0': [{ text: '北京', id: '110000' }, { text: '广东省', id: '440000' }],
  '110000': [{ text: '北京', id: '110100' }],
  '440000': [{ text: '广州市', id: '440100' }, { text: '深圳市', id: '440300' }],
  '110100': [{ text: '东城区', id: '110101' }, { text: '西城区', id: '110102' }],
  '440100': [{ text: '荔湾区', id: '440103' }, { text: '越秀区', id: '440104' }],
  '440300': [{ text: '罗湖区', id: '440303' }, { text: '福田区', id: '440304' }]
}

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
      ],
      columns3: [
        {
          values: ['中山大学', '中南大学', '华南理工大学'],
          defaultIndex: 1
        }, {
          values: ['计算机科学与技术', '软件工程', '通信工程', '法学', '经济学'],
          defaultIndex: 2
        }
      ],
      columns4: [
        {
          values: district[0]
        }, {
          values: district[district[0][0].id]
        }, {
          values: district[district[district[0][0].id][0].id]
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
    },
    onChangeDistrict (picker, values, columnIndex) {
      if (columnIndex === 0) {
        picker.setColumnValues(1, district[values[columnIndex].id])
        picker.setColumnIndex(1, 0)
        picker.setColumnValues(2, district[district[values[columnIndex].id][0].id])
        picker.setColumnIndex(2, 0)
        return
      }
      if (columnIndex === 1) {
        picker.setColumnValues(2, district[values[columnIndex].id])
        picker.setColumnIndex(2, 0)
      }
    }
  }
}
</script>
