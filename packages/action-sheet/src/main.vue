<template>
  <wd-popup
    class="wd-action-sheet"
    :class="{'wd-action-sheet--spacing': actions && actions.length || panels && panels.length}"
    :lock-scroll="lockScroll"
    :duration="duration"
    :value="value"
    position="bottom"
    @click-modal="handleClickModal"
    @opened="handleOpened"
    @closed="handleClosed"
  >
    <div v-if="title" class="wd-action-sheet__header">
      {{ title }}
      <i class="wd-action-sheet__close wd-icon-add" @click="close"></i>
    </div>
    <div v-if="actions && actions.length" class="wd-action-sheet__actions">
      <button
        v-for="(item, index) in actions"
        :key="index"
        :class="{
          'wd-action-sheet__action': true,
          'wd-action-sheet__action--disabled': item.disabled
        }"
        :style="{ 'color': item.color }"
        @click="select(index)"
      >
        <wd-loading v-if="item.loading" size="20px" style="display: inline-block;" :color="item.color" />
        <template v-else>
          <span class="wd-action-sheet__name">{{ item.name }}</span>
          <span v-if="item.subname" class="wd-action-sheet__subname">{{ item.subname }}</span>
        </template>
      </button>
    </div>
    <div v-if="panels && panels.length" class="wd-action-sheet__panels">
      <div
        v-for="(item, index) in panels"
        :key="index"
        class="wd-action-sheet__panel"
        @click="openLink(item.clickUrl)"
      >
        <img class="wd-action-sheet__panel-img" :src="item.imageUrl" />
        <div class="wd-action-sheet__panel-title">{{ item.title }}</div>
      </div>
    </div>
    <slot></slot>
    <button v-if="cancelText" class="wd-action-sheet__cancel" @click="handleCancel">{{ cancelText }}</button>
  </wd-popup>
</template>

<script>
import WdPopup from 'wot-design/packages/popup'
import WdLoading from 'wot-design/packages/loading'

export default {
  name: 'WdActionSheet',
  components: {
    WdPopup,
    WdLoading
  },
  props: {
    value: Boolean,
    actions: {
      type: Array,
      default () {
        return []
      }
    },
    panels: {
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
    openLink (link) {
      window.location.href = link
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
