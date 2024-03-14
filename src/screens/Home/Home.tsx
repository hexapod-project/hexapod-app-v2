import Controller from "./tabs/Controller";
import Calibrator from "./tabs/Calibrator";
import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";

const Tab = createMaterialBottomTabNavigator();

export default function Home() {
    return (
        <Tab.Navigator
            barStyle={{
                borderColor: "#00000022",
                borderWidth: 1                
            }}>
            <Tab.Screen
                name="Controller"
                component={Controller}
                options={{
                    tabBarIcon: "controller-classic",
                    title: "Controller"
                }}
            />
            <Tab.Screen
                name="Calibrator"
                component={Calibrator}
                options={{
                    tabBarIcon: "speedometer",
                    title: "Calibrator"
                }}
            />
        </Tab.Navigator>
    )
}