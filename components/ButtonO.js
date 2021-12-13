import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function ButtonO({ onPress, children }) {


  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.text}> {children} </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {
    color: 'white',
    fontWeight: '700',
    fontSize: 18
  },
  button: {
    marginTop: 10,
    padding: 20,
    width: '70%',
    height: '13%',
    backgroundColor: 'pink',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: "space-around",
    marginRight: '5%'
  }
});