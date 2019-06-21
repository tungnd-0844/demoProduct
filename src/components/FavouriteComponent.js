import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity
} from "react-native";
import { openDatabase } from "react-native-sqlite-storage";
import ItemMovieComponent from "./ItemMovieComponent";

var db = openDatabase({ name: "MovieDatabase.db" });
export default class FavouriteComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favorites: []
    };
    db.transaction(tx => {
      tx.executeSql("SELECT * FROM table_movie", [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i) {
          temp.push(results.rows.item(i));
        }
        this.setState({
          favorites: temp
        });
      });
    });
  }

  getAllMovies() {
    db.transaction(tx => {
      tx.executeSql("SELECT * FROM table_movie", [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i) {
          temp.push(results.rows.item(i));
        }
        this.setState({
          favorites: temp
        });
      });
    });
  }

  _hanlderDetailNavigator = movie => {
      this.props.navigation.navigate("Detail", { ITEM_MOVIE: movie });
  };

  componentDidMount() {
    const { navigation } = this.props;
    this.focusListener = navigation.addListener("didFocus", () =>
      this.getAllMovies()
    );
  }

  componentWillUnmount() {
    this.focusListener.remove();
  }

  render() {
    return (
      <View>
        <Text style={styles.textFavo}>Favourite</Text>
        <FlatList
          data={this.state.favorites}
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
  textFavo: {
    fontSize: 24,
    margin: 8,
    color: "black",
    fontFamily: "Times New Roman"
  }
});
