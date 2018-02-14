import React from 'react'
import { connect } from 'react-redux'
import { logout } from '../../actions/auth.actions'

class Logout extends React.Component {
    componentDidMount() {
        this.props.dispatch(logout())
    }

    render() {
        return (<div></div>);
    }
}

const connectedLogout = connect()(Logout)
export default connectedLogout