// Questions table
// (
//   QuestionID INT PRIMARY KEY NOT NULL,
//   Question TEXT,
//   Answer1 TEXT,
//   Answer2 TEXT,
//   Answer3 TEXT,
//   CorrectAnswer TEXT,
// )
//
// Responses table
// (
//   QuestionID INT,
//   Response TEXT,
//   Correct INT,
//   Timestamp INT
//   FOREIGN KEY(QuestionID) REFERENCES Questions(QuestionID)
//  )
//

import axios from "axios";
import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("db.sqlite");

export const fetchQuestions = (numQuestions = 10, callback) => {
  db.transaction((tx) => {
    tx.executeSql(
      `SELECT * FROM Questions LIMIT ?;`,
      [numQuestions],
      (_, resultSet) =>
        callback(
          resultSet.rows._array.map((question) => {
            return {
              id: question.QuestionID,
              question: question.Question,
              answers: [question.Answer1, question.Answer2, question.Answer3],
              correctAnswer: question.CorrectAnswer,
            };
          })
        ),
      (err) => console.error(err)
    );
  });
};

export const fetchResponses = (callback) => {
  db.transaction((tx) => {
    tx.executeSql(
      "SELECT * FROM Responses;",
      [],
      (_, resultSet) => {
        callback(
          resultSet.rows._array.map((response) => {
            return {
              questionId: response.QuestionID,
              response: response.Response,
              correct: response.Correct,
              timestamp: new Date(response.Timestamp),
            };
          })
        );
      },
      (err) => {
        console.error("fetchResponses error\n", err);
        callback(err);
      }
    );
  });
};

export const writeQuestion = (
  { id, question, answers, correctAnswer },
  callback = null
) => {
  db.transaction((tx) => {
    tx.executeSql(
      "INSERT INTO Questions VALUES (?, ?, ?, ?, ?, ?);",
      [id, question, ...answers, correctAnswer],
      (_, resultSet) => {
        if (callback) callback(resultSet);
      },
      (err) => {
        console.error("writeQuestion error\n", err);
        if (callback) callback(err);
      }
    );
  });
};

export const writeResponse = (
  { questionId, response, correct },
  callback = null
) => {
  db.transaction((tx) => {
    tx.executeSql(
      "INSERT INTO Responses VALUES (?, ?, ?, ?);",
      [questionId, response, correct, Date.now()],
      (_, resultSet) => {
        if (callback) callback(resultSet);
      },
      (err) => {
        console.error("writeResponse error\n", err);
        if (callback) callback(err);
      }
    );
  });
};

export const createTables = () => {
  db.transaction((tx) => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS Questions (
        QuestionID INT PRIMARY KEY NOT NULL,
        Question TEXT,
        Answer1 TEXT,
        Answer2 TEXT,
        Answer3 TEXT,
        CorrectAnswer TEXT
      );`,
      [],
      () => {},
      (err) => {
        console.error("createTables Questions error\n", err);
      }
    );
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS Responses (
        QuestionID INT,
        Response TEXT,
        Correct INT,
        Timestamp INT,
        FOREIGN KEY(QuestionID) REFERENCES Questions(QuestionID)
      );`,
      [],
      () => {},
      (err) => {
        console.error("createTables Responses error\n", err);
      }
    );
  });
};

export const dropTables = () => {
  db.transaction((tx) => {
    tx.executeSql(
      "DROP TABLE IF EXISTS Questions;",
      [],
      () => {},
      (err) => {
        console.error("dropTables Questions error\n", err);
      }
    );
  });
  db.transaction((tx) => {
    tx.executeSql(
      "DROP TABLE IF EXISTS Responses;",
      [],
      () => {},
      (err) => {
        console.error("dropTables Responses error\n", err);
      }
    );
  });
};

export const writeQuestionsFromJson = async (uri) => {
  try {
    const response = await axios.get(uri);
    const questions = response.data;
    for (let question of questions) {
      writeQuestion(question);
    }
  } catch (err) {
    console.error("writeQuestionsFromJson error\n" + err);
  }
};
