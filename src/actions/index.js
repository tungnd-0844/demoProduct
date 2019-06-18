import { FETCH_MOVIES, FETCH_CAST } from "./actionType";

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
