import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  ToastAndroid,
  ScrollView,
  SafeAreaView
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import { connect } from "react-redux";
import { fetch_cast, playVideo } from "../actions";
import CastComponent from "./CastComponent";
import YouTube from "react-native-youtube";
import { openDatabase } from "react-native-sqlite-storage";

var db = openDatabase({ name: "MovieDatabase.db" });

const IMAGE_URL = "http://image.tmdb.org/t/p/w300";
mounted = false;
class DetailMovieComponent extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: null
    };
  };
  constructor(props) {
    super(props);
    this.state = {
      movie: this.props.navigation.state.params.ITEM_MOVIE,
      isReady: false,
      favorite: false,
      modalVisible: false
    };

    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM table_movie WHERE id = ?`,
        [this.state.movie.id],
        (tx, results) => {
          if (results.rows.length > 0) {
            this.setState({
              favorite: true
            });
          } else {
            this.setState({
              favorite: false
            });
          }
        }
      );
    });
  }

  setModalVisible(visible) {
    console.log(visible);
    this.setState({ modalVisible: visible });
  }

  componentDidMount() {
    this.mounted = true;
    if (this.mounted) {
      this.props.playVideo(this.state.movie.id);
      this.props.fetch_cast(this.state.movie.id);
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  _handlerCastDetailNavigation = item => {
    this.props.navigation.push("CastDetail", { ITEM_CAST: item });
  };

  _handlerAddMovie = movie => {
    var that = this;
    db.transaction(function(tx) {
      tx.executeSql(
        "INSERT INTO table_movie (id, title, poster_path, popularity, original_language, overview, backdrop_path) VALUES (?,?,?,?,?,?,?)",
        [
          movie.id,
          movie.title,
          movie.poster_path,
          movie.popularity,
          movie.original_language,
          movie.overview,
          movie.backdrop_path
        ],
        (tx, results) => {
          if (results.rowsAffected > 0) {
            ToastAndroid.show(
              `Bạn đã yêu thích bộ film ${movie.title}`,
              ToastAndroid.SHORT
            );
            that.setState({
              favorite: true
            });
          } else {
            ToastAndroid.show("Yêu thích thất bại", ToastAndroid.SHORT);
          }
        }
      );
    });
  };

  _handlerDeleteMovie = movie => {
    var that = this;
    db.transaction(tx => {
      tx.executeSql(
        "DELETE FROM  table_movie where id=?",
        [movie.id],
        (tx, results) => {
          if (results.rowsAffected > 0) {
            ToastAndroid.show(
              `Bạn đã xóa thành công bộ film ${movie.title}`,
              ToastAndroid.SHORT
            );
            that.setState({
              favorite: false
            });
          } else {
            ToastAndroid.show("Xóa thất bại", ToastAndroid.SHORT);
          }
        }
      );
    });
  };

  render() {
    const { navigation } = this.props;
    const { dataCast } = this.props;
    const { movie } = this.state;
    return (
      <View style={styles.container}>
        <ScrollView>
          <Image
            source={{ uri: IMAGE_URL + movie.backdrop_path }}
            style={styles.imageBackgroud}
          />

          {/* <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon
            name="ios-arrow-round-back"
            size={50}
            color={"white"}
            style={styles.iconBack}
          />
        </TouchableOpacity> */}

          <View style={styles.containerHeader}>
            <Image
              source={{ uri: IMAGE_URL + movie.poster_path }}
              style={styles.imageHeader}
            />
            <View style={styles.containerInfor}>
              <Text style={styles.textTitle} numberOfLines={1}>
                {movie.title}
              </Text>
              <View style={styles.containerDetail}>
                <View style={styles.containerDetail}>
                  <Icon name="ios-globe" size={25} />
                  <Text style={{ marginLeft: 8 }}>
                    {movie.original_language}
                  </Text>
                </View>
                <View style={[styles.containerDetail, { marginLeft: 16 }]}>
                  <Icon name="ios-star" size={25} />
                  <Text style={{ marginLeft: 8 }}>{movie.popularity}</Text>
                </View>
              </View>
            </View>
          </View>
          <Text style={styles.textOverview}>{movie.overview}</Text>
          <View style={styles.containerCast}>
            <Text>Full Cast & Crew</Text>
            <FlatList
              data={dataCast.data.cast}
              horizontal={true}
              renderItem={({ item, index }) => {
                return (
                  <TouchableOpacity
                    onPress={() => this._handlerCastDetailNavigation(item)}
                  >
                    <CastComponent item={item} index={index} />
                  </TouchableOpacity>
                );
              }}
              keyExtractor={({ id }, index) => index.toString()}
            />
          </View>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              style={{ flex: 1, margin: 16, alignItems: "center" }}
              onPress={() => navigation.goBack()}
            >
              <View style={styles.actionButton}>
                <MaterialIcon
                  name="keyboard-backspace"
                  size={24}
                  color={"black"}
                />
              </View>
              <Text style={{ fontWeight: "bold", color: "black" }}>
                QUAY LẠI
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ flex: 1, margin: 16, alignItems: "center" }}
              onPress={() =>
                navigation.navigate("Youtube", { VIDEO: dataCast.video })
              }
            >
              <View style={styles.actionButton}>
                <MaterialIcon
                  name="remove-from-queue"
                  size={24}
                  color={"black"}
                />
              </View>
              <Text style={{ fontWeight: "bold", color: "black" }}>
                TRAILER
              </Text>
            </TouchableOpacity>
            {this.state.favorite ? (
              <TouchableOpacity
                style={{ flex: 1, margin: 16, alignItems: "center" }}
                onPress={() => this._handlerDeleteMovie(movie)}
              >
                <View style={styles.actionButton}>
                  <MaterialIcon name="favorite" size={24} color={"red"} />
                </View>
                <Text style={{ fontWeight: "bold", color: "black" }}>
                  FAVORITE
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={{ flex: 1, margin: 16, alignItems: "center" }}
                onPress={() => this._handlerAddMovie(movie)}
              >
                <View style={styles.actionButton}>
                  <MaterialIcon
                    name="favorite-border"
                    size={24}
                    color="black"
                  />
                </View>
                <Text style={{ fontWeight: "bold", color: "black" }}>
                  FAVORITE
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  imageBackgroud: {
    position: "absolute",
    height: 250,
    width: "100%"
  },
  iconBack: {
    marginLeft: 16
  },
  imageHeader: {
    marginLeft: 36,
    height: 150,
    width: 120
  },
  containerHeader: {
    marginTop: 175,
    flexDirection: "row"
  },
  containerInfor: {
    justifyContent: "flex-end",
    marginLeft: 8
  },
  textTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 16
  },
  containerDetail: {
    flexDirection: "row",
    marginTop: 8
  },
  textOverview: {
    margin: 16
  },
  containerCast: {
    margin: 16
  },
  actionButton: {
    width: 56,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 28,
    backgroundColor: "white",
    elevation: 6
  }
});

const mapStateToProps = state => {
  const { dataCast } = state;
  return { dataCast };
};

const mapDispatchToProps = dispatch => {
  return {
    fetch_cast: movieId => dispatch(fetch_cast(movieId)),
    playVideo: movieId => dispatch(playVideo(movieId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailMovieComponent);
