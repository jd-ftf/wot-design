<template>
  <div>
    <white-space>
      <div slot="desc">
        如果<code>v-model/value</code>的类型为<code>Number</code>类型，则默认显示一个滑块，
        如果类型为<code>Array</code>，则显示两个滑块，通过<code>v-model</code>设置滑条的值，
        这个值不能超过设定的<code>maxValue</code>或低于设定的<code>minValue</code>，
        如果不符合会自动设定值为最小值。
      </div>
      <jm-slider v-model="value1" />
    </white-space>
    <white-space>
      <div slot="desc">
        可以通过设定<code>:minValue</code>与<code>:maxValue</code>来设定最小值与最大值，
        注意，这两个值都是<code>Number</code>型的
      </div>
      <jm-slider v-model="value2" :min-value="4" :max-value="677" />
    </white-space>
    <white-space>
      <div slot="desc">
        可以设置标签为不使用<code>hide-label</code>
      </div>
      <jm-slider v-model="value3" hide-label />
    </white-space>
    <white-space>
      <div slot="desc">
        也可以设置不显示最大最小值<code>hide-min-max</code>
      </div>
      <jm-slider v-model="value4" hide-min-max />
    </white-space>
    <white-space>
      <div slot="desc">
        设置滑块为禁用状态<code>disabled</code>
      </div>
      <jm-slider v-model="value5" disabled />
    </white-space>
    <white-space>
      <div slot="desc">
        双向滑块
      </div>
      <jm-slider v-model="value6" />
    </white-space>
  </div>
</template>

<script>
export default {
  data () {
    return {
      sliderDisable: false,
      colorValue: 255,
      value1: 30,
      value2: 479,
      value3: 50,
      value4: 40,
      value5: 70,
      value6: [20, 40],
      value7: 0
    }
  }
}
</script>

<style lang="scss">
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
.demo .jm-button {
  margin: 10px 0;
}
</style>
