<template>
  <wd-popup
    class="wd-message-box"
    :lock-scroll="lockScroll"
    :value="show"
    :close-on-click-modal="closeOnClickModal"
    transition="wd-zoom-in"
    @click-modal="toggleModal('modal')"
    @opened="handleOpened"
    @closed="handleClosed"
    style="overflow: hidden;"
  >
    <div
      class="wd-message-box__body"
      :class="{
        'is-no-title': !title,
        'is-prompt': type === 'prompt'
      }"
    >
      <div v-if="title" class="wd-message-box__title">{{ title }}</div>
      <div class="wd-message-box__content">
        <slot v-if="type !== 'prompt'">
          <div v-html="msg"></div>
        </slot>
        <template v-else>
          <div class="wd-message-box__input-container">
            <wd-input
              :type="inputType"
              size="large"
              v-model="inputValue"
              :placeholder="inputPlaceholder || t('wd.messageBox.inputPlaceholder')"
            />
          </div>
          <div
            v-show="showErr"
            class="wd-message-box__input-error"
          >{{ inputError || t('wd.messageBox.inputNoValidate') }}</div>
        </template>
      </div>
    </div>
    <div class="wd-message-box__actions">
      <wd-button
        v-if="showCancelButton"
        type="info"
        round
        block
        @click="toggleModal('cancel')"
      >{{ cancelButtonText || t('wd.messageBox.cancel') }}</wd-button>
      <wd-button
        v-if="showConfirmButton"
        round
        block
        @click="toggleModal('confirm')"
      >{{ confirmButtonText || t('wd.messageBox.confirm') }}</wd-button>
    </div>
  </wd-popup>
</template>

<script>
import WdPopup from 'wot-design/packages/popup'
import locale from 'wot-design/src/mixins/locale'

export default {
  name: 'WdMessageBox',
  mixins: [locale],
  components: {
    WdPopup
  },
  data () {
    return {
      msg: '',
      type: '',
      showInput: false,
      inputType: 'text',
      inputValue: '',
      inputPlaceholder: '',
      inputError: '',
      inputPattern: '',
      inputValidate: '',
      showErr: false
    }
  },
  props: {
    title: String,
    showConfirmButton: {
      type: Boolean,
      default: true
    },
    showCancelButton: {
      type: Boolean,
      default: false
    },
    show: {
      type: Boolean,
      default: false
    },
    confirmButtonText: String,
    cancelButtonText: String,
    closeOnClickModal: {
      type: Boolean,
      default: true
    },
    lockScroll: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    inputValue (value, oldValue) {
      if (this.type === 'prompt' && this.showErr && oldValue !== value) {
        this.showErr = false
      }
    },
    show (val) {
      !this.show && (this.showErr = false)
      const type = this.value ? 'open' : 'close'
      this.$emit(type)
    }
  },
  methods: {
    toggleModal (action) {
      if (action === 'modal' && !this.closeOnClickModal) {
        return
      }

      if (this.type === 'prompt' && action === 'confirm' && !this.validate()) {
        return
      }

      if (this.callback) {
        this.show = !this.show
        this.callback(action)
      }
      this.$emit('action', action)
    },
    validate () {
      if (this.inputPattern && !this.inputPattern.test(this.inputValue)) {
        this.showErr = true
        return false
      }
      if (typeof this.inputValidate === 'function') {
        var validateResult = this.inputValidate(this.inputValue)
        if (!validateResult) {
          this.showErr = true
          return false
        }
      }

      this.showErr = false
      return true
    },
    handleOpened () {
      this.$emit('opened')
    },
    handleClosed () {
      this.$emit('closed')
    }
  }
}
</script>
