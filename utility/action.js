import { Audio } from "expo";
import { Vibration, Alert } from "react-native";

export let _foundSound = async () => {
  const soundObject = new Audio.Sound();
  try {
    await soundObject.loadAsync(require("../assets/tri_tone.mp3"));
    await soundObject.playAsync();
    Vibration.vibrate();
    Alert.alert("Congrats Adventurer!", "You found an egg!");
  } catch (error) {
    console.log(error.message);
  }
};
