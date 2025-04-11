import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ResultsDisplay = ({ results }) => {
  if (!results || results.length === 0) {
    return <Text style={styles.noResults}>Aucun résultat trouvé</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Résultats :</Text>
      {results.map((result, index) => (
        <View key={index} style={styles.resultItem}>
          <Text style={styles.resultText}>
            Texte : {result.text || 'N/A'}
          </Text>
          <Text style={styles.resultText}>
            Confiance : {result.confidence ? `${result.confidence.toFixed(2)}` : 'N/A'}
          </Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#6E58F5',
  },
  resultItem: {
    backgroundColor: '#E8EAF6',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  resultText: {
    fontSize: 16,
    color: '#333',
  },
  noResults: {
    fontSize: 16,
    color: '#999',
    marginTop: 20,
    textAlign: 'center',
  },
});

export default ResultsDisplay;
