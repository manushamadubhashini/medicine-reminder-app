import { View, Text,Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { router, useRouter } from 'expo-router'

const EmptyState = () => {
    const router = useRouter()
  return (
    <View className='flex items-center mt-20'>
        <Image source={require("./../assets/images/medicine.png")} style={{width:120, height:120}}/>
        <Text className='text-[30px] mt-7 font-bold text-center'>No Medications!</Text>
        <Text className='text-[16px] text-gray-400 text-center mt-5'>You have 0 Medications setup, Kindly setup a new one</Text>
        <TouchableOpacity className='w-full p-3 text-center text-white bg-blue-500 rounded-lg shadow-lg text-1xl mt-7' onPress={()=> router.push("/(tabs)/add-new-medications")}>+ Add new Medications</TouchableOpacity>
    </View>
  )
}

export default EmptyState