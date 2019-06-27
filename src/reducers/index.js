import { combineReducers } from "redux";
import dataMovie from "./MovieReducer";
import dataCast from "./DetailMovieReducer";
import dataCastDetail from "./CastDetailReducer";
import dataSearch from "./SearchDetailReducer";
import dataGenre from "./GenreReducer";

const allReducers = combineReducers({
  dataMovie,
  dataCast,
  dataCastDetail,
  dataSearch,
  dataGenre
});

export default allReducers;
