import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddExpenseScreen from '../screens/AddExpenseScreen';
import AddTripScreen from '../screens/AddTripScreen';
import HomeScreen from '../screens/HomeScreen';
import TripExpensesScreen from '../screens/TripExpensesScreen';
import WelcomScreen from '../screens/WelcomScreen';
import { createTables } from '../config/sqlite';

createTables();

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Splash">
                <Stack.Screen options={{ headerShown: false }} name="Splash" component={WelcomScreen} />
                <Stack.Screen options={{ headerShown: false }} name="Home" component={HomeScreen} />
                <Stack.Screen options={{ headerShown: false }} name="AddTrip" component={AddTripScreen} />
                <Stack.Screen options={{ headerShown: false }} name="AddExpense" component={AddExpenseScreen} />
                <Stack.Screen options={{ headerShown: false }} name="TripExpenses" component={TripExpensesScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}