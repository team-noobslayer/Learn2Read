import React, { useEffect, useContext } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

import { Context as QuizContext } from "../context/quizContext";

const DebugScreen = () => {
  const { state, fetchQuiz } = useContext(QuizContext);

  useEffect(() => {
    fetchQuiz();
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
              <Text>Incorrect Answers: {item.answers}</Text>
              <Text>Answer: {item.correctAnswer}</Text>
            </View>
          );
        }}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default DebugScreen;
