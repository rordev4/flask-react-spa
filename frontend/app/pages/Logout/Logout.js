import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'

import { bindRoutineCreators } from 'actions'
import { logout } from 'actions/auth'
import { injectSagas } from 'utils/async'


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

const withSagas = injectSagas(require('sagas/auth/logout'))

export default compose(
  withConnect,
  withSagas,
)(Logout)
