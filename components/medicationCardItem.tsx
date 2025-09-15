import { View, Text, Image } from "react-native";
import React from "react";
import Ionicons from '@expo/vector-icons/Ionicons';

const MedicationCardItem = ({ medicine }) => {
  return (
    <View className="flex-row items-center justify-between p-2 mt-3 border-2 border-gray-200 rounded-xl ">
      <View className="flex-row items-center">
        <View>
          <View className="p-2 mr-3 bg-white rounded-xl">
            <Image
              source={{ uri: medicine?.type?.icon }}
              style={{ width: 60, height: 60 }}
            ></Image>
          </View>
        </View>
        <View>
          <Text className="text-[21px] font-bold">{medicine?.name}</Text>
          <Text className="text-[16px]">{medicine?.option}</Text>
          <Text className="font-bold text-white">{medicine?.does}</Text>
        </View>
      </View>
       <View className="items-center p-3 bg-white rounded-xl">
            <Ionicons name="timer-outline" size={24} color="black" />
            <Text className="font-bold text-[18px]">{medicine?.reminder}</Text>
        </View>
    </View>
  );
};

export default MedicationCardItem;
