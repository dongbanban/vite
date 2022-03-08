/*
 * @file: Describe the file
 * @author: dongyang(yang.dong@Mysoft.net)
 */

import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import { DatePicker, Space } from 'antd'

export default function Home() {
  const count = useSelector(state => state.counter.value)
  const navigate = useNavigate()
  const location = useLocation()

  const handleClick = () => {
    navigate('/route2/home')
  }

  console.log(location)

  const { route1Id = '' } = useParams()

  const onChange = (date, dateString) => {
    console.log(date, dateString)
  }

  return (
    <>
      <div onClick={handleClick}>
        {route1Id} {count}
      </div>
      <Space direction="vertical">
        <DatePicker onChange={onChange} />
      </Space>
    </>
  )
}
