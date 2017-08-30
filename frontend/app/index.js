import { AppContainer as HotReloadContainer } from 'react-hot-loader'
import React from 'react'
import ReactDOM from 'react-dom'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import configureStore from 'configureStore'
import Root from 'components/Root'

import { login, logout } from 'actions/auth'
import { flashInfo } from 'actions/flash'
import storage from 'utils/storage'

const targetEl = document.getElementById('app')

const initialState = {}
const store = configureStore(initialState, browserHistory)
const history = syncHistoryWithStore(browserHistory, store)

// FIXME
const token = storage.getToken()
const user = storage.getUser()
if (token && user) {
  store.dispatch(login.success({ token, user }))
  store.dispatch(flashInfo('Welcome back!'))
} else {
  store.dispatch(logout.success())
}

function rootNode(Root) {
  return (
    <HotReloadContainer>
      <Root store={store} history={history} />
    </HotReloadContainer>
  )
}

ReactDOM.render(rootNode(Root), targetEl)

if (module.hot) {
  module.hot.accept('./components/Root', () => {
    const NextRoot = require('./components/Root').default
    ReactDOM.render(rootNode(NextRoot), targetEl)
  })
}
