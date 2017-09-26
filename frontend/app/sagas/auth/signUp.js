import { call, put, takeLatest } from 'redux-saga/effects'
import { push } from 'react-router-redux'

import { signUp } from 'actions/auth'
import AuthApi from 'api/auth'
import { createRoutineFormSaga } from 'sagas'


export const signUpSaga = createRoutineFormSaga(
  signUp,
  function *successGenerator(payload) {
    const { token, user } = yield call(AuthApi.signUp, payload)
    yield put(signUp.success({ user }))
    if (token) {
      yield put(login.success({ token, user }))
      yield put(push('/?welcome'))
    } else {
      yield put(push('/sign-up/pending-confirm-email'))
    }
  },
)

export default () => [
  takeLatest(signUp.TRIGGER, signUpSaga),
]
