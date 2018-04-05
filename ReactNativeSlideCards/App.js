import React from "react";
import { StyleSheet, View, Animated } from "react-native";

import Card from "./Card";

const xOffset = new Animated.Value(0);

const styles = StyleSheet.create({
  scrollView: {
    flexDirection: "row",
    backgroundColor: "black"
  }
});

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Animated.ScrollView
        scrollEventThrottle={14}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: xOffset } } }],
          { useNativeDriver: true }
        )}
        horizontal
        pagingEnabled
        style={styles.scrollView}
      >
        <Card index={0} xOffset={xOffset} />
        <Card index={1} xOffset={xOffset} />
        <Card index={2} xOffset={xOffset} />
      </Animated.ScrollView>
    );
  }
}
