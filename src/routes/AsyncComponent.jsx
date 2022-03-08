/*
 * @file: Describe the file
 * @author: dongyang(yang.dong@Mysoft.net)
 */
import React, { PureComponent, Suspense } from 'react'
import { LoadingOutlined } from '@ant-design/icons'

// 创建错误边界组件 用来处理加载出错的情况
class ErrorBoundary extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      hasError: false
    }
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    return (
      this.state.hasError
        ? <div>加载失败</div>
        : this.props.children
    )
  }
}


export default function AsyncComponent(LazyComponent) {
  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingOutlined />}>
        <LazyComponent />
      </Suspense>
    </ErrorBoundary>
  )
}