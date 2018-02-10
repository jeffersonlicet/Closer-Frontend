import React from 'react'
import { Layout, Menu, Icon } from 'antd'
const { Sider } = Layout

class Sidebar extends React.Component {
  render () {
    return (
      <Sider width={200} style={{ background: '#fff', overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }}>
        <div className='logo' />

        <Menu mode='inline' defaultSelectedKeys={['4']} style={{ borderRight: 0 }}>
          <Menu.Item key='1'>
            <Icon type='user' />
            <span className='nav-text'>Signin</span>
          </Menu.Item>

          <Menu.Item key='8'>
            <Icon type='shop' />
            <span className='nav-text'>Create account</span>
          </Menu.Item>
        </Menu>
      </Sider>
    )
  }
}

export default Sidebar
