import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ResultDisplay({ results }) {
  return (
    <View style={styles.resultsContainer}>
      <View style={styles.statusRow}>
        <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />
        <Text style={styles.statusText}>Temps écoulé: {results.time.toFixed(2)}s</Text>
      </View>
      <Text style={styles.sectionTitle}>Date détectée :</Text>
      {results.texts.length > 0 ? results.texts.map((text, i) => (
        <Text key={i} style={styles.resultText}>• {text}</Text>
      )) : <Text style={styles.resultText}>Aucun texte détecté</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  resultsContainer: {
    padding: 15,
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 12,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  statusText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4A148C',
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginBottom: 8,
    fontSize: 16,
    color: '#6A1B9A',
  },
  resultText: {
    fontSize: 14,
    marginVertical: 2,
    color: '#4A148C',
  },
});