import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Linking,
  FlatList,
  TouchableOpacity
} from "react-native";
import { fetch_comment_movie } from "../actions";
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/Ionicons";

class CommentComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.navigation.state.params.ID
    };
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params.TITLE
    };
  };

  componentDidMount() {
    this.props.fetch_comment_movie(this.state.id);
  }

  renderSeparator = () => (
    <View
      style={{
        height: 1,
        width: "90%",
        backgroundColor: "#CED0CE",
        marginLeft: "10%",
        marginTop: 8
      }}
    />
  );

  render() {
    const { dataComment } = this.props;
    console.log(dataComment);
    return (
      <View style={styles.container}>
        <FlatList
          data={dataComment.data}
          ItemSeparatorComponent={this.renderSeparator}
          renderItem={({ item, index }) => {
            return (
              <View style={styles.container}>
                <View style={styles.containerHeader}>
                  <Icon name="ios-contact" size={30} />
                  <TouchableOpacity onPress={() => Linking.openURL(item.url)}>
                    <Text style={styles.textAuthor}>{item.author}</Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.textContent}>{item.content}</Text>
              </View>
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
    flex: 1,
    marginTop: 8
  },
  containerHeader: {
    flex: 1,
    marginLeft: 8,
    flexDirection: "row",
    alignItems: "center"
  },
  textAuthor: {
    color: "blue",
    fontSize: 16,
    marginLeft: 8
  },
  textContent: {
    marginLeft: 40,
    marginRight: 8
  }
});

const mapStateToProps = state => {
  const { dataComment } = state;
  return { dataComment };
};

const mapDispatchToProps = dispatch => {
  return {
    fetch_comment_movie: id => dispatch(fetch_comment_movie(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentComponent);
