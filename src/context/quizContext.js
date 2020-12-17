// Quiz context
// state = {id (Number), submitted (Bool), questions (Array<question>), responses (Array<response>) }
// question = { id (Number), question (String), answers (Array<String>), correctAnswer (String) }
// response = { id (Number), response (String), correct (Bool) }

import createDataContext from "./createDataContext";

const quizReducer = (state, action) => {
  switch (action.type) {
    case "fetch_quiz":
      return { ...state, questions: action.payload };
    case "submit_quiz":
      return { ...state, responses: action.payload };
    default:
      return state;
  }
};

const fetchQuiz = (dispatch) => {
  return (callback = null) => {
    // TODO: grab new set of quiz questions from db
    dispatch({ type: "fetch_quiz", payload: questions });
    if (callback) {
      callback();
    }
  };
};

const submitQuiz = (dispatch) => {
  return (payload, callback = null) => {
    // payload = responses array
    // TODO: write quiz responses to db
    dispatch({ type: "submit_quiz", payload });
    if (callback) {
      callback();
    }
  };
};

export const { Context, Provider } = createDataContext(
  quizReducer,
  { fetchQuiz, submitQuiz },
  { submitted: false, questions: [], responses: [] }
);
