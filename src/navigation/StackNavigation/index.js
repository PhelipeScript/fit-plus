import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { SignIn } from "../../screens/SignIn"
import { SignUp } from '../../screens/SignUp/index';
import { SplashScreen } from "../../screens/SplashScreen";
import { BottomTabsNavigation } from "../BottomTabsNavigation";
import { NewWorkout } from "../../screens/NewWorkout";
import { UserProvider } from '../../contexts/UserContext'
import { WorkoutProvider } from "../../contexts/WorkoutContext";
import { WorkoutDetails } from "../../screens/WorkoutDetails";

const Stack = createNativeStackNavigator()

function PrivateBottomTabs() {
  return (
    <UserProvider>
      <WorkoutProvider>
        <BottomTabsNavigation />
      </WorkoutProvider>
    </UserProvider>
  )
}

function PrivateNewWorkout() {
  return (
    <UserProvider>
      <WorkoutProvider>
        <NewWorkout />
      </WorkoutProvider>
    </UserProvider>
  )
}

function PrivateWorkoutDetails() {
  return (
    <UserProvider>
      <WorkoutProvider>
        <WorkoutDetails />
      </WorkoutProvider>
    </UserProvider>
  )
}

export function StackNavigation() {
  return (
    <Stack.Navigator 
      initialRouteName="SplashScreen"
      screenOptions={{ headerShown: false }} 
    >
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="BottomTabsNavigation" component={PrivateBottomTabs} />
      <Stack.Screen 
        name="NewWorkout" 
        component={PrivateNewWorkout} 
        options={{ 
          headerShown: true, 
          headerTitleAlign: 'center', 
          title: 'Novo Treino' 
        }} 
      />
      
      <Stack.Screen 
        name="WorkoutDetails" 
        component={PrivateWorkoutDetails} 
        options={{ 
          headerShown: true, 
          title: '',
        }} 
      />
    </Stack.Navigator>
  )
}
