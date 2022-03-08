/*
 * @Author: your name
 * @Date: 2021-03-29 17:32:37
 * @LastEditTime: 2021-06-08 17:10:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \coded:\vite\vite-project\src\recoil\components\CharacterCounter.js
 */
import React from 'react'
import {
  useRecoilState,
  useRecoilValue,
  useRecoilValueLoadable,
  useSetRecoilState,
  useRecoilCallback,
  selector
} from 'recoil'
import { fontSizeState } from '../store'

// useRecoilState 使用Atom返回的state数据，可以多个组件同时订阅，更新同时进行
function FontButton() {
  const [fontSize, setFontSize] = useRecoilState(fontSizeState)
  return (
    <>
      <button type="button" onClick={() => setFontSize(size => size + 1)} style={{ fontSize }}>
        Click to Enlarge
      </button>
      <button type="button" onClick={() => setFontSize(size => size - 1)} style={{ fontSize }}>
        Click to Narrow
      </button>
    </>
  )
}

function Text() {
  const [fontSize, setFontSize] = useRecoilState(fontSizeState)
  return <p style={{ fontSize }}>This text will increase in {fontSize} px too.</p>
}

// selector 纯函数，接受Atoms或者其他的selector作为输入，当输入内容更新时，selector的值也会动态计算，订阅selector的组件可以在更新后获取到最新值
const fontSizeLabelState = selector({
  key: 'fontSizeLabelState',
  get: ({ get }) => {
    const fontSize = get(fontSizeState)
    const unit = 'px'

    return `${fontSize}${unit}`
  }
  // set: ({set}, newValue) => set(Atom, newValue计算的值)
})

// useRecoilValue 可以用来获取selector返回的值，不用useRecoilState来获取这个值，因为selector不可重写
function FontCounter() {
  const fontSizeLabel = useRecoilValue(fontSizeLabelState)
  return (
    <div>
      <div>Current font size: {fontSizeLabel}</div>
      <Text />
      <FontButton />
    </div>
  )
}

// useRecoilValueLoadable 用来异步获取selector返回的值
// const queryDataFn = selector({
//   key: "data",
//   get: async () => {
//     const response = await queryData();
//     return response.data;
//   }
// });
// const dataLoadable = useRecoilValueLoadable(queryDataFn);

// useSetRecoilState 数据流的变化不会导致组件 Rerender，只写不读
// const setTodoList = useSetRecoilState(todoListState);
// const addItem = () => {
//   setTodoList((oldTodoList) => [
//     ...oldTodoList,
//     {
//       id: getId(),
//       text: inputValue,
//       isComplete: false,
//     },
//   ]);
// };

// useRecoilCallback 只读不订阅，数据变化不会Rerender
// const itemsInCart = atom({
//   key: "itemsInCart",
//   default: 0,
// });

// function CartInfoDebug() {
//   const logCartItems = useRecoilCallback(async ({ getPromise }) => {
//     const numItemsInCart = await getPromise(itemsInCart);

//     console.log("Items in cart: ", numItemsInCart);
//   });
// }

export default FontCounter
