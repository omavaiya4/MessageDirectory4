import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Animated,
  StatusBar,
  SafeAreaView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useMessages } from '../context/MessagesContext';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'MessageDetail'>;
  route: RouteProp<RootStackParamList, 'MessageDetail'>;
};

export default function MessageDetailScreen({ navigation, route }: Props) {
  const { message, categoryColor, categoryId } = route.params;
  const { addMessage, markAsRead, categories } = useMessages();
  const [replyText, setReplyText] = useState('');
  const [sent, setSent] = useState(false);
  const [sentMessages, setSentMessages] = useState<string[]>([]);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    // Mark message as read when opened
    markAsRead(categoryId, message.id);

    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 400, useNativeDriver: true }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 80,
        friction: 10,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleSend = () => {
    if (replyText.trim()) {
      const textToSend = replyText.trim();

      // Add to local UI for immediate feedback
      setSentMessages([...sentMessages, textToSend]);
      setSent(true);
      setReplyText('');

      // Persist to global state
      addMessage(categoryId, {
        sender: 'Me',
        preview: textToSend,
        body: textToSend,
        time: 'Just now',
        unread: false,
        avatar: '👤',
      });

      setTimeout(() => setSent(false), 2000);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#1A1A2E" />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.container}>

          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
              <Text style={styles.backArrow}>←</Text>
            </TouchableOpacity>
            <View style={[styles.avatar, { backgroundColor: categoryColor + '33' }]}>
              <Text style={styles.avatarEmoji}>{message.avatar}</Text>
            </View>
            <View style={styles.headerInfo}>
              <Text style={styles.headerName}>{message.sender}</Text>
              <View style={styles.onlineRow}>
                <View style={[styles.onlineDot, { backgroundColor: categoryColor }]} />
                <Text style={styles.onlineText}>Active now</Text>
              </View>
            </View>
            <TouchableOpacity style={[styles.callBtn, { backgroundColor: categoryColor + '22' }]}>
              <Text style={{ fontSize: 18 }}>📞</Text>
            </TouchableOpacity>
          </View>

          {/* Message bubble area */}
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <Animated.View
              style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}
            >
              {/* Date chip */}
              <View style={styles.dateChip}>
                <Text style={styles.dateText}>Today · {message.time}</Text>
              </View>

              {/* Received bubble */}
              <View style={styles.bubbleRow}>
                <View style={[styles.smallAvatar, { backgroundColor: categoryColor + '33' }]}>
                  <Text style={styles.smallAvatarText}>{message.avatar}</Text>
                </View>
                <View style={[styles.bubble, styles.receivedBubble]}>
                  <Text style={styles.bubbleText}>{message.body}</Text>
                  <View style={styles.bubbleMeta}>
                    <Text style={styles.bubbleTime}>{message.time}</Text>
                    <Text style={styles.readReceipt}>✓✓</Text>
                  </View>
                </View>
              </View>

              {/* Sent response placeholder */}
              <View style={styles.sentRow}>
                <View style={[styles.bubble, styles.sentBubble, { backgroundColor: categoryColor }]}>
                  <Text style={[styles.bubbleText, { color: '#fff' }]}>
                    Got it, thanks! 👍
                  </Text>
                  <View style={styles.bubbleMeta}>
                    <Text style={[styles.bubbleTime, { color: 'rgba(255,255,255,0.7)' }]}>
                      {message.time}
                    </Text>
                    <Text style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12 }}>✓✓</Text>
                  </View>
                </View>
              </View>

              {/* Real sent messages */}
              {sentMessages.map((msg, index) => (
                <View key={index} style={styles.sentRow}>
                  <View style={[styles.bubble, styles.sentBubble, { backgroundColor: categoryColor }]}>
                    <Text style={[styles.bubbleText, { color: '#fff' }]}>{msg}</Text>
                    <View style={styles.bubbleMeta}>
                      <Text style={[styles.bubbleTime, { color: 'rgba(255,255,255,0.7)' }]}>
                        Just now
                      </Text>
                      <Text style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12 }}>✓✓</Text>
                    </View>
                  </View>
                </View>
              ))}

              {/* Sent confirmation toast (optional, keeping it for the "sent" state) */}
              {sent && (
                <View style={styles.dateChip}>
                  <Text style={styles.dateText}>Message Sent</Text>
                </View>
              )}
            </Animated.View>
          </ScrollView>

          {/* Reply input */}
          <View style={styles.inputRow}>
            <TouchableOpacity style={styles.attachBtn}>
              <Text style={{ fontSize: 20 }}>📎</Text>
            </TouchableOpacity>
            <TextInput
              style={styles.input}
              placeholder="Type a message..."
              placeholderTextColor="#666688"
              value={replyText}
              onChangeText={setReplyText}
              multiline
            />
            <TouchableOpacity
              style={[
                styles.sendBtn,
                { backgroundColor: replyText.trim() ? categoryColor : '#333355' },
              ]}
              onPress={handleSend}
              disabled={!replyText.trim()}
            >
              <Text style={styles.sendIcon}>➤</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#1A1A2E' },
  container: { flex: 1, backgroundColor: '#1A1A2E' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#252545',
  },
  backBtn: {
    width: 38,
    height: 38,
    borderRadius: 11,
    backgroundColor: '#252545',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backArrow: { fontSize: 20, color: '#fff', fontWeight: '700' },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarEmoji: { fontSize: 22 },
  headerInfo: { flex: 1 },
  headerName: { fontSize: 16, fontWeight: '700', color: '#fff' },
  onlineRow: { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 2 },
  onlineDot: { width: 7, height: 7, borderRadius: 4 },
  onlineText: { fontSize: 11, color: '#8888AA' },
  callBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: { flex: 1 },
  scrollContent: { padding: 16, paddingBottom: 24 },
  dateChip: {
    alignSelf: 'center',
    backgroundColor: '#252545',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 5,
    marginBottom: 20,
  },
  dateText: { fontSize: 11, color: '#8888AA', letterSpacing: 0.3 },
  bubbleRow: { flexDirection: 'row', alignItems: 'flex-end', gap: 10, marginBottom: 16 },
  sentRow: { flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 12 },
  smallAvatar: {
    width: 32,
    height: 32,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  smallAvatarText: { fontSize: 16 },
  bubble: {
    maxWidth: '78%',
    borderRadius: 18,
    padding: 14,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },
  receivedBubble: {
    backgroundColor: '#252545',
    borderBottomLeftRadius: 4,
  },
  sentBubble: {
    borderBottomRightRadius: 4,
  },
  bubbleText: {
    fontSize: 14,
    color: '#DDDDEE',
    lineHeight: 20,
  },
  bubbleMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 4,
    marginTop: 6,
  },
  bubbleTime: { fontSize: 10, color: '#8888AA' },
  readReceipt: { fontSize: 12, color: '#8888AA' },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 12,
    paddingVertical: 12,
    paddingBottom: 16,
    gap: 10,
    borderTopWidth: 1,
    borderTopColor: '#252545',
    backgroundColor: '#1A1A2E',
  },
  attachBtn: {
    width: 42,
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: '#252545',
    borderRadius: 22,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 14,
    color: '#fff',
    maxHeight: 100,
    lineHeight: 20,
  },
  sendBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendIcon: { fontSize: 16, color: '#fff', marginLeft: 2 },
});
