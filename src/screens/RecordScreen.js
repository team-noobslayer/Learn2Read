import React from "react";
import { View, Text, StyleSheet } from "react-native";

const RecordScreen = () => {
  return (
    <View>
      <Text> Sample Text:</Text>
    </View>
  );
};

RecordScreen.navigationOptions ={
  headerTitle: 'Records',
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primary : 'white'
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
};

const styles = StyleSheet.create({});

export default RecordScreen;
