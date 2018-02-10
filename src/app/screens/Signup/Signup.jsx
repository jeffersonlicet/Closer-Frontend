import React from 'react'

import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import { Layout, Row, Col, Form, Input, Button, Divider } from 'antd'
import { 
  hideSignupFormError, 
  verifyUsername, 
  verifyEmail, 
  verifyPassword,
  verifyPasswordConfirmation,
  hideValidatingUsernameError, 
  hideValidatingEmailError,
  hideValidatingPasswordError, 
  hideValidatingPasswordConfirmationError} from '../../actions/auth.actions'
import { Link } from 'react-router-dom'

import ErrorPopover from '../../components/ErrorPopover/ErrorPopover'

import { SIGNIN_ROUTE } from '../../constants/app.constants'

import '../../vendor/Shadow/Shadow.css'
import '../../vendor/Radius/Radius.css'
import './Signup.css'

const { Content } = Layout

var usernameTimer             =  0
var emailTimer                =  0
var passwordTimer             =  0
var passwordConfirmationTimer =  0

class Signup extends React.Component {
  constructor (props) {
    super(props)
    this.state = { 
      username: '', 
      email:'',  
      password: '', 
      password_confirmation: '', 
    }
  }

  componentDidMount () {
    this.usernameInput.focus()
  }

  handleChange = (e) => {
    this.setState({ [e.target.id]: e.target.value })

    if(e.target.id === 'username') {
      this.props.dispatch(hideValidatingUsernameError())
      if(usernameTimer)
        window.clearTimeout(usernameTimer)

      usernameTimer = window.setTimeout(()=> {
        this.props.dispatch(verifyUsername(this.state.username))
      }, 300);
    }

    if(e.target.id === 'email') {
      this.props.dispatch(hideValidatingEmailError())
      if(emailTimer)
        window.clearTimeout(emailTimer)

      emailTimer = window.setTimeout(()=> {
          this.props.dispatch(verifyEmail(this.state.email))
      }, 300);
    }

    if(e.target.id === 'password') {
      this.props.dispatch(hideValidatingPasswordError())
      if(passwordTimer)
        window.clearTimeout(passwordTimer)

        passwordTimer = window.setTimeout(()=> {
          this.props.dispatch(verifyPassword(this.state.password))
          
          if(this.state.password_confirmation)
            this.props.dispatch(verifyPasswordConfirmation(this.state.password, this.state.password_confirmation))

      }, 300);
    }

    if(e.target.id === 'password_confirmation') {
      this.props.dispatch(hideValidatingPasswordConfirmationError())
      if(passwordConfirmationTimer)
        window.clearTimeout(passwordConfirmationTimer)

        passwordConfirmationTimer = window.setTimeout(()=> {
          this.props.dispatch(verifyPasswordConfirmation(this.state.password, this.state.password_confirmation))
      }, 300);
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    console.log("submiting")
    this.props.dispatch(hideSignupFormError())

    let usernameVal = this.state.username
    let passwordVal = this.state.password

    if (!usernameVal) {
      this.usernameInput.focus()
      return
    }

    if (!passwordVal) {
      this.passwordInput.focus()
    }

    // this.props.dispatch(signup(usernameVal, passwordVal))
  }

  render () {
    return (
      <div>
        <Helmet>
          <title>Signup</title>
        </Helmet>
        <Layout style={{paddingBottom: 30}}>
          <Content>
            <Row>
              <Col xs={{ span: 24, offset: 0 }} sm={{ span: 18, offset: 3 }} md={{ span: 10, offset: 7 }} style={{ height: '100vh', padding: 80 }}>
                <h1 style={{ fontSize: 40, fontWeight: 'lighter', marginBottom: 0}}>Signup</h1>
                <h4>To share moments about you with your real friends.</h4>
                <br />

                <Form onSubmit={this.handleSubmit}>
                  <Form.Item hasFeedback validateStatus={this.props.signupForm.validation.username.status} label='USERNAME'>
                    <ErrorPopover
                      content={this.props.signupForm.validation.username.error.content}
                      title={this.props.signupForm.validation.username.error.title}
                      visible={this.props.signupForm.validation.username.anyError}
                      placement='topRight'>
                        <Input id='username' onChange={this.handleChange} ref={(input) => { this.usernameInput = input }} size='large' />
                    </ErrorPopover>
                  </Form.Item>

                  <Form.Item hasFeedback validateStatus={this.props.signupForm.validation.email.status} label='EMAIL'>
                    <ErrorPopover
                      content={this.props.signupForm.validation.email.error.content}
                      title={this.props.signupForm.validation.email.error.title}
                      visible={this.props.signupForm.validation.email.anyError}
                      placement='topRight'>
                        <Input id='email' onChange={this.handleChange} ref={(input) => { this.emailInput = input }} size='large' type="email" />
                      </ErrorPopover>
                  </Form.Item>

                  <Form.Item hasFeedback validateStatus={this.props.signupForm.validation.password.status} style={{marginTop: '-10px'}} label='PASSWORD'>
                    <ErrorPopover
                      content={this.props.signupForm.validation.password.error.content}
                      title={this.props.signupForm.validation.password.error.title}
                      visible={this.props.signupForm.validation.password.anyError}
                      placement='topRight'>
                        <Input id='password' onChange={this.handleChange} ref={(input) => { this.passwordInput = input }} size='large' type='password' />
                    </ErrorPopover>
                  </Form.Item>

                  <Form.Item hasFeedback validateStatus={this.props.signupForm.validation.password_confirmation.status} style={{marginTop: '-10px'}} label='CONFIRM PASSWORD'>
                    <ErrorPopover
                        content={this.props.signupForm.validation.password_confirmation.error.content}
                        title={this.props.signupForm.validation.password_confirmation.error.title}
                        visible={this.props.signupForm.validation.password_confirmation.anyError}
                        placement='topRight'>
                          <Input id='password_confirmation' onChange={this.handleChange} ref={(input) => { this.passwordConfirmationInput = input }} size='large' type='password' />
                    </ErrorPopover>
                  </Form.Item>

                  <ErrorPopover
                    content={this.props.signupForm.error.content}
                    title={this.props.signupForm.error.title}
                    visible={this.props.signupForm.anyError}
                    placement='right'>
                    <Button style={{marginTop: '-10px'}} type='primary' size='large' htmlType='submit' className='shadow-1'>
                        Sign up
                    </Button>
                  </ErrorPopover>
                </Form>
                <br />
                <Divider />

                <Link to={ SIGNIN_ROUTE }><Button style={{marginRight: 5}} type='primary' ghost>Sign in</Button></Link>
              </Col>
            </Row>
          </Content>
        </Layout>
      </div>
    )
  }
}

function mapStateToProps (state) {
  const { isBusy } = state.appReducer
  const { signupForm } = state.authReducer

  return {
    isBusy,
    signupForm
  }
}

const SignupConnected = connect(mapStateToProps)(Signup)
export default SignupConnected
