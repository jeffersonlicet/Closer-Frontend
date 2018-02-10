import React from 'react'

import { Layout, Menu } from 'antd'
import '../../vendor/Shadow/Shadow.css'
import './AppHeader.css'

const { Header } = Layout

class AppHeader extends React.Component {
  render () {
    return (
      <Header className='header shadow-1'>
        <div className='logo' />

        <Menu
          className='header-menu'
          theme='light'
          mode='horizontal'
          defaultSelectedKeys={['1']}
          style={{ background: 'transparent', lineHeight: '62px', borderBottom: '0', fontWeight: 'bold' }}>

          <Menu.Item key='1'>Login</Menu.Item>
          <Menu.Item key='2'>Create account</Menu.Item>
        </Menu>
      </Header>
    )
  }
}

export default AppHeader
