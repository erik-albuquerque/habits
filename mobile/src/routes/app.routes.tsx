import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home } from "../Screens/Home";
// import { Habit } from "../Screens/Habit";

const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes() {
  return (
    <Navigator
      screenOptions={{ headerShown: false }}
    >
      <Screen name="home" component={Home} />

      {/* <Screen name="habit" component={Habit} /> */}
    </Navigator>
  );
}
