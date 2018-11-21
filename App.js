import * as React from "react";
import { Text, View, AsyncStorage, Button, Image, Alert } from "react-native";
import { Location, Permissions, Font } from "expo";
import { _foundSound } from "./utility/action.js";
import { Logo } from "./Logo";
import { styles } from "./assets/styles/Style";
import { withinRange, calculateDistance } from "./utility/distance";
import { locations, action } from "./utility/locations";

export default class App extends React.Component {
  state = {
    locationIndex: 0,
    errorMessage: "",
    distance: 0,
    text: "",
    fontLoaded: false
  };

  async componentDidMount() {
    await Font.loadAsync({ amazon: require("./assets/fonts/Lato-Black.ttf") });
    this.setState({ fontLoaded: true });
    this._getLocationAsync();
    this._retrieveData();
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission to access location was denied"
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
        this._storeData(this.state.locationIndex + 1);
        this.nextClue();
      } else {
        this.setState({
          errorMessage: "Behind you..."
        });
      }
    }
  };

  nextClue = () => {
    _foundSound();
    this.setState({
      locationIndex: this.state.locationIndex + 1
    });
  };

  handleClick = () => {
    this._storeData(0);
  };

  _retrieveData = async () => {
    try {
      const locationIndex = await AsyncStorage.getItem("LOCATIONINDEX");
      if (locationIndex !== null) {
        this.setState({
          locationIndex
        });
      }
    } catch (error) {
      this.setState({ errorMessage: error.message });
    }
  };

  _storeData = async locationIndex => {
    try {
      await AsyncStorage.setItem("LOCATIONINDEX", locationIndex);
    } catch (error) {
      this.setState({ errorMessage: error.message });
    }
  };

  // show the one before
  // use the current

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
        <View>
          <Text style={styles.content}>
            {locationIndex === 0 ? "" : locations[locationIndex - 1].message}
          </Text>
          <Text style={styles.content}>Clue Number: {locationIndex}</Text>
          <Text style={styles.content}>
            Distance to pin: {Math.floor(this.state.distance * 1000)} meters
          </Text>
          <Button onPress={this.handleClick} title="start" />
          <Button onPress={this._retrieveData} title="stop" />
        </View>
      </View>
    );
  }
}
