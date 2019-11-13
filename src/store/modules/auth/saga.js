import {call, takeLatest, put, all} from 'redux-saga/effects';
import {Alert} from 'react-native';
import api from '../../../services/api';
import {signInSuccess, signFailure, logoutSuccess} from './actions';

export function* signIn({payload}) {
  try {
    const {email, password} = payload;
    const response = yield call(api.post, 'session', {
      email,
      password,
    });

    const {token, user} = response.data;

    if (user.provider) {
      Alert.alert('Erro no login', 'Usuário não é prestador');
      return;
    }
    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(signInSuccess(token, user));
    //history.push('/dashboard');
  } catch (erro) {
    Alert.alert('Erro', 'Erro de Autenticacao');
    yield put(signFailure());
  }
}

export function* signUp({payload}) {
  try {
    const {name, email, password} = payload;
    yield call(api.post, 'users', {
      name,
      email,
      password,
    });
    //   history.push('/');
  } catch (erro) {
    Alert.alert('Erro', 'Falha no Cadastro. Verifique seus dados.');
    yield put(signFailure());
  }
}
export function setToken({payload}) {
  if (!payload) return;
  const {token} = payload.auth;
  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export function logout() {
  api.defaults.headers.Authorization = undefined;
  // history.push('/');
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
  takeLatest('@auth/LOGOUT_SUCCESS', logout),
]);
