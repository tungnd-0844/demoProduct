import React from "react";
import MoviesComponent from "./MoviesComponent";
import FavouriteComponent from "./FavouriteComponent";
import DetailMovieComponent from "./DetailMovieComponent";
import CastDetailComponent from "./CastDetailComponent";
import Ionicons from "react-native-vector-icons/Ionicons";
import SearchComponent from "./SearchComponent";
import YoutubeComponent from "./YoutubeComponent";
import LoginComponent from "./LoginComponent";
import LoadingComponent from "./LoadingComponent";
import AccountComponent from "./AccountComponent";
import InformationComponent from "./InformationComponent";
import {
  createBottomTabNavigator,
  createStackNavigator,
  createAppContainer,
  createSwitchNavigator
} from "react-navigation";

const MovieStack = createStackNavigator(
  {
    Movie: MoviesComponent,
    Detail: DetailMovieComponent,
    Youtube: {
      screen: YoutubeComponent,
      gestureResponseDistance: 250
    },
    CastDetail: CastDetailComponent,
    Search: SearchComponent
  },
  {
    headerMode: "none",
    mode: "modal",
    cardStyle: {
      backgroundColor: "transparent"
    }
  }
);

const FavouriteStack = createStackNavigator(
  {
    Favourite: FavouriteComponent,
    Detail: DetailMovieComponent,
    Youtube: {
      screen: YoutubeComponent,
      gestureResponseDistance: 250
    }
  },
  {
    initialRoute: "Favourite",
    headerMode: "none",
    mode: "modal",
    cardStyle: {
      backgroundColor: "transparent"
    }
  }
);

const AccountStack = createStackNavigator({
  Account: AccountComponent,
  Information: InformationComponent
});

const ButtomTabNavigator = createBottomTabNavigator(
  {
    Movie: MovieStack,
    Favourite: FavouriteStack,
    Account: AccountStack
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
        } else if (routeName === "Account") {
          iconName = `ios-contact`;
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

const LoginStack = createSwitchNavigator(
  {
    Loading: LoadingComponent,
    Login: LoginComponent,
    Main: ButtomTabNavigator
  },
  {
    headerMode: "none",
    initialRouteName: "Loading"
  }
);

export default createAppContainer(LoginStack);
