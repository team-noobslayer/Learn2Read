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
    getResponses((responses) => {
      const r = responses.map((response) => {
        getQuestionById(
          response.questionId,
          (question) => (response.question = question.question)
        );
        return response;
      });
      setResponses(r);
    });
  }, []);

  return (
    <>
      <Card style={styles.titleContainer}>
        <Text style={styles.titleStyle}>Records</Text>
        <Text style={styles.subtitleStyle}>
          {responses
            ? `${responses.filter((response) => response.correct).length} / ${
                responses.length
              } correct`
            : null}
        </Text>
      </Card>
      <FlatList
        data={responses}
        renderItem={({ item }) => {
          return (
            <View>
              <ListItem bottomDivider>
                <ListItem.Content>
                  <ListItem.Title>{item.question}</ListItem.Title>
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
  titleStyle: {
    fontSize: 24,
  },
  subtitleStyle: {
    fontSize: 16,
  },
});

export default RecordScreen;
