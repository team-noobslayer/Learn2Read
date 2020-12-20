import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";

const ProfileScreen = () => {
  return (
    <View>
      <Text> Sample Text:</Text>
    </View>
  );
};

ProfileScreen.navigationOptions ={
  headerTitle: 'Profile',
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primary : 'white'
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
};

const styles = StyleSheet.create({});

export default ProfileScreen;
