import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { connect } from "react-redux";
import { fetch_movie } from "../actions";
import ItemMovieComponent from "./ItemMovieComponent";

class MovieComponent extends Component {
  ITEM_MOVIE = "ITEM_MOVIE";

  componentDidMount() {
    this.props.fetch_movie(this.props.dataMovie.page);
  }

  _hanlderDetailNavigator = movie => {
    this.props.navigation.navigate("Detail", { ITEM_MOVIE: movie });
  };

  render() {
    const { dataMovie } = this.props;
    console.log(dataMovie);

    return (
      <View style={styles.container}>
        <View>
          <Icon
            name="ios-information-circle"
            size={50}
            color="black"
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
          keyExtractor={({ id }, index) => index.toString()}
        />
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
    fetch_movie: page => dispatch(fetch_movie(page))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MovieComponent);
