<template>
  <jm-popup
    class="jm-message-box"
    :lock-scroll="lockScroll"
    :value="show"
    :close-on-click-modal="closeOnClickModal"
    transition="jm-zoom-in"
    @click-modal="toggleModal('modal')"
    @opened="handleOpened"
    @closed="handleClosed"
    style="overflow: hidden;"
  >
    <div
      class="jm-message-box__body"
      :class="{
        'is-no-title': !title,
        'is-prompt': type === 'prompt'
      }"
    >
      <div v-if="title" class="jm-message-box__title">
        {{ title }}
      </div>
      <div class="jm-message-box__content">
        <slot v-if="type !== 'prompt'">
          <div v-html="msg"></div>
        </slot>
        <template v-else>
          <div class="jm-message-box__input-container">
            <input
              :type="inputType"
              v-model="inputValue"
              :placeholder="inputPlaceholder || t('jmd.messageBox.inputPlaceholder')"
              class="jm-message-box__input"
            />
          </div>
          <div v-show="showErr" class="jm-message-box__input-error">
            {{ inputError || t('jmd.messageBox.inputNoValidate') }}
          </div>
        </template>
      </div>
    </div>
    <div class="jm-message-box__actions">
      <button type="button"
        v-if="showCancelButton"
        class="jm-message-box__button jm-message-box__button--cancel"
        @click="toggleModal('cancel')">
        {{ cancelButtonText || t('jmd.messageBox.cancel') }}
      </button>
      <button type="button"
        class="jm-message-box__button jm-message-box__button--confirm"
        @click="toggleModal('confirm')">
        {{ confirmButtonText || t('jmd.messageBox.confirm') }}
      </button>
    </div>
  </jm-popup>
</template>

<script>
import JmPopup from 'jm-design/packages/popup'
import locale from 'jm-design/src/mixins/locale'

export default {
  name: 'JmMessageBox',
  mixins: [locale],
  components: {
    JmPopup
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