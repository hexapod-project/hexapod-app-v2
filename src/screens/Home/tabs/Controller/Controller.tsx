import { StyleSheet, View } from "react-native";
import Joystck from "./components/Joystick";
import DPad from "./components/DPad";
import RotatePad from "./components/RotatePad";
import { Text } from "react-native-paper";

export default function Controller() {
    return (
        <View style={style.controllerContainer}>
            <Joystck />

            <View style={style.bottomClusterContainer}>
                <DPad />

                <RotatePad />
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    controllerContainer: {
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 10
    },
    bottomClusterContainer: {
        width: "100%",
        marginHorizontal: 50,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center"
    }
})