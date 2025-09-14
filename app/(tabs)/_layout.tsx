import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import "./../../global.css"

const HomeLayout = () => {
  return (
   <Tabs screenOptions={{headerShown:false}}>
    <Tabs.Screen name='index' options={{tabBarLabel:"Home",tabBarIcon : ({color,size})=> (<FontAwesome name="home" size={size} color={color} />)}}/>
    <Tabs.Screen name='add-new' options={{tabBarLabel : "AddNew",tabBarIcon:({color,size}) =>(<FontAwesome name="plus-circle" size={size} color={color} />)}}/>
    <Tabs.Screen name='profile' options ={{tabBarLabel:"Profile",tabBarIcon:({color,size})=>(<FontAwesome name="user" size={size} color={color} />)}}/>
   </Tabs>
  )
}

export default HomeLayout