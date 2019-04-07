<template>
  <div>
    <side-bar parentKey="components"></side-bar>
    <div class="tab-content">
      <div class="flex">
        <div class="jm-markdown">
          <router-view></router-view>
        </div>
        <div class="demo-iframe" v-show="$route.meta.demo">
          <iframe frameborder="0" :src="`/examples${$route.meta.demo}`" width="320" height="544"></iframe>
        </div>
      </div>
      <page-controller></page-controller>
    </div>
  </div>
</template>

<script>
import SideBar from './sidebar'
import PageController from './pageController'

export default {
  components: {
    SideBar,
    PageController
  }
}
</script>

<style lang="scss">
.tab-content{
  overflow: hidden;
  margin: 0 150px 100px 320px;
}
</style>
