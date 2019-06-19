import {
  FETCH_MOVIES,
  FETCH_CAST,
  FETCH_LOADMORE,
  FETCH_REFRESH
} from "./actionType";

export const fetch_movie = page => {
  return {
    type: FETCH_MOVIES,
    page: page
  };
};

export const fetch_cast = movieId => {
  return {
    type: FETCH_CAST,
    movieId: movieId
  };
};

export const fetch_loadmore = page => {
  return {
    type: FETCH_LOADMORE,
    page: page
  };
};

export const fetch_refresh = () => {
  return {
    type: FETCH_REFRESH
  };
};
