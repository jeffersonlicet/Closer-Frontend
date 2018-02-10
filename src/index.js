import { CONTAINER_ID } from './app/constants/app.constants'

import React from 'react'
import thunk from 'redux-thunk'
import { render } from 'react-dom'
import reducers from './app/reducers'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import registerServiceWorker from './registerServiceWorker'

import App from './app/screens/App/App'

const generateMiddleware = applyMiddleware(thunk)(createStore)
const store = generateMiddleware(reducers)

render(<Provider store={store}><App /></Provider>, document.getElementById(CONTAINER_ID))
registerServiceWorker()
