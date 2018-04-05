import React from "react";
import Slider from "./Slider";
import { StyleSheet, Text, View, Animated } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
    alignItems: "center",
    justifyContent: "center"
  },
  cardContainer: {
    alignItems: "center",
    height: 65,
  },
  textContainer: {
    width: 300,
    padding: 14,
    elevation: 3,
    borderRadius: 7
  },
  slider: {
    width: 300,
    marginTop: -20,
    elevation: 10
  }
});

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sliderValue: 0,
      textValue: 0,
      interpolatedValue: new Animated.Value(0),
      defaultColor: "rgb(74, 206, 249)"
    };
  }

  handleSliderChange = value => {
    this.setState({ sliderValue: value, textValue: Math.round(value) });
  };

  handleTouchStart = () => {
    this.state.interpolatedValue.setValue(0);
    Animated.timing(this.state.interpolatedValue, {
      toValue: 1,
      duration: 300
    }).start();
  };

  handleTouchEnd = () => {
    this.state.interpolatedValue.setValue(1);
    Animated.timing(this.state.interpolatedValue, {
      toValue: 0,
      duration: 300
    }).start();
  };

  render() {
    const {
      sliderValue,
      textValue,
      interpolatedValue,
      defaultColor
    } = this.state;

    const textContainerBackgroundColor = interpolatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: ["rgb(255, 255, 255)", "rgb(74, 206, 249)"],
      extrapolate: false
    });
    const textColor = interpolatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: ["rgb(0, 0, 0)", "rgb(255, 255, 255)"],
      extrapolate: false
    });
    const elevation = interpolatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [3, 7]
    });

    const thumbColor = interpolatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: ["rgb(74, 206, 249)", "rgb(255, 255, 255)"],
      extrapolate: false
    });

    return (
      <View style={styles.container}>
        <View style={styles.cardContainer}>
          <Animated.View
            style={[
              styles.textContainer,
              {
                backgroundColor: textContainerBackgroundColor,
                elevation,
              }
            ]}
          >
            <Animated.Text style={{ color: textColor }}>
              $ {textValue}
            </Animated.Text>
          </Animated.View>
          <Slider
            minimumValue={0}
            maximumValue={100}
            maximumTrackTintColor="rgba(0, 0, 0, 0)"
            minimumTrackTintColor="rgba(0, 0, 0, 0)"
            value={sliderValue}
            onValueChange={this.handleSliderChange}
            style={styles.slider}
            thumbTintColor={thumbColor}
            onTouchStart={this.handleTouchStart}
            onTouchEnd={this.handleTouchEnd}
            thumbStyle={{
              elevation
            }}
          />
        </View>
      </View>
    );
  }
}
