<template>
  <ul class="examples-list">
    <li class="examples-list__item" v-for="(item, index) in list" :key="index">
      <router-link class="examples-list__link" :to="item.path">{{ item.name }}</router-link>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    list: Array
  }
}
</script>

<style lang="scss">
.examples-list {
  width: 100%;
  overflow: hidden;
}
.examples-list__item {
  position: relative;

  &::after{
    position: absolute;
    content: '';
    height: 1px;
    left: 15px;
    right: 15px;
    bottom: 0;
    background: #eee;
  }
}
.examples-list__link{
  display: block;
  padding: 15px;
  background: #fff;
}
</style>
