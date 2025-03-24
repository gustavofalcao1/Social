import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  StyleSheet,
  Platform
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import { db } from '../../config/firebase';
import {
  collection,
  onSnapshot,
  addDoc,
  serverTimestamp
} from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';

const AddPost = () => {
  const postsData = collection(db, 'Posts');
  const [docID, setDocID] = useState([]);

  const [author, setAuthor] = useState('');
  const [authorProfile, setAuthorProfile] = useState('');
  const [place, setPlace] = useState('');
  const [pictureUrl, setPictureUrl] = useState('');
  const [description, setDescription] = useState('');
  const [comment, setComment] = useState('');
  const [type, setType] = useState('feed');

  const navigation = useNavigation();

  const getDocID = () => {
    onSnapshot(postsData, (query) => {
      const posts = [];
      query.forEach((doc) => {
        posts.push(doc.id);
      });
      setDocID(posts);
    });
  };

  const addPost = async () => {
    if (!author || !authorProfile || !place || !pictureUrl || !description || !type) {
      Alert.alert('Erro', 'Preencha todos os campos obrigatórios.');
      return;
    }

    const payload = {
      author,
      authorProfile,
      place,
      pictureUrl,
      likesCount: 0,
      postTime: serverTimestamp(),
      description,
      comment,
      type: type.trim().toLowerCase(),
    };

    try {
      await addDoc(postsData, payload);
      Alert.alert('Sucesso', 'Post adicionado com sucesso!', [
        {
          text: 'OK',
          onPress: () => {
            navigation.navigate('Feed');
          },
        },
      ]);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível adicionar o post.');
    }
  };

  useEffect(() => {
    getDocID();
  }, []);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <TextInput
        placeholder="Autor"
        style={styles.input}
        value={author}
        onChangeText={setAuthor}
      />
      <TextInput
        placeholder="URL da foto do perfil"
        style={styles.input}
        value={authorProfile}
        onChangeText={setAuthorProfile}
      />
      <TextInput
        placeholder="Localização"
        style={styles.input}
        value={place}
        onChangeText={setPlace}
      />
      <TextInput
        placeholder="URL da imagem do post"
        style={styles.input}
        value={pictureUrl}
        onChangeText={setPictureUrl}
      />
      <TextInput
        placeholder="Descrição"
        style={styles.input}
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        placeholder="Comentário"
        style={styles.input}
        value={comment}
        onChangeText={setComment}
      />

      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Tipo do Post</Text>
        <Picker
          selectedValue={type}
          onValueChange={(itemValue) => setType(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Feed" value="feed" />
          <Picker.Item label="Infinite" value="infinite" />
          <Picker.Item label="Topics" value="topics" />
        </Picker>
      </View>

      <TouchableOpacity style={styles.button} onPress={addPost}>
        <Ionicons name="add-outline" size={25} color="#fff" />
        <Text style={styles.buttonText}>Adicionar Post</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 20,
    alignItems: 'stretch',
    justifyContent: 'flex-start'
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 12,
    paddingHorizontal: 10,
  },
  pickerContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    marginBottom: 4,
    fontWeight: 'bold',
  },
  picker: {
    height: 50,
    backgroundColor: '#f4f4f4',
    borderRadius: 5,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    backgroundColor: '#00CC10',
    borderRadius: 5,
    marginTop: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 8,
  },
});

export default AddPost;
