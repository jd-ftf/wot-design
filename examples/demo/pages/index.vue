<template>
  <div>
    <div class="page__hd">
      <div class="page__title">
        <i class="logo"></i>
        <span class="inline">Wot Design</span>
      </div>
      <div class="page__desc">该组件库基于Vue.js构建，旨在给开发者提供统一的页面风格。</div>
    </div>
    <div class="page__bd">
      <div class="kind-list__item" v-for="(componentModule, index) in pagesConfig" :key="componentModule.name">
        <div class="kind-list__item-hd" @click="toggleList(index)">
          <div class="kind-list__item-title">{{ componentModule.module }}</div>
          <i class="kind-list__item-icon" :style="{ 'background-image': `url(${componentModule.icon})` }"></i>
        </div>
        <ul class="kind-list__item-bd" ref="moduleList" @transitionend="onTransitionend">
          <li class="kind-list__list-item" v-for="(item, index) in componentModule.list" :key="index">
            <router-link class="kind-list__list-item-link" :to="item.path">
              <div>{{ item.name }}</div>
              <div>
                <wd-icon name="arrow-right" color="#aaa" />
              </div>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import pagesConfig from '../pages.config.json'

export default {
  data () {
    return {
      pagesConfig: pagesConfig,
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
  padding: 40px;

  .page__title {
    text-align: left;
    font-size: 20px;
    font-weight: 400;
  }
  .logo {
    display: inline-block;
    width: 40px;
    height: 40px;
    margin-right: 10px;
    background: url('//img10.360buyimg.com/jmadvertisement/jfs/t1/82922/30/10408/3741/5d80773eEdb7b4adc/146728fcc132a4e0.png') no-repeat;
    background-size: cover;
    vertical-align: middle;
  }
  .inline {
    display: inline-block;
    vertical-align: middle;
  }
  .page__desc {
    margin-top: 5px;
    color: #888888;
    text-align: left;
    font-size: 14px;
  }
}
.page__bd {
  padding: 0 15px 30px;

  .kind-list__item {
    margin: 10px 0;
    border-radius: 2px;
    background: #fff;

    &:first-child {
      margin-top: 0;
    }
  }
  .kind-list__item-hd {
    display: flex;
    padding: 20px;
    justify-content: space-between;
    align-items: center;
  }
  .kind-list__item-title {
    font-size: 14px;
  }
  .kind-list__item-icon {
    display: block;
    width: 30px;
    height: 30px;
    background-size: cover;
    background-repeat: no-repeat;
  }
  .kind-list__item-bd {
    display: none;
    width: 100%;
    transition: height .3s;
    overflow: hidden;
  }
  .kind-list__list-item {
    position: relative;

    &::after{
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
    padding: 15px;
    background: #fff;
    justify-content: space-between;
  }
}
</style>
