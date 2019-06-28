import { combineReducers } from "redux";
import dataMovie from "./MovieReducer";
import dataCast from "./DetailMovieReducer";
import dataCastDetail from "./CastDetailReducer";
import dataSearch from "./SearchDetailReducer";
import dataGenre from "./GenreReducer";
import dataComment from "./CommentReducer";

const allReducers = combineReducers({
  dataMovie,
  dataCast,
  dataCastDetail,
  dataSearch,
  dataGenre,
  dataComment
});

export default allReducers;
