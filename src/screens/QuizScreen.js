import React, { useReducer, useContext, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Text, Button, ButtonGroup } from "react-native-elements";
import { Context as QuizContext } from "../context/quizContext";

const arrayShuffle = (a) => {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const quizReducer = (state, action) => {
  switch (action.type) {
    case "set_question":
      return {
        ...state,
        question: action.payload,
        answers: arrayShuffle([
          ...action.payload.answers,
          action.payload.correctAnswer,
        ]),
      };
    case "set_selection_index":
      return { ...state, selectionIndex: action.payload };
    case "set_question_index":
      return { ...state, questionIndex: action.payload };
    default:
      return state;
  }
};

const QuizScreen = ({ navigation }) => {
  const { state, fetchQuiz } = useContext(QuizContext);
  const [
    { question, selectionIndex, questionIndex, answers },
    dispatch,
  ] = useReducer(quizReducer, {
    selectionIndex: -1,
    questionIndex: 0,
  });

  const setQuestion = (question) => {
    dispatch({ type: "set_question", payload: question });
  };

  const setQuestionIndex = (index) => {
    dispatch({ type: "set_question_index", payload: index });
  };

  const setSelectionIndex = (index) => {
    dispatch({ type: "set_selection_index", payload: index });
  };

  useEffect(() => fetchQuiz(), []);

  return (
    <View style={styles.containerStyle}>
      <Text h4 style={styles.questionStyle}>
        {question ? question.question : null}
      </Text>
      <ButtonGroup
        selectedIndex={selectionIndex}
        buttons={question ? answers : []}
        onPress={(index) => setSelectionIndex(index)}
        containerStyle={styles.selectionButtonContainerStyle}
      />
      <View style={styles.logicButtonContainerStyle}>
        <Button
          buttonStyle={styles.submitButtonStyle}
          title={question ? "Submit" : "Start"}
          onPress={() => {
            if (selectionIndex === -1) return;
            if (answers[selectionIndex] === question.correctAnswer) {
              alert("correct");
            }
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
