## Slider 滑块

支持单向滑块和双向滑块。

### 使用

#### 按需引入

```javascript
import Vue from 'vue'
import { Slider } from 'jm-design'

Vue.use(Slider)
```

#### 示例

```html
<template>
  <div>
    <white-space>
      <div slot="desc">
        如果<code>v-model/value</code>的类型为<code>Number</code>类型，则默认显示一个滑块，
        如果类型为<code>Array</code>，则显示两个滑块，通过<code>v-model</code>设置滑条的值，
        这个值不能超过设定的<code>maxValue</code>或低于设定的<code>minValue</code>，
        如果不符合会自动设定值为最小值。
      </div>
      <jm-slider type="single" v-model="value1"></jm-slider>
    </white-space>
    <white-space>
      <div slot="desc">
        可以通过设定<code>:minValue</code>与<code>:maxValue</code>来设定最小值与最大值，
        注意，这两个值都是<code>Number</code>型的
      </div>
      <jm-slider :minValue="4" :maxValue="677" v-model="value2"></jm-slider>
    </white-space>
    <white-space>
      <div slot="desc">
        可以设置标签为不使用<code>:showLabel="false"</code>
      </div>
      <jm-slider :showLabel="false" v-model="value3"></jm-slider>
    </white-space>
    <white-space>
      <div slot="desc">
        也可以设置不显示最大最小值<code>:showMinMax="false"</code>
      </div>
      <jm-slider :showMinMax="false" v-model="value4"></jm-slider>
    </white-space>
    <white-space>
      <div slot="desc">
        设置滑块为禁用状态<code>disabled="false"</code>
      </div>
      <jm-slider :disabled="true" :showLabel="false" v-model="value5"></jm-slider>
    </white-space>
    <white-space>
      <div slot="desc">
        双向滑块
      </div>
      <jm-slider v-model="value6"></jm-slider>
    </white-space>
    <white-space>
      <div slot="desc">
        可以通过操作自定义属性来操纵这个单向滑块
      </div>
      <div>
        <jm-slider v-model="value7" :disabled="sliderDisable"></jm-slider>
        <jm-button @click="click1">获取滑块的值</jm-button>
        <jm-button @click="click2">将滑块的值设为66</jm-button>
        <jm-button @click="click3">禁用/启用滑块</jm-button>
      </div>
    </white-space>
  </div>
</template>

<script>
export default {
  data () {
    return {
      sliderDisable: false,
      value1: 30,
      value2: 479,
      value3: 50,
      value4: 40,
      value5: 70,
      value6: [20, 40],
      value7: 0
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
```

### Attributes
| 参数      | 说明                                 | 类型      | 可选值       | 默认值   |
|---------- |------------------------------------ |---------- |------------- |-------- |
| value / v-model      |	滑块值，如果为array，则为双向滑块                |	number / array    |	—           |	—       |
| show-min-max	    | 是否显示左右的最大最小值                      |	boolean    |	-         |	true |
| show-label      | 是否显示当前滑块值                  | boolean | - | true |
| disabled   | 是否禁用                  | boolean | - | false |
| max-value      | 最大值        | number | - | 100 |
| min-value       | 最小值  | number | - | 0 |
| step           | 步进值        | number | - | 1 |