import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from "../constants/colors";


const RecordItem = props => {
    return (
        <View style={styles.recordItem}>
            <Text>
                <Text style={styles.recordType}>{props.recordType}</Text> 
                <Text style={styles.score}>{props.score}</Text>  
            </Text>  
        </View>
    )
};

const styles = StyleSheet.create({
    recordItem: {
        padding: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20
    },
    recordType: {
      fontSize: 16
    },
    score: {
        color: Colors.primary,
        fontSize: 16
    }
});

export default RecordItem;