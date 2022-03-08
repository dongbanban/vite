/*
 * @file: Describe the file
 * @author: dongyang(yang.dong@Mysoft.net)
 */

import React from 'react'
import ReactDOM from 'react-dom'
import store from 'src/store'
import { Provider } from 'react-redux'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/lib/locale/zh_CN'
import dayjs from 'dayjs'
import RouterView from 'src/routes'
import 'dayjs/locale/zh-cn'

dayjs.locale('zh-cn')

const App = () => {
  return (
    <Provider store={store}>
      <ConfigProvider direction="ltr" locale={zhCN}>
        <RouterView />
      </ConfigProvider>
    </Provider>
  )
}

const AppRender = () => {
  ReactDOM.render(
    <React.StrictMode><App /></React.StrictMode>,
    document.getElementById('root')
  )
}

// if (USE_MOCK === 'yes') {
//   import('../mock').then(data => {
//     AppRender()
//   })
// } else {
AppRender()
// }