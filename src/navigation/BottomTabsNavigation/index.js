import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Profile } from "../../screens/Profile";
import { Workouts } from '../../screens/Workouts/index';

const BottomTabs = createBottomTabNavigator()

export function BottomTabsNavigation() {
  return (
    <BottomTabs.Navigator
      initialRouteName="Workouts"
      screenOptions={{
        headerShown: false,
      }}
    >
      <BottomTabs.Screen name="Workouts" component={Workouts} />
      <BottomTabs.Screen name="Profile" component={Profile} />
    </BottomTabs.Navigator>
  )
}
