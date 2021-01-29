<template>
  <div class="wd-col-picker">
    <div class="wd-col-picker__field" @click="showPicker">
      <slot>
        <div
          class="wd-col-picker__cell"
          :class="[
            {
            'is-disabled': disabled,
            'is-readonly': readonly,
            'is-align-right': alignRight,
            'is-error': error
            },
            size ? `is-${size}` : ''
          ]"
        >
          <div
            v-if="label || $slots.label"
            class="wd-col-picker__label"
            :class="{
              'is-required': required
            }"
            :style="labelWidth ? `min-width: ${labelWidth}; max-width: ${labelWidth}` : ''"
          >
            <slot name="label">
              {{ label }}
            </slot>
          </div>
          <div
            class="wd-col-picker__value"
            :class="{
              'wd-col-picker__value--placeholder': (!value || (value instanceof Array && !value.length))
            }"
          >{{ ((!value || (value instanceof Array && !value.length)) ? placeholder : showValue) || t('wd.colPicker.placeholder') }}</div>
          <i v-if="!disabled && !readonly" class="wd-col-picker__arrow wd-icon-arrow-right"></i>
        </div>
      </slot>
    </div>
    <wd-action-sheet
      v-model="pickerShow"
      :duration="250"
      :title="title || t('wd.colPicker.title')"
      :close-on-click-modal="closeOnClickModal"
      @close="handlePickerClose"
    >
      <div class="wd-col-picker__selected" ref="selectedVisible">
        <div class="wd-col-picker__selected-container" ref="selectedContainer">
          <div
            v-for="(item, colIndex) in selectList"
            :key="colIndex"
            ref="selecteds"
            class="wd-col-picker__selected-item"
            :class="{
              'is-selected': colIndex === currentCol
            }"
            @click="handleColClick(colIndex)"
          >
            {{ pickerColSelected[colIndex] && getSelectedItem(pickerColSelected[colIndex], colIndex)[labelKey] || t('wd.colPicker.select') }}
          </div>
          <i class="wd-col-picker__selected-line" :style="lineStyle"></i>
        </div>
      </div>
      <div class="wd-col-picker__list-container">
        <template v-for="(col, colIndex) in selectList">
          <div
            v-show="colIndex === currentCol"
            :key="colIndex"
            class="wd-col-picker__list">
            <div
              v-for="(item, index) in col"
              :key="index"
              class="wd-col-picker__list-item"
              :class="{
                'is-selected': pickerColSelected[colIndex] && item[valueKey] === pickerColSelected[colIndex],
                'is-disabled': item.disabled
              }"
              @click="chooseItem(colIndex, item, index)"
            >
              <div>
                <div class="wd-col-picker__list-item-label">{{ item[labelKey] }}</div>
                <div v-if="item[tipKey]" class="wd-col-picker__list-item-tip">{{ item[tipKey] }}</div>
              </div>
              <i class="wd-col-picker__checked wd-icon-check"></i>
            </div>
          </div>
        </template>
        <div v-if="loading" class="wd-col-picker__loading">
          <wd-loading :color="loadingColor" />
        </div>
      </div>
    </wd-action-sheet>
  </div>
</template>

<script>
import locale from 'wot-design/src/mixins/locale'
import WdActionSheet from 'wot-design/packages/action-sheet'
import WdLoading from 'wot-design/packages/loading'
import animateScrollLeft from 'wot-design/src/utils/animateScrollLeft'

export default {
  name: 'WdColPicker',
  mixins: [locale],
  components: {
    WdActionSheet,
    WdLoading
  },
  data () {
    return {
      pickerShow: false,
      currentCol: 0,
      selectList: [],
      pickerColSelected: [],
      loading: false,
      showValue: '',
      isChange: false,
      lastSelectList: [],
      lastPickerColSelected: [],
      lineStyle: {},
      isCompleting: false // 是否在自动补全，锁操作
    }
  },
  props: {
    value: {
      type: Array,
      default () {
        return []
      }
    },
    columns: {
      type: Array,
      required: true
    },
    label: String,
    labelWidth: String,
    disabled: Boolean,
    readonly: Boolean,
    placeholder: String,
    title: String,
    columnChange: {
      type: Function,
      required: true
    },
    displayFormat: Function,
    beforeConfirm: Function,
    alignRight: Boolean,
    error: Boolean,
    required: Boolean,
    size: String,
    valueKey: {
      type: String,
      default: 'value'
    },
    labelKey: {
      type: String,
      default: 'label'
    },
    tipKey: {
      type: String,
      default: 'tip'
    },
    loadingColor: String,
    closeOnClickModal: {
      type: Boolean,
      default: true
    },
    autoComplete: Boolean
  },
  watch: {
    value: {
      handler (val, oldVal) {
        let jumpFlag = false
        val && val.some((value, index) => {
          if (jumpFlag) return true
          this.selectList[index] && this.selectList[index].some((selectItem, selectIndex) => {
            // 当前 value 项在 selectList 中对应列能找到，及匹配成功，继续匹配下一列
            if (value === selectItem.value) return true
            // 直到最后一项 value 也不能在地址列表中匹配，则更新地址列表值
            if (selectIndex === this.selectList[index].length - 1) {
              this.selectList = this.columns.slice(0)
              this.isCompleting = false
              jumpFlag = true
            }
          })
        })
        this.pickerColSelected = val
        this.setShowValue()
        if (this.autoComplete) {
          this.$nextTick(() => {
            // 如果 columns 数组长度为空，或者长度小于 value 的长度，自动触发 columnChange 来补齐数据
            if (this.selectList.length < this.value.length || this.selectList.length === 0) {
              if (!this.isCompleting) {
                // 如果 columns 长度为空，则传入的 colIndex 为 -1
                let colIndex = this.selectList.length === 0 ? -1 : (this.selectList.length - 1)
                this.diffColumns(colIndex)
              }

              this.isCompleting = true
            }
          })
        }
      },
      immediate: true
    },
    columns: {
      handler (val, oldVal) {
        if (val.length && !(val[0] instanceof Array)) {
          console.error('[wot design] error(wd-col-picker): the columns props of wd-col-picker should be a two-dimensional array')
          return
        }

        if (val.length === 0 && !oldVal) return

        this.selectList = val.slice(0)
        if (this.selectList.length > 0) {
          this.currentCol = this.selectList.length - 1
          this.setShowValue()
        }
        this.$nextTick(() => {
          this.setLineStyle(false)
          this.lineScrollIntoView(false)
        })
      },
      immediate: true
    },
    currentCol () {
      this.setLineStyle()
      this.lineScrollIntoView()
    }
  },
  methods: {
    // 对外暴露接口，打开弹框
    open () {
      this.showPicker()
    },

    // 对外暴露接口，关闭弹框
    close () {
      this.pickerShow = false
      this.handlePickerClose()
    },

    handlePickerClose () {
      // 未确定选项时，数据还原复位
      if (this.isChange) {
        this.selectList = this.lastSelectList.slice(0)
        this.pickerColSelected = this.lastPickerColSelected.slice(0)
        this.currentCol = this.lastSelectList.length - 1
        this.isChange = false
      }
      this.$emit('close')
    },
    showPicker () {
      if (this.disabled || this.readonly) return

      this.lastSelectList = this.selectList.slice(0)
      this.lastPickerColSelected = this.pickerColSelected.slice(0)
      this.pickerShow = true
      this.setLineStyle(false)
      this.lineScrollIntoView(false)
    },
    getSelectedItem (value, colIndex) {
      if (this.selectList[colIndex]) {
        const selecteds = this.selectList[colIndex].filter(item => {
          return item[this.valueKey] === value
        })

        if (selecteds.length > 0) {
          return selecteds[0]
        }
      }

      return {
        [this.valueKey]: value,
        [this.labelKey]: ''
      }
    },
    chooseItem (colIndex, item, index) {
      if (item.disabled) return

      this.isChange = true
      this.pickerColSelected = this.pickerColSelected.slice(0, colIndex)
      this.$set(this.pickerColSelected, colIndex, item[this.valueKey])
      this.setLineStyle()
      this.lineScrollIntoView()
      this.selectList = this.selectList.slice(0, colIndex + 1)
      this.handleColChange(colIndex, item, index)
    },
    // 触发 columnChange，如果有 callback 回调，则为递归补齐 columns 数据，需要避免触发 confirm 事件
    handleColChange (colIndex, item, index, callback) {
      this.loading = true
      this.columnChange({
        selectedItem: item,
        index: colIndex,
        rowIndex: index,
        resolve: (nextColumn) => {
          if (!(nextColumn instanceof Array)) {
            console.error('[wot design] error(wd-col-picker): the data of each column of wd-col-picker should be an array')
            return
          }

          this.$set(this.selectList, colIndex + 1, nextColumn)
          this.loading = false
          this.currentCol = colIndex + 1
          if (typeof callback === 'function') {
            this.isCompleting = false
            callback()
          }
        },
        finish: (isOk) => {
          if (typeof callback === 'function') {
            this.isCompleting = false
            this.loading = false
            return
          }
          if (typeof isOk === 'boolean' && !isOk) {
            this.loading = false
            return
          }

          if (this.beforeConfirm) {
            this.beforeConfirm(this.pickerColSelected, this.pickerColSelected.map((item, colIndex) => {
              return this.getSelectedItem(item, colIndex)
            }), isPass => {
              if (isPass) {
                this.onConfirm()
              } else {
                this.loading = false
              }
            })
          } else {
            this.onConfirm()
          }
        }
      })
    },
    onConfirm () {
      this.isChange = false
      this.loading = false
      this.pickerShow = false
      this.$emit('input', this.pickerColSelected)
      this.setShowValue()
      this.setLineStyle()
      this.lineScrollIntoView()
      this.$emit('confirm', this.pickerColSelected, this.pickerColSelected.map((item, colIndex) => {
        return this.getSelectedItem(item, colIndex)
      }))
    },
    handleColClick (colIndex) {
      this.isChange = true
      this.currentCol = colIndex
    },
    setLineStyle (isAnimate = true) {
      if (!this.$refs.selecteds || this.$refs.selecteds.length === 0) return

      this.$nextTick(() => {
        let left = 0
        const width = 16
        if (this.$refs.selecteds[this.currentCol]) {
          const { clientWidth, offsetLeft } = this.$refs.selecteds[this.currentCol]
          left = offsetLeft + (clientWidth - width) / 2
        }

        this.lineStyle = {
          transform: `translateX(${left}px)`,
          transition: isAnimate ? 'width 300ms, transform 300ms' : ''
        }
      })
    },
    lineScrollIntoView (isAnimate = true) {
      if (!this.$refs.selecteds || this.$refs.selecteds.length === 0) return

      this.$nextTick(() => {
        const activeNav = this.$refs.selecteds[this.currentCol]

        if (!activeNav) return

        const visibleWidth = this.$refs.selectedVisible.offsetWidth
        const activeLeft = activeNav.offsetWidth / 2 + activeNav.offsetLeft
        const nextNavContainerLeft = activeLeft - visibleWidth / 2
        animateScrollLeft(this.$refs.selectedContainer, nextNavContainerLeft, isAnimate ? 300 : 0)
      })
    },
    setShowValue () {
      const selectedItems = this.value.map((item, colIndex) => {
        return this.getSelectedItem(item, colIndex)
      })
      if (this.displayFormat) {
        this.showValue = this.displayFormat(selectedItems)
      } else {
        this.showValue = selectedItems.map(item => {
          return item[this.labelKey]
        }).join('')
      }
    },
    // 递归列数据补齐
    diffColumns (colIndex) {
      // colIndex 为 -1 时，item 为空对象，>=0 时则具有 value 属性
      let item = colIndex === -1 ? {} : { [this.valueKey]: this.value[colIndex] }
      this.handleColChange(colIndex, item, -1, () => {
        // 如果 columns 长度还小于 value 长度，colIndex + 1，继续递归补齐
        if (this.selectList.length < this.value.length) {
          this.diffColumns(colIndex + 1)
        } else {
          this.setShowValue()
        }
      })
    }
  }
}
</script>
