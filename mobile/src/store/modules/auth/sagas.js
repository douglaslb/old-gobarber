import {takeLatest, call, put, all} from 'redux-saga/effects'
import {Alert} from 'react-native'
import api from '~/services/api'

import {signInSuccess, signFailure, signUpSuccess} from './actions'

export function* signIn({payload}) {
  try {
    const {email, password} = payload

    const response = yield call(api.post, 'sessions', {
      email,
      password,
    })

    const {token, user} = response.data

    if (user.provider) {
      Alert.alert('Erro no Login', 'Usuário não pode ser prestador de serviço')
      yield put(signFailure())
      return
    }

    api.defaults.headers.Authorization = `Bearer ${token}`

    yield put(signInSuccess(token, user))

    // history.push('/dashboard')
  } catch (err) {
    Alert.alert('Falha na autenticação', 'Usuário ou senha incorretos')
    yield put(signFailure())
  }
}

export function* signUp({payload}) {
  try {
    const {name, email, password} = payload

    yield call(api.post, 'users', {
      name,
      email,
      password,
    })

    yield put(signUpSuccess())
    // history.push('/')
  } catch (err) {
    Alert.alert(
      'Falha no cadastro',
      'Houve um erro no cadastro, verifique seus dados',
    )
    yield put(signFailure())
  }
}

export function setToken({payload}) {
  if (!payload) {
    return
  }

  const {token} = payload.auth

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`
  }
}

function signOut() {
  // history.push('/')
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
  takeLatest('@auth/SIGN_OUT', signOut),
])
