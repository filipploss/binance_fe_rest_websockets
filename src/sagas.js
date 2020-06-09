import { put, takeEvery, all } from "redux-saga/effects";

export function* searchSelectChange() {
  yield put({ type: "SEARCH_SELECT_CHANGE" });
}

export function* watchSearchSelectChange() {
  yield takeEvery("SEARCH_SELECT_CHANGE_WATCH", searchSelectChange);
}

export function* searchSelectVolume() {
  yield put({ type: "SEARCH_SELECT_VOLUME" });
}

export function* watchSearchSelectVolume() {
  yield takeEvery("SEARCH_SELECT_VOLUME_WATCH", searchSelectVolume);
}

export default function* rootSaga() {
  yield all([watchSearchSelectChange(), watchSearchSelectVolume()]);
}
