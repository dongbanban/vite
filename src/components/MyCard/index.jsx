/*
 * @file: My Card
 * @author: dongyang(yang.dong@Mysoft.net)
 */

import React, { useCallback, useMemo, useState, createContext } from 'react';
import PropTypes from 'prop-types';

// Components
import { Card, Tooltip, Modal, Menu, Dropdown, Pagination } from 'antd';
import { FullscreenOutlined, FullscreenExitOutlined, ColumnHeightOutlined } from '@ant-design/icons'

// Vendors
import classNames from 'classnames';
import useCardReducer from './reducer.js'

import './style.less'

export const cardContext = createContext()
const { Provider } = cardContext

const MyCard = ({
    activeTabKey,
    tabList,
    tabContent,
    onTabChange,
    tabBarExtraContent,
    className,
    isTableCard,
    extra,
    pagination,
    children,
    ...restprops
}) => {
    const [activeKey, setActiveKey] = useState(activeTabKey || tabList?.[0]?.key)
    const { state: { visible, lineHeight }, dispatch } = useCardReducer()

    const handleTabChange = useCallback(key => {
        setActiveKey(key);
        onTabChange?.(key)
    }, [onTabChange])

    const extraContent = useMemo(() => {
        const menu = (
            <Menu onClick={({ key }) => dispatch({ type: 'changeHeight', lineHeight: key })}>
                <Menu.Item key='default'>
                    <span>Default</span>
                </Menu.Item>
                <Menu.Item key='comfortable'>
                    <span>Comfortable</span>
                </Menu.Item>
                <Menu.Item key='compact'>
                    <span>Compact</span>
                </Menu.Item>
            </Menu>
        )
        return (
            <div>
                {extra || tabBarExtraContent}
                {isTableCard && (
                    <>
                        <Tooltip placement='bottom' title={!visible ? 'Fullscreen' : 'Exit fullscreen'}>
                            {visible ?
                                <FullscreenExitOutlined style={{ cursor: 'pointer', fontSize: 24 }} onClick={() => {
                                    dispatch({ type: 'changeVisible', visible: !visible })
                                }} /> : <FullscreenOutlined style={{ cursor: 'pointer', fontSize: 24 }} onClick={() => {
                                    dispatch({ type: 'changeVisible', visible: !visible })
                                }} />}
                        </Tooltip>
                        <Dropdown overlay={menu} trigger='click'>
                            <Tooltip placement='bottom' title='Adjust size'>
                                <ColumnHeightOutlined style={{ cursor: 'pointer', marginLeft: 8, fontSize: 24 }} />
                            </Tooltip>
                        </Dropdown>
                    </>
                )}
            </div>
        )
    }, [extra, visible, isTableCard, tabBarExtraContent])

    const cardContent = (
        <Card
            className={classNames({ [className]: true, 'My-full-screen-card': visible })}
            headStyle={{ borderBottom: 'none' }}
            tabList={tabList}
            activeTabKey={activeKey}
            onTabChange={handleTabChange}
            extra={!tabContent && extraContent}
            tabBarExtraContent={tabContent && extraContent}
            {...restprops}>
            <Provider value={{ visible, lineHeight }}>
                <div style={{ padding: '0 8px 16px 8px' }}>
                    {(typeof tabContent === 'function' ? tabContent(activeKey) : tabContent?.[activeKey]) || children}
                </div>
            </Provider>
        </Card>
    )

    const modalPagination = tabContent ? pagination[activeKey] : pagination

    return (
        <>
            {!visible && cardContent}
            <Modal
                visible={visible}
                maskClosable={false}
                destroyOnClose
                closable={false}
                footer={null}
                centered={false}
                style={{ top: 16 }}
                bodyStyle={{ padding: 0 }}
                width={document.body.clientWidth}
            >
                {cardContent}
            </Modal>
            {isTableCard && visible && (
                <div className='My-full-screen-footer'>
                    <Pagination {...modalPagination} />
                </div>
            )}
        </>
    )
}

MyCard.propTypes = {
    tabContent: PropTypes.any,
    activeTabKey: PropTypes.string,
    tabList: PropTypes.array,
    onTabChange: PropTypes.func,
    tabBarExtraContent: PropTypes.any,
    extra: PropTypes.any,

    className: PropTypes.string,
    isTableCard: PropTypes.bool,
    children: PropTypes.any,
    restprops: PropTypes.object,
}

export default MyCard
