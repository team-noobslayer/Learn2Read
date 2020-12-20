import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Header = props => {
    const appTitle ="Learn2Read";
    return(
        <View style={styles.header}>
            <Text style={styles.headerTitle}>{appTitle}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 70,
        paddingTop: 30,
        backgroundColor: '#DC4405',
        alignItems: 'center',
        justifyContent: 'center',
        letterSpacing: 5
    },
    headerTitle:{
        color: 'white',
        fontSize: 16  
    }
});

export default Header;