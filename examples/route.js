import Vue from 'vue'
import Router from 'vue-router'
import MainLayout from './layout/main'
import pagesConfig from './pages.config.json'

Vue.use(Router)

const getSideTabs = (page, key) => {
  let sideTabs = []

  if (page.sideTabs instanceof Array) {
    page.sideTabs.forEach(group => {
      let groupList = group.groupList

      if (groupList instanceof Array) {
        for (let itemList of groupList) {
          let list = Object.keys(itemList.children).map(name => {
            return {
              path: `/${key}${itemList.children[name].path}`,
              name: name,
              component: () => import(`./docs${itemList.children[name].path}`)
            }
          })

          sideTabs = sideTabs.concat(list)
        }
      } else {
        let list = Object.keys(group.groupList).map(name => {
          return {
            path: `/${key}${group.groupList[name].path}`,
            name: name,
            component: () => import(`./docs${group.groupList[name].path}`)
          }
        })

        sideTabs = sideTabs.concat(list)
      }
    })
  } else if (page.sideTabs instanceof Object) {
    sideTabs = Object.keys(page.sideTabs).map(name => {
      return {
        path: `/${key}${page.sideTabs[name].path}`,
        name: name,
        component: () => import(`./docs${page.sideTabs[name].path}`)
      }
    })
  }

  return sideTabs
}

let pages = []
Object.entries(pagesConfig).forEach(([key, page]) => {
  if (page.href) {
    return
  }

  if (!page.sideTabs) {
    pages.push({
      path: page.path,
      component: () => import(`./pages${page.path}`)
    })

    return
  }

  let sideTabs = getSideTabs(page, key)

  if (page.sideTabs instanceof Array) {
    pages.push({
      path: `/${key}`,
      component: () => import(`./layout/sideTabs`),
      redirect: `/${key}${Object.values(Object.values(page.sideTabs)[0].groupList)[0].path}`,
      children: sideTabs
    })
  } else if (page.sideTabs instanceof Object) {
    pages.push({
      path: `/${key}`,
      component: () => import(`./layout/sideTabs`),
      redirect: `/${key}${Object.values(page.sideTabs)[0].path}`,
      children: sideTabs
    })
  }
})

const router = new Router({
  routes: [
    {
      path: '/',
      component: MainLayout,
      redirect: '/index',
      children: [
        {
          path: '/index',
          component: () => import(`./pages/index`)
        },
        ...pages
      ]
    }
  ]
})

router.afterEach((to, from) => {
  window.scrollTo(0, 0)
})

export default router
