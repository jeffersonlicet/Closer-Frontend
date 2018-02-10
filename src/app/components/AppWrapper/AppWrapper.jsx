import React from 'react'
import { Layout } from 'antd'

const AppWrapper = (props) => {
  return (<Layout style={{ minHeight: '100vh' }}>{ props.children }</Layout>)
}

export default AppWrapper