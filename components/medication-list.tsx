    import { View, Text } from 'react-native'
    import React, { use, useState } from "react";
import { Image } from 'react-native';
    
    const MedicationList = () => {
        const[medList,setMedList] = useState<any>()
      return (
        <View className='flex-1'>
          <Image source={require("./../assets/images/medication.jpeg")} style={{width:"100%", height:300}}/>
        </View>
      )
    }
    
    export default MedicationList