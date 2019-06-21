import React from "react";
import MoviesComponent from "./MoviesComponent";
import FavouriteComponent from "./FavouriteComponent";
import DetailMovieComponent from "./DetailMovieComponent";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  createBottomTabNavigator,
  createStackNavigator,
  createAppContainer
} from "react-navigation";

const MovieStack = createStackNavigator(
  {
    Movie: MoviesComponent,
    Detail: DetailMovieComponent
  },
  {
    headerMode: "none"
  }
);

const FavouriteStack = createStackNavigator({
  Favourite: FavouriteComponent
});

const ButtomTabNavigator = createBottomTabNavigator(
  {
    Movie: MovieStack,
    Favourite: FavouriteStack
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === "Movie") {
          iconName = `ios-videocam`;
        } else if (routeName === "Favourite") {
          iconName = `ios-star`;
        }
        return <IconComponent name={iconName} size={25} color={tintColor} />;
      }
    }),
    tabBarOptions: {
      activeTintColor: "red",
      inactiveTintColor: "gray"
    }
  }
);

export default createAppContainer(ButtomTabNavigator);
