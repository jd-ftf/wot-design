<template>
  <div>
    <wd-pull-refresh v-model="isLoading" @refresh="refresh" tip-text="刷新成功">
      <div class="refresh-list">
        <div v-for="(item, index) in list" :key="index" class="refresh-list-item">
          <img :src="item.img" />
          <div>{{ item.text }}</div>
        </div>
      </div>
    </wd-pull-refresh>
  </div>
</template>

<script>
import Dog from '../assets/img/dog.png'

export default {
  data () {
    return {
      isLoading: false,
      list: [
        {
          img: Dog,
          text: '这是一条测试'
        }, {
          img: Dog,
          text: '这是一条测试'
        }, {
          img: Dog,
          text: '这是一条测试'
        }, {
          img: Dog,
          text: '这是一条测试'
        }, {
          img: Dog,
          text: '这是一条测试'
        }, {
          img: Dog,
          text: '这是一条测试'
        }, {
          img: Dog,
          text: '这是一条测试'
        }, {
          img: Dog,
          text: '这是一条测试'
        }, {
          img: Dog,
          text: '这是一条测试'
        }, {
          img: Dog,
          text: '这是一条测试'
        }
      ]
    }
  },
  methods: {
    refresh () {
      setTimeout(() => {
        this.isLoading = false
      }, 1000)
    }
  }
}
</script>

<style lang="scss">
.refresh-list {
  .refresh-list-item {
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
