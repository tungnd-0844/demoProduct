import { put, takeEvery, takeLatest } from "redux-saga/effects";
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
  FETCH_REFRESH_SUCEESS,
  FETCH_MOVIES_BY_CAST,
  FETCH_MOVIES_BY_CAST_FAIL,
  FETCH_MOVIES_BY_CAST_SUCEESS,
  FETCH_CAST_DETEAL,
  FETCH_CAST_DETEAL_FAIL,
  FETCH_CAST_DETEAL_SUCEESS,
  SEARCH_MOVIE,
  SEARCH_MOVIE_FAIL,
  SEARCH_MOVIE_SUCEESS,
  PLAY_VIDEO,
  PLAY_VIDEO_FAIL,
  PLAY_VIDEO_SUCEESS
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

function* fetchCastDetailMovie(action) {
  try {
    const data = yield APIs.fetchCastDetailMovie(action.personId);
    yield put({ type: FETCH_CAST_DETEAL_SUCEESS, data });
  } catch (e) {
    yield put({ type: FETCH_CAST_DETEAL_FAIL, e });
  }
}

function* fetchListCastDetailMovie(action) {
  try {
    const listCast = yield APIs.fetchListCastDetailMovie(action.castId);
    yield put({ type: FETCH_MOVIES_BY_CAST_SUCEESS, listCast });
  } catch (e) {
    yield put({ type: FETCH_MOVIES_BY_CAST_FAIL, e });
  }
}

function* searchMovie(action) {
  try {
    const data = yield APIs.searchMovie(action.movie);
    yield put({ type: SEARCH_MOVIE_SUCEESS, data });
  } catch (e) {
    yield put({ type: SEARCH_MOVIE_FAIL, e });
  }
}

function* playVideo(action) {
  try {
    const video = yield APIs.playVideo(action.movieId);
    yield put({ type: PLAY_VIDEO_SUCEESS, video });
  } catch (e) {
    yield put({ type: PLAY_VIDEO_FAIL, e });
  }
}

function* dataSaga() {
  yield takeEvery(FETCH_MOVIES, fetchData);
  yield takeEvery(FETCH_CAST, fetchCast);
  yield takeEvery(FETCH_LOADMORE, fetchLoadmoreMovie);
  yield takeEvery(FETCH_REFRESH, fetchRefreshMovie);
  yield takeEvery(FETCH_CAST_DETEAL, fetchCastDetailMovie);
  yield takeEvery(FETCH_MOVIES_BY_CAST, fetchListCastDetailMovie);
  yield takeLatest(SEARCH_MOVIE, searchMovie);
  yield takeEvery(PLAY_VIDEO, playVideo);
}

export default dataSaga;
