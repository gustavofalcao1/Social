import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { Image, TouchableOpacity, View } from 'react-native'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack' 
import { Ionicons } from '@expo/vector-icons'

import styles from './src/styles/global'

import Feed from './src/screens/Feed'
import Search from './src/screens/Search'
import AddPost from './src/screens/AddPost'
import Infinite from './src/screens/Infinite'
import Profile from './src/screens/Profile'
import Messenger from './src/screens/Messenger'

import logo from './assets/img/logo.png'

import MessengerBtn from './src/componentes/MessagerBTN'

const Theme = {
  ...DefaultTheme,
};

export default function App() {
  const Tab = createBottomTabNavigator();

  const FeedPage = () => {
    return <Feed />
  }
  const SearchPage = () => {
    return <Search />
  }
  const AddPostPage = () => {
    return <AddPost />
  }
  const InfinitePage = () => {
    return <Infinite />
  }
  const ProfilePage = () => {
    return <Profile />
  }
  const MessengerPage = () => {
    return <Messenger />
  }

  return (
    <NavigationContainer theme={Theme}>
      <StatusBar style="auto" />
      <Tab.Navigator
        initialRouteName="Feed"
        screenOptions={({ navigation, route }) => ({
          tabBarShowLabel: false,
          headerTitle: () => (
            <Image style={styles.headLogoTittle} source={logo} />
          ),
          headerRight: () => (
            <View style={styles.headerRight}>
              <MessengerBtn />
            </View>
          ),
          tabBarIcon: ({ focused, color }) => {
            let iconName
            let iconSize

            if (route.name === 'Feed') {
              iconName = focused
                ? 'home'
                : 'home-outline'
              iconSize = focused
                ? 30
                : 25
            } else if (route.name === 'Search') {
              iconName = focused 
                ? 'search' 
                : 'search-outline'
              iconSize = focused
                ? 30
                : 25
            } else if (route.name === 'AddPost') {
              iconName = focused 
                ? 'add' 
                : 'add-outline'
              iconSize = focused
                ? 45
                : 40
            } else if (route.name === 'Infinite') {
              iconName = focused 
                ? 'infinite' 
                : 'infinite-outline'
              iconSize = focused
                ? 30
                : 25
            } else if (route.name === 'Profile') {
              iconName = focused 
                ? 'ellipsis-horizontal' 
                : 'ellipsis-horizontal-outline'
              iconSize = focused
                ? 30
                : 25
            }
            return <Ionicons name={iconName} size={iconSize} color={color} />;
          },
          tabBarActiveTintColor: '#00CC10',
          tabBarInactiveTintColor: '#666',
        })}
      >
        <Tab.Screen name="Feed" component={FeedPage} />
        <Tab.Screen name="Search" component={SearchPage} />
        <Tab.Screen name="AddPost" component={AddPostPage} />
        <Tab.Screen name="Infinite" component={InfinitePage} />
        <Tab.Screen name="Profile" component={ProfilePage} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}
