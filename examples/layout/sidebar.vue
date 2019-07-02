<template>
  <ul class="side-bar" :class="isMac ? '' : 'win-scrollbar'">
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
import { isMac } from '../utils/index'

export default {
  data () {
    return {
      pages: pageConfig,
      parentKey: '',
      isMac: isMac
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
@import '../assets/style/_variable.scss';

.side-bar {
  position: fixed;
  left: 120px;
  top: $layout-header-height;
  bottom: 0;
  border-right: 1px solid #eee;
  width: 210px;
  padding-top: 20px;
  padding-bottom: 100px;
  overflow-x: hidden;
  overflow-y: auto;
  background: $color-bg;
}
.side-bar__group-name {
  display: block;
  margin: 16px 0;
  font-size: $fs-title;
  font-weight: 600;
}
.side-group__link {
  display: block;
  margin: 16px 0;
}
.side-group__link--active {
  color: $color-theme;
}
.side-bar__item-list {
  margin-top: 26px;
}
.side-bar__item-listist-name {
  color: $color-black-l7;
}
</style>
