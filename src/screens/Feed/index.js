import React, { useState, useEffect, useRef } from 'react'
import {
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity ,
  RefreshControl,
  StyleSheet
} from 'react-native';
import {
  collection,
  onSnapshot
} from 'firebase/firestore';
import { Ionicons } from '@expo/vector-icons'
import { db } from '../../config/firebase';

const Feed = () => {
  const postsData = collection(db, 'Posts');
  const [dataPosts, setDataPosts] = useState([])
  const [loaded, setLoaded] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const loadPosts = async () => {
    try {
      onSnapshot(postsData, (querySnapshot) => {
        const posts = [];
        querySnapshot.forEach((doc) => {
          const post = { id: doc.id, ...doc.data() };
          if (post.type === 'feed') {
            posts.push(post);
          }
        });
        setDataPosts(posts);
      });
    } catch (error) {
      console.error('Erro ao carregar posts:', error);
    }
  };  

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
        <View style={styles.postInfo}>
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
        <Text style={styles.postTime}>{item.postTime?.toDate?.().toLocaleString?.() || 'Data desconhecida'} •</Text>
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
        keyExtractor={(item)=> item.id}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 1,
    marginBottom: 0.5,
    backgroundColor: '#fff'
  },
  postContent: {
    marginBottom: 20,
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    paddingVertical: 5,
    alignItems: 'center',
  },
  postHeaderContent: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  postProfile: {},
  postAuthorProfile: {
    borderRadius: 20,
    width: 40,
    height: 40,
    borderWidth: 3,
    borderColor: '#00CC10'
  },
  postUserInfo: {
    paddingHorizontal: 5,
  },
  postAuthor: {
    fontSize: 14,
    color: '#000000',
    fontWeight: 'bold',
  },
  postPlace: {
    paddingHorizontal: 2,
    fontSize: 12,
    color: '#666',
  },
  postOptions: {},
  postPicture: {
    width: '100%',
    height: 400,
  },
  postFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
    alignItems: 'center',
  },
  postActionsLeft: {
    flexDirection: 'row',
  },
  postActionButton: {
    paddingHorizontal: 5,
  },
  postActionsRight: {
    flexDirection: 'row',
  },
  postLikesCount: {
    paddingHorizontal: 5
  },
  postLikes:{
    fontWeight: 'bold',
    fontSize: 12,
  },
  postInfo: {
    flexDirection: 'row',
    paddingHorizontal: 5
  },
  postAuthorDescription: {
    color: '#000',
  },
  postCommentsDetails: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 2,
    fontSize: 12,
  },
  postComments: {maxWidth: '75%',},
  postSeeMoreComments: {
    color:'#666',
  },
  postTranslate: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
  postTime:{
    fontSize: 11,
    color:'#666',
  },
  postTranslateText: {
    fontSize: 11,
  }
})

export default Feed
