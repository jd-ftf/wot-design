<template>
  <div>
    <div class="list-container">
      <div class="list">
        <div v-for="(item, index) in list" :key="index" class="list-item">
          <img :src="item.img" />
          <div>{{ item.text }}</div>
        </div>
      </div>
      <wd-infinite-load ref="loadmore" @loadmore="loadmore" :loading="loading" />
    </div>
  </div>
</template>

<script>
import Dog from '../assets/img/dog.png'

let errored = false

export default {
  data () {
    return {
      list: [],
      num: 0,
      loading: false,
      time: 3
    }
  },
  methods: {
    loadmore () {
      this.loading = true

      if (this.time) {
        if (this.time === 1 && !errored) {
          this.$refs.loadmore.loadError()
          errored = true
        } else {
          setTimeout(() => {
            let list = []
            this.num += 15
            for (let i = this.num - 15; i < this.num; i++) {
              list.push({
                img: Dog,
                text: `这是一条测试${i + 1}`
              })
            }
            this.list = this.list.concat(list)
            this.loading = false
            this.time--
          }, 1000)
        }
      } else {
        this.$refs.loadmore.loadEnd()
      }
    }
  }
}
</script>

<style lang="scss">
.list-container {
  height: calc(100vh - 44px);
  overflow: auto;

  .list-item {
    position: relative;
    display: flex;
    padding: 10px 15px;
    background: #fff;
    color: #464646;

    &::after {
      position: absolute;
      display: block;
      content: '';
      height: 1px;
      left: 0;
      width: 100%;
      bottom: 0;
      background: #eee;
      transform: scaleY(0.5);
    }
    &:last-child::after {
      display: none;
    }
    img {
      display: block;
      width: 120px;
      height: 78px;
      margin-right: 15px;
    }
    div {
      flex: 1;
    }
  }
}
</style>
