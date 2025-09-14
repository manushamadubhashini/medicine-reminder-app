import { View, Text } from 'react-native'
import React from 'react'
import Header from '@/components/header'
import EmptyState from '@/components/empty-state'
import MedicationList from '@/components/medication-list'

const HomeScreen = () => {
  return (
    <View className='flex-1 w-full h-full p-5'>
        <Header/>
        {/* <EmptyState/> */}
        <MedicationList/>
    </View>
  )
}

export default HomeScreen