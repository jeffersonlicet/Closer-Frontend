import { CONTAINER_ID } from './app/constants/app.constants'

import React from 'react'
import thunk from 'redux-thunk'
import { render } from 'react-dom'
import reducers from './app/reducers'
import { Router } from 'react-router-dom'
import history from './app/helpers/history'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import registerServiceWorker from './registerServiceWorker'
import AppWrapper from './app/components/AppWrapper/AppWrapper'
import AppSpinner from './app/components/AppSpinner/AppSpinner'

// import routes
import GuestRoute from './app/routes/GuestRoute'
import AuthenticatedRoute from './app/routes/AuthenticatedRoute'
import LoadingBar from 'react-redux-loading-bar'

// import pages here
import Signin from './app/screens/Signin/Signin'
import Home from './app/screens/Home/Home'
import Sidebar from './app/components/Sidebar/Sidebar'

// import a global style
import './app/vendor/Closr/Closr.css'

const generateMiddleware = applyMiddleware(thunk)(createStore)
const store = generateMiddleware(reducers)

const core =    <Provider store={store}>
                    <Router history={history}>
                        <AppWrapper>
                            <LoadingBar showFastActions style={{ backgroundColor: '#F4726F' }} />
                            <AppSpinner />
                            <GuestRoute component={Signin} />
                            <AuthenticatedRoute component={Home} />
                        </AppWrapper>    
                    </Router>
                </Provider>;

render(core, document.getElementById(CONTAINER_ID))
registerServiceWorker()