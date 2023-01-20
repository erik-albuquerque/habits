import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { AppRoutes } from "./app.routes";

export function Routes() {
  return (
    <View className="flex-1 bg-transparent">
      <NavigationContainer>
        <AppRoutes />
      </NavigationContainer>
    </View>
  );
}
