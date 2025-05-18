import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { SignIn } from "../../screens/SignIn"
import { SignUp } from '../../screens/SignUp/index';

const Stack = createNativeStackNavigator()

export function StackNavigation() {
  return (
    <Stack.Navigator 
      initialRouteName="SignIn"
      screenOptions={{ headerShown: false }} 
    >
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  )
}
