import React from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    textAlign: 'center'
  },
  button: {
    backgroundColor: 'orange',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
    marginTop: 20
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
    justifyContent: 'space-between'
  }
})

export const Button = ({ text, onPress = () => {} }) => (
  <TouchableOpacity
    onPress={onPress}
    style={styles.button}
  >
    <Text style={styles.text}>{text}</Text>
  </TouchableOpacity>
)
export const ButtonContainer = ({ children }) => (
  <View style={styles.buttonContainer}>{children}</View>
)
