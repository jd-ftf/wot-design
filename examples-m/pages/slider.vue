<template>
  <div>
    <white-space>
      这是一个单向滑块<code>type="single"</code>，不用加<code>type</code>属性也能使用，
      默认值就为<code>single</code>，同时可以使用<code>value="30"</code>设置滑条的值，
      这个值不能超过设定的<code>maxValue</code>或低于设定的<code>minValue</code>，
      如果不符合会自动设定值为最小值。
    </white-space>
    <white-space >
      <jm-slider type="single" value="30"></jm-slider>
    </white-space>
    <white-space>
      可以通过设定<code>:minValue</code>与<code>:maxValue</code>来设定最小值与最大值，
      注意，这两个值都是<code>Number</code>型的
    </white-space>
    <white-space >
      <jm-slider :minValue="4" :maxValue="677" value="479"></jm-slider>
    </white-space>
    <white-space>
      可以设置label为不使用<code>showLabel="false"</code>
    </white-space>
    <white-space>
      <jm-slider :showLabel="false" value="50"></jm-slider>
    </white-space>
    <white-space>
      也可以设置不显示最大最小值<code>showMinMax="false"</code>
    </white-space>
    <white-space>
      <jm-slider :showMinMax="false"></jm-slider>
    </white-space>
    <white-space>
      设置slider为禁用状态<code>disabled="false"</code>
    </white-space>
    <white-space>
      <jm-slider :disabled="true" value="70"></jm-slider>
    </white-space>
  </div>
</template>

<script>
export default {
  mounted () {
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
</style>
