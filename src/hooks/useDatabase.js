import { useState, useEffect } from "react";

import { readDbPopulated, saveDbPopulated } from "../api/async.js";
import { createTables, dropTables, writeQuestionsFromJson } from "../api/db.js";

export default (json_uri) => {
  const [dbLoaded, setDbLoaded] = useState(false);

  const loadQuestionsIfFirstBoot = async (uri) => {
    const dbPopulated = await readDbPopulated();
    if (dbPopulated) {
      setDbLoaded(true);
      return;
    }
    createTables();
    writeQuestionsFromJson(uri);
    await saveDbPopulated(true);
    setDbLoaded(true);
  };

  useEffect(() => {
    const uri = json_uri
      ? json_uri
      : "https://raw.githubusercontent.com/team-noobslayer/Learn2Read/master/assets/db/questions.json";
    loadQuestionsIfFirstBoot(uri);
  }, []);

  return dbLoaded;
};
