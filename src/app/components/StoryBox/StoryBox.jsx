import React from 'react'
import { Input, Row, Col, Card, Avatar } from 'antd'
import './StoryBox.css'
import '../../vendor/Shadow/Shadow.css'

const { TextArea } = Input;

class StoryBox extends React.Component {
    render() {
      return (
        <div className="story-form " style={{ border: 'none'}}>
        <Row>
            <h3>Share story</h3>
            <div style={{ float: 'left'}}>
              <Avatar size="large" src="https://lastfm-img2.akamaized.net/i/u/770x0/ed315034aa143d4bfd05c309b244de77.jpg" style={{ backgroundColor: '#F4726F' }} icon="user" />
            </div>
          
            <div style={{ marginLeft: 50}}>
              <TextArea placeholder="Tell your story" style={{ border: 'none', fontSize: 25, background: 'rgba(0,0,0,0.08)'}} rows={1} />
            </div>
        </Row>
        </div>
      )
    }
}

export default StoryBox