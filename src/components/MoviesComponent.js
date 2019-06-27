import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  Image,
  Dimensions,
  TouchableNativeFeedback
} from "react-native";
import { connect } from "react-redux";
import {
  fetch_movie,
  fetch_loadmore,
  fetch_refresh,
  fetch_trending_movie
} from "../actions";
import ItemMovieComponent from "./ItemMovieComponent";
import Icon from "react-native-vector-icons/Ionicons";
import { openDatabase } from "react-native-sqlite-storage";
import firebase from "react-native-firebase";

var db = openDatabase({ name: "MovieDatabase.db" });
const IMAGE_URL = "http://image.tmdb.org/t/p/w300";
const width = Dimensions.get("window").width;
class MovieComponent extends Component {
  ITEM_MOVIE = "ITEM_MOVIE";

  constructor(props) {
    super(props);
    this.state = {
      genre: this.props.navigation.state.params.GENRE,
      currentUser: null
    };
    db.transaction(function(txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_movie'",
        [],
        function(tx, res) {
          if (res.rows.length === 0) {
            txn.executeSql("DROP TABLE IF EXISTS table_movie", []);
            txn.executeSql(
              "CREATE TABLE IF NOT EXISTS table_movie(id INTEGER PRIMARY KEY, title TEXT, poster_path TEXT, popularity FLOAT, original_language TEXT, overview TEXT, backdrop_path TEXT)",
              []
            );
          }
        }
      );
    });
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params.GENRE.toUpperCase()
    };
  };

  componentDidMount() {
    const { currentUser } = firebase.auth();
    this.setState({ currentUser });
    this.props.fetch_movie(this.state.genre);
  }

  _hanlderDetailNavigator = movie => {
    this.props.navigation.navigate("Detail", { ITEM_MOVIE: movie });
  };

  _hanlderSearchNavigator = () => {
    this.props.navigation.navigate("Search");
  };

  _hanlderLoadMore = page => {
    this.props.fetch_loadmore(page, this.state.genre);
  };

  _renderFooter = () => {
    //it will show indicator at the bottom of the list when data is loading otherwise it returns null
    //if (!this.props.dataMovie.isLoadmore) return null;
    return <ActivityIndicator style={{ color: "#000" }} size={"large"} />;
  };

  render() {
    const { dataMovie } = this.props;
    return (
      <View style={styles.container}>
        {dataMovie.isFetching ? (
          <ActivityIndicator
            size="large"
            style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
          />
        ) : (
          <View style={styles.container}>
            <FlatList
              data={dataMovie.data}
              renderItem={({ item, index }) => {
                return (
                  <TouchableOpacity
                    onPress={() => this._hanlderDetailNavigator(item)}
                  >
                    <ItemMovieComponent item={item} index={index} />
                  </TouchableOpacity>
                );
              }}
              onEndReachedThreshold={0.4}
              onEndReached={() =>
                this._hanlderLoadMore(this.props.dataMovie.page)
              }
              keyExtractor={({ id }, index) => index.toString()}
              ListFooterComponent={() => this._renderFooter()}
              refreshControl={
                <RefreshControl
                  onRefresh={() => this.props.fetch_refresh(this.state.genre)}
                  refreshing={dataMovie.isRefreshing}
                />
              }
            />
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  containerImage: {
    width: "100%",
    height: 400,
    flexDirection: "row",
    margin: 8
  },
  imagPath: {
    width: "100%",
    height: 250,
    position: "absolute"
  },
  textName: {
    color: "white",
    fontSize: 18,
    marginLeft: 6
  },
  containerInfor: {
    flex: 1,
    position: "absolute",
    margin: 8
  },
  info: {
    margin: 8
  },
  textInfo: {
    fontSize: 24,
    color: "black",

    fontWeight: "bold"
  }
});

const mapStateToProps = state => {
  const { dataMovie } = state;
  return { dataMovie };
};

const mapDispatchToProps = dispatch => {
  return {
    fetch_movie: genre => dispatch(fetch_movie(genre)),
    fetch_loadmore: (page, genre) => dispatch(fetch_loadmore(page, genre)),
    fetch_refresh: genre => dispatch(fetch_refresh(genre))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MovieComponent);
