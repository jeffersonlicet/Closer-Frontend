import React from 'react'
import { connect } from 'react-redux';
import { Layout } from 'antd'

class AppWrapper extends React.Component {
    render() {
        return (<Layout style={{ minHeight: '100vh' }}>{ this.props.children }</Layout>)
    }
}

function mapStateToProps(state) {
    return {}
}

const connectedAppWrapper = connect(mapStateToProps)(AppWrapper);
export default connectedAppWrapper