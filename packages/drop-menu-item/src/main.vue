<template>
  <transition :name="transitionName">
    <div
      class="wd-drop-item"
      :style="positionStyle"
      v-show="showPop"
    >
      <div
        class="wd-drop-item__popup"
        :style="{ bottom: dropMenu.direction === 'up' && 0 }"
      >
        <div v-if="$slots.custom">
          <slot name="custom" />
        </div>
        <div
          v-else
          style="background-color: #fff"
        >
          <div
            v-for="(item, index) in options"
            :key="index"
            @click="choose(item)"
            :style="{'color': (item.value ? item.value : item) === currentValue ? activeColor : '#333' }"
          >
            <!-- 左侧文字 -->
            <div class="wd-drop-item__title custom-title">{{ item.text ? item.text : item }}</div>
            <!-- 按钮 -->
            <wd-icon
              v-if="(item.value ? item.value : item) === currentValue"
              :name="iconName"
              size="12px"
              class="wd-drop-item__icon"
            />
          </div>
        </div>
      </div>
      <!-- 遮罩层 -->
      <div
        v-if="modal"
        class="wd-drop-item__modal"
        :class="!showPop && 'wd-drop-item__modal-leave'"
        @click="handleClickModal"
      />
    </div>
  </transition>
</template>

<script>
export default {
  name: 'WdDropMenuItem',
  inject: ['dropMenu'],
  data () {
    return {
      showPop: false,
      positionStyle: '',
      currentValue: ''
    }
  },
  props: {
    value: {
      type: String,
      default () {
        return ''
      }
    },
    // 可能是 array || String
    options: [Array, String],
    closeOnClickModal: {
      type: Boolean,
      default: true
    },
    modal: {
      type: Boolean,
      default: true
    },
    duration: {
      type: Number,
      default: 100
    },
    disabled: {
      type: Boolean,
      default: false
    },
    iconName: {
      type: String,
      default: 'check-round'
    }
  },
  computed: {
    activeColor () {
      return this.dropMenu.activeColor
    },
    transitionName () {
      return this.dropMenu.direction === 'up' ? 'wd-drop--slide-up' : 'wd-drop--slide-down'
    }
  },
  watch: {
    'value': {
      handler (newValue, oldValue) {
        if (newValue === oldValue) return
        this.checkValueExist(newValue)
        if (newValue !== this.currentValue) {
          this.currentValue = newValue
          this.dropMenu.resetChooseValue()
        }
      },
      immediate: true
    }
  },
  methods: {
    checkValueExist (currentValue) {
      const { options } = this
      if (options instanceof Array) {
        let count = 0
        options.forEach(item => {
          (item.value !== currentValue) && count++
          if (count === options.length) {
            throw Error('There is no matching value in the option')
          }
        })
      }
    },
    /**
     * 父组件更改子组件内部 data 值
     * @param {string} key 键名
     * @param {null} value 键值
     */
    set (key, value) {
      this[key] = value
    },
    handleClickModal () {
      if (!this.closeOnClickModal) return
      this.close()
    },
    // 模拟单选操作 默认根据 value 选中操作
    choose (item) {
      if (this.disabled) return
      this.currentValue = item.value
      this.close()
      this.$emit('input', item.value)
      this.dropMenu.resetChooseValue()
    },
    // 外部关闭弹出框
    close () {
      this.showPop = false
      this.dropMenu.fold(-1)
    },
    open () {
      this.showPop = true
    }
  }
}
</script>
