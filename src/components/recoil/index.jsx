/*
 * @Author: your name
 * @Date: 2021-03-29 17:28:41
 * @LastEditTime: 2021-03-29 17:57:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \coded:\vite\vite-project\src\recoil\index.js
 */
import React from 'react'
import { RecoilRoot } from 'recoil'
import FontCounter from './components/FontCounter'
import TodoList from './components/TodoList'

function RecoilDemo() {
  return (
    <RecoilRoot>
      <FontCounter />
      <TodoList />
    </RecoilRoot>
  )
}

export default RecoilDemo
