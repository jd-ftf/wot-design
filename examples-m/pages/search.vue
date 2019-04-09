<template>
  <div>
    <white-space :hor="0">
      <div slot="desc">搜索，监听对应事件<code>search、cancel、clear</code>事件</div>
      <jm-search
        v-model="search1"
        @search="handleSearch"
        @cancel="handleCancel"
        @clear="handleClear"
      />
    </white-space>
    <white-space :hor="0">
      <div slot="desc"><code>light</code>为<code>true</code>的搜索，监听<code>focus</code>和<code>blur</code>事件</div>
      <jm-search
        v-model="search2"
        light
        @focus="handleFocus1"
        @blur="handleBlur"
      />
    </white-space>
    <white-space :hor="0">
      <div slot="desc"><code>placeholder-left</code>为<code>true</code>的搜索</div>
      <jm-search v-model="search3" placeholder-left />
    </white-space>
    <white-space :hor="0">
      <div slot="desc"><code>hide-cancel</code>为<code>true</code>，且<code>disabled</code>为<code>true</code>的搜索</div>
      <jm-search v-model="search4" @focus="handleFocus2" hide-cancel disabled />
    </white-space>
    <white-space :hor="0">
      <div slot="desc">修改<code>placeholder</code>和<code>cancel-txt</code></div>
      <jm-search v-model="search5" placeholder="请输入订单号/订单名称" cancel-txt="搜索" />
    </white-space>
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
      search6: ''
    }
  },
  methods: {
    handleSearch (val) {
      this.$toast(`搜索：${val}`)
    },
    handleFocus1 () {
      this.$toast('聚焦搜索框')
    },
    handleBlur () {
      this.$toast('搜索框失去焦点')
    },
    handleCancel () {
      this.$toast('点击了取消按钮')
    },
    handleClear () {
      this.$toast('点击了清除按钮')
    },
    handleFocus2 () {
      this.$toast('点击了搜索框，但不会聚焦，因为搜索框不可用')
    }
  }
}
</script>
