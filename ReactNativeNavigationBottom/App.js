import React from "react";
import { StyleSheet, View } from "react-native";
import BottomPanelComponent from "./components/BottomPanelComponent";

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.routes = [
      {
        content: "A"
      },
      {
        content: "B"
      },
      {
        content: "C",
        clicked: this.handleRouteClicked
      },
      {
        content: "D",
        menuOpenButton: true
      },
      {
        content: "E"
      },
      {
        content: "F"
      },
      {
        content: "G"
      },
      {
        content: "H"
      },
      {
        content: "I",
        clicked: this.handleRouteClicked
      },
      {
        content: "J"
      },
      {
        content: "K"
      },
      {
        content: "L"
      },
      {
        content: "N"
      },
      {
        content: "O"
      },
      {
        content: "P"
      },
      {
        content: "Q"
      }
    ];

    this.state = {
      duration: 5000
    };
  }

  handleRouteClicked = () => {
    console.log("Route Clicked");
  };

  render() {
    const { duration } = this.state;

    return (
      <View style={styles.container}>
        <BottomPanelComponent routes={this.routes} duration={duration} />
      </View>
    );
  }
}
