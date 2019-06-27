import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  Linking,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import firebase from "react-native-firebase";
import CustomMenuIcon from "./CustomMenuIcon";

export default class AccountComponent extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Information",
      headerRight: (
        <CustomMenuIcon
          menutext="Menu"
          menustyle={{
            marginRight: 16,
            flexDirection: "row",
            justifyContent: "flex-end"
          }}
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

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.containerAbout}>
          <View style={{ margin: 16 }}>
            <Text style={styles.textHeader}>ABOUT</Text>
            <View style={styles.containerIcon}>
              <Image
                source={require("../image/iconmovie.png")}
                style={{ height: 50, width: 50 }}
              />
              <View
                style={{ flex: 1, justifyContent: "center", marginLeft: 8 }}
              >
                <Text style={{ fontSize: 30 }}>MovieDB</Text>
              </View>
            </View>
            <View style={styles.containerIcon}>
              <Icon name="ios-stopwatch" size={25} style={{ marginLeft: 14 }} />
              <View
                style={{ flex: 1, justifyContent: "center", marginLeft: 8 }}
              >
                <Text style={{ fontSize: 18 }}>Version 1.0</Text>
              </View>
            </View>
            <View style={styles.containerIcon}>
              <Icon
                name="ios-star"
                size={25}
                color={"yellow"}
                style={{ marginLeft: 14 }}
              />
              <View
                style={{ flex: 1, justifyContent: "center", marginLeft: 8 }}
              >
                <Text style={{ fontSize: 18 }}>Rate the app</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.containerAbout}>
          <View style={{ margin: 16 }}>
            <Text style={styles.textHeader}>AUTHOR</Text>
            <View style={styles.containerIcon}>
              <Icon name="logo-github" size={25} style={{ marginLeft: 14 }} />
              <View
                style={{ flex: 1, justifyContent: "center", marginLeft: 8 }}
              >
                <TouchableOpacity
                  onPress={() =>
                    Linking.openURL(
                      "https://github.com/tungct97?tab=repositories"
                    )
                  }
                >
                  <Text style={{ fontSize: 18 }}>Nguyễn Đăng Tùng</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.containerAbout}>
          <View style={{ margin: 16 }}>
            <Text style={styles.textHeader}>TMDb</Text>
            <View style={styles.containerIcon}>
              <Image
                source={require("../image/splash.png")}
                style={{ height: 30, width: 30 }}
              />
              <View
                style={{ flex: 1, justifyContent: "center", marginLeft: 8 }}
              >
                <Text style={{ fontSize: 24 }}>Powered by TMDb</Text>
              </View>
            </View>
            <Text style={{ fontSize: 18 }}>
              This app uses TheMovieDatabase API to fetch and show information.
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  containerAbout: {
    margin: 16,
    marginLeft: 16,
    elevation: 4,
    backgroundColor: "white"
  },
  textHeader: {
    fontSize: 16
  },
  containerIcon: {
    flexDirection: "row",
    marginTop: 16
  }
});
