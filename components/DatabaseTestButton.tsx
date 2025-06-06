import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Colors from '@/theme/colors';
import { Database, CheckCircle, XCircle, Loader } from 'lucide-react-native';
import { runDatabaseTests } from '@/lib/database/connection';

export default function DatabaseTestButton() {
  const [isLoading, setIsLoading] = useState(false);
  const [testResult, setTestResult] = useState<'success' | 'error' | null>(null);

  const handleTest = async () => {
    setIsLoading(true);
    setTestResult(null);
    
    try {
      const result = await runDatabaseTests();
      
      if (result.success) {
        setTestResult('success');
        Alert.alert(
          'Database Test Successful! ✅',
          `Connection verified and ${result.data?.categoriesCount || 0} categories, ${result.data?.questionsCount || 0} questions found.`,
          [{ text: 'OK' }]
        );
      } else {
        setTestResult('error');
        Alert.alert(
          'Database Test Failed ❌',
          `Failed at ${result.step}: ${result.error}`,
          [{ text: 'OK' }]
        );
      }
    } catch (error) {
      setTestResult('error');
      Alert.alert(
        'Database Test Error',
        'An unexpected error occurred during testing.',
        [{ text: 'OK' }]
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={[
          styles.button,
          testResult === 'success' && styles.successButton,
          testResult === 'error' && styles.errorButton,
        ]} 
        onPress={handleTest}
        disabled={isLoading}
      >
        <View style={styles.buttonContent}>
          {isLoading ? (
            <Loader size={20} color={Colors.dark.text} />
          ) : testResult === 'success' ? (
            <CheckCircle size={20} color={Colors.dark.success} />
          ) : testResult === 'error' ? (
            <XCircle size={20} color={Colors.dark.error} />
          ) : (
            <Database size={20} color={Colors.dark.text} />
          )}
          <Text style={[
            styles.buttonText,
            testResult === 'success' && styles.successText,
            testResult === 'error' && styles.errorText,
          ]}>
            {isLoading ? 'Testing...' : 'Test Database Connection'}
          </Text>
        </View>
      </TouchableOpacity>
      
      {testResult && (
        <Text style={[
          styles.resultText,
          testResult === 'success' ? styles.successText : styles.errorText
        ]}>
          {testResult === 'success' 
            ? 'Database connection and setup verified!' 
            : 'Database test failed. Check console for details.'
          }
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 16,
  },
  button: {
    backgroundColor: Colors.dark.card,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.dark.border,
  },
  successButton: {
    borderColor: Colors.dark.success,
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
  },
  errorButton: {
    borderColor: Colors.dark.error,
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.dark.text,
    marginLeft: 8,
  },
  successText: {
    color: Colors.dark.success,
  },
  errorText: {
    color: Colors.dark.error,
  },
  resultText: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
    fontWeight: '500',
  },
});