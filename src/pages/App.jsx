/*
 * @file: Describe the file
 * @author: dongyang(yang.dong@Mysoft.net)
 */
import React, { useState, useMemo } from 'react';
import { Tag, Space } from 'antd';
import ContextTest from 'src/components/contextDemo'
import MemoTest from 'src/components/memoDemo'
// import RecoilDemo from 'src/components/recoil'
import MyDrawer from 'src/components/MyDrawer'
import MyTable from 'src/components/MyTable'
import MyCard from 'src/components/MyCard'
import './style.less'

function App() {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: 200,
      resizable: true,
      ellipsis: true,
      fixed: 'left',
      render: text => <div className='abcde'></div>,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      width: 200,
      ellipsis: true,
      resizable: true,
      render: text => <div className='abcde'></div>,
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      width: 300,
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      width: 100,
      render: tags => (
        <>
          {tags.map(tag => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'loser') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <a>Invite {record.name}</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ]

  const columns1 = [
    {
      title: 'Name1',
      dataIndex: 'name',
      key: 'name1',
      width: 200,
      resizable: true,
      ellipsis: true,
      render: text => <a>{text}</a>,
    },
    {
      title: 'Age1',
      dataIndex: 'age',
      key: 'age1',
      resizable: true,
      width: 200,
      ellipsis: true,
    },
    {
      title: 'Address1',
      dataIndex: 'address',
      key: 'address1',
      width: 300,
    },
    {
      title: 'Tags1',
      key: 'tags',
      dataIndex: 'tags',
      width: 100,
      render: tags => (
        <>
          {tags.map(tag => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'loser') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Action1',
      key: 'action1',
      render: (text, record) => (
        <Space size="middle">
          <a>Invite {record.name}</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ]

  const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice'],
      children: [
        {
          key: '4',
          name: 'Joe Black',
          age: 32,
          address: 'Sidney No. 1 Lake Park',
          tags: ['cool'],
        },
        {
          key: '5',
          name: 'Joe Black',
          age: 32,
          address: 'Sidney No. 1 Lake Park',
          tags: ['cool'],
        }
      ]
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool'],
    },
  ]

  const tabList = [
    {
      key: 'tab1',
      tab: 'tab1',
    },
    // {
    //   key: 'tab2',
    //   tab: 'tab2',
    // },
  ];

  const [current, setCurrent] = useState(1)
  const [current1, setCurrent1] = useState(1)

  const pagination = useMemo(() => ({
    tab1: {
      current,
      total: data.length,
      onChange: page => setCurrent(page)
    },
    tab2: {
      current: current1,
      total: data.length,
      onChange: page => setCurrent1(page)
    }
  }), [current, current1, data])

  // rowSelection objects indicates the need for row selection
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    onSelect: (record, selected, selectedRows) => {
      console.log(record, selected, selectedRows);
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      console.log(selected, selectedRows, changeRows);
    },
  };

  const content = {
    tab1: <MyTable name='table1' scroll={{ x: 'max-content' }} columns={columns} dataSource={data} pagination={pagination.tab1} bordered />,
    // tab2: <MyTable name='table2' columns={columns1} dataSource={data} pagination={pagination.tab2} bordered resizable />,
  };

  return (
    <div className="App">
      <MyCard
        isTableCard
        tabContent={content}
        pagination={pagination}
        className='My-card'
        tabList={tabList} />
      {/* <MyCard
        isTableCard
        pagination={pagination}
        className='My-card'>
        <MyTable pagination={pagination} columns={columns} dataSource={data} bordered resizable />
      </MyCard> */}
      {/* <MyDrawer resizable width={700} visible >123</MyDrawer> */}
      {/* <ContextTest /> */}
    </div >
  )
}

export default App
