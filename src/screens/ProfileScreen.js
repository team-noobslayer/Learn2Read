import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
//import { Colors } from "react-native/Libraries/NewAppScreen";
import Colors from '../constants/colors';
import Card from '../components/Card';

const ProfileScreen = () => {
  return (
    <Card style={styles.titleContainer}>
      <Text>Choose Current Profile</Text>
    </Card>
  );
};

ProfileScreen.navigationOptions ={
  headerTitle: 'Profile',
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

export default ProfileScreen;
