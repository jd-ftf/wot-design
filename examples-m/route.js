import Vue from 'vue'
import Router from 'vue-router'
import Index from './pages/index.vue'
import pagesConfig from './pages.config.json'
import Container from './components/container.vue'

Vue.use(Router)

let pagesRouter = []
pagesConfig.forEach(page => {
  pagesRouter.push({
    path: page.path,
    component: () => import(`./pages${page.path}`),
    meta: {
      pageName: page.name
    }
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

export default router
