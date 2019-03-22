<template>
  <div>
    <white-space>
      这是一个单向滑块<code>type="single"</code>，不用加<code>type</code>属性也能使用，
      默认值就为<code>single</code>，同时可以使用<code>value="30"</code>设置滑条的值，
      这个值不能超过设定的<code>maxValue</code>或低于设定的<code>minValue</code>，
      如果不符合会自动设定值为最小值。
    </white-space>
    <white-space>
      <jm-slider type="single" value="30"></jm-slider>
    </white-space>
    <white-space>
      可以通过设定<code>:minValue</code>与<code>:maxValue</code>来设定最小值与最大值，
      注意，这两个值都是<code>Number</code>型的
    </white-space>
    <white-space>
      <jm-slider :minValue="4" :maxValue="677" value="479"></jm-slider>
    </white-space>
    <white-space>
      可以设置标签为不使用<code>:showLabel="false"</code>
    </white-space>
    <white-space>
      <jm-slider :showLabel="false" value="50"></jm-slider>
    </white-space>
    <white-space>
      也可以设置不显示最大最小值<code>:showMinMax="false"</code>
    </white-space>
    <white-space>
      <jm-slider :showMinMax="false"></jm-slider>
    </white-space>
    <white-space>
      设置滑块为禁用状态<code>disabled="false"</code>
    </white-space>
    <white-space>
      <jm-slider :disabled="true" :showLabel="false" value="70"></jm-slider>
    </white-space>
    <white-space>
      可以通过下面的一些<code>JS</code>来操纵这个单向滑块，
      <code>Number: getValue()</code>来获取滑块的值，
      <code>setValue(Number: value)</code>来设定滑块的值，
      <code>disable(Boolean: bool)</code>来设定滑块的禁用与否，滑块禁用后将无法滑动赋值，
      但还是能通过<code>setValue()</code>进行赋值
    </white-space>
    <white-space>
      <jm-slider value="0" ref="slider1"></jm-slider>
    </white-space>
    <white-space>
      <jm-button @click="click11">获取滑块的值</jm-button>
    </white-space>
    <white-space>
      <jm-button @click="click12">将滑块的值设为66</jm-button>
    </white-space>
    <white-space>
      <jm-button @click="click13">禁用/启用滑块</jm-button>
    </white-space>
    <white-space>
      在JS中可以通过<code>addEvent(String: type, function: fn)</code>来添加事件，type的参数有
      slidingstart slidingend sliding，也可以通过 <code>addEvent(function: fn)</code>来添加
      slidingend 事件，添加成功后会返回ID，之后可通过 <code>removeEvent(String: id)</code>
      来移除事件
    </white-space>
    <white-space>
      <div class="color-box" :style="styleColorBox">这是一个可调整颜色的色块</div>
    </white-space>
    <white-space>
      <jm-slider type="single" value="100" ref="slider2"></jm-slider>
    </white-space>
     <white-space>
      <jm-button @click="click21">绑定事件</jm-button>
    </white-space>
    <white-space>
      <jm-button @click="click22">移除事件</jm-button>
    </white-space>
    <white-space>
      接下来介绍的是双向滑块<code>type="double"</code>，这种模块在设定<code>value</code>
      的时候需要用逗号将最大最小值分开，例如 <code>value="39,76"</code>，有空格也是被允许的，
      但如果超过最大最小值，将会自动把值设定为0与100
    </white-space>
    <white-space>
      使用<code>setValue(Number: val1, Number: val2)</code>进行赋值，使用
      <code>Array: getValue()</code>进行取值，取到的是一个长度为2的数组，[0]是较小值，[1]是较大值
    </white-space>
    <white-space>
      <jm-slider type="double" value="39, 76" ref="slider3"></jm-slider>
    </white-space>
    <white-space>
      <jm-button @click="click31">获取滑块的值</jm-button>
    </white-space>
    <white-space>
      <jm-button @click="click32">将滑块的值设为0与100</jm-button>
    </white-space>
  </div>
</template>

<script>
export default {
  data () {
    return {
      sliderDisable: false,
      sliderEvent: '',
      colorValue: 255
    }
  },
  computed: {
    styleColorBox () {
      let c = this.colorValue
      return `background-color: rgb(${c}, ${c}, ${c})`
    }
  },
  methods: {
    click11 () {
      this.$toast({
        msg: this.$refs.slider1.getValue(),
        position: 'bottom'
      })
    },
    click12 () {
      this.$refs.slider1.setValue(66)
    },
    click13 () {
      this.sliderDisable = !this.sliderDisable
      this.$refs.slider1.disable(this.sliderDisable)
    },
    click21 () {
      this.sliderEvent = this.$refs.slider2.addEvent('sliding', (event) => {
        this.colorValue = this.$refs.slider2.getValue() * 255 / 100
      })
    },
    click22 () {
      this.$refs.slider2.removeEvent(this.sliderEvent)
    },
    click31 () {
      this.$toast({
        msg: this.$refs.slider3.getValue(),
        position: 'bottom'
      })
    },
    click32 () {
      this.$refs.slider3.setValue(0, 100)
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
