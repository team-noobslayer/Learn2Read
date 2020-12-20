// Quiz context
// state = { questions (Array<question>), responses (Array<response>) }
// question = { id (Number), question (String), answers (Array<String>), correctAnswer (String) }
// response = { questionId (Number), response (String), correct (Number) === 0 || 1, timestamp (Date) }

import createDataContext from "./createDataContext";
import { fetchQuestions, writeResponse } from "../api/db.js";

const quizReducer = (state, action) => {
  switch (action.type) {
    case "fetch_quiz":
      return { ...state, questions: action.payload };
    case "submit_quiz":
      return { ...state, responses: [...state.responses, action.payload] };
    default:
      return state;
  }
};

const fetchQuiz = (dispatch) => {
  return (numQuestions = 10, callback = null) => {
    fetchQuestions(numQuestions, (questions) => {
      console.log(questions);
      dispatch({ type: "fetch_quiz", payload: questions });
    });
    if (callback) {
      callback();
    }
  };
};

const submitQuiz = (dispatch) => {
  return (payload, callback = null) => {
    // payload = responses array
    for (let response of payload) {
      writeResponse(response, () => {
        dispatch({ type: "submit_quiz", payload });
      });
    }
    if (callback) {
      callback();
    }
  };
};

export const { Context, Provider } = createDataContext(
  quizReducer,
  { questions: [], responses: [] }
);
