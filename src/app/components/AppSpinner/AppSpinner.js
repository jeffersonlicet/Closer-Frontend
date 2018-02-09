import React from 'react'

import './AppSpinner.css'

import { Spin, Icon } from 'antd';
import { connect } from 'react-redux';
const antIcon = <Icon type="loading" style={{ fontSize: 60, color: '#FFF'}} spin />;

class AppSpinner extends React.Component {
    
    render() {
        let classStatus = 'app-spinner-wrapper ' + (this.props.loading ? 'visible' : '')
        return (
            <div className={classStatus}>
                <div className="app-spinner-body">
                    <Spin indicator={antIcon} />
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { loading } = state.appReducer
    return { loading }
}

const connectedAppSpinner = connect(mapStateToProps)(AppSpinner)

export default connectedAppSpinner