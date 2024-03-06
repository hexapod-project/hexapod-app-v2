import { StyleSheet, View } from "react-native";
import { IconButton, useTheme } from "react-native-paper";

export default function HeaderRight() {
    const theme = useTheme();

    return (
        <View>
            <IconButton icon={"bluetooth"}
                iconColor={theme.colors.onPrimary}
                onPress={() => { console.log("Bluetooth") }} />
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
    }
})