import React, { useEffect } from "react";
import { Button } from "react-native";
import { View, StyleSheet, Platform, TouchableOpacity } from "react-native";
import { Text } from "react-native-elements";
import useDatabase from "../hooks/useDatabase";
import Colors from "../constants/colors";
import Card from "../components/Card";

const HomeScreen = ({ navigation }) => {
  const [dbLoaded] = useDatabase();
  if (!dbLoaded) return null;

  return (
    <View style={styles.screen}>
      <Card style={styles.titleContainer}>
        <Text>Welcome to Learn2Read!</Text>
      </Card>
      <TouchableOpacity
        onPress={() => navigation.navigate("Profile")}
        style={styles.button}
      >
        <Text>Select Current Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("Record")}
        style={styles.button}
      >
        <Text>See Current Records</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("Quiz")}
        style={styles.button}
      >
        <Text>Start a Quiz</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity
        onPress={() => navigation.navigate("Debug")}
        style={styles.button}
      >
        <Text>Debug</Text>
      </TouchableOpacity> */}
    </View>
  );
};

HomeScreen.navigationOptions = {
  headerTitle: "Learn2Read",
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primary : "white",
  },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
  },
  text: {
    fontSize: 100,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    margin: 20,
  },
  titleContainer: {
    width: 500,
    maxWidth: "90%",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default HomeScreen;
