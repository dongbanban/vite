/*
 * @file: My ResizeableTitle
 * @author: dongyang(yang.dong@Mysoft.net)
 */
import React from 'react';

// Components
import { Menu, Dropdown } from 'antd';
import { MoreOutlined, PicCenterOutlined } from '@ant-design/icons';

// Vendors
import { Resizable } from "react-resizable";
import './style.less'


const ResizeableTitle = ({
    index,
    fixed,
    width,
    fixable,
    resizable = false,
    text,
    handleResizeStart,
    handleResize,
    handleResizeStop,
    handleFreeze,
    children,
    ...restProps
}) => {
    const menu = (
        <Menu onClick={() => handleFreeze({ columnKey: text, actionType: fixed ? 'unFreeze' : 'Freeze' })}>
            <Menu.Item key='freeze'>
                <span>{fixed ? 'Unfreeze column' : 'Freeze column'}</span>
            </Menu.Item>
        </Menu>
    )

    if (!width || !resizable) {
        return (
            <th {...restProps}>
                <div title={text} className='My-table-th-wrapper'>
                    {children}
                    {
                        fixable && (
                            <>
                                {fixed && <PicCenterOutlined style={{ marginLeft: 6 }} />}
                                <Dropdown overlay={menu} trigger='click' placement='bottomRight'>
                                    <span className='My-table-th-action'><MoreOutlined /></span>
                                </Dropdown>
                            </>
                        )
                    }
                </div>
            </th>
        )
    }
    return (
        <Resizable
            width={width}
            height={55}
            onResizeStart={handleResizeStart}
            onResize={(event, { size }) => handleResize(size, index)}
            onResizeStop={handleResizeStop}
        >
            <th {...restProps}>
                <div title={text} className='My-table-th-wrapper'>
                    {children}
                    {
                        fixable && (
                            <>
                                {fixed && <PicCenterOutlined style={{ marginLeft: 6 }} />}
                                <Dropdown overlay={menu} trigger='click' placement='bottomRight'>
                                    <span className='My-table-th-action'><MoreOutlined /></span>
                                </Dropdown>
                            </>
                        )
                    }
                </div>
            </th>
        </Resizable>
    )
};

export default ResizeableTitle
