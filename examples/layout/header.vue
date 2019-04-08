<template>
  <header class="header">
    <div class="header-container">
      <router-link :to="{ path: '/' }" class="logo-block">
        JM Design
      </router-link>
      <ul class="header-tab">
        <li class="header-tab__item" v-for="(page, key) in pages" :key="key">
          <a v-if="page.href" :href="page.href" class="header-tab__link" target="_blank">{{ page.name }}</a>
          <router-link
            v-else
            class="header-tab__link"
            active-class="header-tab__link--active"
            :to="`/${key}`"
          >{{ page.name }}</router-link>
        </li>
      </ul>
    </div>
  </header>
</template>

<script>
import pagesConfig from '../pages.config.json'

export default {
  data () {
    return {
      pages: pagesConfig
    }
  }
}
</script>

<style lang="scss">
@import '../assets/style/layout/header.scss';
</style>
