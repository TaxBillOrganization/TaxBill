import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import Colors from '../utils/colors';

export default function commentButton({ title, onPress,color = 'tabBar' }) {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: Colors[color] }]}
      onPress={onPress}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    marginVertical: 5,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: "flex-end", 
    padding: 12,
  },
  buttonText: {
    color: Colors.textColor2,
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  }
});
