<template>
  <div>
    <white-space>
      <wd-button @click="show"></wd-button>
    </white-space>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {
    show () {
      
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
.demo .wd-button {
  margin: 10px 0;
}
</style>
