import React, { useEffect, useContext } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

import { Context as QuizContext } from "../context/quizContext";

const DebugScreen = () => {
  const { state, getQuiz, getResponses } = useContext(QuizContext);

  useEffect(() => {
    getQuiz();
    getResponses();
  }, []);

  return (
    <View>
      <Text>Debug Screen</Text>
      <FlatList
        data={state.questions}
        renderItem={({ item }) => {
          return (
            <View>
              <Text>Question: {item.question}</Text>
              <Text>Answer: {item.correctAnswer}</Text>
            </View>
          );
        }}
        keyExtractor={(item) => item.id.toString()}
      />
      <FlatList
        data={state.responses}
        renderItem={({ item }) => {
          return (
            <View>
              <Text>Question ID: {item.questionId}</Text>
              <Text>Response: {item.response}</Text>
            </View>
          );
        }}
        keyExtractor={(item) => item.timestamp.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default DebugScreen;
