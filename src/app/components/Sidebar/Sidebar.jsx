import React from 'react'
import { Layout, Menu, Icon } from 'antd'
import '../../vendor/Shadow/Shadow.css'
const { Sider } = Layout

class Sidebar extends React.Component {
  render () {
    return (
      <Sider className="shadow-1" style={{ 
        background: '#FFF', 
        overflow: 'auto', 
        overflowX: 'hidden', 
        height: '100vh', 
        position: 'fixed', 
        left: 0, 
        borderRight: '1px solid rgba(0,0,0,0.1)', 
        zIndex: 999,
      }}  
      
      breakpoint="sm"
      collapsedWidth="0">
        
        <div className='logo' />

        <Menu mode='inline' defaultSelectedKeys={['4']} style={{ borderRight: 0 }}>
          <Menu.Item key='1'>
            <Icon type='home' />
            <span className='nav-text'>Feed</span>
          </Menu.Item>

          <Menu.Item key='2'>
            <Icon type='shop' />
            <span className='nav-text'>Friends</span>
          </Menu.Item>

           <Menu.Item key='3'>
            <Icon type='shop' />
            <span className='nav-text'>Settings</span>
          </Menu.Item>
        </Menu>
      </Sider>
    )
  }
}

export default Sidebar
