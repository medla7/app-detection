import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ImageButton({ icon, text, onPress }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Ionicons name={icon} size={20} color="#fff" />
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    backgroundColor: '#6A1B9A',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '600',
  },
});