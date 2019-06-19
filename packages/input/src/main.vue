<template>
  <div
    class="jm-input"
    :class="{
      'is-textarea': type === 'textarea',
      'is-disabled': disabled
    }"
  >
    <!-- <textarea
      class="jm-input__textarea"
      v-if="type === 'textarea'"
      :placeholder="placeholder"
      :name="name"
      :disabled="disabled"
      :readonly="readonly"
      :minlength="minlength"
      :maxlength="maxlength"
      @focus="handleFocus"
      @blur="handleBlur"
      ref="textarea"
    ></textarea> -->
    <template v-if="type === 'textarea'">
      <div class="jm-input__textarea">
        <div
          class="jm-input__textarea-inner"
          :style="{
            height: !autosize ? rows * 17 + 'px' : ''
          }"
          v-if="type === 'textarea'"
          :placeholder="placeholder"
          :name="name"
          @input="handleInput"
          :disabled="disabled"
          :readonly="readonly"
          :minlength="minlength"
          :maxlength="maxlength"
          @focus="handleFocus"
          @blur="handleBlur"
          ref="textarea"
        >{{ textareaVal }}<font v-if="overVal.length" color="#f00;">{{ overVal }}</font></div>
      </div>
    </template>
    <template v-else>
      <div v-if="prefixIcon || $slots.prefix" class="jm-input__prefix">
        <slot name="prefix"></slot>
        <i v-if="prefixIcon" class="jm-input__icon" :class="prefixIcon"></i>
      </div>
      <input
        class="jm-input__inner"
        :class="[
          suffixCount > 0 ? `jm-input__inner--suffix-${suffixCount}` : '',
          prefixIcon || $slots.prefix ? 'jm-input__inner--prefix' : '',
          showWordCount ? 'jm-input__inner--count' : ''
        ]"
        :type="showPwdVisible ? (isPwdVisible ? 'text' : 'password') : type"
        :value="value"
        ref="input"
        @input="handleInput"
        @change="handleChange"
        :placeholder="placeholder"
        :name="name"
        :readonly="readonly"
        :disabled="disabled"
        :minlength="minlength"
        :maxlength="maxlength"
        :min="min"
        :max="max"
        :step="step"
        :tabindex="tabindex"
        @focus="handleFocus"
        @blur="handleBlur"
      />
      <div
        v-if="showClear || showPwdVisible || suffixIcon || $slots.suffix || showWordCount"
        class="jm-input__suffix"
      >
        <i v-show="showClear" class="jm-input__icon jm-icon-close-outline" @click="clear"></i>
        <i
          v-if="showPwdVisible"
          class="jm-input__icon"
          :class="isPwdVisible ? 'jm-icon-view' : 'jm-icon-eye-close'"
          @click="togglePwdVisible"
        ></i>
        <span v-if="showWordCount" class="jm-input__count">
          <span class="jm-input__count-current">{{ value.length }}</span>/{{ maxlength }}
        </span>
        <slot name="suffix"></slot>
        <i v-if="suffixIcon" class="jm-input__icon" :class="suffixIcon"></i>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'JmInput',
  data () {
    return {
      focused: false,
      isPwdVisible: false,
      textareaVal: '',
      overVal: ''
    }
  },
  props: {
    type: {
      type: String,
      default: 'text'
    },
    name: String,
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
    tabindex: String,
    rows: {
      type: Number,
      default: 2
    },
    autosize: Boolean
  },
  watch: {
    value () {
      this.updateTextareaVal()
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
    }
  },
  methods: {
    focus () {
      this.getInput().focus()

      if (this.type === 'textarea') {
        if (window.getSelection) {
          let range = window.getSelection()
          range.selectAllChildren(this.getInput())
          range.collapseToEnd()
        }
      }
    },
    blur () {
      this.getInput().blur()
    },
    select () {
      if (this.type === 'textarea') {
        this.getInput().focus()
        let range = window.getSelection()
        range.selectAllChildren(this.getInput())
      } else {
        this.getInput().select()
      }
    },
    handleInput (event) {
      if (this.type === 'textarea') {
        let newVal = this.getInput().innerText
        this.$emit('input', newVal)
        if (this.maxlength && newVal.length > this.maxlength) {
          this.textareaVal = newVal.slice(0, this.maxlength)
          this.overVal = newVal.slice(this.maxlength, newVal.length)
          this.focus()
        } else {
          this.overVal = ''
        }
      } else {
        this.$emit('input', event.target.value)
      }
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
    updateTextareaVal () {
      if (this.type === 'textarea' && this.value !== this.getInput().innerText) {
        this.textareaVal = this.value
        if (this.focused) {
          this.focus()
        }
      }
    }
  },
  mounted () {
    this.updateTextareaVal()
  }
}
</script>
