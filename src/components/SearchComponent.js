import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity
} from "react-native";
import { searchMovie } from "../actions";
import { SearchBar } from "react-native-elements";
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/Ionicons";
import ItemMovieComponent from "./ItemMovieComponent";
class SearchComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: ""
    };
  }

  _hanlderDetailNavigator = movie => {
    this.props.navigation.navigate("Detail", { ITEM_MOVIE: movie });
  };

  _searchFilterFunction = async text => {
    await this.setState({ movie: text });
    this.props.searchMovie(this.state.movie);
  };

  render() {
    const { dataSearch } = this.props;
    console.log(dataSearch);
    return (
      <View style={styles.container}>
        <SearchBar
          placeholder="Type Here..."
          lightTheme
          onChangeText={this._searchFilterFunction}
          round
          value={this.state.movie}
          autoCorrect={false}
        />
        <FlatList
          data={dataSearch}
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

const mapStateToProps = state => {
  const { dataSearch } = state;
  return { dataSearch };
};

const mapDispatchToProps = dispatch => {
  return {
    searchMovie: movie => dispatch(searchMovie(movie))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchComponent);
