/*
 * @Author: your name
 * @Date: 2021-06-29 16:34:43
 * @LastEditTime: 2021-06-29 17:04:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \coded:\myWebpack\src\pages\contextDemo\index.js
 */
import React, { PureComponent, createContext, useState, useContext } from 'react'

const GlobalContext = createContext(1)
const { Provider, Consumer } = GlobalContext

export default function ContextTest() {
  const [theme, setTheme] = useState('yellow')
  const toggleTheme = () => {
    setTheme(theme === 'yellow' ? 'red' : 'yellow')
  }
  return (
    <>
      <Provider value={{ theme, toggleTheme }}>
        <ContextConsumer1 />
        <ContextConsumer2 />
        <ContextConsumer3 />
      </Provider>
    </>
  )
}

function ContextConsumer1() {
  return (
    <Consumer>
      {({ theme, toggleTheme }) => (
        <>
          <button type="button" onClick={toggleTheme}>
            change
          </button>
          <div style={{ background: theme }}>{theme}</div>
        </>
      )}
    </Consumer>
  )
}

class ContextConsumer2 extends PureComponent {
  render() {
    const { theme: themeRename } = this.context
    return (
      <>
        <Consumer>
          {({ theme, toggleTheme }) => (
            <>
              <button type="button" onClick={toggleTheme}>
                change
              </button>
              <div style={{ background: theme }}>{theme}</div>
            </>
          )}
        </Consumer>
        <div style={{ background: themeRename }}>{themeRename}</div>
      </>
    )
  }
}
ContextConsumer2.contextType = GlobalContext

function ContextConsumer3() {
  const { theme, toggleTheme } = useContext(GlobalContext)
  return (
    <>
      <button type="button" onClick={toggleTheme}>
        change
      </button>
      <div style={{ background: theme }}>{theme}</div>
    </>
  )
}
