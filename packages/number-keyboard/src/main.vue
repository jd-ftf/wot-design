<template>
  <transition name="wd-slide-up" @after-enter="onOpen" @after-leave="onClose">
    <div v-show="show" class="wd-number-keyboard" :style="{ 'z-index': zIndex }" @touchstart.stop="noop">
      <div class="wd-number-keyboard__body">
        <button
          v-for="item in 9" :key="item"
          class="wd-number-keyboard__key-item"
          @click="onKeyClick('' + item)"
        >{{ item }}</button>
        <button class="wd-number-keyboard__key-item" @click="onCancel">
          <i class="wd-icon-keyboard-collapse"></i>
        </button>
        <button class="wd-number-keyboard__key-item" @click="onKeyClick('0')">0</button>
        <button class="wd-number-keyboard__key-item" @click="onKeyClick(extraKey)">{{ extraKey }}</button>
      </div>
      <div class="wd-number-keyboard__actions">
        <button class="wd-number-keyboard__action" @click="onDelete">
          <i class="wd-icon-keyboard-delete"></i>
        </button>
        <button class="wd-number-keyboard__action wd-number-keyboard__action--confirm" @click="onConfirm">{{ confirmText || t('wd.numberKeyboard.confirm') }}</button>
      </div>
    </div>
  </transition>
</template>

<script>
import locale from 'wot-design/src/mixins/locale'

export default {
  name: 'WdNumberKeyboard',
  mixins: [locale],
  model: {
    event: 'update:value'
  },
  props: {
    show: Boolean,
    value: {
      type: String,
      default: ''
    },
    maxlength: Number,
    closeOnClickOutside: {
      type: Boolean,
      default: true
    },
    closeOnPopstate: {
      type: Boolean,
      default: true
    },
    teleport: {
      type: [String, Object],
      default: 'body'
    },
    extraKey: String,
    confirmText: String,
    zIndex: {
      type: Number,
      default: 100
    }
  },
  data () {
    return {
      innerValue: ''
    }
  },
  watch: {
    teleport: 'appendTeleport',
    value: {
      handler (val) {
        this.innerValue = val
      },
      immediate: true
    }
  },
  methods: {
    noop () {},
    onKeyClick (keyStr) {
      if (!keyStr || this.value.length >= this.maxlength) return

      this.$emit('input', keyStr)
      this.innerValue += keyStr
      this.$emit('update:value', this.innerValue)
    },
    onCancel () {
      this.$emit('close')
      this.onBlur()
    },
    onDelete () {
      this.$emit('delete')
      this.innerValue = this.innerValue.slice(0, this.innerValue.length - 1)
      this.$emit('update:value', this.innerValue)
    },
    onConfirm () {
      this.$emit('confirm', this.innerValue)
      this.onBlur()
    },
    onBlur () {
      this.show && this.$emit('blur')
    },
    onOpen () {
      this.$emit('show')
    },
    onClose () {
      this.$emit('hide')
    },
    appendTeleport () {
      if (this.$isServer) return

      let to = 'body'
      let disabled = false
      const teleportType = typeof this.teleport
      if (teleportType === 'object') {
        to = this.teleport.to
        disabled = this.teleport.disabled
      } else if (teleportType === 'string') {
        to = this.teleport
      }

      if (!disabled) {
        const container = document.querySelector(to)
        container.appendChild(this.$el)
      }
    },
    handlePopstate () {
      this.$emit('popstate')
      this.onBlur()
    }
  },
  mounted () {
    if (this.teleport) {
      this.appendTeleport()
    }

    if (this.closeOnPopstate) {
      window.addEventListener('popstate', this.handlePopstate)
    }

    if (this.closeOnClickOutside) {
      document.addEventListener('touchstart', this.onBlur)
    }
  },
  beforeDestroy () {
    if (this.teleport) {
      const parentNode = this.$el.parentNode
      parentNode.removeChild(this.$el)
    }

    if (this.closeOnPopstate) {
      window.removeEventListener('popstate', this.handlePopstate)
    }
  }
}
</script>
