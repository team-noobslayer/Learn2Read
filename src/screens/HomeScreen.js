import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

const HomeScreen = ({ navigation }) => {
  return (
    <View>
      <Text style={styles.text}>Welcome to Learn2Read</Text>
      <Text style={styles.smaller_text}>Please pick one of the following options below</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Quiz')}
      ><Text>Start a Quiz</Text>
      </TouchableOpacity>
      <View style={styles.space} />
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Record')}
      >
        <Text>Check Current Records</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
    backgroundColor: 'orange',
    alignSelf: 'center',
    marginBottom: 20
  },
  smaller_text: {
    fontSize: 20,
    backgroundColor: 'orange',
    alignSelf: 'center',
    marginBottom: 20
  },
  space: {
    width: 20,
    height: 20
  },
  button: {
    marginBottom: 20,
    padding: 20,
    backgroundColor: 'orange',
    alignSelf: 'center',
    alignItems: 'center',
    width: '60%'
  }
});

export default HomeScreen;