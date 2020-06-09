import { put, takeEvery, all } from "redux-saga/effects";

export function* changeVolumeSelectChange() {
  yield put({ type: "CHANGE_VOLUME_SELECT_CHANGE"});
}

export function* watchChangeVolumeSelectChange() {
    console.log('!!!!!')
  yield takeEvery("CHANGE_VOLUME_SELECT_CHANGE", changeVolumeSelectChange);
}


export function* helloSaga() {
  console.log("Hello Sagas!");
}


export default function* rootSaga() {
    yield all([
      helloSaga(),
      watchChangeVolumeSelectChange()
    ])
  }