import React from 'react'
import { connect } from 'react-redux'
import { Input, Row, Col, Card, Avatar, Button, Form, Icon } from 'antd'
import { DRAFT_BUTTONS_VISIBLE } from '../../constants/story.constants'

import { changeStoryDraft, toggleDraft, changeDraftContent } from '../../actions/story.actions'
import { Tabs } from 'antd';

import './StoryBox.css'
import '../../vendor/Shadow/Shadow.css'

const { TextArea } = Input;

class StoryBox extends React.Component { 
  state = { alreadyFocused: false}
  componentDidMount() {
    this.storytextInput.focus()
  }

  moveCaret = (e) => {
    if(this.state.alreadyFocused)
      return

    let temp = this.props.storyForm.draft.content
    this.props.dispatch(changeDraftContent(''))
    
    setTimeout(() => {
      this.props.dispatch(changeDraftContent(temp)) 
      this.setState({alreadyFocused : true})
    }, 100)
  }

  handleTextareaClick = (e) => {
    if(!this.props.storyForm.opened)
      this.props.dispatch(toggleDraft(DRAFT_BUTTONS_VISIBLE))
  }

  handleTextChanged = (e) => {
    if(e.target.id === 'storyText')
      this.props.dispatch(changeDraftContent(e.target.value))    
    
  }

  handleStorySubmit = (e) => {
    /*console.log("Sending story")
    let storyValue = this.state.storyText
    
    if(storyValue === ''){
      this.storytextInput.focus()
      return
    }

    this.setState({ storyText:'', isSendVisible: false })*/
  }

  render() {
    return (
      <div className="story-form" style={{ border: 'none'}}>
      <Row>
         
          <div style={{ float: 'left'}}>
            <Avatar size="large" src="https://lastfm-img2.akamaized.net/i/u/770x0/ed315034aa143d4bfd05c309b244de77.jpg" style={{ backgroundColor: '#FFF' }} icon="user" />
           
          </div>

          <div className="story-writter-box" style={{ marginLeft: 60, marginTop: -10}}>
          <Icon className="story-caret" type="caret-left" />
            <Tabs className="shadow-1" style={{ margin: 0}} defaultActiveKey="1">
              <Tabs.TabPane tab={<span><Icon type="bulb" />Story</span>} key="1">
                <TextArea onFocus={this.moveCaret} className="story-box-textarea" onChange={this.handleTextChanged} id='storyText' ref={(input) => { this.storytextInput = input }} onClick={this.handleTextareaClick} value={this.props.storyForm.draft.content} placeholder="..." style={{ border: '1px solid #eee', fontSize: 20, height: (this.props.storyForm.opened ? 80 : 40)}} />
              </Tabs.TabPane>
              <Tabs.TabPane tab={<span><Icon type="camera-o" />Photo</span>} key="2">Content of Tab Pane 2</Tabs.TabPane>
              <Tabs.TabPane tab={<span><Icon type="play-circle-o" />Video</span>} key="3">Content of Tab Pane 3</Tabs.TabPane>
            </Tabs>
          </div>

            
          <div style={{display: (this.props.storyForm.opened ? 'inline' : 'none')}}>
            <div className="icons-wrapper" style={{ float: 'right', marginTop: 10}}>
              <Button size="large" className="shadow-1-button button-send-story" onClick={this.handleStorySubmit} type="primary">Share</Button>
            </div>
          </div>

      </Row>
      </div>
    )
  }
}
function mapStateToProps(state) {
  const { storyForm } = state.storyReducer
  return { storyForm }
}

const connectedStoryBox = connect(mapStateToProps)(StoryBox)
export default connectedStoryBox