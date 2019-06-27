import {
  FETCH_MOVIES,
  FETCH_MOVIES_FAIL,
  FETCH_MOVIES_SUCEESS,
  FETCH_LOADMORE,
  FETCH_LOADMORE_FAIL,
  FETCH_LOADMORE_SUCEESS,
  FETCH_REFRESH,
  FETCH_REFRESH_SUCEESS,
  FETCH_REFRESH_FAIL
} from "../actions/actionType";

const initialState = {
  data: [],
  page: 1,
  genre: "",
  isFetching: false,
  isLoadmore: false,
  isRefreshing: false
};

const dataReducers = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MOVIES:
      return {
        ...state,
        isFetching: true,
        genre: action.genre,
        page: state.page + 1
      };
    case FETCH_MOVIES_SUCEESS:
      return {
        ...state,
        dataTrending: action.dataTrending,
        isFetching: false,
        data: action.data
      };
    case FETCH_MOVIES_FAIL:
      return {
        data: [],
        isFetching: false
      };
    case FETCH_LOADMORE:
      return {
        ...state,
        page: state.page + 1,
        genre: action.genre,
        isLoadmore: true
      };
    case FETCH_LOADMORE_SUCEESS:
      return {
        ...state,
        data: [...state.data, ...action.data],
        isLoadmore: false,
        page: state.page
      };
    case FETCH_REFRESH:
      return {
        ...state,
        page: 1,
        genre: action.genre,
        isRefreshing: true
      };
    case FETCH_REFRESH_SUCEESS:
      return {
        ...state,
        isRefreshing: false,
        // isFetching: false,
        data: action.data,
        page: state.page + 1
      };
    default:
      return state;
  }
};

export default dataReducers;
