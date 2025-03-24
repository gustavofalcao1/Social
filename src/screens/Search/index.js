import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  FlatList,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../../config/firebase';

const PRIMARY_COLOR = '#00CC10';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    const postsRef = collection(db, 'Posts');
    const unsubscribe = onSnapshot(postsRef, (snapshot) => {
      const allPosts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setResults(allPosts);
    });
    return () => unsubscribe();
  }, []);

  const filteredResults = results.filter(post =>
    post.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.place.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.header}>
        <Image source={{ uri: item.authorProfile }} style={styles.avatar} />
        <View style={styles.userInfo}>
          <Text style={styles.author}>{item.author}</Text>
          <Text style={styles.place}>{item.place}</Text>
        </View>
      </View>
      <Image source={{ uri: item.pictureUrl }} style={styles.postImage} />
      <View style={styles.footer}>
        <Text style={styles.likes}>{item.likesCount} likes</Text>
        <Text style={styles.description}><Text style={styles.bold}>{item.author}</Text> {item.description}</Text>
        <Text style={styles.comment}>{item.comment}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Buscar por autor, local ou descrição"
        value={searchTerm}
        onChangeText={setSearchTerm}
        placeholderTextColor="#888"
      />
      <FlatList
        data={filteredResults}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
    fontSize: 16,
  },
  card: {
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  userInfo: {
    marginLeft: 10,
  },
  author: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  place: {
    fontSize: 12,
    color: '#666',
  },
  postImage: {
    width: '100%',
    height: 200,
  },
  footer: {
    padding: 10,
  },
  likes: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  description: {
    marginBottom: 4,
  },
  bold: {
    fontWeight: 'bold',
  },
  comment: {
    color: '#444',
    fontStyle: 'italic',
    marginBottom: 6,
  }
});

export default Search;
