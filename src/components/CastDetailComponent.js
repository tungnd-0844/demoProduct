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
import { connect } from "react-redux";
import { fetch_detail_cast, fetch_list_movie_by_cast } from "../actions";
import Icon from "react-native-vector-icons/Ionicons";
import ItemListCastMovieComponent from "./ItemListCastMovieComponent";

class CastDetailComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      castDetail: this.props.navigation.state.params.ITEM_CAST
    };
  }

  componentDidMount() {
    this.props.fetch_detail_cast(this.state.castDetail.id);
    this.props.fetch_list_movie_by_cast(this.state.castDetail.id);
  }

  _handlerCastDetailNavigation = movie => {
    this.props.navigation.push("Detail", { ITEM_MOVIE: movie });
  };

  render() {
    const { dataCastDetail } = this.props;
    const { results } = this.props.dataCastDetail.listCast;
    const IMAGE_URL = "http://image.tmdb.org/t/p/w300";
    var icon =
      dataCastDetail.data.profile_path === null
        ? require("../image/default.png")
        : { uri: IMAGE_URL + dataCastDetail.data.profile_path };
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
          <Icon
            name="ios-arrow-round-back"
            size={50}
            style={styles.iconBack}
            color={"black"}
          />
        </TouchableOpacity>
        <View style={styles.containerHeader}>
          <Image source={icon} style={styles.imageCast} />
          <Text style={styles.textName}>{dataCastDetail.data.name}</Text>
        </View>

        <View style={{ flexDirection: "row", margin: 16 }}>
          <View style={styles.containerInfor}>
            <Text style={styles.textNumber}>
              {dataCastDetail.data.popularity}
            </Text>
            <Text>Popularity</Text>
          </View>
          <View style={styles.containerInfor}>
            <Text style={styles.textNumber}>
              {dataCastDetail.data.known_for_department}
            </Text>
            <Text>Job</Text>
          </View>
          <View style={styles.containerInfor}>
            <Text style={styles.textNumber}>
              {dataCastDetail.data.birthday}
            </Text>
            <Text>Birthday</Text>
          </View>
        </View>

        <FlatList
          data={results}
          numColumns={3}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                onPress={() => this._handlerCastDetailNavigation(item)}
              >
                <ItemListCastMovieComponent item={item} index={index} />
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
  iconBack: {
    marginLeft: 16
  },
  imageCast: {
    height: 150,
    width: 150,
    borderRadius: 150 / 2
  },
  containerHeader: {
    alignItems: "center"
  },
  textName: {
    fontWeight: "bold",
    fontSize: 18
  },
  containerInfor: {
    width: "30%",
    alignItems: "center",
    margin: 8,
    backgroundColor: "white"
  },
  textNumber: {
    fontSize: 18,
    fontWeight: "bold"
  }
});

const mapStateToProps = state => {
  const { dataCastDetail } = state;
  return { dataCastDetail };
};

const mapDispatchToProps = dispatch => {
  return {
    fetch_detail_cast: personId => dispatch(fetch_detail_cast(personId)),
    fetch_list_movie_by_cast: castId =>
      dispatch(fetch_list_movie_by_cast(castId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CastDetailComponent);
