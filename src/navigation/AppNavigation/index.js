import { NavigationContainer } from "@react-navigation/native";
import { StackNavigation } from "../StackNavigation";

export function AppNavigation() {
  return (
    <NavigationContainer>
      <StackNavigation />
    </NavigationContainer>
  )
}
