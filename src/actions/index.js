import {
  FETCH_MOVIES,
  FETCH_CAST,
  FETCH_LOADMORE,
  FETCH_REFRESH,
  FETCH_CAST_DETEAL,
  FETCH_MOVIES_BY_CAST,
  SEARCH_MOVIE,
  PLAY_VIDEO,
  FETCH_GENRE_MOVIES,
  FETCH_TRENDING_MOVIES,
  FETCH_COMMENT_MOVIES
} from "./actionType";

export const fetch_movie = genre => {
  return {
    type: FETCH_MOVIES,
    genre: genre
  };
};

export const fetch_cast = movieId => {
  return {
    type: FETCH_CAST,
    movieId: movieId
  };
};

export const fetch_loadmore = (page, genre) => {
  return {
    type: FETCH_LOADMORE,
    page: page,
    genre: genre
  };
};

export const fetch_refresh = genre => {
  return {
    type: FETCH_REFRESH,
    genre: genre
  };
};

export const fetch_detail_cast = personId => {
  return {
    type: FETCH_CAST_DETEAL,
    personId: personId
  };
};

export const fetch_list_movie_by_cast = castId => {
  return {
    type: FETCH_MOVIES_BY_CAST,
    castId: castId
  };
};

export const searchMovie = movie => {
  return {
    type: SEARCH_MOVIE,
    movie: movie
  };
};

export const playVideo = movieId => {
  return {
    type: PLAY_VIDEO,
    movieId: movieId
  };
};

export const fetch_genre_movie = genre => {
  return {
    type: FETCH_GENRE_MOVIES,
    genre: genre
  };
};

export const fetch_trending_movie = () => {
  return {
    type: FETCH_TRENDING_MOVIES
  };
};

export const fetch_comment_movie = id => {
  return {
    type: FETCH_COMMENT_MOVIES,
    id: id
  };
};
