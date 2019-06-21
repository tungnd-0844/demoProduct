import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image
} from "react-native";

export default class ItemMovieComponent extends Component {
  render() {
    const { item } = this.props;
    const IMAGE_URL = "http://image.tmdb.org/t/p/w300";
    return (
      <View style={styles.flatview}>
        <Image
          style={styles.imageItemMovie}
          source={{ uri: IMAGE_URL + item.poster_path }}
        />
        <View style={styles.containerView}>
          <Text style={styles.name}>{item.title}</Text>
          <Text style={styles.name}>{item.release_date}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    position: "absolute",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height
  },
  flatview: {
    flex: 1,
    flexDirection: "row"
  },
  imageItemMovie: {
    flex: 3,
    marginTop: 8,
    marginLeft: 8,
    width: 100,
    height: 80
  },
  containerView: {
    flex: 7,
    justifyContent: "center"
  },
  name: {
    marginLeft: 8,
    marginTop: 8
  }
});
