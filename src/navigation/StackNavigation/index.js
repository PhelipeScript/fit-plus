import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { SignIn } from "../../screens/SignIn"
import { SignUp } from '../../screens/SignUp/index';
import { SplashScreen } from "../../screens/SplashScreen";
import { BottomTabsNavigation } from "../BottomTabsNavigation";
import { NewWorkout } from "../../screens/NewWorkout";

const Stack = createNativeStackNavigator()

export function StackNavigation() {
  return (
    <Stack.Navigator 
      initialRouteName="SplashScreen"
      screenOptions={{ headerShown: false }} 
    >
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
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
    </Stack.Navigator>
  )
}
