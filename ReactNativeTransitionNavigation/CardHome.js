import React from "react";
import { View, StyleSheet, ScrollView, Animated } from "react-native";

import Card from "./Card";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7fcff",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center"
  }
});

class CardHome extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      animatedValue: new Animated.Value(1),
      selectedIndex: -1
    };
  }

  componentDidMount() {
    this.focusListener = this.props.navigation.addListener("didFocus", () => {
      this.setState({ selectedIndex: -1 }, () => {
        this.state.animatedValue.setValue(1);
      });
    });

    this.blurListener = this.props.navigation.addListener("didBlur", () => {
      this.setState({ selectedIndex: -1 }, () => {
        this.state.animatedValue.setValue(1);
      });
    });
  }

  componentWillUnmount() {
    this.focusListener.remove();
    this.blurListener.remove();
  }

  handleRouteChange = (cardComponent, index) => {
    this.setState({ selectedIndex: index }, () => {
      cardComponent.measure((fx, fy, width, height, px, py) => {
        this.state.animatedValue.setValue(1);

        Animated.timing(this.state.animatedValue, {
          toValue: 0,
          duration: 300
        }).start(() => {
          this.props.navigation.navigate("Details", {
            topPosition: py,
            text: index + 1
          });
        });
      });
    });
  };

  render() {
    const { animatedValue, selectedIndex } = this.state;
    const opacity = animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1]
    });

    return (
      <ScrollView>
        {[1, 2, 3, 4, 5, 6, 7].map((element, index) => {
          return (
            <Card
              text={element}
              key={`Key - ${element}`}
              handleClick={this.handleRouteChange}
              index={index}
              opacity={selectedIndex === index ? 1 : opacity}
            />
          );
        })}
      </ScrollView>
    );
  }
}

export default CardHome;
