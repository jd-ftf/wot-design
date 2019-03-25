<template>
  <div>
    <list-link :list="list"></list-link>
  </div>
</template>

<script>
import ListLink from '../components/listLink'
import pagesConfig from '../pages.config.json'

export default {
  data () {
    return {
      list: pagesConfig
    }
  },
  components: {
    ListLink
  }
}
</script>
