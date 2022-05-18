import React from 'react'
import {
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity 
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import styles from './styles'

const Infinite = () => {
  const postData = [
    {
      id: '1',
      author: 'gustavofalcao1',
      authorProfile: 'https://t3.ftcdn.net/jpg/03/91/19/22/360_F_391192211_2w5pQpFV1aozYQhcIw3FqA35vuTxJKrB.jpg',
      place: 'Porto Cinema',
      pictureUrl: 'https://assets.papelpop.com/wp-content/uploads/2019/08/Captura-de-Tela-2019-08-15-a%CC%80s-09.42.37.png',
      likesCount: '300',
      postTime: '5',
      description: 'I want see this filmasdasdasdasd ahsgdkahsasd',
      comment: 'I am too'
    },
    {
      id: '2',
      author: 'agathasantos50',
      authorProfile: 'https://t3.ftcdn.net/jpg/03/91/19/22/360_F_391192211_2w5pQpFV1aozYQhcIw3FqA35vuTxJKrB.jpg',
      place: 'Agatha House',
      pictureUrl: 'https://observatoriodocinema.uol.com.br/wp-content/uploads/2020/05/riverdale-season-3-poster-1280x720-1.jpg',
      likesCount: '20',
      postTime: '1',
      description: 'The best serie of Netflix',
      comment: 'It is true'
    },
    {
      id: '3',
      author: 'atelie.amorempano',
      authorProfile: 'https://t3.ftcdn.net/jpg/03/91/19/22/360_F_391192211_2w5pQpFV1aozYQhcIw3FqA35vuTxJKrB.jpg',
      place: 'Atelie Amor em Pano Store',
      pictureUrl: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/white-kitchen-1-1537194316.jpg',
      likesCount: '10',
      postTime: '10',
      description: 'Awasome kitchen',
      comment: 'My dream'
    }
  ]
  const renderItem = ({item}) => {
    return (
      <View>
        <Text>Infinite</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={postData}
        keyExtractor={(item)=> {item.id}}
        renderItem={renderItem}
      />
    </View>
  )
}

export default Infinite
