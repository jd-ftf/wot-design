<template>
  <jm-popup
    class="jm-action-sheet"
    :lock-scroll="lockScroll"
    :duration="duration"
    :value="value"
    position="bottom"
    @click-modal="handleClickModal"
    @opened="handleOpened"
    @closed="handleClosed"
  >
    <div v-if="title" class="jm-action-sheet__header">
      {{ title }}
      <i class="jm-action-sheet__close jm-icon-add" @click="close"></i>
    </div>
    <div v-if="actions && actions.length" class="jm-action-sheet__actions">
      <button
        v-for="(item, index) in actions"
        :key="index"
        :class="{
          'jm-action-sheet__action': true,
          'jm-action-sheet__action--disabled': item.disabled
        }"
        :style="{ 'color': item.color }"
        @click="select(index)"
      >
        <jm-loading v-if="item.loading" size="20px" style="display: inline-block;" :color="item.color" />
        <template v-else>
          <span class="jm-action-sheet__name">{{ item.name }}</span>
          <span v-if="item.subname" class="jm-action-sheet__subname">{{ item.subname }}</span>
        </template>
      </button>
    </div>
    <slot></slot>
    <button v-if="cancelText" class="jm-action-sheet__cancel" @click="handleCancel">{{ cancelText }}</button>
  </jm-popup>
</template>

<script>
import JmPopup from 'jm-design/packages/popup'
import JmLoading from 'jm-design/packages/loading'

export default {
  name: 'JmActionSheet',
  components: {
    JmPopup,
    JmLoading: JmLoading.Indicator
  },
  props: {
    value: Boolean,
    actions: {
      type: Array,
      default () {
        return []
      }
    },
    title: String,
    cancelText: String,
    closeOnClickAction: {
      type: Boolean,
      default: true
    },
    closeOnClickModal: {
      type: Boolean,
      default: true
    },
    lockScroll: {
      type: Boolean,
      default: true
    },
    duration: Number
  },
  watch: {
    value () {
      const type = this.value ? 'open' : 'close'
      this.$emit(type)
    }
  },
  methods: {
    select (index) {
      this.$emit('select', this.actions[index], index)

      if (this.closeOnClickAction) {
        this.close()
      }
    },
    handleClickModal () {
      this.$emit('click-modal')
      if (this.closeOnClickModal) {
        this.close()
      }
    },
    handleCancel () {
      this.$emit('cancel')
      this.close()
    },
    close () {
      this.$emit('input', false)
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
