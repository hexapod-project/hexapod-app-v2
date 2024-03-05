import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/Home";

const Stack = createStackNavigator();

export default function MainStackNavigator() {
    return (
        <Stack.Navigator screenOptions={{
            headerTitle: "Hexapod App"
        }}>
            <Stack.Screen name="Home"
                component={Home}
            />
        </Stack.Navigator>
    )
} 