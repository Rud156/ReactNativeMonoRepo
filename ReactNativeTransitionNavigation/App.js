import React from "react";

import { Text, View } from "react-native";
import { StackNavigator } from "react-navigation";

import CardDetails from "./CardDetails";
import CardHome from "./CardHome";

const Navigator = StackNavigator(
  {
    Home: {
      screen: CardHome
    },
    Details: {
      screen: CardDetails
    }
  },
  {
    initialRouteName: "Home",
    headerMode: "none"
  }
);

export default class App extends React.Component {
  render() {
    return <Navigator />;
  }
}
