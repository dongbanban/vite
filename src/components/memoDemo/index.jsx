/*
 * @file: Describe the file
 * @author: dongyang(yang.dong@Mysoft.net)
 */
import React, { useState, memo } from 'react'

const Child1 = props => {
  console.log('我是子组件1', props)
  return <div>我是子组件1</div>
}

const isEqual = (prevProps, nextProps) => {
  console.log(prevProps)
  console.log(nextProps)
  return prevProps.count !== nextProps.count
}
const Child2 = props => {
  console.log('我是子组件2', props)
  return <div>我是子组件2</div>
}

const ChildMemo = memo(Child2, isEqual)

function MemoTest() {
  const [count, setCount] = useState(0)
  return (
    <>
      <button type="button" onClick={() => setCount(c => c + 1)}>
        {count}
      </button>
      <Child1 count={count} />
      <ChildMemo count={count} />
    </>
  )
}

export default MemoTest
