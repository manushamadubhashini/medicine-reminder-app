import React, { useState, useRef, useEffect } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  StatusBar,
  Alert,
} from "react-native";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Ionicons } from '@expo/vector-icons';

// API key එක environment variable එකකින් ගන්න
const API_KEY = "AIzaSyCRZAaUNIwMUYpLs-F_CEELEPq1w5FV-BQ";

// GoogleGenerativeAI client එක initialize කරනවා
const genAI = new GoogleGenerativeAI(API_KEY);

// Message object එකේ type definition එක
interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: string;
}

const ChatBox = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'ආයුබෝවන්! මම ඔබගේ AI සහායකයා. මට ඔබට කොහොමද උදව් කරන්න පුළුවන්ද?',
      sender: 'bot',
      timestamp: new Date().toLocaleTimeString()
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  // අලුත් messages එනකොට chat එක bottom එකට scroll කරනවා
  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  // Timestamp format කරන්න
  const getCurrentTime = () => {
    return new Date().toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  // පණිවිඩයක් යැවීමේ logic එක
  const handleSend = async () => {
    if (input.trim() === "") {
      Alert.alert('ගැටලුවක්', 'කරුණාකර පණිවිඩයක් ටයිප් කරන්න');
      return;
    }

    // User ගේ message එක chat එකට එකතු කරනවා
    const newUserMessage: Message = {
      id: Date.now().toString(),
      text: input.trim(),
      sender: "user",
      timestamp: getCurrentTime(),
    };
    
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);
    const userInput = input;
    setInput("");
    setLoading(true);

    try {
      const model = genAI.getGenerativeModel({ 
        model:"gemini-1.5-flash",
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
      });

      // Chat history එක maintain කරන්න
      const chatHistory = messages.map(msg => 
        `${msg.sender === 'user' ? 'User' : 'Assistant'}: ${msg.text}`
      ).join('\n');

      const prompt = `Previous conversation:\n${chatHistory}\n\nUser: ${userInput}\n\nPlease respond in a helpful and friendly manner. If the user writes in Sinhala, respond in Sinhala. If in English, respond in English.`;
      
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const botResponse = response.text();

      // Bot ගේ response එක chat එකට එකතු කරනවා
      const newBotMessage: Message = {
        id: Date.now().toString() + '_bot',
        text: botResponse,
        sender: "bot",
        timestamp: getCurrentTime(),
      };
      setMessages((prevMessages) => [...prevMessages, newBotMessage]);

    } catch (error) {
      console.error("AI API Error:", error);
      const errorMessage: Message = {
        id: Date.now().toString() + '_error',
        text: "සමාවෙන්න, දැනට මට ප්‍රතිචාරයක් ලබා ගැනීමට නොහැකියි. කරුණාකර නැවත උත්සාහ කරන්න. 🔄",
        sender: "bot",
        timestamp: getCurrentTime(),
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
      
      Alert.alert(
        'සම්බන්ධතා ගැටලුව',
        'AI service එක සම්බන්ධ කරගන්න බැරි විය. නැවත උත්සාහ කරන්න.',
        [{ text: 'හරි', style: 'default' }]
      );
    } finally {
      setLoading(false);
    }
  };

  // Clear chat function
  const clearChat = () => {
    Alert.alert(
      'Chat එක Clear කරන්නද?',
      'සියලුම පණිවිඩ මකා දමනු ලැබේ.',
      [
        { text: 'අවලංගු කරන්න', style: 'cancel' },
        { 
          text: 'Clear කරන්න', 
          style: 'destructive',
          onPress: () => {
            setMessages([{
              id: Date.now().toString(),
              text: 'Chat එක clear කරන ලදි. නැවත ආරම්භ කරමු! 👋',
              sender: 'bot',
              timestamp: getCurrentTime(),
            }]);
          }
        },
      ]
    );
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <View style={styles.headerLeft}>
              <View style={styles.onlineIndicator} />
              <Text style={styles.headerTitle}>Gemini AI</Text>
            </View>
            <TouchableOpacity 
              style={styles.clearButton}
              onPress={clearChat}
            >
              <Ionicons name="refresh" size={20} color="#007AFF" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.chatContainer}>
          <ScrollView
            ref={scrollViewRef}
            style={styles.messagesContainer}
            contentContainerStyle={{ flexGrow: 1, paddingVertical: 10 }}
            showsVerticalScrollIndicator={false}
          >
            {messages.map((message) => (
              <View
                key={message.id}
                style={[
                  styles.messageContainer,
                  message.sender === "user"
                    ? styles.userMessageContainer
                    : styles.botMessageContainer,
                ]}
              >
                <View
                  style={[
                    styles.messageBubble,
                    message.sender === "user"
                      ? styles.userMessage
                      : styles.botMessage,
                  ]}
                >
                  <Text 
                    style={[
                      styles.messageText,
                      message.sender === "user" 
                        ? styles.userMessageText 
                        : styles.botMessageText
                    ]}
                  >
                    {message.text}
                  </Text>
                  <Text 
                    style={[
                      styles.timestamp,
                      message.sender === "user" 
                        ? styles.userTimestamp 
                        : styles.botTimestamp
                    ]}
                  >
                    {message.timestamp}
                  </Text>
                </View>
              </View>
            ))}
            
            {loading && (
              <View style={styles.loadingContainer}>
                <View style={styles.loadingBubble}>
                  <ActivityIndicator size="small" color="#007AFF" />
                  <Text style={styles.loadingText}>ප්‍රතිචාරය සකස් කරමින්...</Text>
                </View>
              </View>
            )}
          </ScrollView>
        </View>

        {/* Input Area */}
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.textInput}
              value={input}
              onChangeText={setInput}
              placeholder="ඔබගේ පණිවිඩය මෙහි ලියන්න..."
              placeholderTextColor="#999"
              onSubmitEditing={handleSend}
              multiline
              maxLength={1000}
              editable={!loading}
            />
            <TouchableOpacity 
              style={[
                styles.sendButton, 
                (loading || !input.trim()) && styles.disabledButton
              ]} 
              onPress={handleSend}
              disabled={loading || !input.trim()}
            >
              <Ionicons 
                name={loading ? "hourglass" : "send"} 
                size={20} 
                color="#fff" 
              />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    backgroundColor: "#fff",
    paddingTop: Platform.OS === 'ios' ? 50 : 25,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#e1e4e8",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  onlineIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#34C759',
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  clearButton: {
    padding: 8,
  },
  chatContainer: {
    flex: 1,
  },
  messagesContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  messageContainer: {
    marginBottom: 16,
  },
  userMessageContainer: {
    alignItems: 'flex-end',
  },
  botMessageContainer: {
    alignItems: 'flex-start',
  },
  messageBubble: {
    maxWidth: "85%",
    padding: 12,
    borderRadius: 18,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  userMessage: {
    backgroundColor: "#007AFF",
    borderBottomRightRadius: 4,
  },
  botMessage: {
    backgroundColor: "#fff",
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: "#e1e4e8",
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  userMessageText: {
    color: "#fff",
  },
  botMessageText: {
    color: "#1a1a1a",
  },
  timestamp: {
    fontSize: 12,
    marginTop: 4,
    opacity: 0.7,
  },
  userTimestamp: {
    color: "#fff",
    textAlign: 'right',
  },
  botTimestamp: {
    color: "#666",
  },
  loadingContainer: {
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  loadingBubble: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 18,
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: "#e1e4e8",
  },
  loadingText: {
    marginLeft: 10,
    color: "#666",
    fontSize: 14,
  },
  inputContainer: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "#e1e4e8",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "flex-end",
    backgroundColor: "#f8f9fa",
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: "#1a1a1a",
    minHeight: 40,
    maxHeight: 100,
    paddingVertical: 8,
  },
  sendButton: {
    backgroundColor: "#007AFF",
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },
  disabledButton: {
    opacity: 0.5,
  },
});

export default ChatBox;