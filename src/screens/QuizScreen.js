import React, { useState, useContext, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Text, Button, ButtonGroup } from "react-native-elements";
import { Context as QuizContext } from "../context/quizContext";

const QuizScreen = ({ navigation }) => {
  const { state, fetchQuiz } = useContext(QuizContext);
  const [selectionIndex, setSelectionIndex] = useState(-1);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [question, setQuestion] = useState(null);

  useEffect(() => {
    fetchQuiz(10, () => {
      setQuestion(state.questions[questionIndex]);
    });
  }, []);

  return (
    <View style={styles.containerStyle}>
      <Text h4 style={styles.questionStyle}>
        {question ? question.question : null}
      </Text>
      <ButtonGroup
        selectedIndex={selectionIndex}
        buttons={question ? [...question.answers, question.correctAnswer] : []}
        onPress={(index) => setSelectionIndex(index)}
        containerStyle={styles.selectionButtonContainerStyle}
      />
      <View style={styles.logicButtonContainerStyle}>
        <Button
          buttonStyle={styles.submitButtonStyle}
          title="Submit"
          onPress={() => {
            setQuestionIndex((questionIndex + 1) % 5);
            setQuestion(state.questions[questionIndex]);
            setSelectionIndex(-1);
          }}
        />
        <Button
          buttonStyle={styles.exitButtonStyle}
          title="Exit"
          onPress={() => {
            navigation.pop();
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 100,
  },
  questionStyle: {
    textAlign: "center",
  },
  selectionButtonContainerStyle: {
    marginVertical: 50,
  },
  logicButtonContainerStyle: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  submitButtonStyle: {
    width: 150,
    margin: 5,
    backgroundColor: "green",
  },
  exitButtonStyle: {
    width: 150,
    margin: 5,
    backgroundColor: "firebrick",
  },
});

export default QuizScreen;
