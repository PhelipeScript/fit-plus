import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { BottomTabsNavigation } from "../BottomTabsNavigation";
import { NewWorkout } from "../../screens/NewWorkout";
import { UserProvider } from '../../contexts/UserContext'
import { WorkoutProvider } from "../../contexts/WorkoutContext";
import { WorkoutDetails } from "../../screens/WorkoutDetails";
import { NewExercise } from "../../screens/NewExercise";
import { EditWorkout } from "../../screens/EditWorkout";
import { EditExercise } from "../../screens/EditExercise";
import { Text } from "react-native-paper";
import { ArrowRight } from "phosphor-react-native";
import { TouchableOpacity } from "react-native";
import { WorkoutMetrics } from "../../screens/WorkoutMetrics";

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
                    name="EditWorkout" 
                    component={EditWorkout} 
                    options={{ 
                    headerShown: true, 
                    headerTitleAlign: 'center', 
                    title: 'Editar Treino' 
                    }} 
                />
                
                <Stack.Screen 
                    name="WorkoutDetails" 
                    component={WorkoutDetails} 
                    options={({ navigation }) => ({ 
                        headerShown: true, 
                        title: 'Detalhes do treino',
                        headerTitleAlign: 'center',
                        headerRight: () => (
                            <TouchableOpacity 
                                style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 4 }} 
                                onPress={() => navigation.push("WorkoutMetrics")}
                            >
                                <Text variant="labelSmall">
                                    Métricas
                                </Text>
                                <ArrowRight size={14} />
                            </TouchableOpacity>
                        )
                    })} 
                />

                <Stack.Screen 
                    name="WorkoutMetrics" 
                    component={WorkoutMetrics} 
                    options={{ 
                        headerShown: true, 
                        headerTitleAlign: 'center', 
                        title: 'Métricas de treino' 
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

                <Stack.Screen 
                    name="EditExercise" 
                    component={EditExercise} 
                    options={{ 
                    headerShown: true, 
                    headerTitleAlign: 'center', 
                    title: 'Editar Exercício' 
                    }} 
                />
            </Stack.Navigator>
        </WorkoutProvider>
    </UserProvider>
  )
}
