<template>
  <div class="page-img">
    <demo-block title="基本用法">
      <wd-button @click="toggle">图片预览</wd-button>
    </demo-block>
    <demo-block title="隐藏索引">
      <wd-button @click="toggle1">图片预览</wd-button>
    </demo-block>
    <demo-block title="初始下标">
      <wd-button @click="toggle2">图片预览</wd-button>
    </demo-block>
    <demo-block title="监听开启关闭">
      <wd-button @click="toggle3">图片预览</wd-button>
    </demo-block>
    <demo-block title="调用组件">
      <wd-button @click="openImgPreview">调用</wd-button>
      <wd-img-preview
        v-model="show"
        :img-list="imgList1"
        @open="open"
        @close="close"
        :on-long-tap="handleLongtap"
      ></wd-img-preview>
    </demo-block>
  </div>
</template>

<script>
export default {
  data () {
    return {
      show: false,
      imgList1: [
        'https://img12.360buyimg.com//n0/jfs/t1/29118/6/4823/55969/5c35c16bE7c262192/c9fdecec4b419355.jpg',
        'https://img.yzcdn.cn/vant/apple-4.jpg',
        'https://img12.360buyimg.com//n0/jfs/t1/29118/6/4823/55969/5c35c16bE7c262192/c9fdecec4b419355.jpg',
        'https://img12.360buyimg.com//n0/jfs/t1/29118/6/4823/55969/5c35c16bE7c262192/c9fdecec4b419355.jpg',
        'https://img.yzcdn.cn/vant/apple-4.jpg'
      ]
    }
  },
  methods: {
    toggle () {
      this.$preview({
        imgList: this.imgList1
      })
    },
    toggle1 () {
      this.$preview({
        imgList: this.imgList1,
        showIndex: false
      })
    },
    toggle2 () {
      this.$preview({
        imgList: this.imgList1,
        swipeInitialIndex: 4
      })
    },
    toggle3 () {
      this.$preview({
        imgList: this.imgList1,
        onClose: () => {
          console.log('调用方法，关闭预览')
        },
        onOpen: () => {
          console.log('调用方法，开启预览')
        },
        onLongTap: this.handleLongtap
      })
    },
    handleLongtap () {
      console.log('长按事件')
    },
    close ({ index }) {
      console.log('关闭', index)
    },
    open () {
      console.log('打开')
    },
    openImgPreview () {
      this.show = true
    }
  }
}
</script>

<style lang="scss">
</style>
