<template>
  <div>
    <demo-block title="基本使用">
      <wd-anchor :data="data" v-model="value">
        <div class="anchor-content">
          <div v-for="item in data" :id="item.id">{{item.title}}的内容</div>
        </div>
      </wd-anchor>
    </demo-block>
    <demo-block title="数量大于6时可滑动">
      <wd-anchor :data="data1" v-model="value1">
        <div class="anchor-content">
          <div v-for="item in data1" :id="item.id">{{item.title}}的内容</div>
        </div>
      </wd-anchor>
    </demo-block>
    <demo-block title="点击事件">
      <wd-anchor :data="data2" v-model="value2" @click="handleClick">
        <div class="anchor-content">
          <div v-for="item in data2" :id="item.id">{{item.title}}的内容</div>
        </div>
      </wd-anchor>
    </demo-block>
  </div>
</template>

<script>
export default {
  data () {
    return {
      data: [
        {
          id: '0',
          title: '标签一'
        },
        {
          id: '1',
          title: '标签二'
        },
        {
          id: '2',
          title: '标签三'
        }
      ],
      data1: [
        {
          id: 'a',
          title: '标签一'
        },
        {
          id: 'b',
          title: '标签二'
        },
        {
          id: 'c',
          title: '标签三'
        },
        {
          id: 'd',
          title: '标签四'
        },
        {
          id: 'e',
          title: '标签五'
        },
        {
          id: 'f',
          title: '标签六'
        }
      ],
      data2: [
        {
          id: '3',
          title: '标签一'
        },
        {
          id: '4',
          title: '标签二'
        }
      ],
      value: '0',
      value1: 'a',
      value2: '3'
    }
  },
  methods: {
    handleClick (index) {
      this.$toast(`点击了标签${index + 1}`)
    }
  }
}
</script>
<style lang="scss">
.anchor-content div {
  width: 345px;
  height: 250px;
  line-height: 250px;
  text-align: center;
  margin-bottom: 10px;
  background-color:whitesmoke;
}
</style>
