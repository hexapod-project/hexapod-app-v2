import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/Home";
import HeaderRight from "../components/HeaderRight";

const Stack = createStackNavigator();

export default function MainStackNavigator() {
    return (
        <Stack.Navigator screenOptions={{
            headerTitle: "Hexapod App"
        }}>
            <Stack.Screen name="Home"
                component={Home}
                options={{
                    headerRight: HeaderRight,
                }}
            />
        </Stack.Navigator>
    )
} 