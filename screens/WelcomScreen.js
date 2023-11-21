import { View, Text, Image, StatusBar } from 'react-native'
import React, { useEffect } from 'react'
import ScreenWrapper from '../components/screenWrapper'
import { colors } from '../theme'
import { useNavigation } from '@react-navigation/native'

export default function WelcomScreen() {

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Home'); // Replace with the name of your welcome screen
    }, 2000);

    return () => clearTimeout(timer); // Clear the timer on component unmount
  }, [navigation]);

  const navigation = useNavigation();
  return (
    <ScreenWrapper>
      <StatusBar backgroundColor={'transparent'} translucent={true} />
      <View className="h-full flex justify-around bg-gray-800 ">
        <View className="flex-row justify-center mt-10">
          <Image source={require('../assets/images/expenseBanner.png')} className="h-96 w-96 shadow" />
        </View>
        <View className="mx-5 mb-20">
          <Text className={`text-center font-bold text-4xl ${colors.heading} mb-2`}>TripBudget</Text>
          <Text className={`text-center font-bold text-4xl ${colors.heading} mb-10`}>Business Expense</Text>

        </View>
      </View>
    </ScreenWrapper>
  )
}