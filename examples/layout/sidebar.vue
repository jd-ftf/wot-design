<template>
  <ul class="side-bar">
    <li v-for="(group, index) in pages[$route.path.split('/')[1]].sideTabs" class="side-bar__item" :key="index">
      <template v-if="group.list">
        <a class="side-bar__group-name">{{ group.name }}</a>
        <template v-if="group.list instanceof Array">
          <div v-for="(itemList, itemListIndex) in group.list" class="side-bar__item-list" :key="itemListIndex">
            <a class="side-bar__item-listist-name">{{ itemList.name }}</a>
            <ul class="side-group">
              <li v-for="(tab, key) in itemList.list" class="side-group__item" :key="key">
                <router-link
                  class="side-group__link"
                  active-class="side-group__link--active"
                  :to="{ name: key }"
                >{{ tab.name }}</router-link>
              </li>
            </ul>
          </div>
        </template>
        <ul v-else class="side-group">
          <li v-for="(tab, key) in group.list" class="side-group__item" :key="key">
            <router-link
              class="side-group__link"
              active-class="side-group__link--active"
              :to="{ name: key }"
            >{{ tab.name }}</router-link>
          </li>
        </ul>
      </template>
      <template v-else>
        <router-link
          v-if="group.name"
          class="side-group__link"
          active-class="side-group__link--active"
          :to="{ name: index }"
        >{{ group.name }}</router-link>
        <template v-else>
          <router-link
            v-for="(tab, key) in group"
            :key="key"
            class="side-group__link side-group__link--title"
            active-class="side-group__link--active"
            :to="{ name: key }"
          >{{ tab.name }}</router-link>
        </template>
      </template>
    </li>
  </ul>
</template>

<script>
import pageConfig from '../pages.config.json'

export default {
  data () {
    return {
      pages: pageConfig,
      parentKey: ''
    }
  },
  watch: {

  },
  created () {
    this.parentKey = this.$route.path.split('/')[1]
  }
}
</script>

<style lang="scss">
@import '../assets/style/layout/sidebar.scss';
</style>
