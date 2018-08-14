<template>
  <div>
    <side-bar parentKey="components"></side-bar>
    <div class="tab-content">
      <div class="jm-markdown">
        <router-view></router-view>
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
  padding-top: 20px;
  overflow: hidden;
  margin: 0 150px 100px 320px;
}
</style>
