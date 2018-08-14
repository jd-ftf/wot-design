<template>
  <list-link :list="list"></list-link>
</template>

<script>
import ListLink from '../../components/listLink'

export default {
  data () {
    return {
      list: [
        {
          name: 'a',
          path: '/messageBox/a'
        }
      ]
    }
  },
  components: {
    ListLink
  }
}
</script>
