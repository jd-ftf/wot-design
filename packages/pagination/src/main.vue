<template>
  <div class="wd-pager" v-if="!(hideIfOnePage && this.computedPageSize === 1)">
    <div class="wd-pager__content">
      <wd-button
        :plain="value !== 1"
        type="info"
        size="small"
        class="wd-pager__nav"
        :disabled="value === 1"
        @click="updatePage(value - 1)"
      >
        <span v-if="!showIcon">{{ prevText || t("wd.pagination.prev") }}</span>
        <wd-icon
          v-else
          class="wd-pager__left"
          :class="[
            value === 1
              ? 'wd-pager__nav--disabled'
              : 'wd-pager__nav--active'
          ]"
          size="14px"
          name="arrow-right"
        ></wd-icon>
      </wd-button>
      <div class="wd-pager__size">
        <span class="wd-pager__current">{{ value }}</span>
        <span class="wd-pager__separator">/</span>
        <span>{{ computedPageSize }}</span>
      </div>
      <wd-button
        :plain="value !== this.computedPageSize"
        type="info"
        size="small"
        class="wd-pager__nav"
        :disabled="value === this.computedPageSize"
        @click="updatePage(value + 1)"
      >
        <span v-if="!showIcon">{{ nextText || t("wd.pagination.next") }}</span>
        <wd-icon
          v-else
          size="14px"
          :class="[
            value === this.computedPageSize
              ? 'wd-pager__nav--disabled'
              : 'wd-pager__nav--active'
          ]"
          name="arrow-right"
        ></wd-icon>
      </wd-button>
    </div>
    <div class="wd-pager__message" v-if="showMessage">
      <span>{{ t("wd.pagination.page", { value }) }}，</span>
      <span v-if="total">{{ t("wd.pagination.total", { total }) }}，</span>
      <span>{{ t("wd.pagination.size", { size: pageSize }) }}</span>
    </div>
  </div>
</template>

<script>
import WdButton from 'wot-design/packages/button'
import WdIcon from 'wot-design/packages/icon'
import locale from 'wot-design/src/mixins/locale'
export default {
  name: 'WdPagination',
  mixins: [locale],
  components: {
    WdIcon,
    WdButton
  },
  props: {
    value: Number,
    prevText: String,
    nextText: String,
    totalPage: Number,
    showMessage: Boolean, // 是否展示文字提示
    showIcon: Boolean, // 是否展示分页导航为Icon图标
    total: Number,
    pageSize: {
      type: Number,
      default: 10
    },
    hideIfOnePage: {
      // 控制分页器只有一页时，是否隐藏
      type: Boolean,
      default: true
    }
  },
  methods: {
    updatePage (page) {
      if (page >= 1 && page <= this.computedPageSize) {
        // 子组件通知父组件更新数据
        this.$emit('input', page)
        this.$emit('change', page)
      }
    }
  },
  computed: {
    computedPageSize () {
      if (this.total) {
        return Math.ceil(this.total / this.pageSize)
      } else {
        return this.totalPage || 1
      }
    }
  }
}
</script>
