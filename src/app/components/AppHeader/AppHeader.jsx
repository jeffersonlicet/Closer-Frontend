import React from 'react'
import { Link } from 'react-router-dom'
import { Layout, Menu, Row, Col, Avatar, Icon, Badge, Input, Dropdown} from 'antd'
import './AppHeader.css'
import '../../vendor/Shadow/Shadow.css'

const { Header} = Layout
const Search = Input.Search

const avatarMenu = (
  <Menu>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">1st menu item</a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">2nd menu item</a>
    </Menu.Item>
    <Menu.Item>
      <Link to="/logout">Logout</Link>
    </Menu.Item>
  </Menu>
);

class AppHeader extends React.Component {
  render () {
    return (
      <Header style={{ background: '#FFF', position: 'fixed', width: '100%', zIndex: 99, paddingLeft: 30, paddingRight:30}} className="header shadow-1 ">
        <Layout style={{ background: 'transparent'}}>
          <Row type="flex" justify="center">
            <Col>
              <span style={{ marginRight: 24 }}>
                <Badge dot>
                  <Icon style={{ fontSize: 20, color: '#CACACE' }} type="message" />
                </Badge>
              </span>
              
              <Dropdown overlay={avatarMenu}>
                <a className="ant-dropdown-link" href="#">
                  <Avatar src="https://lastfm-img2.akamaized.net/i/u/770x0/ed315034aa143d4bfd05c309b244de77.jpg" style={{ backgroundColor: '#FFF' }} icon="user" />
                  <Icon style={ { marginLeft: 5 } } type="down" />
                </a>
              </Dropdown>

               <span style={{ marginLeft: 13 }}>
                <Badge dot>
                  <Icon style={{ fontSize: 20, color: '#CACACE' }} type="team" />
                </Badge>
              </span>

            </Col>
            </Row>
          </Layout>
      </Header>
    )
  }
}

export default AppHeader
