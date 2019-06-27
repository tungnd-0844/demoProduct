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

  handleSigUp = () => {
    if (this.state.email === "" || this.state.password === "") {
      this.setState({
        message: "Yêu cầu bạn điền đầy đủ thông tin"
      });
      return;
    }
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(() =>
        this.setState({
          message: "Bạn đã đăng ký thành công"
        })
      )
      .catch(error => this.setState({ message: error.message }));
  };

  handleLoginIn = () => {
    if (this.state.email === "" || this.state.password === "") {
      this.setState({
        message: "Yêu cầu bạn điền đầy đủ thông tin"
      });
      return;
    }
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => this.props.navigation.navigate("Main"))
      .catch(error => this.setState({ message: error.message }));
  };

  render() {
    return (
      <View style={styles.container}>
        <Image source={require("../image/movie.png")} style={styles.imagPath} />
        <View style={{ margin: 8 }}>
          <Text>Email</Text>
          <TextInput
            style={styles.input}
            onChangeText={email => this.setState({ email })}
            value={this.state.email}
          />
        </View>
        <View style={{ margin: 8 }}>
          <Text>Password</Text>
          <TextInput
            style={styles.input}
            secureTextEntry={true}
            onChangeText={password => this.setState({ password })}
            state={this.state.password}
          />
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "green" }]}
            onPress={() => this.handleLoginIn()}
          >
            <Text>Đăng nhập</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "red" }]}
            onPress={() => this.handleSigUp()}
          >
            <Text>Đăng ký</Text>
          </TouchableOpacity>
        </View>
        <Text>{this.state.message}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center"
  },
  imagPath: {
    width: "100%",
    height: 400,
    marginBottom: 16
  },
  input: {
    borderBottomWidth: 1,
    borderColor: "gray"
  },
  button: {
    display: "flex",
    width: 100,
    height: 50,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",

    backgroundColor: "#2AC062",
    shadowColor: "#2AC062",
    shadowOpacity: 0.4,
    shadowOffset: { height: 10, width: 0 },
    shadowRadius: 20
  }
});
