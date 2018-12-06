import * as React from "react";
import {
  Text,
  View,
  AsyncStorage,
  TouchableOpacity,
  Image,
  Alert
} from "react-native";
import { Button, Icon } from "react-native-elements";
import { Location, Permissions, Font } from "expo";
import { _foundSound } from "./utility/action.js";
import { Logo } from "./Logo";
import { styles } from "./assets/styles/Style";
import { withinRange, calculateDistance } from "./utility/distance";
import { locations, action } from "./utility/locations";

export default class App extends React.Component {
  state = {
    locationIndex: 0,
    message: "",
    distance: 0,
    fontLoaded: false
  };

  async componentDidMount() {
    await Font.loadAsync({ amazon: require("./assets/fonts/Lato-Black.ttf") });
    this.setState({ fontLoaded: true });
    this._fetchLocationAsync();
    this._getLocation();
  }

  _fetchLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        message: "Permission to access location was denied"
      });
    }

    //  use GPS over WiFi (more accurate)
    //  distance in meters for how often it will fire
    const locationOptions = {
      enableHighAccuracy: true,
      distanceInterval: 0
    };

    Location.watchPositionAsync(locationOptions, this.checkPosition);

    let location = await Location.getCurrentPositionAsync({});
  };

  checkPosition = position => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const locationLat = locations[this.state.locationIndex].latitude;
    const locationLon = locations[this.state.locationIndex].longitude;
    const distance = locations[this.state.locationIndex].distance;

    this.setState({
      distance: calculateDistance(lat, lon, locationLat, locationLon)
    });

    if (withinRange(lat, lon, locationLat, locationLon, distance)) {
      if (locations.length - 1 > this.state.locationIndex) {
        this._setLocation(this.state.locationIndex + 1);
        this.nextClue();
      } else {
        this.setState({
          message: "Behind you..."
        });
      }
    }
  };

  nextClue = async () => {
    _foundSound();
    await this._setLocation(this.state.locationIndex + 1);
    this._getLocation();
  };

  _getLocation = async () => {
    try {
      let locationIndex = await AsyncStorage.getItem("location");
      if (locationIndex !== null) {
        locationIndex = +locationIndex;
        this.setState({
          locationIndex: locationIndex
        });
      } else {
        this._reset();
      }
    } catch (error) {
      this.setState({ message: error.message });
    }
  };

  _reset = async () => {
    await this._setLocation(0);
  };

  _setLocation = async locationIndex => {
    try {
      await AsyncStorage.setItem("location", `${locationIndex}`);
      this._getLocation();
    } catch (error) {
      this.setState({ message: error.message });
    }
  };

  render() {
    let { locationIndex, fontLoaded } = this.state;
    return (
      <View style={styles.container}>
        <View>
          {fontLoaded ? (
            <Text style={styles.header}>
              the great <Text onLongPress={this.nextClue}>🥚</Text> hunt{" "}
            </Text>
          ) : null}
          {fontLoaded ? <Text style={styles.subheader}>by</Text> : null}
          <Logo />
        </View>
        <View style={styles.clue}>
          <Text style={styles.content}>
            {locationIndex === 0 ? "" : locations[locationIndex - 1].message}
          </Text>
          <Text style={styles.content}>
            Distance to next pin: {Math.floor(this.state.distance * 1000)}{" "}
            meters
          </Text>
        </View>
        <Button
          icon={<Icon name="refresh" color="white" size={25} />}
          title=""
          containerStyle={styles.case}
          buttonStyle={styles.button}
          onPress={this._reset}
        />
      </View>
    );
  }
}
