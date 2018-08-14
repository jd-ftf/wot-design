import Vue from 'vue'
import Router from 'vue-router'
import Index from './pages/index.vue'
import pagesConfig from './pages.config.json'

Vue.use(Router)

let pagesRouter = []
pagesConfig.forEach(page => {
  if (page.list && page.list.length > 0) {
    pagesRouter.push({
      path: page.path,
      component: () => import(`./pages${page.path}/index`)
    })
    page.list.forEach(item => {
      pagesRouter.push({
        path: `${page.path}${item.path}`,
        component: () => import(`./pages${page.path}${item.path}`)
      })
    })
  } else {
    pagesRouter.push({
      path: page.path,
      component: () => import(`./pages${page.path}`)
    })
  }
})

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    ...pagesRouter
  ]
})

export default router
