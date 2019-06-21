import {
  FETCH_CAST,
  FETCH_CAST_SUCEESS,
  FETCH_CAST_FAIL,
  PLAY_VIDEO,
  PLAY_VIDEO_SUCEESS
} from "../actions/actionType";

const initialState = {
  data: [],
  isFetching: false,
  video: ""
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
      console.log("A")
      return {
        data: [],
        isFetching: false
      };
    case PLAY_VIDEO:
      return {
        ...state,
        movieId: action.movieId
      };
    case PLAY_VIDEO_SUCEESS:
      return {
        ...state,
        video: action.video
      };
    default:
      return state;
  }
};

export default dataReducers;
