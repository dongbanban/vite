/*
 * @file: Describe the file
 * @author: dongyang(yang.dong@Mysoft.net)
 */
import { lazy } from 'react'
import AsyncComponent from './AsyncComponent'

const routerConfig = [
  {
    path: '/',
    component: '',
    name: 'homePage',
    childRoutes: [
      {
        path: '/route1/:route1Id',
        component: AsyncComponent(lazy(() => import('src/pages/home1'))),
        name: 'home1',
        childRoutes: []
      },
      {
        path: '/route2',
        childRoutes: [
          {
            path: '/route2/home',
            component: AsyncComponent(lazy(() => import('src/pages/home2'))),
            name: 'home2',
            childRoutes: []
          },
        ]
      },
      {
        path: '/route3',
        component: AsyncComponent(lazy(() => import('src/pages/App'))),
        name: 'home3',
        childRoutes: []
      },
    ]
  }
]

export default routerConfig
