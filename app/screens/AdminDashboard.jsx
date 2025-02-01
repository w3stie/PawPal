import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { chatbotService } from '../services/chatbotService';

export default function AdminDashboard() {
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadChatHistory();
  }, []);

  const loadChatHistory = async () => {
    try {
      const history = await chatbotService.getChatHistory();
      setChatHistory(history);
    } catch (error) {
      console.error('Error loading chat history:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chat History</Text>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={chatHistory}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.chatItem}>
              <Text style={styles.timestamp}>{new Date(item.timestamp).toLocaleString()}</Text>
              <Text style={styles.userMessage}>User: {item.userMessage}</Text>
              <Text style={styles.aiMessage}>AI: {item.aiResponse}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  chatItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  timestamp: {
    fontSize: 12,
    color: '#666',
  },
  userMessage: {
    marginTop: 8,
    fontSize: 14,
  },
  aiMessage: {
    marginTop: 4,
    fontSize: 14,
    color: '#666',
  },
}); 