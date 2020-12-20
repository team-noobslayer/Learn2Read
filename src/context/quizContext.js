// Quiz context
// state = { questions (Array<question>), responses (Array<response>) }
// question = { id (Number), question (String), answers (Array<String>), correctAnswer (String) }
// response = { questionId (Number), response (String), correct (Number) === 0 || 1, timestamp (Date) }

import createDataContext from "./createDataContext";
import { fetchQuestions, writeResponse, fetchResponses } from "../api/db.js";

const quizReducer = (state, action) => {
  switch (action.type) {
    case "get_quiz":
      return { ...state, questions: action.payload };
    case "get_responses":
      return { ...state, responses: action.payload };
    case "submit_quiz":
      return {
        ...state,
        responses: state.responses
          ? [...state.responses, action.payload]
          : [action.payload],
      };
    default:
      return state;
  }
};

const getQuiz = (dispatch) => {
  return (numQuestions = 10, callback = null) => {
    fetchQuestions(numQuestions, (questions) => {
      dispatch({ type: "get_quiz", payload: questions });
      if (callback) {
        callback(questions);
      }
    });
  };
};

const getResponses = (dispatch) => {
  return (callback = null) => {
    fetchResponses((responses) => {
      dispatch({ type: "get_responses", responses });
      if (callback) {
        callback(responses);
      }
    });
  };
};

const submitQuiz = (dispatch) => {
  return (payload, callback = null) => {
    // payload = responses array
    for (let response of payload) {
      writeResponse(response, () => {
        dispatch({
          type: "submit_quiz",
          payload: { ...response, timestamp: Date.now() },
        });
      });
    }
    if (callback) {
      callback();
    }
  };
};

export const { Context, Provider } = createDataContext(
  quizReducer,
  { getQuiz, submitQuiz, getResponses },
  { questions: [], responses: [] }
);
