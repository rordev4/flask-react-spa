import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'

import { bindRoutineCreators } from 'actions'
import { logout } from 'actions/auth'

import logoutSagas from 'sagas/auth/logout'
import { DAEMON, injectSagas } from 'utils/async'


class Logout extends React.Component {
  componentWillMount() {
    this.props.logout.trigger()
  }

  render() {
    return null
  }
}

const withConnect = connect(
  (state) => ({}),
  (dispatch) => bindRoutineCreators({ logout }, dispatch),
)

const withSagas = injectSagas({ key: 'logout', sagas: logoutSagas, mode: DAEMON })

export default compose(
  withConnect,
  withSagas,
)(Logout)
