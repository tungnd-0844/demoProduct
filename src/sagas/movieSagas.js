import { put, takeEvery } from "redux-saga/effects";
import { APIs } from "./APIs";
import {
  FETCH_MOVIES,
  FETCH_MOVIES_SUCEESS,
  FETCH_MOVIES_FAIL,
  FETCH_CAST,
  FETCH_CAST_SUCEESS,
  FETCH_CAST_FAIL,
  FETCH_LOADMORE_SUCEESS,
  FETCH_LOADMORE,
  FETCH_LOADMORE_FAIL,
  FETCH_REFRESH,
  FETCH_REFRESH_FAIL,
  FETCH_REFRESH_SUCEESS
} from "../actions/actionType";

function* fetchData() {
  try {
    const data = yield APIs.fetchMovie();
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

function* fetchLoadmoreMovie(action) {
  try {
    const data = yield APIs.fetchLoadMoreMovie(action.page);
    yield put({ type: FETCH_LOADMORE_SUCEESS, data });
  } catch (e) {
    yield put({ type: FETCH_LOADMORE_FAIL, e });
  }
}

function* fetchRefreshMovie() {
  try {
    const data = yield APIs.fetchMovie();
    yield put({ type: FETCH_REFRESH_SUCEESS, data });
  } catch (e) {
    yield put({ type: FETCH_REFRESH_FAIL, e });
  }
}

function* dataSaga() {
  yield takeEvery(FETCH_MOVIES, fetchData);
  yield takeEvery(FETCH_CAST, fetchCast);
  yield takeEvery(FETCH_LOADMORE, fetchLoadmoreMovie);
  yield takeEvery(FETCH_REFRESH, fetchRefreshMovie);
}

export default dataSaga;
