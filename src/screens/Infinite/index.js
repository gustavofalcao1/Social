import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  Dimensions,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
  Platform
} from 'react-native';
import { collection, getDocs, query, orderBy, limit, startAfter } from 'firebase/firestore';
import { db } from '../../config/firebase';

const { height: windowHeight, width } = Dimensions.get('window');
const TAB_BAR_HEIGHT = 50;
const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 44 : 24;
const EXTRA_PADDING = 16;
const availableHeight = windowHeight - TAB_BAR_HEIGHT - STATUS_BAR_HEIGHT - EXTRA_PADDING;

const Infinite = () => {
  const [reels, setReels] = useState([]);
  const [loadingMore, setLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [lastVisible, setLastVisible] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    loadInitialPosts();
  }, []);

  const loadInitialPosts = async () => {
    try {
      const q = query(
        collection(db, 'Posts'),
        orderBy('postTime', 'desc'),
        limit(5)
      );
      const snapshot = await getDocs(q);
      const fetched = snapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter(doc => doc.type === 'infinite');
      setReels(fetched);
      setLastVisible(snapshot.docs[snapshot.docs.length - 1]);
      setHasMore(snapshot.docs.length === 5);
    } catch (error) {
      console.error('Error loading initial posts:', error);
    }
  };

  const loadMorePosts = async () => {
    if (!lastVisible || loadingMore || !hasMore) return;
    setLoadingMore(true);
    try {
      const q = query(
        collection(db, 'Posts'),
        orderBy('postTime', 'desc'),
        startAfter(lastVisible),
        limit(5)
      );
      const snapshot = await getDocs(q);
      const more = snapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter(doc => doc.type === 'infinite');
      if (more.length > 0) {
        setReels(prev => [...prev, ...more]);
        setLastVisible(snapshot.docs[snapshot.docs.length - 1]);
        setHasMore(snapshot.docs.length === 5);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error loading more posts:', error);
    }
    setLoadingMore(false);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadInitialPosts();
    setRefreshing(false);
  };

  const renderItem = ({ item }) => (
    <View style={styles.reelContainer}>
      <Image source={{ uri: item.pictureUrl }} style={styles.image} />
      <View style={styles.overlay}>
        <Text style={styles.author}>@{item.author}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={reels}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        onEndReached={loadMorePosts}
        onEndReachedThreshold={0.5}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        ListFooterComponent={loadingMore ? <ActivityIndicator color="#00CC10" style={{ margin: 20 }} /> : null}
        snapToAlignment="start"
        decelerationRate="fast"
        snapToInterval={availableHeight}
        getItemLayout={(data, index) => (
          { length: availableHeight, offset: availableHeight * index, index }
        )}
        ListEmptyComponent={<Text style={{ color: '#fff', textAlign: 'center', marginTop: 20 }}>No posts found.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  reelContainer: {
    height: availableHeight,
    width: width,
    justifyContent: 'flex-end',
    position: 'relative',
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },
  overlay: {
    padding: 16,
    paddingBottom: TAB_BAR_HEIGHT + EXTRA_PADDING,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  author: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    color: '#fff',
    fontSize: 14,
    marginTop: 6,
  },
});

export default Infinite;