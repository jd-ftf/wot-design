<template>
  <div class="wd-drop-item" :style="positionStyle" v-show="showWrapper">
    <wd-popup
      v-model="showPop"
      :duration="duration"
      :close-on-click-modal="closeOnClickModal"
      :position="direction === 'down' ? 'top' : 'bottom'"
      :modal-style="{
        position: 'absolute'
      }"
      class="wd-drop-item__popup"
      @click-modal="close"
      @open="handleOpen"
      @opened="handleOpened"
      @close="handleClose"
      @closed="onPopupClose"
    >
      <template v-if="$slots.default">
        <slot />
      </template>
      <template v-else>
        <div
          v-for="(item, index) in options"
          :key="index"
          @click="choose(item)"
          class="wd-drop-item__option"
          :class="{
            'is-active': (item.value ? item.value : item) === value
          }"
        >
          <!-- 左侧文字 -->
          <div class="wd-drop-item__title custom-title">
            <span>{{ item.label ? item.label : item }}</span>
            <span v-if="item.tip" class="wd-drop-item__tip">{{ item.tip }}</span>
          </div>
          <!-- 按钮 -->
          <wd-icon v-if="(item.value ? item.value : item) === value" :name="iconName" class="wd-drop-item__icon" />
        </div>
      </template>
    </wd-popup>
  </div>
</template>

<script>
import WdPopup from 'wot-design/packages/popup'

export default {
  name: 'WdDropMenuItem',
  components: {
    WdPopup
  },
  inject: ['dropMenu'],
  data () {
    return {
      showPop: false,
      showWrapper: false
    }
  },
  props: {
    value: [String, Number],
    options: Array,
    disabled: {
      type: Boolean,
      default: false
    },
    iconName: {
      type: String,
      default: 'check'
    },
    title: String
  },
  computed: {
    activeColor () {
      return this.dropMenu.activeColor
    },
    transitionName () {
      return this.dropMenu.direction === 'up' ? 'wd-drop--slide-up' : 'wd-drop--slide-down'
    },
    modal () {
      return this.dropMenu.modal
    },
    closeOnClickModal () {
      return this.dropMenu.closeOnClickModal
    },
    duration () {
      return this.dropMenu.duration
    },
    direction () {
      return this.dropMenu.direction
    },
    displayTitle () {
      if (this.title) return this.title

      for (let i = 0, len = this.options.length; i < len; i++) {
        if (this.value === this.options[i].value) {
          return this.options[i].label
        }
      }

      console.warn('[wot-design warning]no value is matched in the options option.')
      return ''
    },
    positionStyle () {
      const { direction, offset } = this.dropMenu

      if (direction === 'down') {
        return {
          top: offset + 'px',
          bottom: 0
        }
      } else {
        return {
          top: 0,
          bottom: offset + 'px'
        }
      }
    }
  },
  methods: {
    // 模拟单选操作 默认根据 value 选中操作
    choose (item) {
      if (this.disabled) return
      this.currentValue = item.value
      this.close()
      this.$emit('input', item.value)
      this.$emit('change', item.value)
    },
    // 外部关闭弹出框
    close () {
      this.showPop = false
      this.dropMenu.fold(-1)
    },
    open () {
      this.showWrapper = true
      this.showPop = true
    },
    onPopupClose () {
      this.showWrapper = false
      this.$emit('closed')
    },
    handleOpen () {
      this.$emit('open')
    },
    handleOpened () {
      this.$emit('opened')
    },
    handleClose () {
      this.$emit('close')
    }
  },
  created () {
    if (this.dropMenu) {
      this.dropMenu.children.push(this)
    }
  },
  destroyed () {
    this.dropMenu.children.splice(this.dropMenu.children.indexOf(this), 1)
  }
}
</script>
