<template>
  <div>
    <demo-block title="基本用法" transparent>
      <wd-search v-model="search1" @search="handleSearch" @cancel="handleCancel" @clear="handleClear" />
    </demo-block>
    <demo-block title="白色输入框" transparent>
      <wd-search v-model="search2" light />
    </demo-block>
    <demo-block title="搜索占位符居左" transparent>
      <wd-search v-model="search3" placeholder-left />
    </demo-block>
    <demo-block title="禁用且隐藏取消按钮" transparent>
      <wd-search v-model="search4" hide-cancel disabled />
    </demo-block>
    <demo-block title="自定义左侧插槽" transparent>
      <wd-search v-model="search6">
        <wd-popover slot="prefix" mode="menu" :content="menu" @menu-click="changeSearchType">
          <div class="search-type">
            <span>{{ searchType }}</span>
            <wd-icon class="icon-arrow" name="fill-arrow-down"></wd-icon>
          </div>
        </wd-popover>
      </wd-search>
    </demo-block>
    <demo-block title="自定义右侧文案" transparent>
      <wd-search v-model="search5" placeholder="请输入订单号/订单名称" cancel-txt="搜索" />
    </demo-block>
  </div>
</template>

<script>
export default {
  data () {
    return {
      search1: '',
      search2: '',
      search3: '',
      search4: '',
      search5: '',
      search6: '',
      searchType: '全部',
      menu: [
        {
          content: '全部'
        }, {
          content: '订单号'
        }, {
          content: '退款单号'
        }
      ],
      isSelecting: false
    }
  },
  methods: {
    handleSearch (val) {
      this.$toast(`搜索：${val}`)
    },
    handleCancel () {
      this.$toast('点击了取消按钮')
    },
    handleClear () {
      this.$toast('点击了清除按钮')
    },
    changeSearchType (item, index) {
      this.searchType = item.content
    }
  }
}
</script>


<style lang="scss" scoped>
.search-type {
  position: relative;
  height: 30px;
  line-height: 30px;
  padding: 0 8px 0 16px;

  &::after {
    position: absolute;
    content: '';
    width: 1px;
    right: 0;
    top: 5px;
    bottom: 5px;
    background: rgba(0, 0, 0, 0.25);
  }
  span {
    display: inline-block;
    vertical-align: middle;
  }
  .icon-arrow {
    display: inline-block;
    font-size: 20px;
    vertical-align: middle;
  }
}
</style>