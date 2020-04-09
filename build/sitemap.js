/**
 * 页面配置获取地址表
 * @param {Array} routes 路径地址数组
 * @param {String} pre 地址前缀
 */
const siteMapUrls = (routes, pre) => {
  return routes.reduce((array, route) => {
    if (route.list instanceof Array) {
      array.push(...siteMapUrls(route.list, pre))
    } else {
      if (route.list) {
        array.push(...siteMapUrls([route.list], pre))
      } else {
        // list下未含内容
        const keys = Object.keys(route) || []
        keys.forEach(key => {
          const path = `${pre}/components${route[key].path}`
          array.push(path)
        })
      }
    }

    return array
  }, [])
}

/**
 * 路由获取地址列表
 * @param {Vue Router} routes 路由对象
 * @param {*} pre 路由拼接前缀
 */
const siteMapRouterUrls = (routes, pre) => {
  return routes.reduce((array, route) => {
    let path

    if (route.path !== '/') {
      path = `${pre}${route.path}`
    } else {
      path = pre
    }

    path = path.replace('//components', '/#')

    if (route.path !== '*') {
      array.push(path)
    }

    if (route.children) {
      array.push(...siteMapUrls(route.children, `${path}`))
    }

    return array
  }, [])
}

// 根据路由列表生成sitemap
const createSitemapXml = (routeList) => {
  const list = routeList.map(route => `
    <url>
      <loc>${route}</loc>
      <changefreq>weekly</changefreq>
    </url>`)
    .join('\r\n')
  return `
  <urlset 
    xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" 
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
    ${list}
  </urlset>
  `
}

module.exports = {
  siteMapUrls,
  siteMapRouterUrls,
  createSitemapXml
}
