<template>
  <div class="wd-search" :class="{ 'is-light': light, 'is-without-cancel': hideCancel }">
    <div class="wd-search__block">
      <slot name="prefix"></slot>
      <div class="wd-search__field" @click="searchFocus">
        <form action="#" @submit.prevent="preventSubmit">
          <input
            type="search"
            :value="value"
            class="wd-search__input"
            autocomplete="off"
            ref="searchInput"
            @keyup="formatType"
            @input="input"
            @search="search"
            @compositionstart="toggleTyping"
            @compositionend="toggleTyping"
            @blur="searchBlur"
            @focus="searchFocus"
            :disabled="disabled"
            :maxlength="maxlength"
            :autofocus="autofocus"
          />
        </form>
        <div class="wd-search__placeholder" :class="{ 'is-focus': isFocus || (!typing && value) || placeholderLeft }">
          <i class="wd-icon-search wd-search__search-icon"></i>
          <span v-show="!typing && !value" class="wd-search__placeholder-txt">{{ placeholder || t('wd.search.search') }}</span>
        </div>
      </div>
      <a v-show="typing || value" class="wd-search__clear" @mousedown="clearSearch">
        <i class="wd-search__clear-icon wd-icon-error-fill"></i>
      </a>
    </div>
    <slot name="suffix">
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
    value: [String, Number],
    placeholder: String,
    cancelTxt: String,
    light: Boolean,
    placeholderLeft: Boolean,
    hideCancel: Boolean,
    disabled: Boolean,
    maxlength: String,
    autofocus: Boolean,
    type: String
  },
  data () {
    return {
      typing: false,
      isFocus: false
    }
  },
  methods: {
    formatType (e) {
      if (this.type === 'number') {
        e.target.value = e.target.value.replace(/[^0-9]/g, '')
      }
    },
    input (e) {
      if (this.type === 'number') {
        e.target.value = e.target.value.replace(/[^0-9]/g, '')
      }
      this.$emit('input', this.type === 'number' && e.target.value ? parseInt(e.target.value) : e.target.value)
    },
    clearSearch (event) {
      this.$emit('input', '')
      this.$emit('clear')
      this.typing = false
      this.isFocus = true
      this.$refs.searchInput.focus()
      // 采用mousedown先于blur事件触发，阻止默认的blur事件行为
      event.preventDefault()
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
