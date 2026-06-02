import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Animated,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';
import { Message } from '../data/messages';
import { useMessages } from '../context/MessagesContext';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Messages'>;
  route: RouteProp<RootStackParamList, 'Messages'>;
};

const MessageItem = ({
  item,
  index,
  color,
  onPress,
}: {
  item: Message;
  index: number;
  color: string;
  onPress: () => void;
}) => {
  const slideAnim = useRef(new Animated.Value(60)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(slideAnim, {
        toValue: 0,
        delay: index * 80,
        tension: 80,
        friction: 10,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 350,
        delay: index * 80,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}
    >
      <TouchableOpacity
        style={[styles.messageCard, item.unread && styles.messageCardUnread]}
        onPress={onPress}
        activeOpacity={0.8}
      >
        {/* Left color indicator */}
        {item.unread && (
          <View style={[styles.unreadIndicator, { backgroundColor: color }]} />
        )}

        {/* Avatar */}
        <View style={[styles.avatar, { backgroundColor: color + '22' }]}>
          <Text style={styles.avatarEmoji}>{item.avatar}</Text>
        </View>

        {/* Content */}
        <View style={styles.messageContent}>
          <View style={styles.messageHeader}>
            <Text style={[styles.sender, item.unread && styles.senderUnread]}>
              {item.sender}
            </Text>
            <Text style={styles.time}>{item.time}</Text>
          </View>
          <Text
            style={[styles.preview, item.unread && styles.previewUnread]}
            numberOfLines={1}
          >
            {item.preview}
          </Text>
        </View>

        {/* Unread dot */}
        {item.unread && (
          <View style={[styles.unreadDot, { backgroundColor: color }]} />
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};

export default function MessagesScreen({ navigation, route }: Props) {
  const { category: routeCategory } = route.params;
  const { categories } = useMessages();
  const category = categories.find(c => c.id === routeCategory.id) || routeCategory;

  const headerAnim = useRef(new Animated.Value(-40)).current;
  const headerOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(headerAnim, {
        toValue: 0,
        tension: 70,
        friction: 10,
        useNativeDriver: true,
      }),
      Animated.timing(headerOpacity, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const unreadCount = category.messages.filter(m => m.unread).length;

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#1A1A2E" />
      <View style={styles.container}>

        {/* Header */}
        <Animated.View
          style={[
            styles.header,
            { opacity: headerOpacity, transform: [{ translateY: headerAnim }] },
          ]}
        >
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>

          <View style={styles.headerCenter}>
            <View style={[styles.headerIcon, { backgroundColor: category.color }]}>
              <Text style={styles.headerEmoji}>{category.icon}</Text>
            </View>
            <View>
              <Text style={styles.headerTitle}>{category.name}</Text>
              <Text style={styles.headerSubtitle}>
                {unreadCount > 0
                  ? `${unreadCount} unread · ${category.messages.length} total`
                  : `${category.messages.length} messages`}
              </Text>
            </View>
          </View>

          {/* Compose button */}
          <TouchableOpacity
            style={[styles.composeBtn, { backgroundColor: category.color }]}
          >
            <Text style={styles.composeIcon}>✏️</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Message List */}
        <FlatList
          data={category.messages}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <MessageItem
              item={item}
              index={index}
              color={category.color}
              onPress={() =>
                navigation.navigate('MessageDetail', {
                  message: item,
                  categoryColor: category.color,
                  categoryId: category.id,
                })
              }
            />
          )}
          ListEmptyComponent={
            <View style={styles.empty}>
              <Text style={styles.emptyIcon}>📭</Text>
              <Text style={styles.emptyText}>No messages yet</Text>
            </View>
          }
        />
      </View>
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
    paddingVertical: 16,
    gap: 12,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#252545',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backArrow: {
    fontSize: 20,
    color: '#fff',
    fontWeight: '700',
  },
  headerCenter: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerEmoji: { fontSize: 22 },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#fff',
    letterSpacing: -0.3,
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#8888AA',
    marginTop: 1,
  },
  composeBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  composeIcon: { fontSize: 16 },
  divider: {
    height: 1,
    backgroundColor: '#252545',
    marginHorizontal: 16,
    marginBottom: 8,
  },
  list: {
    paddingHorizontal: 16,
    paddingBottom: 30,
  },
  messageCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#252545',
    borderRadius: 18,
    padding: 14,
    marginVertical: 5,
    gap: 12,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  messageCardUnread: {
    backgroundColor: '#2A2A52',
  },
  unreadIndicator: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
    borderRadius: 2,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarEmoji: { fontSize: 24 },
  messageContent: { flex: 1 },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  sender: {
    fontSize: 14,
    fontWeight: '600',
    color: '#AAAACC',
  },
  senderUnread: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  time: {
    fontSize: 11,
    color: '#666688',
  },
  preview: {
    fontSize: 13,
    color: '#666688',
    lineHeight: 18,
  },
  previewUnread: {
    color: '#AAAACC',
  },
  unreadDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginLeft: 4,
  },
  empty: {
    alignItems: 'center',
    marginTop: 80,
  },
  emptyIcon: { fontSize: 48 },
  emptyText: {
    color: '#666688',
    fontSize: 16,
    marginTop: 12,
  },
});
