import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import ScreenWrapper from '../components/screenWrapper';
import { colors } from '../theme';
import BackButton from '../components/backButton';
import EmptyList from '../components/emptyList';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { getExpensesForTrip } from '../config/sqlite'; // Import SQLite function
import ExpenseCard from '../components/expenseCard';

export default function TripExpensesScreen(props) {
  const { id, place, country } = props.route.params;
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [expenses, setExpenses] = useState([]);

  const fetchExpenses = async () => {
    try {
      // Use the SQLite function to get expenses
      const expensesData = await getExpensesForTrip(id);
      setExpenses(expensesData);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };

  useEffect(() => {
    if (isFocused) fetchExpenses();
  }, [isFocused]);
  
  return (
    <ScreenWrapper className="flex-1">
        <View className="px-4">
            <View className="relative mt-5">
                    <View className="absolute top-2 left-0 z-10">
                        <BackButton />
                    </View>
                    <View>
                        <Text className={`${colors.heading} text-xl font-bold text-center`}>{place}</Text>
                        <Text className={`${colors.heading} text-xs text-center`}>{country}</Text>
                    </View>
                    
            </View>
            <View className="flex-row justify-center items-center rounded-xl mb-4">
                <Image source={require('../assets/images/7.png')} className="w-80 h-80" />
            </View>
            <View className=" space-y-3">
                <View className="flex-row justify-between items-center">
                    <Text className={`${colors.heading} font-bold text-xl`}>Expenses</Text>
                    <TouchableOpacity 
                        onPress={()=> navigation.navigate('AddExpense', {id, place, country})} 
                        className="p-2 px-3 bg-transparent border border-gray-200 rounded-full">
                        <Text className={colors.heading}>Add Expense</Text>
                    </TouchableOpacity>
                </View>
                <View style={{height: 430}}>
                    <FlatList 
                        data={expenses}
                        ListEmptyComponent={<EmptyList message={"You haven't recorded any expenses yet"} />}
                        keyExtractor={item=> item.id}
                        showsVerticalScrollIndicator={false}
                        className="mx-1"
                        renderItem={({item})=>{
                            return (
                                <ExpenseCard item={item} />
                            )
                        }}
                    />
                </View>
            </View>
        </View>
        
    </ScreenWrapper>
  )
}