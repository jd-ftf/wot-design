<template>
  <div class="wd-search" :class="{ 'is-light': light, 'is-without-cancel': hideCancel }">
    <div class="wd-search__block" @click="searchFocus">
      <form action="#" @submit.prevent="preventSubmit">
        <input
          type="search"
          :value="value"
          class="wd-search__input"
          autocomplete="off"
          ref="searchInput"
          @input="input"
          @search="search"
          @compositionstart="toggleTyping"
          @compositionend="toggleTyping"
          @blur="searchBlur"
          :disabled="disabled"
          :maxlength="maxlength"
          :autofocus="autofocus"
        />
      </form>
      <div class="wd-search__placeholder" :class="{ 'is-focus': isFocus || (!typing && value) || placeholderLeft }">
        <i class="wd-icon-search wd-search__search-icon"></i>
        <span v-show="!typing && !value" class="wd-search__placeholder-txt">{{ placeholder || t('wd.search.search') }}</span>
      </div>
      <i v-show="typing || value" class="wd-search__clear wd-icon-close-fill" @click="clearSearch"></i>
    </div>
    <slot name="action">
      <div v-show="!hideCancel" class="wd-search__cancel" @click="handleCancel">
        {{ cancelTxt || t('wd.search.cancel') }}
      </div>
    </slot>
  </div>
</template>

<script>
import locale from 'wot-design/src/mixins/locale'

export default {
  name: 'WdSearch',
  mixins: [locale],
  props: {
    value: String,
    placeholder: String,
    cancelTxt: String,
    light: Boolean,
    placeholderLeft: Boolean,
    hideCancel: Boolean,
    disabled: Boolean,
    maxlength: String,
    autofocus: Boolean
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
