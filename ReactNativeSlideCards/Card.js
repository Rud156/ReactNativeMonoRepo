import React from "react";
import { Dimensions, StyleSheet, Animated, View, Text } from "react-native";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  cardContainer: {
    width: width,
    padding: 21
  },
  animatedView: {
    height: height - 21,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 7,
    backgroundColor: "white"
  },
  textStyle: {
    fontSize: 25
  }
});

const opacityFunction = (index, xOffset) => {
  return {
    opacity: xOffset.interpolate({
      inputRange: [(index - 1) * width, index * width, (index + 1) * width],
      outputRange: [0.3, 1, 0.3]
    })
  };
};

class Card extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { index, xOffset } = this.props;

    return (
      <View style={styles.cardContainer}>
        <Animated.View
          style={[styles.animatedView, opacityFunction(index, xOffset)]}
        >
          <Text style={styles.textStyle}>Hello World</Text>
        </Animated.View>
      </View>
    );
  }
}

export default Card;
