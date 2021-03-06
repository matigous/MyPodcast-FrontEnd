import { takeLatest, call, put, all } from "redux-saga/effects";

import api from "../../../services/api";
import history from "../../../services/history";
import {
  updateProfileSuccess,
  updateProfileFailure,
  updateToPodcasterSuccess,
  updatePremiumSuccess
} from "./actions";
import { RefreshToken } from "../auth/actions";

import { toast } from "react-toastify";

export function* updateProfile({ payload }) {
  try {
    const { usu_nome, usu_email, ...rest } = payload;

    const profile = Object.assign(
      { usu_nome, usu_email },
      rest.senhaAntiga ? rest : {}
    );

    const response = yield call(api.put, "edituser", profile);

    if (response.data.usuNomeExists) {
      toast.error("Nome de usuário indisponível");
    } else if (response.data.usuEmailExists) {
      toast.error("E-mail já cadastrado");
    } else {
      toast.success("Perfil atualizado com sucesso");
      yield put(updateProfileSuccess(response.data));
    }
  } catch (err) {
    toast.error("Erro ao atualizar perfil");
    yield put(updateProfileFailure);
  }
}

export function* updateStatus({ payload }) {
  const { usu_id, usu_status } = payload;

  try {
    yield call(api.put, `/users/${usu_id}/${usu_status ? 0 : 1}`);
  } catch (err) {
    toast.error("Erro ao ativar ou desativar usuário");
    console.tron.log("o erro é", err);
  }
}

export function* updateModerador({ payload }) {
  const { usu_id, tus_id } = payload;

  try {
    yield call(api.put, `adm/users/tipo/${usu_id}/${tus_id === 3 ? 1 : 3}`);
  } catch (err) {
    toast.error("Erro ao ativar ou desativar usuário");
    console.tron.log("o erro é", err);
  }
}

export function* updatePodcaster() {
  try {
    const response = yield call(api.put, `/virarpodcaster`);
    const newresponse = yield call(api.put, `/refreshtoken`);

    const { token, user } = newresponse.data;
    api.defaults.headers["Authorization"] = `Bearer ${token}`;

    yield put(RefreshToken(token, user));
    yield put(
      updateToPodcasterSuccess(
        response.data.tus_descricao,
        response.data.tus_id
      )
    );

    history.push("podcaster/dashboard/podcasts");
    toast.success("Agora você tem acesso ao painel de Podcaster");
  } catch (err) {
    toast.error("Erro ao ativar ou desativar usuário");
    console.tron.log("o erro é", err);
  }
}

export function* updatePremium() {
  try {
    const response = yield call(api.put, `/virarpremium`);
    const newresponse = yield call(api.put, `/refreshtoken`);

    const { token, user } = newresponse.data;
    api.defaults.headers["Authorization"] = `Bearer ${token}`;

    yield put(RefreshToken(token, user));
    yield put(
      updatePremiumSuccess(
        response.data.usu_premium
      )
    );

    history.push("../../podcaster/premium/dashboard/podcasts");
    toast.success("Bem-vindo ao painel Premium");
  } catch (err) {
    toast.error("Erro ao ativar ou desativar usuário");
    console.tron.log("o erro é", err);
  }
}

export default all([
  takeLatest("@user/UPDATE_PROFILE_REQUEST", updateProfile),
  takeLatest("@user/UPDATE_STATUS_REQUEST", updateStatus),
  takeLatest("@user/UPDATE_MODERADOR_REQUEST", updateModerador),
  takeLatest("@user/UPDATE_TOPODCASTER_REQUEST", updatePodcaster),
  takeLatest("@user/UPDATE_PREMIUM_REQUEST", updatePremium),
]);
