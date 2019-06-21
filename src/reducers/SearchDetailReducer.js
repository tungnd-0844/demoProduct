import {
  SEARCH_MOVIE,
  SEARCH_MOVIE_FAIL,
  SEARCH_MOVIE_SUCEESS
} from "../actions/actionType";

const initialState = {
  loading: false,
  data: [],
  error: null
};

const dataReducers = (state = [], action) => {
  switch (action.type) {
    case SEARCH_MOVIE:
      return action.movie;

    case SEARCH_MOVIE_SUCEESS:
      return action.data.results;

    case SEARCH_MOVIE_FAIL:
      return [];

    default:
      return state;
  }
};

export default dataReducers;
