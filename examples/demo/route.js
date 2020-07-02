import Vue from 'vue'
import Router from 'vue-router'
import Index from './pages/index.vue'
import routesConfig from './routes.yml'
import Container from './components/container.vue'

Vue.use(Router)

let pagesRouter = []
routesConfig.forEach(componentModule => {
  componentModule.children.forEach(page => {
    pagesRouter.push({
      path: `/${page.name}`,
      component: () => import(`./pages/${page.name}`),
      meta: {
        title: page.title,
        ...page.meta
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
    },
    {
      path: '*',
      redirect: {
        name: 'Index'
      }
    }
  ]
})

router.afterEach(() => {
  window.scrollTo(0, 0)
})

export default router
