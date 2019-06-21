import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import YouTube from "react-native-youtube";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";

export default class YoutubeComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.navigation.state.params.VIDEO
    };
  }
  render() {
    console.log(this.state.id);
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#00000080"
        }}
      >
        <View>
          <TouchableOpacity
            style={{ margin: 8, position : "absolute" }}
            onPress={() => this.props.navigation.goBack()}
          >
            <MaterialIcon name="keyboard-backspace" size={40} color={"white"} />
          </TouchableOpacity>
        </View>
        <View style={{ margin: 8, flex: 1, justifyContent: "center" }}>
          <YouTube
            apiKey="AIzaSyAt-t_WO6czZX5NwQlBHvCXE4J5gRuxN7A"
            videoId={this.state.id} // The YouTube video ID
            play={true} // control playback of video with true/false
            resumePlayAndroid={false}
            // fullscreen={true} // control whether the video should play in fullscreen or inline
            loop={true} // control whether the video should loop when ended
            onReady={e => this.setState({ isReady: true })}
            // onChangeState={e => this.setState({ status: e.state })}
            // onChangeQuality={e => this.setState({ quality: e.quality })}
            // onError={e => this.setState({ error: e.error })}
            style={{
              alignSelf: "stretch",
              height: 300
            }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 300
  },
  innerContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    top: 100,
    backgroundColor: "red"
  }
});
