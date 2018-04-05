import React from "react";
import {
  View,
  Animated,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Easing
} from "react-native";
import PropTypes from "prop-types";
import _ from "lodash";
import Icon from "react-native-vector-icons/FontAwesome";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1
  },
  viewContainer: {
    flex: 0.9,
    backgroundColor: "#fff"
  },
  bottomNav: {
    backgroundColor: "#4286f4",
    flexDirection: "column",
    alignItems: "center"
  },
  textStyle: {
    color: "white"
  },
  rowContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center"
  },
  routeButton: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    padding: 21
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

class BottomPanelComponent extends React.Component {
  constructor(props) {
    super(props);

    const { routes } = this.props;
    const modifiedRoutes = _.chunk(routes, 4);

    this.state = {
      modifiedRoutes: modifiedRoutes,
      expanded: false,
      displayHiddenContent: false,
      defaultAnimationValue: new Animated.Value(0)
    };
  }

  componentWillReceiveProps(nextProps) {
    const { routes } = nextProps;
    const modifiedRoutes = _.chunk(routes, 4);

    this.setState({
      modifiedRoutes: modifiedRoutes,
      flex: new Animated.Value(modifiedRoutes.length)
    });
  }

  toggleAnimationBetter = callback => {
    const { expanded, modifiedRoutes } = this.state;
    const { duration } = this.props;

    if (callback && !expanded) {
      callback.apply();
      return;
    }

    const initialValue = expanded ? 1 : 0;
    const finalValue = expanded ? 0 : 1;

    this.setState({ expanded: !expanded, displayHiddenContent: true });
    this.state.defaultAnimationValue.setValue(initialValue);

    Animated.timing(this.state.defaultAnimationValue, {
      toValue: finalValue,
      duration,
      easing: Easing.linear
    }).start(() => {
      const { expanded } = this.state;
      this.setState({ displayHiddenContent: expanded }, callback);
    });
  };

  render() {
    const {
      modifiedRoutes,
      displayHiddenContent,
      defaultAnimationValue
    } = this.state;

    const overlayOpacity = defaultAnimationValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 0.7]
    });
    const chevronHeight = defaultAnimationValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 49]
    });
    const flex = defaultAnimationValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0.1, modifiedRoutes.length / 5]
    });
    const flexGrow = defaultAnimationValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1]
    });

    const firstRow = modifiedRoutes[0];
    const otherRows = modifiedRoutes.slice(1);

    return (
      <View style={styles.container}>
        <View style={styles.viewContainer} />
        {displayHiddenContent && (
          <TouchableWithoutFeedback
            delayPressIn={0}
            onPressIn={() => {
              this.toggleAnimationBetter();
            }}
            style={[styles.overlay]}
          >
            <Animated.View
              style={[
                styles.overlay,
                {
                  opacity: overlayOpacity,
                  backgroundColor: "black"
                }
              ]}
            />
          </TouchableWithoutFeedback>
        )}

        <Animated.View style={[styles.bottomNav, { height: chevronHeight }]}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              this.toggleAnimationBetter();
            }}
            style={[styles.routeButton, { minWidth: 49 }]}
          >
            <Text style={styles.textStyle}>
              <Icon name="chevron-down" />
            </Text>
          </TouchableOpacity>
        </Animated.View>
        <Animated.View style={[styles.bottomNav, { flex: flex }]}>
          <View style={[styles.rowContainer]}>
            {firstRow.map((route, index) => {
              return (
                <TouchableOpacity
                  style={styles.routeButton}
                  activeOpacity={1}
                  onPress={() => {
                    if (route.menuOpenButton) {
                      this.toggleAnimationBetter();
                    } else if (route.clicked) {
                      this.toggleAnimationBetter(route.clicked);
                    }
                  }}
                  key={`Key - 0 ${index}`}
                >
                  <Text style={styles.textStyle}>
                    {route.menuOpenButton ? (
                      <Icon name="bars" />
                    ) : (
                      route.content
                    )}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {displayHiddenContent &&
            otherRows.map((element, index) => {
              return (
                <Animated.View
                  style={[
                    styles.rowContainer,
                    { flexGrow: flexGrow, opacity: flexGrow }
                  ]}
                  key={`Key - ${index}`}
                >
                  {element.map((route, innerIndex) => {
                    return (
                      <TouchableOpacity
                        style={styles.routeButton}
                        activeOpacity={1}
                        onPress={() => {
                          if (route.clicked)
                            this.toggleAnimationBetter(route.clicked);
                        }}
                        key={`Key - ${index} ${innerIndex}`}
                      >
                        <Text style={styles.textStyle}>{route.content}</Text>
                      </TouchableOpacity>
                    );
                  })}
                </Animated.View>
              );
            })}
        </Animated.View>
      </View>
    );
  }
}

BottomPanelComponent.propTypes = {
  routes: PropTypes.arrayOf(
    PropTypes.shape({
      clicked: PropTypes.func,
      content: PropTypes.string.isRequired,
      menuOpenButton: PropTypes.bool
    })
  ).isRequired,
  duration: PropTypes.number.isRequired
};

export default BottomPanelComponent;
