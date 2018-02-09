import React from 'react'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import { Layout, Row, Col, Form, Icon, Input, Button, Checkbox, Divider, message, Popover } from 'antd'
import { showLoading, hideLoading } from 'react-redux-loading-bar'
import { toggleLoading, toggleBusy } from '../../actions/app.actions'
import { signin, hideFormError } from '../../actions/auth.actions'
import AppHeader from '../../components/AppHeader/AppHeader'
import Sidebar from '../../components/Sidebar/Sidebar'
import Logo from '../../components/Logo/Logo'


import '../../vendor/Shadow/Shadow.css'
import '../../vendor/Radius/Radius.css'
import './Signin.css'

const { Content } = Layout;
const FormItem = Form.Item;

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class Signin extends React.Component {
    state = { username: '', password: ''}
    
    componentDidMount() {
        this.usernameInput.focus();
    }

    handleChange = (e) => {
        this.setState({ [e.target.id]: e.target.value});
    }

    handleSubmit = (e) => {
        e.preventDefault();

        this.props.dispatch(hideFormError())
        
        let usernameVal = this.state.username
        let passwordVal = this.state.password

        if(!usernameVal) {
            this.usernameInput.focus()
            return
        }

        if(!passwordVal) {
            this.passwordInput.focus()
            return
        }

        this.props.dispatch(signin(usernameVal, passwordVal))
    }

    handleEnter = (e) => {
        if(!e.target.value)
            return

        if(e.target.id === 'username')
            this.passwordInput.focus()
        else
            this.handleSubmit(e)
    }
    
    render() {
        return (
            <div>
                <Helmet>
                    <title>Signin</title>
                </Helmet>
                <Layout>
                    <Content>
                        <Row>
                            <Col xs={{ span: 24, offset: 0 }} sm={{span: 18, offset: 3}} md={{span: 10, offset: 7}} style={{ height: '100vh', padding: 80}}>
                               
                            
                                <h1 style={{ fontSize: 40, fontWeight: 'lighter'}}>Signin</h1>
                              
                                
                                <Form onSubmit={this.handleSubmit} className="login-form">
                                    <FormItem label="USERNAME OR EMAIL">
                                        <Input id="username" onPressEnter={this.handleEnter}  onChange={this.handleChange} ref={(input) => {this.usernameInput = input;}} size="large" />
                                    </FormItem>

                                    <FormItem style={{marginTop: '-10px'}} label="PASSWORD">
                                       <Input id="password" onPressEnter={this.handleEnter}  onChange={this.handleChange} ref={(input) => {this.passwordInput = input;}} size="large" type="password" />
                                    </FormItem>

                                    <Popover
                                        content={this.props.signinForm.error.content}
                                        title={this.props.signinForm.error.title}
                                        visible={this.props.signinForm.anyError}
                                        placement="right">
                                     <Button style={{marginTop: '-10px'}} type="primary" size="large" style={{marginTop: '5px'}} htmlType="submit" className="login-form-button shadow-1">
                                        Sign in
                                    </Button>
                                    </Popover>
                                </Form>
                                < br />
                                <Divider />
                                <Button type="primary" ghost>Sign up</Button> <Button type="dashed">Forgot password</Button>
                            </Col>
                        </Row>
                    </Content>
                </Layout>
            </div>
        )
    }
}


function mapStateToProps(state){
    const { isBusy } = state.appReducer
    const { signinForm } = state.authReducer
    
    return {
        isBusy,
        signinForm
    };
}

const SigninConnected = connect(mapStateToProps)(Signin);
export default SigninConnected