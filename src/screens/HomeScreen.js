import React, { useEffect } from "react";
import { Button, TouchableOpacity } from "react-native";
import { Text, View, StyleSheet, Platform } from "react-native";
import Card from '../components/Card';
//import { Text } from "react-native-elements";
import Colors from '../constants/colors';
import { readDbPopulated, saveDbPopulated } from "../api/async.js";
import { createTables, dropTables, writeQuestionsFromJson } from "../api/db.js";

const questionsUri =
  "https://raw.githubusercontent.com/team-noobslayer/Learn2Read/master/assets/db/questions.json";

const loadDbIfFirstBoot = async (json_uri) => {
  await saveDbPopulated(false);
  dropTables();
  const dbPopulated = await readDbPopulated();
  if (dbPopulated) return;
  createTables();
  writeQuestionsFromJson(json_uri);
  await saveDbPopulated(true);
};

const HomeScreen = ({ navigation }) => {
  useEffect(() => {
    loadDbIfFirstBoot(questionsUri);
  }, []);

  return (
    <View style={styles.screen}>
      
      <Card style={styles.titleContainer}>
        <Text>Welcome to Learn2Read!</Text>
      </Card>
      <TouchableOpacity
        onPress={() => navigation.navigate("Profile")}
        style={styles.button}>
        <Text>Select Current Profile</Text>
       </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("Record")}
        style={styles.button}>
        <Text>See Current Records</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("Quiz")}
<<<<<<< HEAD
        style={styles.button}>
        <Text>Start a Quiz</Text>
     </TouchableOpacity>
=======
        title="Start a Quiz"
      />
      <Button onPress={() => navigation.navigate("Debug")} title="Debug" />
>>>>>>> c0db9f2... Add debug screen
    </View>
  );
};

HomeScreen.navigationOptions ={
  headerTitle: 'Learn2Read',
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primary : 'white'
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
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
    margin: 20
  },
  titleContainer: {
    width: 500,
    maxWidth: '90%',
   alignItems: 'center',
   justifyContent: 'center'
  }
});

export default HomeScreen;
