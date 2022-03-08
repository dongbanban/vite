/*
 * @Author: your name
 * @Date: 2021-03-29 17:32:30
 * @LastEditTime: 2021-06-08 17:12:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \coded:\vite\vite-project\src\recoil\components\TodoList.js
 */
import React, { useState } from 'react'
import { useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil'
import { todoListState } from '../store'

// utility for creating unique Id
let id = 0
function getId() {
  id += 1
}

function replaceItemAtIndex(arr, index, newValue) {
  return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)]
}

function removeItemAtIndex(arr, index) {
  return [...arr.slice(0, index), ...arr.slice(index + 1)]
}

function TodoItem({ item }) {
  const [todoList, setTodoList] = useRecoilState(todoListState)
  const index = todoList.findIndex(listItem => listItem === item)

  const editItemText = ({ target: { value } }) => {
    const newList = replaceItemAtIndex(todoList, index, {
      ...item,
      text: value
    })

    setTodoList(newList)
  }

  const toggleItemCompletion = () => {
    const newList = replaceItemAtIndex(todoList, index, {
      ...item,
      isComplete: !item.isComplete
    })

    setTodoList(newList)
  }

  const deleteItem = () => {
    const newList = removeItemAtIndex(todoList, index)

    setTodoList(newList)
  }

  return (
    <div>
      <input type="text" value={item.text} onChange={editItemText} />
      <input type="checkbox" checked={item.isComplete} onChange={toggleItemCompletion} />
      <button type="button" onClick={deleteItem}>
        X
      </button>
    </div>
  )
}

function TodoItemCreator() {
  const [inputValue, setInputValue] = useState('')
  const setTodoList = useSetRecoilState(todoListState)

  const addItem = () => {
    setTodoList(oldTodoList => [
      ...oldTodoList,
      {
        id: getId(),
        text: inputValue,
        isComplete: false
      }
    ])
    setInputValue('')
  }

  const onChange = ({ target: { value } }) => {
    setInputValue(value)
  }

  return (
    <div>
      <input type="text" value={inputValue} onChange={onChange} />
      <button type="button" onClick={addItem}>
        Add
      </button>
    </div>
  )
}

function TodoList() {
  const todoList = useRecoilValue(todoListState)

  return (
    <>
      {/* <TodoListStats /> */}
      {/* <TodoListFilters /> */}
      <TodoItemCreator />

      {todoList.map(todoItem => (
        <TodoItem key={todoItem.id} item={todoItem} />
      ))}
    </>
  )
}

export default TodoList
