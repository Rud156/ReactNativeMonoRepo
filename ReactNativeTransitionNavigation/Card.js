import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  Animated
} from "react-native";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    height: 140,
    width: width,
    paddingLeft: 21,
    paddingRight: 21,
    display: "flex",
    flexDirection: "row",
    marginTop: 7,
    marginBottom: 7
  },
  textStyle: {
    color: "#fff",
    textAlign: "center"
  },
  leftPart: {
    backgroundColor: "#0061ff",
    width: 60
  },
  rightPart: {
    backgroundColor: "#00bbff",
    width: width - 42 - 60,
    justifyContent: "center"
  }
});

class Card extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { text, opacity, handleClick, index } = this.props;

    return (
      <TouchableWithoutFeedback
        onPress={() => {
          handleClick(this.cardComponent, index);
        }}
      >
        <View ref={component => (this.cardComponent = component)}>
          <Animated.View style={[styles.container, { opacity: opacity }]}>
            <View style={styles.leftPart} />
            <View style={styles.rightPart}>
              <Text style={styles.textStyle}>{text}</Text>
            </View>
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default Card;
