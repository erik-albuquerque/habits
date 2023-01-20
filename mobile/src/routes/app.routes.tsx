import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home } from "../Screens/Home";
import { New } from "../Screens/New";

const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="home" component={Home} />

      <Screen name="new" component={New} />
    </Navigator>
  );
}
