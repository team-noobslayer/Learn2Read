import React, { useEffect, useContext } from "react";
import { Alert } from "react-native";
import { Button } from "react-native";
import { View, Text, FlatList, StyleSheet, Image } from "react-native";

import { Context as QuizContext } from "../context/quizContext";

const QuizScreen = () => {
  const { state, fetchQuiz } = useContext(QuizContext);

  useEffect(() => {
    fetchQuiz();
  }, []);

  return (
    <View style={styles.screen}>
      <Text>Quiz Screen</Text>
      <FlatList
        data={state.questions}
        renderItem={({ item }) => {
          return (
            <View>
              <Text style={styles.question}>{item.question}</Text>
              <Button
                title={item.correctAnswer}
                onPress={() => Alert.alert('You got the right answer!')}
              />
              <Text>Incorrect Answers: {item.answers}</Text>
              <Button
                title={JSON.stringify(item.answers)}
                onPress={() => Alert.alert('You got the wrong answer!')}
              />

            </View>
          );
        }}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ff4500'
  },
  question: {
    textAlign: 'center',
    fontSize: 30,
    color: 'black',
    backgroundColor: 'orange'
  },
  answers: {

  }
});

export default QuizScreen;
