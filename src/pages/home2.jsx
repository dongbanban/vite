/*
 * @Author: your name
 * @Date: 2021-06-09 17:11:07
 * @LastEditTime: 2022-05-10 10:56:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /click/Users/derbysofti41/vite/src/pages/home2.jsx
 */
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment, incrementByAmount } from 'src/store/testStore'

export default function Home2() {
  const count = useSelector(state => state.counter.value)
  const dispatch = useDispatch()

  return (
    <div>
      <div>
        <div>{count}</div>
        <button type="button" onClick={() => dispatch(increment())}>
          Increment112
        </button>
        <button type="button" onClick={() => dispatch(decrement())}>
          Decrement
        </button>
        <button type="button" onClick={() => dispatch(incrementByAmount(2))}>
          incrementByAmount
        </button>
      </div>
    </div>
  )
}
