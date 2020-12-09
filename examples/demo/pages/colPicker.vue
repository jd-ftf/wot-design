<template>
  <div class="page-col-picker">
    <wd-cell-group border style="margin: 20px 0">
      <wd-col-picker label="选择地址" v-model="value1" :columns="areaData1" :column-change="columnChange1" />
      <wd-col-picker label="初始选项" v-model="value2" :columns="areaData2" :column-change="columnChange3" auto-complete />
      <wd-col-picker label="禁用" disabled v-model="value3" :columns="areaData3" :column-change="columnChange1" />
      <wd-col-picker label="只读" readonly v-model="value3" :columns="areaData3" :column-change="columnChange1" />
      <wd-col-picker label="禁用选项" v-model="value4" :columns="areaData4" :column-change="columnChange1" />
      <wd-col-picker label="选项提示信息" v-model="value5" :columns="areaData5" :column-change="columnChange1" />
      <wd-col-picker label="展示格式化" v-model="value6" :columns="areaData3" :column-change="columnChange1" :display-format="displayFormat" />
      <wd-col-picker label="标题" v-model="value7" title="选择地址" :columns="areaData1" :column-change="columnChange1" />
      <wd-col-picker label="before-confirm" v-model="value8" :columns="areaData1" :column-change="columnChange1" :before-confirm="beforeConfirm" />
      <wd-col-picker label="错误" error v-model="value9" :columns="areaData1" :column-change="columnChange1" />
      <wd-col-picker label="必填" required v-model="value10" :columns="areaData1" :column-change="columnChange1" />
    </wd-cell-group>
    <demo-block title="一般column-change是个异步获取数据的操作，触发column-change组件会有默认loading，数据响应后关闭loading" transparent>
      <wd-col-picker label="选择地址" v-model="value11" :columns="areaData1" :column-change="columnChange2" />
    </demo-block>
    <demo-block title="label不传" transparent>
      <wd-col-picker v-model="value12" :columns="areaData1" :column-change="columnChange1" />
    </demo-block>
    <demo-block title="大小" transparent>
      <wd-col-picker label="选择地址" v-model="value13" size="large" :columns="areaData1" :column-change="columnChange1" />
    </demo-block>
    <demo-block title="值靠右展示" transparent>
      <wd-col-picker label="选择地址" align-right v-model="value14" :columns="areaData1" :column-change="columnChange1" />
    </demo-block>
    <demo-block title="自定义选择器" transparent>
      <div style="margin-left: 15px;">
        <div style="margin-bottom: 10px;">当前选中项: {{ displayValue }}</div>
        <wd-col-picker v-model="value15" :columns="areaData1" :column-change="columnChange1" style="display: inline-block;" @confirm="handleConfirm">
          <wd-button>选择地址</wd-button>
        </wd-col-picker>
      </div>
    </demo-block>
  </div>
</template>

<script>
import areaData from 'china-area-data'

export default {
  data () {
    return {
      value1: [],
      value2: ['150000', '150100', '150121'],
      value3: ['130000', '130200', '130204'],
      value4: [],
      value5: [],
      value6: ['130000', '130200', '130204'],
      value7: [],
      value8: [],
      value9: [],
      value10: [],
      value11: [],
      value12: [],
      value13: [],
      value14: [],
      value15: [],
      displayValue: '',
      areaData1: [Object.keys(areaData[86]).map(key => {
        return {
          value: key,
          label: areaData[86][key]
        }
      })],
      areaData2: [],
      areaData3: [Object.keys(areaData[86]).map(key => {
        return {
          value: key,
          label: areaData[86][key]
        }
      }), Object.keys(areaData[130000]).map(key => {
        return {
          value: key,
          label: areaData[130000][key]
        }
      }), Object.keys(areaData[130200]).map(key => {
        return {
          value: key,
          label: areaData[130200][key]
        }
      })],
      areaData4: [Object.keys(areaData[86]).map(key => {
        return {
          value: key,
          label: areaData[86][key],
          disabled: key === '140000'
        }
      })],
      areaData5: [Object.keys(areaData[86]).map(key => {
        return {
          value: key,
          label: areaData[86][key],
          disabled: key === '140000',
          tip: key === '140000' ? '该地区无货，暂时无法选择' : (key === '150000' ? '该地区配送时间可能较长' : '')
        }
      })],
      columnChange1 ({ selectedItem, resolve, finish }) {
        if (areaData[selectedItem.value]) {
          resolve(Object.keys(areaData[selectedItem.value]).map(key => {
            return {
              value: key,
              label: areaData[selectedItem.value][key]
            }
          }))
        } else {
          finish()
        }
      },
      columnChange2 ({ selectedItem, resolve, finish }) {
        setTimeout(() => {
          if (Math.random() > 0.7) {
            finish(false)
            this.$toast.error('数据请求失败，请重试')
            return
          }
          if (areaData[selectedItem.value]) {
            resolve(Object.keys(areaData[selectedItem.value]).map(key => {
              return {
                value: key,
                label: areaData[selectedItem.value][key]
              }
            }))
          } else {
            finish()
          }
        }, 300)
      },
      columnChange3 ({ selectedItem, index, resolve, finish }) {
        const value = index === -1 ? 86 : selectedItem.value
        if (areaData[value]) {
          resolve(Object.keys(areaData[value]).map(key => {
            return {
              value: key,
              label: areaData[value][key]
            }
          }))
        } else {
          finish()
        }
      },
      displayFormat (selectedItems) {
        return selectedItems[selectedItems.length - 2].label + '-' + selectedItems[selectedItems.length - 1].label
      },
      beforeConfirm (value, selectedItems, resolve) {
        if (parseInt(value[2]) > 120000) {
          this.$toast('该地区库存不足')
          resolve(false)
        } else {
          resolve(true)
        }
      }
    }
  },
  methods: {
    handleConfirm (value, selectedItems) {
      this.displayValue = selectedItems.map(item => {
        return item.label
      }).join('')
    }
  }
}
</script>