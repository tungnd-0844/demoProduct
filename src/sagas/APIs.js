import axios from "axios";
const MOVIE_PATH = "https://api.themoviedb.org/3/movie/";
const CAST_PATH = "https://api.themoviedb.org/3/";
const API_KEY = "3956f50a726a2f785334c24759b97dc6";

const fetchMovie = () => {
  return axios
    .get(MOVIE_PATH + `popular?api_key=${API_KEY}&page=1`)
    .then(response => response.data.results)
    .catch(error => {
      console.log(error);
    });
};

const fetchLoadMoreMovie = page => {
  return axios
    .get(MOVIE_PATH + `popular?api_key=${API_KEY}&page=${page}`)
    .then(response => response.data.results)
    .catch(error => {
      console.log(error);
    });
};

const fetchCastMovie = movieId => {
  return axios
    .get(MOVIE_PATH + `${movieId}/credits?api_key=${API_KEY}`)
    .then(response => response.data)
    .catch(error => {
      console.log(error);
    });
};

const fetchCastDetailMovie = personId => {
  return axios
    .get(CAST_PATH + `person/${personId}?api_key=${API_KEY}`)
    .then(response => response.data)
    .catch(error => {
      console.log(error);
    });
};

const fetchListCastDetailMovie = castId => {
  return axios
    .get(
      CAST_PATH + `discover/movie?api_key=${API_KEY}&with_cast=${castId}&page=1`
    )
    .then(response => response.data)
    .catch(error => {
      console.log(error);
    });
};

const searchMovie = moive => {
  return axios
    .get(CAST_PATH + `search/movie?api_key=${API_KEY}&query=${moive}`)
    .then(response => response.data)
    .catch(error => {
      console.log(error);
    });
};

const playVideo = movieId => {
  return axios
    .get(
      MOVIE_PATH +
        `${movieId}?api_key=${API_KEY}&append_to_response=videos,credits`
    )
    .then(response => response.data.videos.results[0].key)
    .catch(error => {
      console.log(error);
    });
};

export const APIs = {
  fetchMovie,
  fetchCastMovie,
  fetchLoadMoreMovie,
  fetchCastDetailMovie,
  fetchListCastDetailMovie,
  searchMovie,
  playVideo
};
