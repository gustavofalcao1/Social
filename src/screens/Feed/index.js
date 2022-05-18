import React, { useState, useEffect, useRef } from 'react'
import {
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity ,
  RefreshControl
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import firebase from '../../config/firebase'

import styles from './styles'

const Feed = () => {
  const database = firebase.firestore()
  const postsData = database.collection('Posts')
  const [dataPosts, setDataPosts] = useState([])
  const [loaded, setLoaded] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const loadPosts = async ()  => {
    try {
      postsData.onSnapshot((query)=>{
        const posts = []
        query.forEach((doc)=>{
          posts.push({ ...doc.data()})
          /*if (doc.data().done === false ) {
            posts.push({ ...doc.data(), id: doc.id })
          }*/
        })
        setDataPosts(posts)
      })
    } catch (error) {
      error
    }
  }

  const onRefresh = async () => {
    setRefreshing(true)
    setLoaded(false)
    if (dataPosts) {
      loadPosts()
      setRefreshing(false)
    }
    else{
      setRefreshing(false)
    }
  }

  useEffect(()=>{
    if (loaded === false) {
      loadPosts()
      setLoaded(true)
    }
  }, [])

  const renderItem = ({item}) => {
    return (
      <View style={styles.postContent}>
        <View style={styles.postHeader}>
          <View style={styles.postHeaderContent}>
            <View style={styles.postProfile}>
              <Image 
                style={styles.postAuthorProfile} 
                source={{uri:item.authorProfile}}
              />
            </View>
            <View style={styles.postUserInfo}>
              <Text style={styles.postAuthor}>{item.author}</Text>
              <Text style={styles.postPlace}>{item.place}</Text>
            </View>
            </View>
          <View style={styles.postOptions}>
            <TouchableOpacity>
              <Ionicons 
                name='ellipsis-vertical'
                size={20}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <Image style={styles.postPicture} source={{uri:item.pictureUrl}}/>
        </View>
        <View style={styles.postFooter}>
          <View style={styles.postActionsLeft}>
            <TouchableOpacity>
              <Ionicons 
                style={styles.postActionButton} 
                name='heart-outline'
                size={28}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons 
                style={styles.postActionButton} 
                name='chatbubble-outline'
                size={25}
                />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons 
                style={styles.postActionButton} 
                name='paper-plane-outline'
                size={25}
                />
            </TouchableOpacity>
          </View>
          <View style={styles.postActionsRight}>
            <TouchableOpacity>
              <Ionicons 
                style={styles.postActionButton} 
                name='bookmark-outline'
                size={25}
                />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.postLikesCount}>
          <Text style={styles.postLikes}>{item.likesCount} likes</Text>
        </View>
        <View style={styles.postInfor}>
          <Text style={styles.postAuthorDescription}>
            <Text style={{fontWeight: 'bold', right: 1}}>{item.author}</Text>
            <Text> {item.description}</Text>
          </Text>
        </View>
        <View style={styles.postCommentsDetails}>
          <Text 
          ellipsizeMode='clip' 
          numberOfLines={1} 
          style={styles.postComments}
          >{item.comment}</Text>
          <TouchableOpacity hitSlop={{top: 50, bottom: 50, left: 50, right: 50}}>
            <Text style={styles.postSeeMoreComments}>... more</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.postTranslate}>
          <Text style={styles.postTime}>{item.postTime} hours ago • </Text>
          <TouchableOpacity>
            <Text style={styles.postTranslateText}>See translate</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={dataPosts}
        keyExtractor={(item)=> {item.id}}
        renderItem={renderItem}
        refreshControl={<RefreshControl
          refreshing={refreshing} 
          onRefresh={onRefresh} 
        />}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  )
}

export default Feed
