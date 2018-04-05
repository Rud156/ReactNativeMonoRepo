import React from "react";
import {
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Animated,
  Dimensions,
  Text,
  BackHandler
} from "react-native";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7fcff",
    alignItems: "center",
    justifyContent: "center"
  },
  animatingViewLeft: {
    backgroundColor: "#0061ff",
    position: "absolute"
  },
  animatingViewRight: {
    backgroundColor: "#00bbff",
    position: "absolute",
    justifyContent: "center",
    alignItems: "center"
  },
  textStyle: {
    color: "#fff"
  },
  overlay: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    flex: 1
  }
});

class CardDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      animatedValue: new Animated.Value(0),
      played: false
    };
  }

  componentDidMount() {
    this.toggleAnimation();

    BackHandler.addEventListener("hardwareBackPress", this.handleBackPressed);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      "hardwareBackPress",
      this.handleBackPressed
    );
  }

  handleBackPressed = () => {
    this.toggleAnimation(() => {
      this.props.navigation.goBack();
      return true;
    });
    return false;
  };

  toggleAnimation = callback => {
    const { played } = this.state;

    const initialState = played ? 2 : 0;
    const finalState = played ? 0 : 2;

    this.setState({ played: !played });

    this.state.animatedValue.setValue(initialState);
    Animated.timing(this.state.animatedValue, {
      toValue: finalState,
      duration: 400
    }).start(callback);
  };

  render() {
    const { animatedValue } = this.state;
    const { params } = this.props.navigation.state;
    const { topPosition, text } = params;

    const heightLeft = animatedValue.interpolate({
      inputRange: [0, 1, 2],
      outputRange: [140, 70, 70]
    });
    const widthLeft = animatedValue.interpolate({
      inputRange: [0, 1, 2],
      outputRange: [60, screenWidth, screenWidth]
    });
    const leftTopPosition = animatedValue.interpolate({
      inputRange: [0, 1, 2],
      outputRange: [topPosition, 0, 0]
    });
    const leftLeftPosition = animatedValue.interpolate({
      inputRange: [0, 1, 2],
      outputRange: [21, 0, 0]
    });

    const heightRight = animatedValue.interpolate({
      inputRange: [0, 2],
      outputRange: [140, screenHeight]
    });
    const widthRight = animatedValue.interpolate({
      inputRange: [0, 2],
      outputRange: [screenWidth - 42 - 60, screenWidth]
    });
    const rightLeftPosition = animatedValue.interpolate({
      inputRange: [0, 2],
      outputRange: [21 + 60, 0]
    });

    return (
      <View style={[styles.container]}>
        <Animated.View
          style={[
            styles.animatingViewRight,
            {
              height: heightRight,
              width: widthRight,
              top: leftTopPosition,
              left: rightLeftPosition
            }
          ]}
        >
          <Text style={styles.textStyle}>{text}</Text>
        </Animated.View>
        <Animated.View
          style={[
            styles.animatingViewLeft,
            {
              height: heightLeft,
              width: widthLeft,
              top: leftTopPosition,
              left: leftLeftPosition
            }
          ]}
        />
      </View>
    );
  }
}

export default CardDetails;
