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
//   FOREIGN KEY(QuestionID) REFERENCES Questions(QuestionID)
//  )
//

import axios from 'axios';
import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("db.sqlite");

export const fetchQuestionsFromDb = (numQuestions, callback) => {
  db.transaction((tx) => {
    tx.executeSql(
      `SELECT * FROM Questions LIMIT ?;`,
      [numQuestions],
      (_, resultSet) => callback(resultSet.rows._array),
      (err) => console.error(err)
    );
  });
};

export const writeQuestion = ({ id, question, answers, correctAnswer }) => {
  db.transaction((tx) => {
    tx.executeSql(
      `INSERT INTO Questions VALUES (?, ?, ?, ?, ?, ?);`,
      [id, question, ...answers, correctAnswer],
      (_, resultSet) => {
        console.log(resultSet);
      },
      (err) => {
        console.error(err);
      }
    );
  });
};

export const populateDbFromJson = async (uri) => {
  try {
    const data = await axios.get(uri).data;
    const questions = JSON.parse(data);
    for (let question of questions) {
      writeQuestion(question);
    }
  } catch (err) {
    console.error("populateDbFromJson error\n" + err);
  }
}