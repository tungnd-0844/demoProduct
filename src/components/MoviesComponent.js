import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl
} from "react-native";
import { connect } from "react-redux";
import { fetch_movie, fetch_loadmore, fetch_refresh } from "../actions";
import ItemMovieComponent from "./ItemMovieComponent";

class MovieComponent extends Component {
  ITEM_MOVIE = "ITEM_MOVIE";

  componentDidMount() {
    this.props.fetch_movie(this.props.dataMovie.page);
  }

  _hanlderDetailNavigator = movie => {
    this.props.navigation.navigate("Detail", { ITEM_MOVIE: movie });
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
    console.log(dataMovie);
    return (
      <View style={styles.container}>
        {dataMovie.isFetching ? (
          <ActivityIndicator
            size="large"
            style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
          />
        ) : (
          <View style={styles.container}>
            <View>
              <Image
                source={require("../image/icon.png")}
                style={styles.info}
              />
              <View style={styles.containerInfor}>
                <Text style={styles.textInfo}>Information</Text>
              </View>
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
    justifyContent: "center",
    alignItems: "center",
    margin: 16
  },
  info: {
    height: 44,
    width: 44,
    margin: 8,
    position: "absolute"
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
