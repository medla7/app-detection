import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ResultDisplay({ results }) {
  const getConfidenceColor = (score) => {
    if (score >= 0.8) return '#4CAF50';     // Vert : fiable
    if (score >= 0.5) return '#FFC107';     // Orange : moyen
    return '#F44336';                       // Rouge : faible
  };

  return (
    <View style={styles.resultsContainer}>
      <View style={styles.statusRow}>
        <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />
        <Text style={styles.statusText}>
          Temps écoulé : {results.time.toFixed(2)}s
        </Text>
      </View>

      <Text style={styles.sectionTitle}>Date détectée :</Text>

      {results.texts.length > 0 ? (
        results.texts.map((item, i) => (
          <View key={i} style={styles.resultItem}>
            <Text style={[styles.resultText, { color: getConfidenceColor(item.confidence) }]}>
              • {item.text} ({(item.confidence * 100).toFixed(1)}%) – {item.msg}
            </Text>
          </View>
        ))
      ) : (
        <Text style={styles.resultText}>Aucun texte détecté</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  resultsContainer: {
    padding: 15,
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 12,
    marginVertical: 10,
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
  resultItem: {
    marginBottom: 4,
  },
  resultText: {
    fontSize: 14,
  },
});
