import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import ScreenWrapper from '../components/screenWrapper';
import { colors } from '../theme';
import BackButton from '../components/backButton';
import { useNavigation } from '@react-navigation/native';
import { categories } from '../constants/index';
import Snackbar from 'react-native-snackbar';
import { addExpense } from '../config/sqlite'; // Updated import for SQLite function
import Loading from '../components/loading';

export default function AddExpenseScreen(props) {
  let { id } = props.route.params;
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const handleAddExpense = async () => {
    if (title && amount && category) {
      setLoading(true);
      try {
        // Updated the function call to use the SQLite addExpense function
        const expenseId = await addExpense(amount, category, title, id);

        console.log(`Expense added successfully with ID: ${expenseId}`);
        navigation.goBack();
      } catch (error) {
        console.error('Error adding expense:', error);
        Snackbar.show({
          text: 'Error adding expense. Please try again.',
          backgroundColor: 'red',
        });
      } finally {
        setLoading(false);
      }
    } else {
      // show error
      Snackbar.show({
        text: 'Please fill all the fields!',
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

            <Text className={`${colors.heading} text-xl font-bold text-center`}>Add Expense</Text>
          </View>

          <View className="flex-row justify-center my-3 mt-5">
            <Image className="h-72 w-72" source={require('../assets/images/expenseBanner.png')} />
          </View>
          <View className="space-y-2 mx-2">
            <Text className={`${colors.heading} text-lg font-bold`}>For What?</Text>
            <TextInput placeholder='Add A Reason' placeholderTextColor={colors.label} value={title} onChangeText={value => setTitle(value)} className="p-4 bg-white rounded-full mb-3 color-black" />
            <Text className={`${colors.heading} text-lg font-bold`}>How Much?</Text>
            <TextInput placeholder='Add Amount' inputMode='numeric' placeholderTextColor={colors.label} value={amount} onChangeText={value => setAmount(value)} className="p-4 bg-white rounded-full mb-3 color-black" />
          </View>
          <View className="mx-2 space-x-2">
            <Text className="text-lg font-bold">Category</Text>
            <View className="flex-row flex-wrap items-center">
              {
                categories.map(cat => {
                  let bgColor = 'bg-white';
                  if (cat.value == category) bgColor = 'bg-green-200'
                  return (
                    <TouchableOpacity onPress={() => setCategory(cat.value)} key={cat.value}
                      className={`rounded-full ${bgColor} px-4 p-3 mb-2 mr-2`}>
                      <Text className="text-black font-semibold" >{cat.title}</Text>
                    </TouchableOpacity>
                  )
                })

              }
            </View>
          </View>
        </View>


        <View>
          {
            loading ? (
              <Loading />
            ) : (
              <TouchableOpacity onPress={handleAddExpense} style={{ backgroundColor: colors.button }} className="my-6 rounded-full p-3 shadow-sm mx-2">
                <Text className="text-center text-white text-lg font-bold">Add Expense</Text>
              </TouchableOpacity>
            )
          }
        </View>
      </View>
    </ScreenWrapper>
  )
}