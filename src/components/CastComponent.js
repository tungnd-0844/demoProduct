import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

export default class MovieComponent extends Component {
  render() {
    const { item } = this.props;
    console.log(item.profile_path);
    const IMAGE_URL = "http://image.tmdb.org/t/p/w300";
    return (
      <View style={styles.container}>
        <Image
          source={{
            uri: IMAGE_URL + item.profile_path
          }}
          style={styles.imagPath}
        />
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            alignSelf: "flex-end"
          }}
        >
          <Text style={styles.textName}>{item.name}</Text>
          <Text style={styles.textJob}>{item.job}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: 120,
    height: 150,
    flexDirection: "row",
    margin: 8
  },
  imagPath: {
    width: 120,
    height: 150,
    position: "absolute"
  },
  textName: {
    color: "white",
    fontSize: 14,
    marginLeft: 6
  },
  textJob: {
    color: "white",
    fontSize: 12,
    margin: 6
  }
});
