import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const MessengerBtn = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.headerRight}>
      <TouchableOpacity
        style={styles.headerRightButton}
        onPress={() => navigation.navigate('Messenger')}
      >
        <Ionicons name='heart-outline' size={25} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.headerRightButton}
        onPress={() => navigation.navigate('Messenger')}
      >
        <Ionicons name='paper-plane-outline' size={25} />
      </TouchableOpacity>
    </View>
  )
};

const styles = StyleSheet.create({
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    right: 10,
  },
  headerRightButton: {
    paddingHorizontal: 5,
  }
})

export default MessengerBtn;
