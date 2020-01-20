<template>
  <header class="header">
    <div class="header-container">
      <router-link :to="{ path: '/' }" class="logo-block">
        <i class="wot-design-logo"></i>
        <span>Wot Design</span>
      </router-link>
      <ul class="header-tab">
        <!-- 搜索 -->
        <li class="header-tab__item">
          <search />
        </li>
        <li class="header-tab__item" v-for="(page, key) in pages" :key="key">
          <a
            v-if="page.href"
            :href="page.href"
            class="header-tab__link"
            target="_blank"
          >{{ page.name }}</a>
          <router-link
            v-else
            class="header-tab__link"
            active-class="header-tab__link--active"
            :to="`/${key}`"
          >{{ page.name }}</router-link>
        </li>
        <!-- 版本控制 -->
        <li class="header-tab__item version-control" v-show="isComponentPage">
          <a href="#" class="header-tab__link" @click="showOption">{{ version }}</a>
          <div class="wot-dropdown" v-show="isShowOption">
            <ul class="wot-dropdown-menu">
              <li
                class="wot-dropdown-item"
                v-for="item in versions"
                :value="item"
                :key="item"
                @click="switchVersion(item)"
              >{{ item }}</li>
            </ul>
            <i class="popper__arrow"></i>
          </div>
        </li>
      </ul>
    </div>
  </header>
</template>

<script>
import pagesConfig from '../pages.config.json'
import versions from '../versions.json'
import search from './search'
const { version } = require('../../../package.json')
export default {
  components: { search },
  data () {
    return {
      pages: pagesConfig,
      versions: this.filter(),
      isComponentPage: true,
      isShowOption: false,
      version
    }
  },
  methods: {
    showOption () {
      this.isShowOption = !this.isShowOption
    },
    filter () {
      const keys = versions
      let result = []
      let preVersionList = []

      keys.forEach(item => {
        const lastIndex = item.lastIndexOf('.')
        const preVersion = item.slice(0, lastIndex)
        const curentPreIndex = preVersionList.indexOf(preVersion)
        if (curentPreIndex === -1) {
          preVersionList.push(preVersion)
          result.push(item)
        } else {
          const lastVersion = item.slice(lastIndex + 1)
          // 当前的 preVersion 如果存在，那么查找目前 result 中存在前两位版本的最后版本数的大小
          result = result.map(itemR => {
            const lastIndexR = itemR.lastIndexOf('.')
            const preVersionR = itemR.slice(0, lastIndexR)
            const lastVersionR = itemR.slice(lastIndexR + 1)
            if (preVersion === preVersionR && lastVersion > lastVersionR) {
              itemR = item
            }
            return itemR
          })
        }
      })
      return result.sort()
    },
    switchVersion (selected) {
      this.isShowOption = !this.isShowOption
      if (selected === this.version) return
      // location.hash
      window.location.href = `${location.origin}/wot-design-mini/${selected}/#/components/introduction`
    }
  }
}
</script>

<style lang="scss">
/**
 * 布局文件 header 的样式
 */
@import '../assets/style/variable';

.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  border-bottom: 1px solid #eee;
  background: $color-bg;
  z-index: 100;
}
.header-container {
  margin: 0 120px;
  height: $layout-header-height;
  line-height: $layout-header-height;
}
.logo-block {
  display: inline-block;
  height: $layout-header-height;
  line-height: $layout-header-height;
  vertical-align: top;
  font-size: 18px;
  color: $color-theme;

  span {
    vertical-align: middle;
  }
}
.wot-design-logo {
  display: inline-block;
  margin-right: 10px;
  width: 40px;
  height: 40px;
  background: url('../assets/img/wot-design.png') no-repeat;
  background-size: cover;
  vertical-align: middle;
}
.header-tab {
  float: right;
}
.header-tab__item {
  position: relative;
  display: inline-block;
}
.header-tab__link {
  position: relative;
  display: inline-block;
  padding: 10px 20px;
  font-size: $fs-title;
  line-height: 25px;
  color: $color-text-light;

  &:hover {
    color: $color-important;
  }
}
.header-tab__link--active {
  color: $color-theme;

  &:hover {
    color: $color-theme;
  }
  &::after {
    position: absolute;
    content: '';
    width: 70%;
    height: 2px;
    left: 15%;
    bottom: 0;
    background: $color-theme;
  }
}
.version-control {
  &:before {
    position: absolute;
    content: ' ';
    top: calc(50% - 8px);
    width: 1px;
    height: 16px;
    background-color: #ebebeb;
  }
}
.wot-dropdown-menu {
  padding: 10px 5px;
  margin: 0 10px;
  border: none;
  background-color: transparent;
  font-size: 14px;
  color: #666;
  position: absolute;
  background-color: #fff;
  border: 1px solid #ebeef5;
  border-radius: 2px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.wot-dropdown-item {
  list-style: none;
  height: 30px;
  line-height: 32px;
  padding: 0 10px;
  margin: 0;
  font-size: 12px;
  color: #464c5b;
  cursor: pointer;
  font-size: 14px;
  outline: none;
  &:hover {
    background-color: #f5f7f9;
    color: #464c5b;
  }
}
.popper__arrow {
  border: 1px solid;
  display: inline-block;
  position: absolute;
  left: 50%;
  bottom: -2px;
  border-width: 6px;
  border-color: transparent;
  border-bottom-color: white;
}
</style>
