import React from 'react'

import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import { Layout, Row, Col, Form, Input, Button, Divider } from 'antd'
import { signin, hideSigninFormError } from '../../actions/auth.actions'
import { Link } from 'react-router-dom'
import ErrorPopover from '../../components/ErrorPopover/ErrorPopover'

import { SIGNUP_ROUTE } from '../../constants/app.constants'

import '../../vendor/Shadow/Shadow.css'
import '../../vendor/Radius/Radius.css'
import './Signin.css'

const { Content } = Layout
const FormItem = Form.Item

class Signin extends React.Component {
  constructor (props) {
    super(props)
    this.state = { username: '', password: '' }
  }

  componentWillMount() { 
    this.props.dispatch(hideSigninFormError())
  }

  componentDidMount () {
    this.usernameInput.focus()
  }

  handleChange = (e) => {
    this.setState({ [e.target.id]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()

    this.props.dispatch(hideSigninFormError())

    let usernameVal = this.state.username
    let passwordVal = this.state.password

    if (!usernameVal) {
      this.usernameInput.focus()
      return
    }

    if (!passwordVal) {
      this.passwordInput.focus()
      return
    }

    this.props.dispatch(signin(usernameVal, passwordVal))
  }

  render () {
    return (
      <div>
        <Helmet>
          <title>Signin</title>
        </Helmet>
        <Layout style={{paddingBottom: 30}}>
          <Content>
            <Row>
              <Col xs={{ span: 24, offset: 0 }} sm={{ span: 18, offset: 3 }} md={{ span: 10, offset: 7 }} style={{ height: '100vh', padding: 80 }}>
                <h1 style={{ fontSize: 40, fontWeight: 'lighter', marginBottom: 0}}>Signin</h1>
                <h4>To discover new stories from your real friends.</h4>
                <br />

                <Form onSubmit={this.handleSubmit}>
                  <FormItem label='USERNAME OR EMAIL'>
                    <Input id='username' onChange={this.handleChange} ref={(input) => { this.usernameInput = input }} size='large' />
                  </FormItem>

                  <FormItem style={{marginTop: '-10px'}} label='PASSWORD'>
                    <Input id='password' onChange={this.handleChange} ref={(input) => { this.passwordInput = input }} size='large' type='password' />
                  </FormItem>

                  <ErrorPopover
                    content={this.props.signinForm.error.content}
                    title={this.props.signinForm.error.title}
                    visible={this.props.signinForm.anyError}
                    placement='right'>
                    <Button disabled={this.props.isBusy} style={{marginTop: '-10px'}} type='primary' size='large' htmlType='submit' className='shadow-1'>
                        Sign in
                    </Button>
                  </ErrorPopover>
                </Form>
                <br />
                <Divider />

                <Link to={ SIGNUP_ROUTE }><Button style={{ marginRight: 5 }} type='primary' ghost>Sign up</Button></Link>
                <Button style={{ marginRight: 5 }} type='dashed'>Forgot password</Button>
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
  const { signinForm, loggedIn } = state.authReducer

  return {
    isBusy,
    signinForm,
    loggedIn
  }
}

const SigninConnected = connect(mapStateToProps)(Signin)
export default SigninConnected
