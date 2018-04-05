import React from "react";
import {
  StyleSheet,
  Text,
  Animated,
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback
} from "react-native";
import PropTypes from "prop-types";
import Icon from "react-native-vector-icons/FontAwesome";

const { height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  body: {
    padding: 10,
    paddingTop: 0
  },
  textStyle: {
    alignSelf: "center"
  },
  bottomButtons: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    height: 49,
    minWidth: 50
  },
  footerText: {
    color: "white",
    fontWeight: "bold",
    alignItems: "center",
    fontSize: 18
  },
  footerStyles: {
    position: "absolute",
    flex: 1,
    left: 0,
    right: 0,
    bottom: -10,
    backgroundColor: "blue",
    flexDirection: "column",
    alignItems: "center",
    zIndex: 2
  },
  rowViewStyles: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    height: 49
  },
  overlay: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    height: height,
    flex: 1
  }
});

class BottomPanel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      bottom: new Animated.Value(-147),
      expanded: false,
      height: new Animated.Value(0),
      opacity: new Animated.Value(0)
    };

    this.toggle = this.toggle.bind(this);
    this.closeOverlay = this.closeOverlay.bind(this);
  }

  toggle(openCallback, closedCallback, openCallbackAfterComplete) {
    const initialValue = this.state.expanded ? 0 : -147;
    const finalValue = this.state.expanded ? -147 : 0;

    const initialHeightValue = this.state.expanded ? 49 : 0;
    const finalHeightValue = this.state.expanded ? 0 : 49;

    const initialOpacityValue = this.state.expanded ? 0.5 : 0;
    const finalOpacityValue = this.state.expanded ? 0 : 0.5;

    if (openCallback) openCallback.apply();
    this.setState({
      expanded: !this.state.expanded
    });

    this.state.opacity.setValue(initialOpacityValue);
    this.state.bottom.setValue(initialValue);
    this.state.height.setValue(initialHeightValue);

    Animated.parallel([
      Animated.timing(this.state.opacity, {
        toValue: finalOpacityValue,
        duration: 300
      }),
      Animated.timing(this.state.bottom, {
        toValue: finalValue,
        duration: 300
      }),
      Animated.timing(this.state.height, {
        toValue: finalHeightValue,
        duration: 300
      })
    ]).start(() => {
      const { expanded } = this.state;

      if (expanded && openCallbackAfterComplete) {
        openCallbackAfterComplete.apply();
      } else if (!expanded && closedCallback) {
        closedCallback.apply();
      }
    });
  }

  closeOverlay(closedCallback) {
    const initialValue = 0;
    const finalValue = -147;

    const initialHeightValue = 49;
    const finalHeightValue = 0;

    const initialOpacityValue = 0.5;
    const finalOpacityValue = 0;

    this.setState({
      expanded: false
    });

    this.state.opacity.setValue(initialOpacityValue);
    this.state.bottom.setValue(initialValue);
    this.state.height.setValue(initialHeightValue);

    Animated.parallel([
      Animated.timing(this.state.opacity, {
        toValue: finalOpacityValue,
        duration: 300
      }),
      Animated.timing(this.state.bottom, {
        toValue: finalValue,
        duration: 300
      }),
      Animated.timing(this.state.height, {
        toValue: finalHeightValue,
        duration: 300
      })
    ]).start(() => {
      if (closedCallback) closedCallback.apply();
    });
  }

  render() {
    const { bottom, height, opacity } = this.state;
    const { displayOverlay, showOverlay, hideOverlay } = this.props;

    return (
      <View style={[styles.container]}>
        <View style={{ flex: 1 }}>
          <ScrollView>
            <View>
              <Text style={styles.textStyle} />
            </View>
          </ScrollView>
          {displayOverlay && (
            <TouchableWithoutFeedback
              delayPressIn={0}
              onPressIn={() => {
                this.closeOverlay(() => {
                  hideOverlay();
                });
              }}
              style={[styles.overlay]}
            >
              <Animated.View
                style={[
                  styles.overlay,
                  {
                    opacity: opacity,
                    backgroundColor: "black"
                  }
                ]}
              />
            </TouchableWithoutFeedback>
          )}

          <Animated.View style={[styles.footerStyles, { bottom: bottom }]}>
            <Animated.View style={(styles.rowViewStyles, { height: height })}>
              <TouchableOpacity
                style={styles.bottomButtons}
                onPress={() => {
                  this.closeOverlay(() => {
                    hideOverlay();
                  });
                }}
                activeOpacity={1}
              >
                <Text style={styles.footerText}>
                  <Icon name="chevron-down" />
                </Text>
              </TouchableOpacity>
            </Animated.View>
            {/* First Row */}
            <View style={[styles.rowViewStyles]}>
              <TouchableOpacity style={styles.bottomButtons} activeOpacity={1}>
                <Text style={styles.footerText}>A</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.bottomButtons} activeOpacity={1}>
                <Text style={styles.footerText}>B</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.bottomButtons} activeOpacity={1}>
                <Text style={styles.footerText}>C</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.bottomButtons}
                onPress={() => {
                  this.toggle(
                    () => {
                      showOverlay();
                    },
                    () => {
                      hideOverlay();
                    }
                  );
                }}
                activeOpacity={1}
              >
                <Text style={styles.footerText}>
                  <Icon name="bars" />
                </Text>
              </TouchableOpacity>
            </View>
            {/* End of First Row */}
            {/* Second Row */}
            <View style={[styles.rowViewStyles]}>
              <TouchableOpacity style={styles.bottomButtons} activeOpacity={1}>
                <Text style={styles.footerText}>E</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.bottomButtons} activeOpacity={1}>
                <Text style={styles.footerText}>F</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.bottomButtons} activeOpacity={1}>
                <Text style={styles.footerText}>G</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.bottomButtons} activeOpacity={1}>
                <Text style={styles.footerText}>H</Text>
              </TouchableOpacity>
            </View>
            {/* End of Second Row */}
            {/* Third Row */}
            <View style={[styles.rowViewStyles]}>
              <TouchableOpacity style={styles.bottomButtons} activeOpacity={1}>
                <Text style={styles.footerText}>I</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.bottomButtons} activeOpacity={1}>
                <Text style={styles.footerText}>J</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.bottomButtons} activeOpacity={1}>
                <Text style={styles.footerText}>K</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.bottomButtons} activeOpacity={1}>
                <Text style={styles.footerText}>L</Text>
              </TouchableOpacity>
            </View>
            {/* End of Third Row */}
            {/* Fourth Row */}
            <View style={[styles.rowViewStyles]}>
              <TouchableOpacity style={styles.bottomButtons} activeOpacity={1}>
                <Text style={styles.footerText}>M</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.bottomButtons} activeOpacity={1}>
                <Text style={styles.footerText}>N</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.bottomButtons} activeOpacity={1}>
                <Text style={styles.footerText}>O</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.bottomButtons} activeOpacity={1}>
                <Text style={styles.footerText}>P</Text>
              </TouchableOpacity>
            </View>
            {/* End of Fourth Row */}
          </Animated.View>
        </View>
      </View>
    );
  }
}

BottomPanel.propTypes = {
  displayOverlay: PropTypes.bool.isRequired,
  showOverlay: PropTypes.func,
  hideOverlay: PropTypes.func,
  showOverlayAfterAnimation: PropTypes.func
};

export default BottomPanel;
