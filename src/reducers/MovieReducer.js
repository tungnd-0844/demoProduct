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
        page: state.page + 1
      };
    case FETCH_MOVIES_SUCEESS:
      return {
        ...state,
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
        isLoadmore: true
      };
    case FETCH_LOADMORE_SUCEESS:
      return {
        data: [...state.data, ...action.data],
        isLoadmore: false,
        page: state.page
      };
    case FETCH_REFRESH:
      return {
        ...state,
        page: 1,
        isRefreshing: true
      };
    case FETCH_REFRESH_SUCEESS:
      return {
        ...state,
        isRefreshing: false,
        data: action.data,
        page: state.page + 1
      };
    default:
      return state;
  }
};

export default dataReducers;
