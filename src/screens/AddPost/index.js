import React, {useState, useEffect} from 'react'
import {
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity 
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import firebase from '../../config/firebase'

import styles from './styles'

const AddPost = ({ navigation, route }) => {
  const database = firebase.firestore()
  const postsData = database.collection('Posts')
  const [docID, setDocID] = useState(docID)

  const getDocID = () => {
    postsData.onSnapshot((query)=>{
      const posts = []
      query.forEach((doc)=>{
        posts.push(doc.id)
      })
      setDocID(posts)
    })
  }
  const addPost = async () => {
    //if (description == null) {
    //  Alert.alert("Please, typing any Task")
    //} else {
      try {
        const id = '5'
        if (docID.indexOf(id) > -1) {
          console.log('Doc ID exists')
        } else {
        await postsData.doc(id).set({
          author: 'atelie.amorempano',
          authorProfile: 'https://cdnb.artstation.com/p/assets/images/images/027/259/479/large/gustavo-novaes-nbatelielogo.jpg',
          place: 'Atelie Amor em Pano Store',
          pictureUrl: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/white-kitchen-1-1537194316.jpg',
          likesCount: 0,
          postTime: 0,
          description: 'Awasome kitchen',
          comment: 'My dream'
        })
        }
      } catch (error) {
        error
      }
        await navigation.navigate('FeedPage')
    //}
  }

  useEffect(()=>{
    getDocID()
  }, [])

  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Ionicons 
          //style={styles.postActionButton} 
          name='add-outline'
          size={25}
          onPress={()=>{
            addPost()
          }}
          />
      </TouchableOpacity>
    </View>
  )
}

export default AddPost
