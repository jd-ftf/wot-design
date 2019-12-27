<template>
  <div
    class="wd-input"
    :class="{
      'is-textarea': type === 'textarea',
      'is-disabled': disabled,
      'is-error': error
    }"
  >
    <template v-if="type === 'textarea' || (type === 'text' && autosize)">
      <div
        class="wd-input__textarea"
        :class="{
          'is-show-limit': showWordCount,
          'is-text-auto': type === 'text' && autosize
        }"
      >
        <textarea
          class="wd-input__textarea-inner"
          :class="{
            'is-suffix': showClear
          }"
          :style="textareaStyle"
          :placeholder="placeholder"
          :value="value"
          @input="handleInput"
          @change="handleChange"
          :disabled="disabled"
          :readonly="readonly"
          :minlength="minlength"
          :maxlength="maxlength"
          :rows="rows"
          :autofocus="autofocus"
          @focus="handleFocus"
          @blur="handleBlur"
          ref="textarea"
        ></textarea>
        <div class="wd-input__textarea-suffix">
          <i v-show="showClear" class="wd-input__textarea-icon wd-icon-close-outline" @click="clear"></i>
          <span v-if="showWordCount" class="wd-input__textarea-count">
            <span class="wd-input__textarea-count-current" :class="{ 'is-error': value && value.length > parseInt(maxlength) }">{{ (value && value.length) || 0 }}</span>/{{ maxlength }}
          </span>
        </div>
      </div>
    </template>
    <template v-else>
      <div v-if="prefixIcon || $slots.prefix" class="wd-input__prefix">
        <slot name="prefix"></slot>
        <i v-if="prefixIcon" class="wd-input__icon" :class="prefixIcon"></i>
      </div>
      <input
        class="wd-input__inner"
        :class="[
          suffixCount > 0 ? `wd-input__inner--suffix-${suffixCount}` : '',
          prefixIcon || $slots.prefix ? 'wd-input__inner--prefix' : '',
          showWordCount ? 'wd-input__inner--count' : ''
        ]"
        :type="showPwdVisible ? (isPwdVisible ? 'text' : 'password') : type"
        :value="value"
        ref="input"
        @input="handleInput"
        @change="handleChange"
        :placeholder="placeholder"
        :readonly="readonly"
        :disabled="disabled"
        :minlength="minlength"
        :maxlength="maxlength"
        :min="min"
        :max="max"
        :step="step"
        :autofocus="autofocus"
        @focus="handleFocus"
        @blur="handleBlur"
      />
      <div
        v-if="showClear || showPwdVisible || suffixIcon || $slots.suffix || showWordCount"
        class="wd-input__suffix"
      >
        <i v-show="showClear" class="wd-input__icon wd-icon-close-outline" @click="clear"></i>
        <i
          v-if="showPwdVisible"
          class="wd-input__icon"
          :class="isPwdVisible ? 'wd-icon-view' : 'wd-icon-eye-close'"
          @click="togglePwdVisible"
        ></i>
        <span v-if="showWordCount" class="wd-input__count">
          <span class="wd-input__count-current" :class="{ 'is-error': value && value.length > maxlength }">{{ (value && value.length) || 0 }}</span>/{{ maxlength }}
        </span>
        <slot name="suffix"></slot>
        <i v-if="suffixIcon" class="wd-input__icon" :class="suffixIcon"></i>
      </div>
    </template>
  </div>
</template>

<script>
import calcTextareaHeight from './calcTextareaHeight'

export default {
  name: 'WdInput',
  data () {
    return {
      focused: false,
      isPwdVisible: false,
      textareaCalcStyle: {}
    }
  },
  props: {
    type: {
      type: String,
      default: 'text'
    },
    value: [String, Number],
    placeholder: String,
    clearable: Boolean,
    maxlength: String,
    minlength: String,
    showPassword: Boolean,
    disabled: Boolean,
    readonly: Boolean,
    prefixIcon: String,
    suffixIcon: String,
    showWordLimit: Boolean,
    max: String,
    min: String,
    step: String,
    rows: {
      type: String,
      default: '3'
    },
    autosize: [Boolean, Object],
    resize: {
      type: String,
      default: 'none'
    },
    autofocus: Boolean,
    error: Boolean
  },
  watch: {
    value: {
      immediate: '',
      handler (value) {
        this.$nextTick(this.resizeTextarea)
      }
    }
  },
  computed: {
    showClear () {
      return !this.disabled && !this.readonly && this.clearable && this.value
    },
    showPwdVisible () {
      return !this.disabled && !this.readonly && this.showPassword
    },
    showWordCount () {
      return !this.disabled && !this.readonly && this.maxlength && this.showWordLimit
    },
    suffixCount () {
      let count = 0
      this.showClear && count++
      this.showPwdVisible && count++
      (this.suffixIcon || this.$slots.suffix) && count++
      this.showWordCount && count++

      return count
    },
    textareaStyle () {
      return Object.assign({}, this.textareaCalcStyle, {
        resize: this.resize
      })
    }
  },
  methods: {
    focus () {
      this.getInput().focus()
    },
    blur () {
      this.getInput().blur()
    },
    select () {
      this.getInput().select()
    },
    handleInput (event) {
      this.$emit('input', event.target.value)
    },
    handleChange (event) {
      this.$emit('change', event.target.value)
    },
    clear () {
      this.$emit('input', '')
      this.$emit('clear')
      this.focus()
    },
    handleFocus () {
      this.focused = true
      this.$emit('focus')
    },
    handleBlur () {
      this.focused = false
      this.$emit('blur')
    },
    getInput () {
      return this.$refs.input || this.$refs.textarea
    },
    togglePwdVisible () {
      this.isPwdVisible = !this.isPwdVisible
    },
    resizeTextarea () {
      if (this.type === 'textarea' || (this.type === 'text' && this.autosize)) {
        if (!this.autosize) {
          this.textareaCalcStyle = {
            minHeight: calcTextareaHeight(this.getInput()).minHeight
          }
          return
        }
        let minRows
        let maxRows

        if (typeof this.autosize === 'object') {
          minRows = this.autosize.minRows
          maxRows = this.autosize.maxRows
        }
        this.textareaCalcStyle = calcTextareaHeight(this.getInput(), minRows, maxRows)
      }
    }
  }
}
</script>
