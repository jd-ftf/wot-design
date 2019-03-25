<template>
  <div>
    <white-space>
      <div slot="desc">circle</div>
      <jm-loading />
      <jm-loading color="#fff" class="loading-black" />
    </white-space>
    <white-space>
      <div slot="descc">spinner</div>
      <jm-loading type="spinner" />
      <jm-loading type="spinner" color="#fff" class="loading-black" />
    </white-space>
    <white-space>
      <div slot="desc">
        <p>JS 手动调用 loading 弹窗</p>
      </div>
      <div class="item">
        <jm-button @click="openLoading">打开loading弹窗</jm-button>
      </div>
    </white-space>
  </div>
</template>

<script>
export default {
  methods: {
    openLoading () {
      this.$loading.open('3s后调用close关闭')
      setTimeout(() => {
        this.$loading.close()
      }, 3000)
    }
  }
}
</script>

<style lang="scss">
.demo {
  .jm-loading-indicator {
    display: inline-block;
    margin: 10px 10px 10px 0;
  }
  .loading-black {
    background: rgba(0, 0, 0, 0.7);
    padding: 10px;
    border-radius: 4px;
  }
}
</style>
