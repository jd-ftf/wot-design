<template>
  <div>
    <div class="page__hd">
      <div class="page__title">
        <i class="logo"></i>
        <span class="inline">Wot Design</span>
      </div>
      <div class="page__desc">该组件库根据京东商家侧的UI设计规范（京麦移动端设计规范）开发，旨在给商家提供统一的UI交互，同时提高研发的开发效率。</div>
    </div>
    <div class="page__bd">
      <div
        class="kind-list__item"
        v-for="(componentModule, index) in pagesConfig"
        :key="componentModule.name"
      >
        <div class="kind-list__item-hd" @click="toggleList(index)">
          <div class="kind-list__item-title">{{ componentModule.title }}</div>
          <i
            class="kind-list__item-icon"
            :style="{ 'background-image': `url(${componentModule.icon})` }"
          ></i>
        </div>
        <ul class="kind-list__item-bd" ref="moduleList" @transitionend="onTransitionend">
          <li class="kind-list__list-item" v-for="(item, index) in componentModule.children" :key="index">
            <router-link class="kind-list__list-item-link" :to="`/${item.name}`">
              <div>{{ item.title }}</div>
              <i class="wd-icon-arrow-right custom-icon-right"></i>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import routesConfig from '../routes.yml'

export default {
  name: 'index',
  data () {
    return {
      pagesConfig: routesConfig,
      scrollTop: 0
    }
  },
  methods: {
    toggleList (index) {
      let el = this.$refs.moduleList[index]
      let isShow = el.style.display === 'block'
      if (isShow) {
        el.style.height = el.scrollHeight + 'px'

        setTimeout(() => {
          el.style.height = 0
        }, 10)
      } else {
        el.style.display = 'block'
        el.style.height = 0

        setTimeout(() => {
          el.style.height = el.scrollHeight + 'px'
        }, 10)
      }
    },
    onTransitionend (event) {
      let el = event.target

      if (el.clientHeight === 0) {
        el.style.display = 'none'
      } else {
        el.style.height = ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.page__hd {
  padding: 40px 40px 30px;
  margin-bottom: 30px;
  background: #fff;

  .page__title {
    text-align: left;
    font-size: 20px;
    font-weight: 400;
    color: #0083ff;
  }
  .logo {
    display: inline-block;
    width: 40px;
    height: 40px;
    margin-right: 10px;
    background: url('../assets/img/wot-design.png') no-repeat;
    background-size: cover;
    vertical-align: middle;
  }
  .inline {
    display: inline-block;
    vertical-align: middle;
  }
  .page__desc {
    margin-top: 20px;
    color: #999;
    text-align: left;
    font-size: 12px;
    line-height: 1.42;
  }
}
.page__bd {
  padding: 0 15px;
  user-select: none;

  .kind-list__item {
    margin: 20px 0;
    border-radius: 30px;
    background: #fff;
    overflow: hidden;

    &:first-child {
      margin-top: 0;
    }
  }
  .kind-list__item-hd {
    display: flex;
    padding: 15px 30px;
    justify-content: space-between;
    align-items: center;
  }
  .kind-list__item-title {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.85);
  }
  .kind-list__item-icon {
    display: block;
    width: 20px;
    height: 20px;
    background-size: cover;
    background-repeat: no-repeat;
  }
  .kind-list__item-bd {
    display: none;
    width: 100%;
    transition: height 0.3s;
    overflow: hidden;
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .kind-list__list-item {
    position: relative;

    &::after {
      position: absolute;
      content: '';
      height: 1px;
      left: 15px;
      right: 15px;
      bottom: 0;
      background: #eee;
      transform: scaleY(0.5);
    }
    &:last-cchild::after {
      display: none;
    }
  }
  .kind-list__list-item-link {
    display: flex;
    padding: 15px 20px;
    background: #fff;
    justify-content: space-between;
    align-items: center;
    color: rgba(0, 0, 0, 0.65);
    font-size: 12px;
    text-decoration: none;
    -webkit-tap-highlight-color: transparent;

    &:active {
      background: rgba(77, 128, 240, 0.02);
    }
  }
  .custom-icon-right {
    color: #aaa;
    font-size: 14px;
    width: 14px;
    height: 14px;
  }
}
</style>
