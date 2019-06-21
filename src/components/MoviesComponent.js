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
  TouchableNativeFeedback
} from "react-native";
import { connect } from "react-redux";
import { fetch_movie, fetch_loadmore, fetch_refresh } from "../actions";
import ItemMovieComponent from "./ItemMovieComponent";
import Icon from "react-native-vector-icons/Ionicons";
import { openDatabase } from "react-native-sqlite-storage";

var db = openDatabase({ name: "MovieDatabase.db" });
class MovieComponent extends Component {
  ITEM_MOVIE = "ITEM_MOVIE";

  constructor(props) {
    super(props);
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

  componentDidMount() {
    this.props.fetch_movie(this.props.dataMovie.page);
  }

  _hanlderDetailNavigator = movie => {
    this.props.navigation.navigate("Detail", { ITEM_MOVIE: movie });
  };

  _hanlderSearchNavigator = () => {
    this.props.navigation.navigate("Search");
  };

  _hanlderLoadMore = page => {
    this.props.fetch_loadmore(page);
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
            <View style={styles.containerInfor}>
              <Text style={styles.textInfo}>Information</Text>
            </View>
            <View style={{ alignItems: "flex-end" }}>
              <TouchableNativeFeedback
                onPress={() => this._hanlderSearchNavigator()}
              >
                <Icon
                  name="ios-search"
                  size={44}
                  color={"black"}
                  style={styles.info}
                />
              </TouchableNativeFeedback>
            </View>

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
                  onRefresh={() => this.props.fetch_refresh()}
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
  containerInfor: {
    flex: 1,
    position: "absolute",
    margin: 16
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
    fetch_movie: page => dispatch(fetch_movie(page)),
    fetch_loadmore: page => dispatch(fetch_loadmore(page)),
    fetch_refresh: () => dispatch(fetch_refresh())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MovieComponent);
