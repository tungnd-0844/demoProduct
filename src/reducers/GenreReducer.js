import {
  FETCH_GENRE_MOVIES,
  FETCH_GENRE_MOVIES_SUCEESS,
  FETCH_GENRE_MOVIES_FAIL,
  FETCH_TRENDING_MOVIES,
  FETCH_TRENDING_MOVIES_SUCEESS
} from "../actions/actionType";
const initialState = {
  data: [],
  dataTrending: []
};

const dataReducers = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_GENRE_MOVIES:
      return {
        ...state,
        genre: action.genre
      };
    case FETCH_GENRE_MOVIES_SUCEESS:
      return {
        ...state,
        dataTrending: action.dataTrending,
        data: action.data
      };
    case FETCH_GENRE_MOVIES_FAIL:
      return {
        data: [],
        isFetching: false
      };
    case FETCH_TRENDING_MOVIES:
      return {
        ...state
      };
    default:
      return state;
  }
};

export default dataReducers;
