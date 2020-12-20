import React, { useState, useContext, useEffect } from "react";
import { View, Text, StyleSheet, Platform, FlatList } from "react-native";

import { Context as QuizContext } from "../context/quizContext";

import Colors from "../constants/colors";
import Card from "../components/Card";

const RecordScreen = () => {
  const { getResponses } = useContext(QuizContext);
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    getResponses((responses) => setResponses(responses));
  }, []);

  return (
    <>
      <Card style={styles.titleContainer}>
        <Text>Records</Text>
      </Card>
      <FlatList
        data={responses}
        renderItem={({ item }) => {
          return (
            <Text>
              {item.questionId} {item.response}
            </Text>
          );
        }}
        keyExtractor={(item) => item.timestamp.getTime().toString()}
      />
    </>
  );
};

RecordScreen.navigationOptions = {
  headerTitle: "Records",
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primary : "white",
  },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
};

const styles = StyleSheet.create({
  titleContainer: {
    width: 500,
    maxWidth: "90%",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default RecordScreen;
