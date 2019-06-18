import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { connect } from "react-redux";
import { fetch_cast } from "../actions";
import CastComponent from "./CastComponent";

const IMAGE_URL = "http://image.tmdb.org/t/p/w300";
class DetailMovieComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: this.props.navigation.state.params.ITEM_MOVIE
    };
  }
  componentDidMount() {
    this.props.fetch_cast(this.state.movie.id);
  }

  render() {
    const { navigation } = this.props;
    const { dataCast } = this.props;
    const { movie } = this.state;
    return (
      <View style={styles.container}>
        <Image
          source={{ uri: IMAGE_URL + movie.backdrop_path }}
          style={styles.imageBackgroud}
        />
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon
            name="ios-arrow-round-back"
            size={50}
            color={"white"}
            style={styles.iconBack}
          />
        </TouchableOpacity>
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
                <Text style={{ marginLeft: 8 }}>{movie.original_language}</Text>
              </View>
              <View style={[styles.containerDetail, { marginLeft: 16 }]}>
                <Icon name="ios-star" size={25} />
                <Text style={{ marginLeft: 8 }}>{movie.popularity}</Text>
              </View>
            </View>
          </View>
        </View>
        <ScrollView>
          <Text style={styles.textOverview}>{movie.overview}</Text>
          <View style={styles.containerCast}>
            <Text>Full Cast & Crew</Text>
            <FlatList
              data={dataCast.data.crew}
              horizontal={true}
              renderItem={({ item, index }) => {
                return (
                  <TouchableOpacity>
                    <CastComponent item={item} index={index} />
                  </TouchableOpacity>
                );
              }}
              keyExtractor={({ id }, index) => index.toString()}
            />
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
    marginTop: 120,
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
  }
});

const mapStateToProps = state => {
  const { dataCast } = state;
  return { dataCast };
};

const mapDispatchToProps = dispatch => {
  return {
    fetch_cast: movieId => dispatch(fetch_cast(movieId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailMovieComponent);
