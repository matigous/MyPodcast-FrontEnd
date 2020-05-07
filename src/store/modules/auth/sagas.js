import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { logarSuccess, logarFailure } from './actions';

import api from '../../../services/api';
import history from '../../../services/history';

export function* logar({ payload }) {
	try {
		const { email, senha } = payload;

		const response = yield call(api.post, 'sessions', {
			email,
			senha
		});

		const { token, user } = response.data;

		api.defaults.headers['Authorization'] = `Bearer ${token}`;

		yield put(logarSuccess(token, user));

		if (user.tus_id === 1) {
			history.push('/');
		}

		if (user.tus_id === 2) {
			history.push('/podcaster/dashboard/podcasts');
		}

		if (user.tus_id === 3) {
			history.push('/mod/dashboard');
		}

		if (user.tus_id === 4) {
			history.push('/adm/dashboard');
		}
	} catch (err) {
		toast.error('Usuário ou senha inválidos. Verifique seus dados.');
		yield put(logarFailure());
	}
}
export function signOut() {
	history.push('/');
}

export function* signUp({ payload }) {
	try {
		const { nome, email, senha, cpf, tus_id } = payload;
		const response = yield call(api.post, 'users', {
			nome,
			senha,
			email,
			cpf,
			tus_id
		});

		if (response.data.nomeExists) {
			toast.error('Nome de usuário já cadastrado');
		} else if (response.data.emailExists) {
			toast.error('Email já cadastrado');
		} else {
			history.push('/Login');
		}
	} catch (err) {
		console.tron.log(err);
		toast.error('Falha no cadastro, Verifique seus dados!');
	}
}

export function setToken({ payload }) {
	if (!payload) {
		return;
	}
	const { token } = payload.auth;
	api.defaults.headers['Authorization'] = `Bearer ${token}`;
}

export default all([
	takeLatest('persist/REHYDRATE', setToken),
	takeLatest('@auth/SIGN_IN_REQUEST', logar),
	takeLatest('@auth/SIGN_OUT', signOut),
	takeLatest('@auth/SIGN_UP_REQUEST', signUp)
]);
