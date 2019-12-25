<template>
  <div>
    <white-space>
      <div slot="desc"><code>type</code>默认为 'circle' 类型，可以通过 <code>color</code> 修改指示器颜色</div>
      <wd-loading />
      <wd-loading color="#fff" class="loading-black" />
    </white-space>
    <white-space>
      <div slot="desc">设置<code>type</code>属性为 'spinner'</div>
      <wd-loading type="spinner" />
      <wd-loading type="spinner" color="#fff" class="loading-black" />
    </white-space>
    <white-space>
      <div slot="desc">设置<code>size</code>，修改指示器的大小</div>
      <wd-loading size="20px" />
      <wd-loading size="30px" />
      <wd-loading size="50px" />
    </white-space>
    <white-space>
      <div slot="desc">
        <p>JS 手动调用 loading 弹窗，通过 <code>this.$loading.open(options)</code> 和 <code>this.$loading.close()</code> 开启和关闭</p>
      </div>
      <div class="item">
        <wd-button type="primary" plain @click="openLoading">打开loading弹窗</wd-button>
      </div>
      <div class="item">
        <wd-button type="primary" plain @click="openSpinnerloading">打开Spinner类型的loading弹窗</wd-button>
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
    },
    openSpinnerloading () {
      this.$loading.open({
        msg: '3s后调用close关闭',
        type: 'spinner'
      })
      setTimeout(() => {
        this.$loading.close()
      }, 3000)
    }
  }
}
</script>

<style lang="scss">
.demo {
  .wd-loading {
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
