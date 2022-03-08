/*
 * @file: Describe the file
 * @author: dongyang(yang.dong@Mysoft.net)
 */
import React from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import RouterLayout from 'src/layout/layout'
import routerConfig from './config'

const createRouterView = data => {
  return (
    data.map(routerItem => {
      const { path, component, name, childRoutes = [] } = routerItem
      if (childRoutes.length > 0) {
        return createRouterView(childRoutes)
      }
      return <Route path={path} key={name} element={component} />
    })
  )
}

const RouterView = () => (
  <HashRouter basename="/">
    <RouterLayout>
      <Routes>
        {createRouterView(routerConfig)}
      </Routes>
    </RouterLayout>
  </HashRouter>
)

export default RouterView
