import Vue from 'vue'
import Router from 'vue-router'
import MainLayout from './layout/main'
import pagesConfig from './pages.config.json'

Vue.use(Router)

const getSideTabs = (page, key) => {
  let sideTabs = []

  if (page.sideTabs instanceof Array) {
    page.sideTabs.forEach(group => {
      let groupList = group.list

      if (!groupList) {
        let list = Object.keys(group).map(name => {
          return {
            path: `/${key}${group[name].path}`,
            name: name,
            component: () => import(`./docs${group[name].path}`),
            meta: {
              demo: group[name].demo
            }
          }
        })

        sideTabs = sideTabs.concat(list)
      } else {
        if (groupList instanceof Array) {
          for (let itemList of groupList) {
            let list = Object.keys(itemList.list).map(name => {
              return {
                path: `/${key}${itemList.list[name].path}`,
                name: name,
                component: () => import(`./docs${itemList.list[name].path}`),
                meta: {
                  demo: itemList.list[name].demo
                }
              }
            })

            sideTabs = sideTabs.concat(list)
          }
        } else {
          let list = Object.keys(group.list).map(name => {
            return {
              path: `/${key}${group.list[name].path}`,
              name: name,
              component: () => import(`./docs${group.list[name].path}`),
              meta: {
                demo: group.list[name].demo
              }
            }
          })

          sideTabs = sideTabs.concat(list)
        }
      }
    })
  } else if (page.sideTabs instanceof Object) {
    sideTabs = Object.keys(page.sideTabs).map(name => {
      return {
        path: `/${key}${page.sideTabs[name].path}`,
        name: name,
        component: () => import(`./docs${page.sideTabs[name].path}`),
        meta: {
          demo: page.sideTabs[name].demo
        }
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
    let redirectUrl
    if (page.sideTabs[0].list) {
      redirectUrl = `/${key}${page.sideTabs[0].list[0].path}`
    } else {
      redirectUrl = `/${key}${Object.values(page.sideTabs[0])[0].path}`
    }
    pages.push({
      path: `/${key}`,
      component: () => import(`./layout/sideTabs`),
      redirect: redirectUrl,
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
      redirect: pages[0].children[0].path,
      children: pages
    }
  ]
})

router.afterEach((to, from) => {
  window.scrollTo(0, 0)
})

export default router
