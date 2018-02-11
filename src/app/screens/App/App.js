import React from 'react'
import { Router } from 'react-router-dom';
import LoadingBar from 'react-redux-loading-bar'

import { history } from '../../helpers/history'

// import a global style
import '../../vendor/Closr/Closr.css'

// import pages
import Home from '../Home/Home'
import Signup from '../Signup/Signup'
import Signin from '../Signin/Signin'

// import routes
import AuthenticatedRoute from '../../routes/AuthenticatedRoute'
import GuestRoute from '../../routes/GuestRoute'

// import components
import AppWrapper from '../../components/AppWrapper/AppWrapper'
import AppSpinner from '../../components/AppSpinner/AppSpinner'

const App = () => 
(
  <Router history={history}>
    <AppWrapper>
      <AppSpinner />
      <LoadingBar showFastActions style={{ backgroundColor: '#F4726F' }} />
      <AuthenticatedRoute exact path="/" component={Home} />
      <GuestRoute path="/signup" component={Signup} />
      <GuestRoute path="/signin" component={Signin} />
    </AppWrapper>
  </Router>
)

export default App
