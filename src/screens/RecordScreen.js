import React from "react";
import { View, Text, StyleSheet, Platform, FlatList } from "react-native";
import Colors from '../constants/colors';
import Card from '../components/Card';
import { Ionicons } from '@expo/vector-icons';
//import RecordItem from './components/RecordItem';
import RECORDS from '../data/dummy-data';

const RecordScreen = () => {

  return (
    <Card style={styles.titleContainer}>
      <Ionicons name='school' size={20} style={styles.icon}/>
      <Text>Records</Text>

      <View>
      <FlatList data={RECORDS} renderItem={itemData => (
      <View><Text>{itemData.item}</Text></View>)}
      />

      </View>
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
   justifyContent: 'center',
   flexDirection: 'row',
  },
  icon : {
    margin: 5
  }
});

export default RecordScreen;
