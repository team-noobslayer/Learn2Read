import AsyncStorage from "@react-native-community/async-storage";

const boolToString = (bool) => {
  if (typeof bool === "boolean") {
    return bool ? "true" : "false";
  } else {
    return bool.toString();
  }
};

const stringToBool = (str) => {
  return typeof str === "string" && str.toLowerCase() === "false"
    ? false
    : Boolean(str);
};

export const saveDbPopulated = async (value) => {
  try {
    await AsyncStorage.setItem("@db_populated", boolToString(value));
  } catch (err) {
    console.error("saveDbPopulated error" + e);
  }
};

export const readDbPopulated = async (callback = null) => {
  try {
    const dbPopulated = await AsyncStorage.getItem("@db_populated");
    if (callback) {
      callback(stringToBool(stringToBool(dbPopulated)));
    }
    return stringToBool(dbPopulated);
  } catch (err) {
    console.log("readDbPopulated error" + err);
  }
};
