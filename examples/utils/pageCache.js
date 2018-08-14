import pageConfig from '../pages.config.json'

const pageArrCache = {}
const pageObjCache = {}

for (let [pageKey, page] of Object.entries(pageConfig)) {
  if (!page.sideTabs) {
    continue
  }

  pageArrCache[pageKey] = []
  pageObjCache[pageKey] = {}
  let sideTabs = page.sideTabs

  if (sideTabs instanceof Array) {
    let totalPage = 0
    for (let i = 0, len = sideTabs.length; i < len; i++) {
      let groupList = sideTabs[i].groupList

      if (groupList instanceof Array) {
        for (let m = 0, groupLen = groupList.length; m < groupLen; m++) {
          let tabs = Object.keys(groupList[m].children)

          for (let j = 0, tabsLen = tabs.length; j < tabsLen; j++) {
            pageObjCache[pageKey][tabs[j]] = totalPage
            pageArrCache[pageKey].push({
              routeName: tabs[j],
              title: groupList[m].children[tabs[j]].title
            })
            totalPage++
          }
        }
      } else if (groupList instanceof Object) {
        let tabs = Object.keys(groupList)

        for (let j = 0, tabsLen = tabs.length; j < tabsLen; j++) {
          pageObjCache[pageKey][tabs[j]] = totalPage
          pageArrCache[pageKey].push({
            routeName: tabs[j],
            title: groupList[tabs[j]].title
          })
          totalPage++
        }
      }
    }
  } else if (sideTabs instanceof Object) {
    let tabs = Object.keys(sideTabs)

    for (let j = 0, tabsLen = tabs.length; j < tabsLen; j++) {
      pageObjCache[pageKey][tabs[j]] = j
      pageArrCache[pageKey].push({
        routeName: tabs[j],
        title: sideTabs[tabs[j]].title
      })
    }
  }
}

const prevPage = (pageKey, pageName) => {
  let prevIndex = pageObjCache[pageKey][pageName] - 1

  if (prevIndex < 0) {
    return ''
  }

  return pageArrCache[pageKey][prevIndex]
}

const nextPage = (pageKey, pageName) => {
  let nextIndex = pageObjCache[pageKey][pageName] + 1

  if (nextIndex > pageArrCache[pageKey].length - 1) {
    return ''
  }

  return pageArrCache[pageKey][nextIndex]
}

export {
  prevPage,
  nextPage
}
