import React, { useEffect } from "react";
import { Button, TouchableOpacity } from "react-native";
import { Text, View, StyleSheet } from "react-native";
import Card from '../components/Card';
//import { Text } from "react-native-elements";

import { readDbPopulated, saveDbPopulated } from "../api/async.js";
import { createTables, writeQuestionsFromJson } from "../api/db.js";

const questionsUri =
  "https://raw.githubusercontent.com/team-noobslayer/Learn2Read/master/assets/db/questions.json";

const loadDbIfFirstBoot = async (json_uri) => {
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
        style={styles.button}>
        <Text>Start a Quiz</Text>
     </TouchableOpacity>
    </View>
  );
};

/*HomeScreen.navigationOptions = (navigationData) =>{
  console.log(navigationData)
};
*/

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
