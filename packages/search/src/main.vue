<template>
  <div class="jm-search" :class="{ 'is-light': light, 'is-without-cancel': hideCancel }">
    <div class="jm-search__block" @click="searchFocus">
      <form action="#" @submit.prevent="preventSubmit">
        <input
          type="search"
          :value="value"
          class="jm-search__input"
          autocomplete="off"
          ref="searchInput"
          @input="input"
          @search="search"
          @compositionstart="toggleTyping"
          @compositionend="toggleTyping"
          @blur="searchBlur"
          :disabled="disabled"
        />
      </form>
      <div class="jm-search__placeholder" :class="{ 'is-focus': isFocus || (!typing && value) || placeholderLeft }">
        <i class="jm-icon-search jm-search__search-icon"></i>
        <span v-show="!typing && !value" class="jm-search__placeholder-txt">{{ placeholder || '搜索' }}</span>
      </div>
      <div v-show="typing || value" class="jm-search__clear jm-icon-circle-close" @click="clearSearch"></div>
    </div>
    <slot name="action">
      <div v-show="!hideCancel" class="jm-search__cancel" @click="handleCancel">
        {{ cancelTxt || '取消' }}
      </div>
    </slot>
  </div>
</template>

<script>
export default {
  name: 'JmSearch',
  props: {
    value: String,
    placeholder: String,
    cancelTxt: String,
    light: {
      type: Boolean,
      default: false
    },
    placeholderLeft: {
      type: Boolean,
      default: false
    },
    hideCancel: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      typing: false,
      isFocus: false
    }
  },
  methods: {
    input (e) {
      this.$emit('input', e.target.value)
    },
    clearSearch () {
      this.$emit('input', '')
      this.$emit('clear')
      this.typing = false
      this.$refs.searchInput.focus()
    },
    search (e) {
      this.$refs.searchInput.blur()
      this.$emit('search', this.value)
    },
    preventSubmit () {
      return false
    },
    toggleTyping () {
      this.typing = !this.typing
    },
    searchFocus () {
      if (!this.disabled) {
        this.isFocus = true
        let clickEvent = new Event('touchstart')
        this.$refs.searchInput.dispatchEvent(clickEvent)
        this.$refs.searchInput.focus()
      }
      this.$emit('focus')
    },
    searchBlur () {
      this.isFocus = false
      this.$refs.searchInput.blur()
      this.$emit('blur', this.value)
    },
    handleCancel () {
      this.$emit('cancel')
    }
  }
}
</script>
