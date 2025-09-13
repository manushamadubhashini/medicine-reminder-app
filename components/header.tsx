import { View, Text, Image } from 'react-native'
import React from 'react'

const Header = () => {
  return (
    <View className='w-full mt-10'>
      
      <View className='flex-row gap-4 item-center'>
        <Image source={require("./../assets/images/smiley.png")} style={{width:30, height:30}}/>
      <Text className='text-[25px] font-bold'>Hello Manusha 👋</Text>
      </View>
    </View>
  )
}

export default Header