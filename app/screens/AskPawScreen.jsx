import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Clipboard,
  Share,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { copyToClipboard } from '../utils/clipboard';
import { chatbotService } from '../services/chatbotService';

export default function AskPawScreen() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "user",
      text: "My cat has been sneezing frequently and has watery eyes. What could be the problem, and how can I help?",
    },
    {
      id: 2,
      type: "ai",
      text: "Frequent sneezing and watery eyes in cats could indicate an upper respiratory infection, often caused by viruses like feline herpesvirus or calicivirus. Ensure your cat stays hydrated and comfortable in a warm, stress-free environment. You can gently wipe away discharge with a damp cloth. If symptoms persist for more than a few days or worsen, consult a vet as antibiotics or antiviral medication may be needed. Monitor for signs of lethargy or loss of appetite.",
    },
    {
      id: 3,
      type: "user",
      text: "What's the best food for my 2-month-old kitten?",
    },
    {
      id: 4,
      type: "ai",
      text: "Feed your kitten high-quality wet or dry food formulated specifically for kittens.",
    },
  ]);
  const router = useRouter();
  const [editingMessageId, setEditingMessageId] = useState(null);
  const [editText, setEditText] = useState("");
  const scrollViewRef = useRef();

  const handleSend = async () => {
    if (message.trim()) {
      try {
        // Add user message
        const userMessage = { id: Date.now(), type: 'user', text: message };
        const tempAiMessage = { id: Date.now() + 1, type: 'ai', text: 'Processing...' };
        
        setMessages(prev => [...prev, userMessage, tempAiMessage]);
        setMessage('');

        // Get response from backend
        const response = await chatbotService.sendMessage(message);
        
        // Update AI message with actual response
        setMessages(prev => prev.map(msg => 
          msg.id === tempAiMessage.id 
            ? { ...msg, text: response.message }
            : msg
        ));
      } catch (error) {
        console.error('Error sending message:', error);
        // Show error to user
        setMessages(prev => prev.map(msg => 
          msg.id === tempAiMessage.id 
            ? { ...msg, text: 'Sorry, there was an error. Please try again.' }
            : msg
        ));
      }
    }
  };

  const handleEditMessage = (messageId, text) => {
    setEditingMessageId(messageId);
    setEditText(text);
  };

  const handleSaveEdit = () => {
    if (editText.trim()) {
      setMessages(prev => prev.map(msg => 
        msg.id === editingMessageId 
          ? { ...msg, text: editText }
          : msg
      ));
      setEditingMessageId(null);
      setEditText("");
    }
  };

  const renderMessage = (msg) => (
    <View key={msg.id} style={styles.messageContainer}>
      {msg.type === "user" ? (
        <View style={styles.userMessage}>
          <View style={styles.messageContent}>
            {editingMessageId === msg.id ? (
              <View style={styles.editContainer}>
                <TextInput
                  style={styles.editInput}
                  value={editText}
                  onChangeText={setEditText}
                  multiline
                  autoFocus
                />
                <TouchableOpacity 
                  style={styles.saveButton}
                  onPress={handleSaveEdit}
                >
                  <Icon name="checkmark" size={20} color="#FF6B6B" />
                </TouchableOpacity>
              </View>
            ) : (
              <>
                <Text style={styles.messageText}>{msg.text}</Text>
                <TouchableOpacity 
                  style={styles.editButton}
                  onPress={() => handleEditMessage(msg.id, msg.text)}
                >
                  <Icon name="pencil-outline" size={16} color="#FF6B6B" />
                </TouchableOpacity>
              </>
            )}
          </View>
          <Image
            source={require('../../assets/images/user-image.png')}
            style={styles.userAvatar}
          />
        </View>
      ) : (
        <View style={styles.aiMessage}>
          <Image
            source={require('../../assets/images/chatbot-logo.png')}
            style={styles.aiAvatar}
          />
          <View style={styles.messageContent}>
            <Text style={styles.messageText}>{msg.text}</Text>
            <View style={styles.actionButtons}>
              <TouchableOpacity 
                style={styles.actionButton}
                onPress={() => handleCopy(msg.text)}
              >
                <Icon name="copy-outline" size={20} color="#666" />
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.actionButton}
                onPress={() => handleShare(msg.text)}
              >
                <Icon name="share-social-outline" size={20} color="#666" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </View>
  );

  const handleCopy = async (text) => {
    try {
      await copyToClipboard(text);
    } catch (error) {
      console.error('Failed to copy text:', error);
    }
  };

  const handleShare = async (text) => {
    try {
      await Share.share({
        message: text,
      });
    } catch (error) {
      console.error('Failed to share text:', error);
    }
  };

  const handleContentSizeChange = () => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  };

  const handleKeyboardShow = () => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <KeyboardAvoidingView 
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Icon name="chevron-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>AskPaw</Text>
          <TouchableOpacity>
            <Icon name="ellipsis-horizontal" size={24} color="#000" />
          </TouchableOpacity>
        </View>

        {/* Chat Messages */}
        <ScrollView 
          ref={scrollViewRef}
          style={styles.messagesContainer}
          contentContainerStyle={styles.messagesContent}
          onContentSizeChange={handleContentSizeChange}
          onLayout={handleContentSizeChange}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {messages.map(renderMessage)}
          <TouchableOpacity style={styles.regenerateButton}>
            <Icon name="refresh-outline" size={20} color="#FF6B6B" />
            <Text style={styles.regenerateText}>Regenerate Response</Text>
          </TouchableOpacity>
        </ScrollView>

        {/* Input Area */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Send a message..."
            value={message}
            onChangeText={setMessage}
            multiline
            maxHeight={100}
            onFocus={handleContentSizeChange}
          />
          <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
            <Icon name="arrow-forward" size={24} color="#FF6B6B" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  keyboardAvoidingView: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    backgroundColor: "#fff",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  messagesContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  messagesContent: {
    padding: 16,
    paddingBottom: 8,
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  messageContainer: {
    marginBottom: 20,
  },
  userMessage: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-start",
  },
  aiMessage: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  messageContent: {
    flex: 1,
    marginHorizontal: 12,
    backgroundColor: "#F8F9FA",
    borderRadius: 12,
    padding: 12,
  },
  messageText: {
    fontSize: 15,
    lineHeight: 20,
    color: "#333",
  },
  userAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#ddd",
  },
  aiAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#E8F0FE",
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 8,
  },
  actionButton: {
    padding: 4,
    marginLeft: 8,
  },
  reportButton: {
    padding: 4,
    alignSelf: "flex-end",
  },
  regenerateButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#FF6B6B",
    marginVertical: 16,
  },
  regenerateText: {
    color: "#FF6B6B",
    marginLeft: 8,
    fontSize: 15,
    fontWeight: "500",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    backgroundColor: "#fff",
    marginTop: 'auto',
  },
  input: {
    flex: 1,
    backgroundColor: "#F8F9FA",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    fontSize: 15,
    maxHeight: 100,
    minHeight: 40,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F8F9FA",
    alignItems: "center",
    justifyContent: "center",
  },
  safeArea: {
    flex: 1,
  },
  editContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editInput: {
    flex: 1,
    fontSize: 15,
    lineHeight: 20,
    color: "#333",
    padding: 0,
  },
  saveButton: {
    padding: 4,
    marginLeft: 8,
  },
  editButton: {
    padding: 2,
    alignSelf: 'flex-end',
    position: 'absolute',
    right: 4,
    top: 4,
  },
});