import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Profile } from "../../screens/Profile";
import { Workouts } from '../../screens/Workouts/index';
import { Barbell, User } from "phosphor-react-native";
import { useTheme } from "styled-components/native";
import { useUser } from "../../hooks/useUser";
import { Avatar } from "../../components/Avatar";

const BottomTabs = createBottomTabNavigator()

export function BottomTabsNavigation() {
  const theme = useTheme()
  const { user } = useUser()

  return (
    <BottomTabs.Navigator
      initialRouteName="Workouts"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.colors.background,
        },
        tabBarIcon: ({ focused }) => {
          if (route.name === "Workouts") {
            return (
              <Barbell 
                size={focused ? 28 : 24} 
                color={focused ? theme.colors.primary : theme.colors.gray200} 
                weight={focused ? "fill" : "regular"} 
              />
            );
          } else if (route.name === "Profile") {
            return (
              <Avatar sourcePath={user?.avatarUri} size="sm" />
            );
          }
        },
      })}
    >
      <BottomTabs.Screen name="Workouts" component={Workouts} />
      <BottomTabs.Screen name="Profile" component={Profile} />
    </BottomTabs.Navigator>
  )
}
