import React, { useState, useContext, useEffect } from "react";
import { View, Text, StyleSheet, Platform, FlatList } from "react-native";
import { ListItem } from "react-native-elements";

import useDatabase from "../hooks/useDatabase";
import { Context as QuizContext } from "../context/quizContext";

import Colors from "../constants/colors";
import Card from "../components/Card";

const RecordScreen = () => {
  const { getResponses } = useContext(QuizContext);
  const [responses, setResponses] = useState([]);
  const [_, getQuestionById] = useDatabase();

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
          getQuestionById(
            item.questionId,
            (question) => (item.question = question)
          );
          return (
            <View>
              <ListItem bottomDivider>
                <ListItem.Content>
                  <ListItem.Title>
                    Question ID: {item.questionId}
                  </ListItem.Title>
                  <ListItem.Subtitle>
                    {item.response} {item.correct ? "✔️" : "❌"}
                  </ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
            </View>
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
