<template>
  <div>
    <white-space>
      如果<code>v-model/value</code>的类型为<code>Number</code>类型，则默认显示一个滑块，
      如果类型为<code>Array</code>，则显示两个滑块，通过<code>v-model</code>设置滑条的值，
      这个值不能超过设定的<code>maxValue</code>或低于设定的<code>minValue</code>，
      如果不符合会自动设定值为最小值。
    </white-space>
    <white-space>
      <jm-slider type="single" v-model="value1"></jm-slider>
    </white-space>
    <white-space>
      可以通过设定<code>:minValue</code>与<code>:maxValue</code>来设定最小值与最大值，
      注意，这两个值都是<code>Number</code>型的
    </white-space>
    <white-space>
      <jm-slider :minValue="4" :maxValue="677" v-model="value2"></jm-slider>
    </white-space>
    <white-space>
      可以设置标签为不使用<code>:showLabel="false"</code>
    </white-space>
    <white-space>
      <jm-slider :showLabel="false" v-model="value3"></jm-slider>
    </white-space>
    <white-space>
      也可以设置不显示最大最小值<code>:showMinMax="false"</code>
    </white-space>
    <white-space>
      <jm-slider :showMinMax="false" v-model="value4"></jm-slider>
    </white-space>
    <white-space>
      设置滑块为禁用状态<code>disabled="false"</code>
    </white-space>
    <white-space>
      <jm-slider :disabled="true" :showLabel="false" v-model="value5"></jm-slider>
    </white-space>
    <white-space>
      <jm-slider v-model="value6"></jm-slider>
    </white-space>
    <white-space>
      可以通过操作自定义属性来操纵这个单向滑块
    </white-space>
    <white-space>
      <jm-slider v-model="value7" :disabled="sliderDisable"></jm-slider>
    </white-space>
    <white-space>
      <jm-button @click="click1">获取滑块的值</jm-button>
    </white-space>
    <white-space>
      <jm-button @click="click2">将滑块的值设为66</jm-button>
    </white-space>
    <white-space>
      <jm-button @click="click3">禁用/启用滑块</jm-button>
    </white-space>
  </div>
</template>

<script>
export default {
  data () {
    return {
      sliderDisable: false,
      sliderEvent: '',
      colorValue: 255,
      value1: 30,
      value2: 479,
      value3: 50,
      value4: 40,
      value5: 70,
      value6: [20, 40],
      value7: 0
    }
  },
  computed: {
    styleColorBox () {
      let c = this.colorValue
      return `background-color: rgb(${c}, ${c}, ${c})`
    }
  },
  methods: {
    click1 () {
      this.$toast({
        msg: this.value7,
        position: 'bottom'
      })
    },
    click2 () {
      this.value7 = 66
    },
    click3 () {
      this.sliderDisable = !this.sliderDisable
    }
  }
}
</script>

<style>
  code {
    color: #0083ff;
    padding: 1px 2px;
    margin: 0 2px;
    border-radius: 2px;
    white-space: nowrap;
    font-size: 0.8em;
    background-color: #f8f8f8;
    -webkit-font-smoothing: initial;
  }
  .color-box {
    box-sizing: border-box;
    height: 50px;
    width: 100%;
    border: 2px solid #0083ff;
    border-radius: 2px;
    background-color: #fff;
    line-height: 46px;
    text-align: center;
    color: #0083ff;
    -webkit-font-smoothing: initial;
  }
</style>
