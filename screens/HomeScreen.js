import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, StatusBar } from 'react-native';
import ScreenWrapper from '../components/screenWrapper';
import { colors } from '../theme';
import randomImage from '../assets/images/randomImage';
import EmptyList from '../components/emptyList';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { getAllTrips, eraseAllData } from '../config/sqlite';
import Snackbar from 'react-native-snackbar';

export default function HomeScreen() {
  const navigation = useNavigation();

  const [trips, setTrips] = useState([]);

  const isFocused = useIsFocused();

  const fetchTrips = async () => {
    await getAllTrips((data) => {
      setTrips(data);
    });
  };

  useEffect(() => {
    if (isFocused) fetchTrips();
  }, [isFocused]);

  const handleReset = async () => {
    try {
      await eraseAllData();
      Snackbar.show({
        text: 'All data erased successfully.',
        backgroundColor: 'blue',
      });
      fetchTrips();
      console.log('All data erased successfully.');
    } catch (error) {
      console.error('Error erasing all data:', error);
    }
  };

  return (
    <ScreenWrapper className="flex-1 bg-gray-800">
      <StatusBar backgroundColor={'transparent'} translucent={true} />
      <View className="flex-row justify-between items-center p-4">
        <Text className={`${colors.heading} font-bold text-3xl shadow-sm`}>Trip Budget</Text>
        <TouchableOpacity onPress={handleReset} className="p-2 px-3 bg-dark border border-red-500 rounded-full">
          <Text className='text-black-500'>Reset</Text>
        </TouchableOpacity>
      </View>
      <View className="flex-row justify-center items-center bg-blue-200 rounded-xl mx-4 mb-4">
        <Image source={require('../assets/images/banner.png')} className="w-60 h-60" />
      </View>
      <View className="px-4 space-y-3">
        <View className="flex-row justify-between items-center">
          <Text className={`${colors.heading} font-bold text-xl`}>Recent Trips</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('AddTrip')}
            className="p-2 px-3 bg-dark border border-gray-200 rounded-full">
            <Text className={colors.heading}>Add Trip</Text>
          </TouchableOpacity>
        </View>
        <View style={{}}>
          <FlatList
            data={trips}
            numColumns={2}
            ListEmptyComponent={<EmptyList message={"You haven't recorded any trips yet"} />}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            columnWrapperStyle={{
              justifyContent: 'space-around'
            }}
            className="mx-1"
            renderItem={({ item }) => {
              return (
                <TouchableOpacity onPress={() => navigation.navigate('TripExpenses', { ...item })} className="bg-white p-3 rounded-2xl mb-5 shadow-sm justify-center text-center">
                  <View>
                    <Image source={randomImage()} className="w-36 h-36 mb-2" />
                    <Text className={`font-bold color-black`}>{item.place}</Text>
                    <Text className={`text-xs text-gray-800 `}>{item.country}</Text>
                  </View>
                </TouchableOpacity>
              )
            }}
          />
        </View>
      </View>
    </ScreenWrapper>
  )
}