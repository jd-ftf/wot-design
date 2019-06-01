<template>
  <div
    class="jm-input"
    :class="{
      'is-textarea': type === 'textarea',
      'is-disabled': disabled
    }"
  >
    <textarea
      class="jm-input__textarea"
      v-if="type === 'textarea'"
      ref="textarea"
    ></textarea>
    <template v-esle>
      <input
        class="jm-input__inner"
        :type="type"
        :value="value"
        ref="input"
        @input="handleInput"
        :placeholder="placeholder"
        :name="name"
        :readonly="readonly"
        :disabled="disabled"
        @focus="handleFocus"
        @blur="handleBlur"
      />
      <div
        v-if="showClear"
        class="jm-input__suffix"
      >
        <i class="jm-input__icon jm-icon-close-outline" @click="clear"></i>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'JmInput',
  data () {
    return {
      focused: false
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
    maxlength: Number,
    minLength: Number,
    showPassword: Boolean,
    disabled: Boolean,
    readonly: Boolean
  },
  computed: {
    showClear () {
      return !this.disabled && !this.readonly && this.clearable && this.value
    }
  },
  methods: {
    focus () {
      this.getInput().focus()
    },
    blur () {
      this.getInput().blur()
    },
    handleInput (event) {
      this.$emit('input', event.target.value)
    },
    clear () {
      this.$emit('input', '')
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
    }
  }
}
</script>
