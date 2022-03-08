/*
 * @file: My Table
 * @author: dongyang(yang.dong@Mysoft.net)
 */
import React, { useEffect, useState, useCallback, useMemo, useContext } from 'react';

// Components
import { Table } from 'antd';
import ResizeableTitle from './ResizeableTitle'

// Vendors
import { cardContext } from '../MyCard/index'
import './style.less'

const userId = 'userId'

const MyTable = ({ fixable = false, resizable, columns, name, ...restProps }) => {
    const { lineHeight } = useContext(cardContext)
    const [tempColumns, setColumns] = useState(columns)
    const localFrozen = JSON.parse(localStorage.getItem('FROZEN_COLUMNS'))?.[userId]?.[name] || []
    // 首次进入,代码设置的列顺序
    const [initialOrder,] = useState(columns.map(item => item.key))
    // 首次进入,结合本地缓存的冻结列后的顺序
    const [newOrder, setNewOrder] = useState([...localFrozen, ...(initialOrder.filter(item => !localFrozen.includes(item)))])

    useEffect(() => {
        const tempFrozen = JSON.parse(localStorage.getItem('FROZEN_COLUMNS'))?.[userId]?.[name] || []
        const tempWidth = JSON.parse(localStorage.getItem('RESIZABLE_COLUMNS_WIDTH'))?.[userId]?.[name] || {}
        const newColumns = []
        columns.forEach(item => {
            item.width = tempWidth?.[item.key] || item.width
            item.fixed = tempFrozen?.includes(item.key) ? 'left' : item.fixed;
            newColumns[newOrder.indexOf(item.key)] = item
        })
        setColumns(newColumns)
    }, [columns, newOrder])

    const handleResizeStart = useCallback(() => {
        // 拖拽开始时清除当前name表格的本地缓存
        const tempLocal = JSON.parse(localStorage.getItem('RESIZABLE_COLUMNS_WIDTH')) || { [userId]: {} }
        if (tempLocal) {
            delete tempLocal[userId]?.[name]
            localStorage.setItem('RESIZABLE_COLUMNS_WIDTH', JSON.stringify(tempLocal))
        }
    }, [name])

    const handleResize = useCallback((size, index) => {
        if (size.width >= 120) {
            const nextColumns = [...tempColumns];
            nextColumns[index] = {
                ...nextColumns[index],
                width: size.width,
            };
            setColumns(nextColumns)
        }
    }, [tempColumns])

    const handleResizeStop = useCallback(() => {
        // 拖拽结束时本地缓存更新对应name表格的列宽
        const tempLocal = JSON.parse(localStorage.getItem('RESIZABLE_COLUMNS_WIDTH')) || { [userId]: {} }
        const persistenceWidth = {};
        tempColumns.forEach(item => {
            persistenceWidth[item.key] = item.width
        })
        tempLocal[userId][name] = persistenceWidth
        localStorage.setItem('RESIZABLE_COLUMNS_WIDTH', JSON.stringify(tempLocal))
    }, [tempColumns, name])

    const getIndex = useCallback(target => {
        return initialOrder.indexOf(target)
    }, [initialOrder])

    const sortFrozen = useCallback((arr, target) => {
        for (let i = 0; i < arr.length - 1; i++) {
            if (getIndex(target) > getIndex(arr[i + 1])) {
                let temp = target
                arr[i] = arr[i + 1]
                arr[i + 1] = temp
            }
        }
        return arr
    }, [getIndex])

    const handleFreeze = useCallback(({ columnKey, actionType }) => {
        const tempFrozen = JSON.parse(localStorage.getItem('FROZEN_COLUMNS')) || { [userId]: {} }
        let persistenceFrozen = tempFrozen[userId][name] || [];
        if (actionType === 'unFreeze') {
            // 取消冻结只需要移除冻结列对应即可，无需重新排序
            persistenceFrozen = persistenceFrozen.filter(item => item !== columnKey)
        } else {
            // 新冻结列插入首列，然后排序
            persistenceFrozen.unshift(columnKey)
            // 冻结列按照代码顺序排列
            persistenceFrozen = sortFrozen(persistenceFrozen, columnKey)
        }
        const unFrozenOrder = initialOrder.filter(item => !persistenceFrozen.includes(item))
        setNewOrder([...persistenceFrozen, ...unFrozenOrder])
        // 有冻结列就存入本地缓存，没有直接删除
        if (persistenceFrozen.length) {
            tempFrozen[userId][name] = persistenceFrozen
            localStorage.setItem('FROZEN_COLUMNS', JSON.stringify(tempFrozen))
        } else {
            delete tempFrozen[userId][name]
            localStorage.setItem('FROZEN_COLUMNS', JSON.stringify(tempFrozen))
        }
        // 同步更新对应列的fixed
        const newTempColumn = [...tempColumns]
        newTempColumn.forEach(item => {
            if (item.key === columnKey) {
                item.fixed = actionType === 'freeze' ? 'left' : undefined
            }
        })
        setColumns(newTempColumn)
    }, [tempColumns, name, initialOrder, sortFrozen])

    const resizeColumns = useMemo(() => {
        const tempFrozen = JSON.parse(localStorage.getItem('FROZEN_COLUMNS'))?.[userId]?.[name] || []
        const tempWidth = JSON.parse(localStorage.getItem('RESIZABLE_COLUMNS_WIDTH'))?.[userId]?.[name] || {}
        return tempColumns.map((col, index) => {
            return {
                ...col,
                fixed: tempFrozen.includes(col.key) ? 'left' : col.fixed,
                width: tempWidth?.[col.key] || col.width,
                className: `My-table My-table-${lineHeight}`,
                onHeaderCell: column => {
                    return {
                        index,
                        fixed: column.fixed,
                        width: column.width,
                        resizable: column.resizable,
                        text: column.key,
                        fixable,
                        handleResizeStart,
                        handleResize,
                        handleResizeStop,
                        handleFreeze
                    }
                },
            }
        })
    }, [tempColumns, handleResizeStart, handleResize, handleResizeStop, handleFreeze, fixable])

    const components = useMemo(() => {
        return resizable ? {
            header: {
                cell: ResizeableTitle,
            }
        } : null
    }, [resizable, ResizeableTitle]);

    return (
        <Table
            columns={resizeColumns}
            components={components}
            {...restProps}
        />
    )
}

export default MyTable
