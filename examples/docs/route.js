import Vue from 'vue'
import Router from 'vue-router'
import MainLayout from './layout/main'
import routesConfig from './routes.yml'
import { trigger } from './utils/event'

Vue.use(Router)

function getSideTabs (menu, parentName, sideTabs = []) {
  menu.children.forEach(item => {
    if (item.type === 'module' || item.type === 'group') {
      sideTabs = sideTabs.concat(getSideTabs(item, parentName))
    } else if (item.type === 'page') {
      sideTabs.push({
        path: `/${parentName}/${item.name}`,
        name: `${parentName}-${item.name}`,
        component: () => import(`./pages/${item.name}`),
        meta: {
          demo: typeof item.demo !== 'boolean' && (item.demo || `/${item.name}`),
          title: item.title,
          parentName
        }
      })
    } else {
      sideTabs.push({
        path: `/${parentName}/${item.name}`,
        name: `${parentName}-${item.name}`,
        component: () => import(`./docs/${item.name}`),
        meta: {
          demo: typeof item.demo !== 'boolean' && (item.demo || `/${item.name}`),
          title: item.title,
          parentName
        }
      })
    }
  })

  return sideTabs
}

let pages = []
routesConfig.forEach(menu => {
  if (menu.type === 'link') return

  if (menu.type === 'page') {
    pages.push({
      path: `/${menu.name}`,
      name: menu.name,
      component: () => import(`./pages/${menu.name}`),
      meta: {
        title: menu.title
      }
    })

    return
  }

  if (menu.children) {
    let sideTabs = getSideTabs(menu, menu.name)

    pages.push({
      path: `/${menu.name}`,
      name: menu.name,
      component: () => import(`./layout/sideTabs`),
      redirect: sideTabs[0].path,
      children: sideTabs
    })
  }
})

const router = new Router({
  routes: [
    {
      path: '/',
      component: MainLayout,
      redirect: pages[0].children[0].path,
      children: pages
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched && typeof to.matched[to.matched.length - 1].components.default === 'function') {
    trigger('asyncComponentLoading')
  }
  next()
})
router.beforeResolve((to, from, next) => {
  trigger('asyncComponentLoaded')
  next()
})

export default router
