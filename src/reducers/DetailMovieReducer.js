import {
  FETCH_CAST,
  FETCH_CAST_SUCEESS,
  FETCH_CAST_FAIL
} from "../actions/actionType";

const initialState = {
  data: [],
  isFetching: false
};

const dataReducers = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CAST:
      return {
        ...state,
        isFetching: true,
        movieId: action.movieId
      };
    case FETCH_CAST_SUCEESS:
      return {
        ...state,
        isFetching: false,
        data: action.data
      };
    case FETCH_CAST_FAIL:
      return {
        data: [],
        isFetching: false
      };
    default:
      return state;
  }
};

export default dataReducers;
