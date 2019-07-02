<template>
  <div class="jm-message-box">
    <transition name="fade">
      <div class="jm-message-box__modal-mask" v-if="show" @click="toggleModal"></div>
    </transition>
    <transition name="zoomIn">
      <div class="jm-message-box__container" v-if="show">
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
          <div v-if="type !== 'prompt'" class="jm-message-box__content">
            <slot>
              <div v-html="msg"></div>
            </slot>
          </div>
          <div v-else class="jm-message-box__content">
            <div class="jm-message-box__input-container">
              <input :type="inputType" v-model="inputValue" :placeholder="inputPlaceholder" class="jm-message-box__input" />
            </div>
            <div v-show="showErr" class="jm-message-box__input-error">
              {{ inputError || '输入的数据不合法' }}
            </div>
          </div>
        </div>
        <div class="jm-message-box__actions">
          <button type="button"
            v-if="showCancelButton"
            class="jm-message-box__button jm-message-box__button--cancel"
            @click="toggleModal('cancel')">
            {{ cancelButtonText }}
          </button>
          <button type="button"
            class="jm-message-box__button jm-message-box__button--confirm"
            @click="toggleModal('confirm')">
            {{ confirmButtonText }}
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'JmMessageBox',
  data () {
    return {
      msg: '',
      type: '',
      showInput: false,
      inputType: 'text',
      inputValue: '',
      inputPlaceholder: '请输入',
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
    confirmButtonText: {
      type: String,
      default: '确定'
    },
    cancelButtonText: {
      type: String,
      default: '取消'
    },
    closeOnClickModal: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    toggleModal (action) {
      if (!action && !this.closeOnClickModal) {
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
    }
  },
  watch: {
    inputValue (value, oldValue) {
      if (this.type === 'prompt' && this.showErr && oldValue !== value) {
        this.showErr = false
      }
    },
    show (val) {
      if (val === false) {
        this.showErr = false
      }
    }
  }
}
</script>
