import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { BottomTabsNavigation } from "../BottomTabsNavigation";
import { NewWorkout } from "../../screens/NewWorkout";
import { UserProvider } from '../../contexts/UserContext'
import { WorkoutProvider } from "../../contexts/WorkoutContext";
import { WorkoutDetails } from "../../screens/WorkoutDetails";
import { NewExercise } from "../../screens/NewExercise";

const Stack = createNativeStackNavigator()

export function PrivateNavigation() {
  return (
    <UserProvider>
        <WorkoutProvider>
            <Stack.Navigator 
                initialRouteName="BottomTabsNavigation"
                screenOptions={{ headerShown: false }} 
            >
                <Stack.Screen name="BottomTabsNavigation" component={BottomTabsNavigation} />
                <Stack.Screen 
                    name="NewWorkout" 
                    component={NewWorkout} 
                    options={{ 
                    headerShown: true, 
                    headerTitleAlign: 'center', 
                    title: 'Novo Treino' 
                    }} 
                />
                
                <Stack.Screen 
                    name="WorkoutDetails" 
                    component={WorkoutDetails} 
                    options={{ 
                    headerShown: true, 
                    title: 'Detalhes do treino',
                    headerTitleAlign: 'center',
                    }} 
                />

                <Stack.Screen 
                    name="NewExercise" 
                    component={NewExercise} 
                    options={{ 
                    headerShown: true, 
                    title: 'Novo Exercício', 
                    headerTitleAlign: 'center',
                    }} 
                />  
            </Stack.Navigator>
        </WorkoutProvider>
    </UserProvider>
  )
}
