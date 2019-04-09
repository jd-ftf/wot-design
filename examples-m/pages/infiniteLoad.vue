<template>
  <div>
    <div class="list-container">
      <div class="list">
        <div v-for="item in list" :key="item" class="list-item">{{ item }}</div>
      </div>
      <jm-infinite-load ref="loadmore" @loadmore="loadmore" :loading="loading" />
    </div>
  </div>
</template>

<script>
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
        setTimeout(() => {
          let list = []
          this.num += 15
          for (let i = this.num - 15; i < this.num; i++) {
            list.push(i + 1)
          }
          this.list = this.list.concat(list)
          this.loading = false
          this.time--
        }, 1000)
      } else {
        this.$refs.loadmore.loadEnd()
      }
    }
  }
}
</script>

<style lang="scss">
.list-container {
  height: 500px;
  overflow: auto;

  .list-item {
    position: relative;
    padding: 15px;
    background-color: #fff;
    color: #666;

    &::after {
      position: absolute;
      content: '';
      width: 100%;
      left: 0;
      bottom: 0;
      height: 1px;
      transform: scaleY(0.5);
      background: #eee;
    }
    &:last-child::after {
      opacity: 0;
    }
  }
}
</style>
