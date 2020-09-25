<template>
  <div class="page-img">
    <demo-block title="基本用法">
      <div class="wrapper">
        <img v-for="(url, index) in urls1" :key="index" :src="url" class="img" @click="toggle()" />
      </div>
    </demo-block>
    <demo-block title="隐藏索引">
      <div class="wrapper">
        <img v-for="(url, index) in urls2" :key="index" :src="url" class="img" @click="toggle1" />
      </div>
    </demo-block>
    <demo-block title="初始下标">
      <div class="wrapper">
        <img
          v-for="(url, index) in urls3"
          :key="index"
          :src="url"
          class="img"
          @click="toggle2(index)"
        />
      </div>
    </demo-block>
    <demo-block title="监听开启关闭">
      <div class="wrapper">
        <img v-for="(url, index) in urls4" :key="index" :src="url" class="img" @click="toggle3" />
      </div>
    </demo-block>
    <demo-block title="调用组件">
      <div class="wrapper">
        <img
          v-for="(url, index) in urls5"
          :key="index"
          :src="url"
          class="img"
          @click="openImgPreview"
        />
      </div>
      <wd-img-preview
        v-model="show"
        :urls="urls5"
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
      urls1: [
        'https://img11.360buyimg.com/ling/jfs/t1/113690/16/12975/651172/5f17a317E282b9f76/30bc80373c4e91fb.png',
        'https://img13.360buyimg.com/ling/jfs/t1/132723/15/7530/74624/5f3f3c06Eb6f5abb9/2b9faabfa3f0077a.jpg'
      ],
      urls2: [
        'https://img13.360buyimg.com/ling/jfs/t1/140106/11/5789/68021/5f3a3500E93dae718/3e1995c7eb2a0ef0.jpg',
        'https://img13.360buyimg.com/ling/jfs/t1/124449/30/9617/70273/5f363fc6E273e6950/4a41cdd1ceff8619.jpg'
      ],
      urls3: [
        'https://img14.360buyimg.com/ling/jfs/t1/130431/17/9006/85584/5f50c74aE4a11178e/0d071739b2d5ae26.jpg',
        'https://img14.360buyimg.com/ling/jfs/t1/116597/12/12951/740062/5f17a30bEfe8c69e9/1c01c187de77430d.png',
        'https://img14.360buyimg.com/ling/jfs/t1/113879/15/16995/77352/5f50abd5E9fb3880f/89cb46fbce8b88d5.jpg'
      ],
      urls4: [
        'https://img14.360buyimg.com/ling/jfs/t1/130431/17/9006/85584/5f50c74aE4a11178e/0d071739b2d5ae26.jpg',
        'https://img14.360buyimg.com/ling/jfs/t1/116597/12/12951/740062/5f17a30bEfe8c69e9/1c01c187de77430d.png'
      ],
      urls5: [
        'https://img13.360buyimg.com/ling/jfs/t1/127090/3/11693/51534/5f50b426E32333d17/88b13941e4502b87.jpg',
        'https://img12.360buyimg.com/ling/jfs/t1/130358/16/5108/594692/5f17a326E2b391cbb/0df3dab7e86442b8.png'
      ]
    }
  },
  methods: {
    toggle () {
      this.$preview({
        urls: this.urls1
      })
    },
    toggle1 () {
      this.$preview({
        urls: this.urls2,
        showIndex: false
      })
    },
    toggle2 (index) {
      this.$preview({
        urls: this.urls3,
        current: index
      })
    },
    toggle3 () {
      const _this = this
      this.$preview({
        urls: this.urls4,
        onClose: () => {
          _this.$toast('调用方法，关闭预览')
        },
        onOpen: () => {
          _this.$toast('调用方法，开启预览')
        },
        onLongTap: _this.handleLongtap
      })
    },
    handleLongtap () {
      this.$toast('长按事件')
    },
    close ({ index }) {
      this.$toast('关闭:' + index)
    },
    open () {
      this.$toast('打开')
    },
    openImgPreview () {
      this.show = true
    }
  }
}
</script>

<style lang="scss">
.wrapper {
  display: flex;
  flex-wrap: wrap;
}
.img {
  width: 100px;
  height: 100px;
  margin-right: 12px;
  margin-bottom: 12px;
  box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
}
</style>
