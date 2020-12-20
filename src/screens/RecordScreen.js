import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import Colors from '../constants/colors';
import Card from '../components/Card';

const RecordScreen = () => {
  return (
    <Card style={styles.titleContainer}>
      <Text>Records</Text>
    </Card>
  );
};

RecordScreen.navigationOptions ={
  headerTitle: 'Records',
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primary : 'white'
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
};

const styles = StyleSheet.create({
  titleContainer: {
    width: 500,
    maxWidth: '90%',
   alignItems: 'center',
   justifyContent: 'center'
  }
});

export default RecordScreen;
