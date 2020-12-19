import React, { useEffect } from "react";
import { Button } from "react-native";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-elements";

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
    <View>
      <Text style={styles.text}>Home</Text>
      <Button
        onPress={() => navigation.navigate("Profile")}
        title="Select Current Profile"
      />
      <Button
        onPress={() => navigation.navigate("Record")}
        title="See Current Records"
      />
      <Button
        onPress={() => navigation.navigate("Quiz")}
        title="Start a Quiz"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
  },
});

export default HomeScreen;
