import { View, Text, ScrollView, Platform } from 'react-native'
import React from 'react'

export default function ScreenWrapper({ children }) {
  let statusBarHeight = Platform.OS == 'ios' ? 70 : 50;
  return (
    <ScrollView showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingTop: statusBarHeight }} className="bg-gray-800" >
      {
        children
      }
    </ScrollView>
  )
}