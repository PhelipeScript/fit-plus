import { NavigationContainer } from "@react-navigation/native";
import { StackNavigation } from "../StackNavigation";
import { PaperProvider } from "react-native-paper";

export function AppNavigation() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <StackNavigation />
      </NavigationContainer>
    </PaperProvider>
  )
}
