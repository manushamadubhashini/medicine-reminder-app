    import { View, Text, FlatList } from 'react-native'
    import React, { use, useEffect, useState } from "react";
    import { GetDateRangeToDisplay } from '@/Service/convert-date-time';
import { Image } from 'react-native';
    
    const MedicationList = () => {
        const[medList,setMedList] = useState<any>()
        const [dateRange,setDateRange] = useState();
    

        useEffect(()=>{
            GetDateRangeList();
        },[])
        const GetDateRangeList=() =>{
            const dateRange =  GetDateRangeToDisplay
           setDateRange(dateRange)
        }
      return (
        <View className='flex-1 mt-8'>
          <Image source={require("./../assets/images/medication.jpeg")} style={{width:"100%", height:200, borderRadius:15}}/>
          <FlatList
          data={dateRange}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({item,index}) =>(
            <View className='items-center justify-center flex-1 h-24 p-4 mt-5 mr-3 bg-gray-300 rounded-xl'>
                <Text className='text-[20px]'>{item.day}</Text>
                <Text className='text-[26px] font-bold'>{item.date}</Text>
            </View>
            
          )}
          />
        </View>
      )
    }
    
    export default MedicationList