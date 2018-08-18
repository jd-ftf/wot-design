<template>
  <div class="page-controller">
    <div v-if="prevPage" class="page-controller__prev">
      <router-link class="page-controller__link" :to="{ name: prevPage.routeName }">
        <i class="iconfont icon-arrow-left"></i>
        <span>{{ prevPage.name }}</span>
      </router-link>
    </div>
    <div v-if="nextPage" class="page-controller__next">
      <router-link class="page-controller__link" :to="{ name: nextPage.routeName }">
        <span>{{ nextPage.name }}</span>
        <i class="iconfont icon-arrow-right"></i>
      </router-link>
    </div>
  </div>
</template>

<script>
import { prevPage, nextPage } from '../utils/pageCache'

export default {
  computed: {
    prevPage () {
      let parentKey = this.$route.path.split('/')[1]
      let routeName = this.$route.name

      return prevPage(parentKey, routeName)
    },
    nextPage () {
      let parentKey = this.$route.path.split('/')[1]
      let routeName = this.$route.name

      return nextPage(parentKey, routeName)
    }
  }
}
</script>

<style lang="scss">
@import '../assets/style/layout/pageController.scss';
</style>
