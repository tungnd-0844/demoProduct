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
  TextInput,
  ToastAndroid
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import firebase from "react-native-firebase";
import CustomMenuIcon from "./CustomMenuIcon";

export default class AccountComponent extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Your Account",
      headerRight: (
        <CustomMenuIcon
          menutext="Menu"
          menustyle={{
            marginRight: 16,
            flexDirection: "row",
            justifyContent: "flex-end"
          }}
          optionInformationClick={() => navigation.navigate("Information")}
          optionLogoutClick={() => {
            try {
              firebase.auth().signOut();
              navigation.navigate("Login");
            } catch (e) {
              console.log(e);
            }
          }}
        />
      )
    };
  };

  signOutUser = () => {
    ToastAndroid.show("A", ToastAndroid.SHORT);
    // try {
    //   await firebase.auth().signOut();
    //   this.props.navigation.navigate("Login");
    // } catch (e) {
    //   console.log(e);
    // }
  };

  constructor(props) {
    super(props);
    this.state = {};
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
