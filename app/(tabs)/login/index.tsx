import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Link, NavigationProp, useNavigation} from '@react-navigation/native'
import { useFonts } from 'expo-font';
import { useRouter } from 'expo-router';
const LoginScreen = () => {
  const router = useRouter();
  return (
    <View className='items-center justify-center flex-1 w-full h-full'>
      <View>
     <Text className='text-3xl text-center '>
  Welcome to
</Text>
      <Text className='text-3xl text-center ' ><Text className='text-yellow-500'>Medico </Text>reminder app</Text>
      <Text className='mt-5 text-base text-center '>Get Start with our easy-to use medicine reminder app.</Text>
       <Text className='mb-10 text-base text-center'>start by adding all your medicine to the app.</Text>
     </View>
     <View className='flex items-center justify-center'>
      <Image source={require('./../../../assets/images/medi-track.png')}  resizeMode="cover"   style={{ width: 300, height: 300, backgroundColor:"#AFDBF5" , borderRadius:200 , overflow: 'hidden'}}/>
     </View>
     <View className='flex items-center justify-center mt-10'>
      {/* <TouchableOpacity className='flex items-center justify-center h-12 bg-indigo-600 rounded-full shadow-lg w-80 '>
        <Text className='font-bold text-white '>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity className='flex items-center justify-center h-12 mt-5 bg-white border-2 border-indigo-600 rounded-full shadow-lg w-80'>
        <Text className='font-bold text-indigo-600'>Registration</Text>
      </TouchableOpacity> */}
        <TouchableOpacity className='flex items-center justify-center bg-yellow-500 rounded-full shadow-lg h-14 w-10mt-8 w-60 ' onPress={()=> router.push("/signIn")}>
        <Text className='text-white '>Get Started</Text>
      </TouchableOpacity>
      <Text className='mt-14'>Already have an account?<Link className='text-yellow-500'>Sing In</Link></Text>
     </View>
    </View>
  )
}

export default LoginScreen