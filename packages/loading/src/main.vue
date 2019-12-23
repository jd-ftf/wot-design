<template>
  <transition name="loading">
    <div class="wd-loading" v-show="show">
      <div class="wd-loading__wrap" :class="{ 'is-with-msg': !!msg }">
        <wd-loading :type="type" />
        <div v-if="msg" class="wd-loading__msg">
          {{ msg }}
        </div>
      </div>
      <div class="wd-loading__mask"></div>
    </div>
  </transition>
</template>

<script>
import WdLoading from './indicator'

export default {
  props: {
    msg: String,
    type: String,
    show: Boolean
  },
  components: {
    WdLoading
  }
}
</script>
