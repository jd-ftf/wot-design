<template>
  <div>
    <demo-block title="图片懒加载，引用 vue-lazyload 组件，并做了默认加载图设置">
      <div>
        <div class="lazyload-item" v-for="item in imgs" :key="item">
          <img v-lazy="item" class="lazyload-img" />
        </div>
      </div>
    </demo-block>
  </div>
</template>

<script>
export default {
  data () {
    return {
      imgs: [
        'https://img30.360buyimg.com/popXue/jfs/t1/33198/10/12030/268559/5ce7cc9fE1ce41ce7/8e87f20e4c0921de.jpg',
        'https://img30.360buyimg.com/popXue/jfs/t1/50345/6/1100/276789/5ceddedbE88081452/c7cbf2a916e95c89.jpg',
        'https://img30.360buyimg.com/popXue/jfs/t1/50345/6/1100/276789/5ceddedbE88081452/c7cbf2a916e95c8123aa9.jpg',
        'https://img30.360buyimg.com/popXue/jfs/t1/84548/16/579/175470/5cec8a91E5204c180/448fb602fab4f9e1.jpg',
        'https://img30.360buyimg.com/popXue/jfs/t1/53645/13/1208/168686/5cef2e9dEc4f71846/6650554817be5e76.jpg',
        'https://img30.360buyimg.com/popXue/jfs/t29878/318/1237453121/304417/d783a160/5cda606bNfef58100.jpg',
        'https://img30.360buyimg.com/popXue/jfs/t1/48387/5/957/44686/5ceb3fa7Ec141027d/fa71e81772b38d94.jpg',
        'https://img30.360buyimg.com/popXue/jfs/t1/74919/40/489/306561/5ceb8265E8ed3b685/d94ba1707abe2c42.png'
      ]
    }
  }
}
</script>

<style lang="scss">
.lazyload-item {
  margin: 20px 0;
}
.lazyload-img {
  width: 100%;
  height: 36.5vw;
  border-radius: 2px;
  object-fit: cover;
}
</style>
