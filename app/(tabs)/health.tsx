import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function HealthScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Health</Text>
      
      {/* Placeholder for daily steps chart */}
      <View style={styles.placeholder}>
        <Text>Daily Steps Chart Placeholder</Text>
      </View>
      
      {/* Placeholder for water intake chart */}
      <View style={styles.placeholder}>
        <Text>Water Intake Chart Placeholder</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  placeholder: {
    width: '100%',
    height: 400, 
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
});
