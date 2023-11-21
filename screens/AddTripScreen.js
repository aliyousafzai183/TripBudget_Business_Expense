import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import ScreenWrapper from '../components/screenWrapper';
import { colors } from '../theme';
import BackButton from '../components/backButton';
import { useNavigation } from '@react-navigation/native';
import Loading from '../components/loading';
import Snackbar from 'react-native-snackbar';
import { addTrip } from '../config/sqlite'; // Updated import for SQLite functions

export default function AddTripScreen() {
  const [place, setPlace] = useState('');
  const [country, setCountry] = useState('');
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();
  const handleAddTrip = async () => {
    if (place && country && !loading) {
      console.log("Passed");

      try {
        setLoading(true);
        console.log("Calling");

        // Updated the function call to use the SQLite addTrip function
        await addTrip(place, country);

        console.log("Trip added successfully");
        navigation.goBack();
      } catch (error) {
        console.error('Error adding trip:', error);
        Snackbar.show({
          text: 'Error adding trip. Please try again.',
          backgroundColor: 'red',
        });
      } finally {
        setLoading(false);
      }
    } else {
      // show error
      Snackbar.show({
        text: 'Place and Country are required!',
        backgroundColor: 'red',
      });
    }
  };

  return (
    <ScreenWrapper>
      <View className="flex justify-between h-full mx-4">
        <View>
          <View className="relative mt-5">
            <View className="absolute top-0 left-0 z-10">
              <BackButton />
            </View>

            <Text className={`${colors.heading} text-xl font-bold text-center`}>Add Trip</Text>
          </View>

          <View className="flex-row justify-center my-3 mt-5">
            <Image className="h-72 w-72" source={require('../assets/images/4.png')} />
          </View>
          <View className="space-y-2 mx-2">
            <Text className={`${colors.heading} text-lg font-bold`}>Where On Earth?</Text>
            <TextInput placeholder='City/Place/Area' placeholderTextColor={colors.label} value={place} onChangeText={value => setPlace(value)} className="p-4 bg-dark border border-white rounded-full mb-3 text-white" />
            <Text className={`${colors.heading} text-lg font-bold`}>Which Country?</Text>
            <TextInput placeholder='Country' placeholderTextColor={colors.label} value={country} onChangeText={value => setCountry(value)} className="p-4 bg-dark border border-white rounded-full mb-3 text-white" />
          </View>
        </View>

        <View>
          {
            loading ? (
              <Loading />
            ) : (
              <TouchableOpacity onPress={handleAddTrip} style={{ backgroundColor: colors.button }} className="my-6 rounded-full p-3 shadow-sm mx-2">
                <Text className="text-center text-white text-lg font-bold">Add Trip</Text>
              </TouchableOpacity>
            )
          }

        </View>
      </View>
    </ScreenWrapper>
  )
}