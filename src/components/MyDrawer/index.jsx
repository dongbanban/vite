/*
 * @file: Describe the file
 * @author: dongyang(yang.dong@Mysoft.net)
 */
/*
 * @file: resize drawer
 * @author: dongyang(yang.dong@Mysoft.net)
 */
import React, { useLayoutEffect, useState, useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';

// Components
import { Drawer } from 'antd';
import './style.less'

const MyDrawer = ({ resizable, children, className, width, ...rest }) => {
    const [currentX, setCurrentX] = useState(width)
    const barRef = useRef(null)

    const handleMousemove = useCallback(function (e) {
        // 设置Drawer宽度
        setCurrentX(document.body.clientWidth - e.clientX > width ? document.body.clientWidth - e.clientX : width)
    }, [width])

    useLayoutEffect(() => {
        if (resizable) {
            barRef.current = document.getElementById('my-drawer-resize-bar')
        }
    }, [resizable])

    useEffect(() => {
        if (resizable) {
            barRef.current.addEventListener('mousedown', function () {
                document.addEventListener('mousemove', handleMousemove)
            })
            document.addEventListener('mouseup', () => {
                document.removeEventListener('mousemove', handleMousemove)
            })
        }
    }, [handleMousemove, barRef.current, resizable])

    return (
        <Drawer
            className={`${className} my-drawer`}
            maskClosable={false}
            {...rest}
            width={resizable ? currentX : width}>
            {resizable && (
                <div
                    className='my-drawer-resize-bar'
                    id='my-drawer-resize-bar'
                    style={{ right: currentX }} />
            )}
            {children}
        </Drawer>
    )
}

MyDrawer.propTypes = {
    resizable: PropTypes.bool,
    className: PropTypes.string,
    width: PropTypes.number,
};

export default MyDrawer
