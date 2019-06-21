import axios from "axios";
const MOVIE_PATH = "https://api.themoviedb.org/3/movie/";
const API_KEY = "3956f50a726a2f785334c24759b97dc6";

const fetchMovie = page => {
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

export const APIs = {
  fetchMovie,
  fetchCastMovie
};
