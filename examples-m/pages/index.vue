<template>
  <div>
    <div class="module" v-for="componentModule in pagesConfig" :key="componentModule.name">
      <h2 class="module-title">{{ componentModule.module }}</h2>
      <list-link :list="componentModule.list"></list-link>
    </div>
  </div>
</template>

<script>
import ListLink from '../components/listLink'
import pagesConfig from '../pages.config.json'

export default {
  data () {
    return {
      pagesConfig: pagesConfig
    }
  },
  components: {
    ListLink
  }
}
</script>

<style lang="scss">
.module {
  & + .module {
    margin-top: 20px;
  }
  .module-title {
    padding: 0 15px;
    margin: 10px 0;
    font-size: 14px;
    color: #333;
    font-weight: 400;
  }
}
</style>
