import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  FlatList,
  TouchableOpacity,
  TextInput
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import firebase from "react-native-firebase";

export default class LoginComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      message: ""
    };
  }
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.props.navigation.navigate(user ? "Main" : "Login");
    });
  }

  render() {
    return (
      <View style={styles.container}>
        {/* <Image
          source={require("../image/splash.png")}
          style={{ height: "100%", width: "100%" }}
        /> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center"
  }
});
