import React from "react";
import { Button } from "react-native";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-elements";

const HomeScreen = ({ navigation }) => {
  return (
    <View>
      <Text style={styles.text}>Home</Text>
      <Button
        onPress={() => navigation.navigate('Profile')}
        title='Select Current Profile'
      />
      <Button
        onPress={() => navigation.navigate('Record')}
        title='See Current Records'
      />
      <Button
        onPress={() => navigation.navigate('Quiz')}
        title='Start a Quiz'
      />
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30
  }
});

export default HomeScreen;