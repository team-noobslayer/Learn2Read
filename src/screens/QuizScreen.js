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
    case "add_response":
      return {
        ...state,
        responses: state.responses
          ? [...state.responses, action.payload]
          : [action.payload],
        numAnswered: state.numAnswered + 1,
        numCorrect: state.numCorrect + action.payload.correct,
      };
    default:
      return state;
  }
};

const QuizScreen = ({ navigation }) => {
  const { state, fetchQuiz, submitQuiz } = useContext(QuizContext);
  const [
    {
      question,
      selectionIndex,
      questionIndex,
      answers,
      numAnswered,
      numCorrect,
      responses,
    },
    dispatch,
  ] = useReducer(quizReducer, {
    selectionIndex: -1,
    questionIndex: 0,
    numAnswered: 0,
    numCorrect: 0,
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

  const addResponse = (response) => {
    dispatch({ type: "add_response", payload: response });
  };

  const submitQuestion = () => {
    if (question) {
      if (selectionIndex === -1) return;
      const correct =
        answers[selectionIndex] === question.correctAnswer ? 1 : 0;
      addResponse({
        questionId: question.id,
        response: answers[selectionIndex],
        correct,
      });
    }
    setQuestionIndex((questionIndex + 1) % state.questions.length);
    setQuestion(state.questions[questionIndex]);
    setSelectionIndex(-1);
  };

  const exit = () => {
    if (responses) submitQuiz(responses);
    navigation.pop();
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
          onPress={submitQuestion}
        />
        <Button
          buttonStyle={styles.exitButtonStyle}
          title="Exit"
          onPress={exit}
        />
      </View>
      <Text style={styles.scoreStyle}>
        {numAnswered !== 0 ? `${numCorrect}/${numAnswered}` : null}
      </Text>
    </View>
  );
};

QuizScreen.navigationOptions = ({ navigation }) => {
  return { headerBackImage: () => null, headerTitleAlign: "center" };
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
  scoreStyle: {
    fontSize: 20,
    marginTop: 25,
  },
});

export default QuizScreen;
