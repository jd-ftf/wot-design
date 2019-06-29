import Vue from 'vue'
import Router from 'vue-router'
import Index from './pages/index.vue'
import pagesConfig from './pages.config.json'
import Container from './components/container.vue'

Vue.use(Router)

let pagesRouter = []
pagesConfig.forEach(componentModule => {
  componentModule.list.forEach(page => {
    pagesRouter.push({
      path: page.path,
      component: () => import(`./pages${page.path}`),
      meta: {
        pageName: page.name
      }
    })
  })
})

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '',
      component: Container,
      children: [
        ...pagesRouter
      ]
    }
  ]
})

let indexScrollTop = 0

router.beforeEach((to, from, next) => {
  if (from.name === 'Index') {
    indexScrollTop = document.body.scrollTop || document.documentElement.scrollTop
  }
  next()
})

router.afterEach((to, from) => {
  let scrollTop = 0
  if (to.name === 'Index') {
    scrollTop = indexScrollTop
  }
  setTimeout(() => {
    window.scrollTo(0, scrollTop)
  }, 0)
})

export default router
