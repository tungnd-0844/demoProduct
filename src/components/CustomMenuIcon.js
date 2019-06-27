//This is an example code for the popup menu//
import React, { Component } from "react";
//import react in our code.
import { View, Text, Image, TouchableOpacity } from "react-native";
//import all the components we are going to use.
import Menu, { MenuItem, MenuDivider } from "react-native-material-menu";
//import menu and menu item

export default class CustomMenuIcon extends Component {
  _menu = null;
  setMenuRef = ref => {
    this._menu = ref;
  };
  showMenu = () => {
    this._menu.show();
  };
  hideMenu = () => {
    this._menu.hide();
  };
  optionLogoutClick = () => {
    this._menu.hide();
    this.props.optionLogoutClick();
  };

  render() {
    return (
      <View style={this.props.menustyle}>
        <Menu
          ref={this.setMenuRef}
          button={
            <TouchableOpacity onPress={this.showMenu}>
              <Image
                source={require("../image/more.png")}
                style={{ width: 25, height: 25 }}
              />
            </TouchableOpacity>
          }
        >
          <MenuItem onPress={this.optionLogoutClick}>Logout</MenuItem>
        </Menu>
      </View>
    );
  }
}
