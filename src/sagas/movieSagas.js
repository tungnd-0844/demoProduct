import { put, takeEvery } from "redux-saga/effects";
import { APIs } from "./APIs";
import {
  FETCH_MOVIES,
  FETCH_MOVIES_SUCEESS,
  FETCH_MOVIES_FAIL,
  FETCH_CAST,
  FETCH_CAST_SUCEESS,
  FETCH_CAST_FAIL
} from "../actions/actionType";

function* fetchData(action) {
  try {
    const data = yield APIs.fetchMovie(action.page);
    yield put({ type: FETCH_MOVIES_SUCEESS, data });
  } catch (e) {
    yield put({ type: FETCH_MOVIES_FAIL, e });
  }
}

function* fetchCast(action) {
  try {
    const data = yield APIs.fetchCastMovie(action.movieId);
    yield put({ type: FETCH_CAST_SUCEESS, data });
  } catch (e) {
    yield put({ type: FETCH_CAST_FAIL, e });
  }
}

function* dataSaga() {
  yield takeEvery(FETCH_MOVIES, fetchData);
  yield takeEvery(FETCH_CAST, fetchCast);
}

export default dataSaga;
