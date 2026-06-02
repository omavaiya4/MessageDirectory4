import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Animated,
  StatusBar,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { Category } from '../data/messages';
import { useMessages } from '../context/MessagesContext';

const { width } = Dimensions.get('window');
const CARD_SIZE = (width - 60) / 2;

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

const CategoryCard = ({
  item,
  index,
  onPress,
}: {
  item: Category;
  index: number;
  onPress: () => void;
}) => {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        delay: index * 100,
        tension: 80,
        friction: 8,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        delay: index * 100,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const unreadCount = item.messages.filter(m => m.unread).length;

  return (
    <Animated.View
      style={[
        styles.cardWrapper,
        { opacity: fadeAnim, transform: [{ scale: scaleAnim }] },
      ]}
    >
      <TouchableOpacity
        style={[styles.card, { backgroundColor: item.color }]}
        onPress={onPress}
        activeOpacity={0.85}
      >
        {/* Decorative circle */}
        <View style={[styles.decorCircle, { backgroundColor: 'rgba(255,255,255,0.15)' }]} />
        <View style={[styles.decorCircle2, { backgroundColor: 'rgba(255,255,255,0.08)' }]} />

        {/* Icon */}
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>{item.icon}</Text>
        </View>

        {/* Unread badge */}
        {unreadCount > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{unreadCount}</Text>
          </View>
        )}

        {/* Category name */}
        <Text style={styles.cardName}>{item.name}</Text>
        <Text style={styles.cardSubtitle}>{item.messages.length} messages</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default function HomeScreen({ navigation }: Props) {
  const { categories } = useMessages();
  const headerAnim = useRef(new Animated.Value(-50)).current;
  const headerOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(headerAnim, {
        toValue: 0,
        tension: 60,
        friction: 10,
        useNativeDriver: true,
      }),
      Animated.timing(headerOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const totalUnread = categories.reduce(
    (acc, cat) => acc + cat.messages.filter(m => m.unread).length,
    0
  );

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
          <View>
            <Text style={styles.greeting}>Good day! 👋</Text>
            <Text style={styles.title}>My Messages</Text>
          </View>
          <View style={styles.headerBadge}>
            <Text style={styles.headerBadgeText}>{totalUnread}</Text>
            <Text style={styles.headerBadgeLabel}>unread</Text>
          </View>
        </Animated.View>

        {/* Subtitle */}
        <Animated.Text style={[styles.subtitle, { opacity: headerOpacity }]}>
          Select a directory to view messages
        </Animated.Text>

        {/* Grid */}
        <FlatList
          data={categories}
          keyExtractor={item => item.id}
          numColumns={2}
          contentContainerStyle={styles.grid}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <CategoryCard
              item={item}
              index={index}
              onPress={() => navigation.navigate('Messages', { category: item })}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#1A1A2E',
  },
  container: {
    flex: 1,
    backgroundColor: '#1A1A2E',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 8,
  },
  greeting: {
    fontSize: 14,
    color: '#8888AA',
    fontFamily: 'System',
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -0.5,
  },
  headerBadge: {
    backgroundColor: '#FF6B6B',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignItems: 'center',
  },
  headerBadgeText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 20,
    lineHeight: 22,
  },
  headerBadgeLabel: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 10,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 13,
    color: '#6666AA',
    paddingHorizontal: 24,
    marginBottom: 12,
    letterSpacing: 0.3,
  },
  grid: {
    paddingHorizontal: 16,
    paddingBottom: 30,
  },
  cardWrapper: {
    flex: 1,
    margin: 8,
  },
  card: {
    height: CARD_SIZE,
    borderRadius: 24,
    padding: 20,
    justifyContent: 'flex-end',
    overflow: 'hidden',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  decorCircle: {
    position: 'absolute',
    width: CARD_SIZE * 0.9,
    height: CARD_SIZE * 0.9,
    borderRadius: CARD_SIZE * 0.45,
    top: -CARD_SIZE * 0.3,
    right: -CARD_SIZE * 0.3,
  },
  decorCircle2: {
    position: 'absolute',
    width: CARD_SIZE * 0.6,
    height: CARD_SIZE * 0.6,
    borderRadius: CARD_SIZE * 0.3,
    bottom: -CARD_SIZE * 0.15,
    left: -CARD_SIZE * 0.1,
  },
  iconContainer: {
    position: 'absolute',
    top: 18,
    left: 20,
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.25)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: 26,
  },
  badge: {
    position: 'absolute',
    top: 14,
    right: 14,
    backgroundColor: '#fff',
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  badgeText: {
    color: '#1A1A2E',
    fontWeight: '800',
    fontSize: 12,
  },
  cardName: {
    fontSize: 18,
    fontWeight: '800',
    color: '#fff',
    letterSpacing: 0.2,
  },
  cardSubtitle: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 2,
    letterSpacing: 0.3,
  },
});
