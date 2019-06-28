import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  FlatList,
  View,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Image,
  TouchableNativeFeedback
} from "react-native";
import { connect } from "react-redux";
import { fetch_genre_movie, fetch_trending_movie } from "../actions";
import Icon from "react-native-vector-icons/Ionicons";
import Carousel from "react-native-snap-carousel";
import ItemGenreComponent from "./ItemGenreComponent";

const IMAGE_URL = "http://image.tmdb.org/t/p/w300";
const width = Dimensions.get("window").width;
class GenreComponent extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "MovieDB",

      headerRight: (
        <TouchableNativeFeedback
          onPress={() => this._hanlderSearchNavigator(navigation)}
        >
          <Icon
            name="ios-search"
            size={44}
            color={"black"}
            style={styles.info}
          />
        </TouchableNativeFeedback>
      )
    };
  };

  static _hanlderSearchNavigator = navigation => {
    navigation.navigate("Search");
  };

  componentDidMount() {
    this.props.fetch_trending_movie();
    this.props.fetch_genre_movie("now_playing");
    this.props.fetch_genre_movie("popular");
    this.props.fetch_genre_movie("upcoming");
    this.props.fetch_genre_movie("top_rated");
  }

  _handlerMovieNavigation = genre => {
    this.props.navigation.navigate("Movie", { GENRE: genre });
  };

  _hanlderDetailNavigator = movie => {
    console.log("A");
    this.props.navigation.navigate("Detail", { ITEM_MOVIE: movie });
  };

  render() {
    const { dataGenre } = this.props;
    var dataTrending = dataGenre.dataTrending.slice(0, 5);
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.containerSlider}>
            <Carousel
              data={dataTrending}
              renderItem={({ item, index }) => {
                return (
                  <TouchableOpacity
                    style={styles.containerImage}
                    onPress={() => this._hanlderDetailNavigator(item)}
                  >
                    <Image
                      source={{ uri: IMAGE_URL + item.backdrop_path }}
                      style={styles.imagPath}
                    />

                    <View
                      style={{
                        height: 50,
                        justifyContent: "center",
                        backgroundColor: "#00000080"
                      }}
                    >
                      <Text style={styles.textName}>{item.title}</Text>
                    </View>
                  </TouchableOpacity>
                );
              }}
              sliderWidth={width}
              itemWidth={width}
            />
          </View>

          <FlatList
            style={{ marginTop: 16 }}
            data={dataGenre.data}
            renderItem={({ item, index }) => {
              return (
                <View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between"
                    }}
                  >
                    <Text style={styles.textGenre}>
                      {item.genre.toUpperCase()}
                    </Text>
                    <TouchableOpacity
                      onPress={() => this._handlerMovieNavigation(item.genre)}
                    >
                      <Text style={{ marginRight: 16 }}>Xem tất cả</Text>
                    </TouchableOpacity>
                  </View>
                  <FlatList
                    data={item.arr}
                    horizontal={true}
                    renderItem={({ item, index }) => {
                      return (
                        <TouchableOpacity
                          onPress={() => this._hanlderDetailNavigator(item)}
                        >
                          <ItemGenreComponent item={item} index={index} />
                        </TouchableOpacity>
                      );
                    }}
                    keyExtractor={({ id }, index) => index.toString()}
                  />
                </View>
              );
            }}
            keyExtractor={({ id }, index) => index.toString()}
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  imagPath: {
    width: "100%",
    height: 250,
    position: "absolute"
  },
  textName: {
    color: "white",
    fontSize: 22,
    marginLeft: 6
  },
  info: {
    margin: 8
  },
  container: {
    flex: 1
  },
  containerSlider: {
    width: "100%",
    height: 250
  },
  containerImage: {
    flex: 1,
    justifyContent: "flex-end"
  },
  textGenre: {
    marginLeft: 8,
    fontSize: 18,
    color: "black",
    fontWeight: "bold"
  }
});

const mapStateToProps = state => {
  const { dataGenre } = state;
  return { dataGenre };
};

const mapDispatchToProps = dispatch => {
  return {
    fetch_genre_movie: genre => dispatch(fetch_genre_movie(genre)),
    fetch_trending_movie: () => dispatch(fetch_trending_movie())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GenreComponent);
