/*
 * @Author: your name
 * @Date: 2021-03-29 17:33:29
 * @LastEditTime: 2021-03-29 17:53:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \coded:\vite\vite-project\src\recoil\store\index.js
 */
import { atom } from 'recoil'

const todoListState = atom({
  key: 'todoListState',
  default: []
})

const fontSizeState = atom({
  key: 'fontSizeState', // 全局唯一的ID
  default: 14 // 默认初始值
})

export { todoListState, fontSizeState }
