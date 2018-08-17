import Vue from 'vue'
import Router from 'vue-router'
import Index from './pages/index.vue'
import pagesConfig from './pages.config.json'
import Container from './components/container.vue'

Vue.use(Router)

let pagesRouter = []
pagesConfig.forEach(page => {
  if (page.list && page.list.length > 0) {
    pagesRouter.push({
      path: page.path,
      component: () => import(`./pages${page.path}/index`),
      meta: {
        pageName: page.name
      }
    })
    page.list.forEach(item => {
      pagesRouter.push({
        path: `${page.path}${item.path}`,
        component: () => import(`./pages${page.path}${item.path}`),
        meta: {
          pageName: item.name
        }
      })
    })
  } else {
    pagesRouter.push({
      path: page.path,
      component: () => import(`./pages${page.path}`),
      meta: {
        pageName: page.name
      }
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
